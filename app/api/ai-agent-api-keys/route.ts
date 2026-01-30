import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { AIProvider } from "@/lib/generated/prisma";

// GET /api/ai-agent-api-keys - Get all AI Agent API keys for the authenticated user
export async function GET() {
  try {
    const userId = await requireAuth();

    const apiKeys = await prisma.aIAgentApiKey.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(apiKeys);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error fetching AI Agent API keys:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI Agent API keys" },
      { status: 500 }
    );
  }
}

// POST /api/ai-agent-api-keys - Create a new AI Agent API key
export async function POST(req: Request) {
  try {
    const userId = await requireAuth();
    const body = await req.json();
    const { provider, apiKey, name } = body;

    // Validate required fields
    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: "Provider and apiKey are required" },
        { status: 400 }
      );
    }

    // Validate provider is a valid enum value
    if (!Object.values(AIProvider).includes(provider as AIProvider)) {
      return NextResponse.json(
        {
          error: `Invalid provider. Must be one of: ${Object.values(
            AIProvider
          ).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if an API key for this provider already exists
    const existingKey = await prisma.aIAgentApiKey.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: provider as AIProvider,
        },
      },
    });

    if (existingKey) {
      return NextResponse.json(
        { error: `API key for provider '${provider}' already exists` },
        { status: 409 }
      );
    }

    const newApiKey = await prisma.aIAgentApiKey.create({
      data: {
        userId,
        provider: provider as AIProvider,
        apiKey,
        name,
      },
    });

    return NextResponse.json(newApiKey, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error creating AI Agent API key:", error);
    return NextResponse.json(
      { error: "Failed to create AI Agent API key" },
      { status: 500 }
    );
  }
}
