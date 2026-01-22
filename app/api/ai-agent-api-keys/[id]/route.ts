import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { AIProvider } from "@/lib/generated/prisma";

// GET /api/ai-agent-api-keys/:id - Get a specific AI Agent API key
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await requireAuth();
    const { id } = await params;

    const apiKey = await prisma.aIAgentApiKey.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(apiKey);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error fetching AI Agent API key:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI Agent API key" },
      { status: 500 }
    );
  }
}

// PUT /api/ai-agent-api-keys/:id - Update an AI Agent API key
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await requireAuth();
    const { id } = await params;
    const body = await req.json();
    const { provider, apiKey, name } = body;

    // Verify API key belongs to user
    const existingApiKey = await prisma.aIAgentApiKey.findFirst({
      where: { id, userId },
    });

    if (!existingApiKey) {
      return NextResponse.json(
        { error: "API key not found" },
        { status: 404 }
      );
    }

    // Validate provider if provided
    if (provider !== undefined && !Object.values(AIProvider).includes(provider as AIProvider)) {
      return NextResponse.json(
        {
          error: `Invalid provider. Must be one of: ${Object.values(AIProvider).join(", ")}`
        },
        { status: 400 }
      );
    }

    // If provider is being changed, check for conflicts
    if (provider && provider !== existingApiKey.provider) {
      const conflictingKey = await prisma.aIAgentApiKey.findUnique({
        where: {
          userId_provider: {
            userId,
            provider: provider as AIProvider,
          },
        },
      });

      if (conflictingKey && conflictingKey.id !== id) {
        return NextResponse.json(
          { error: `API key for provider '${provider}' already exists` },
          { status: 409 }
        );
      }
    }

    // Build update data object with only provided fields
    const updateData: {
      provider?: AIProvider;
      apiKey?: string;
      name?: string | null;
    } = {};

    if (provider !== undefined) updateData.provider = provider as AIProvider;
    if (apiKey !== undefined) updateData.apiKey = apiKey;
    if (name !== undefined) updateData.name = name;

    const updatedApiKey = await prisma.aIAgentApiKey.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedApiKey);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error updating AI Agent API key:", error);
    return NextResponse.json(
      { error: "Failed to update AI Agent API key" },
      { status: 500 }
    );
  }
}

// DELETE /api/ai-agent-api-keys/:id - Delete an AI Agent API key
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await requireAuth();
    const { id } = await params;

    // Verify API key belongs to user
    const existingApiKey = await prisma.aIAgentApiKey.findFirst({
      where: { id, userId },
    });

    if (!existingApiKey) {
      return NextResponse.json(
        { error: "API key not found" },
        { status: 404 }
      );
    }

    await prisma.aIAgentApiKey.delete({
      where: { id },
    });

    return NextResponse.json({ message: "API key deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error deleting AI Agent API key:", error);
    return NextResponse.json(
      { error: "Failed to delete AI Agent API key" },
      { status: 500 }
    );
  }
}
