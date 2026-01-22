import { createAnthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { AIProvider } from "@/lib/generated/prisma";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Authenticate the user
    const userId = await requireAuth();

    // Get the provider from query params
    const url = new URL(req.url);
    const provider = url.searchParams.get("provider");

    if (!provider) {
      return NextResponse.json(
        { error: "Provider parameter is required" },
        { status: 400 }
      );
    }

    // Validate provider
    if (!Object.values(AIProvider).includes(provider as AIProvider)) {
      return NextResponse.json(
        {
          error: `Invalid provider. Must be one of: ${Object.values(AIProvider).join(", ")}`
        },
        { status: 400 }
      );
    }

    // Fetch the user's API key for the specified provider
    const apiKeyRecord = await prisma.aIAgentApiKey.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: provider as AIProvider,
        },
      },
    });

    if (!apiKeyRecord) {
      return NextResponse.json(
        { error: `No API key found for provider '${provider}'. Please add one in settings.` },
        { status: 404 }
      );
    }

    // Parse request body
    const { messages } = await req.json();

    // Create the Anthropic provider with the user's API key
    const anthropic = createAnthropic({
      apiKey: apiKeyRecord.apiKey,
    });

    const result = streamText({
      model: anthropic("claude-sonnet-4-5-20250929"),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error in chat endpoint:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
