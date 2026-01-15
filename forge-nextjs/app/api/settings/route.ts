import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const email = await getCurrentUser();

    if (!email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const settings = await prisma.userSettings.findUnique({
      where: { userId: email },
      select: {
        id: true,
        claudeApiKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      settings: settings || { claudeApiKey: null },
    });
  } catch (error) {
    console.error("Error getting user settings:", error);
    return NextResponse.json(
      { error: "Failed to get settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const email = await getCurrentUser();

    if (!email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { claudeApiKey } = body;

    // Validate that claudeApiKey is provided
    if (claudeApiKey === undefined) {
      return NextResponse.json(
        { error: "claudeApiKey is required" },
        { status: 400 }
      );
    }

    // Upsert user settings
    const settings = await prisma.userSettings.upsert({
      where: { userId: email },
      update: {
        claudeApiKey: claudeApiKey || null,
      },
      create: {
        userId: email,
        claudeApiKey: claudeApiKey || null,
      },
    });

    return NextResponse.json({
      success: true,
      settings: {
        id: settings.id,
        claudeApiKey: settings.claudeApiKey,
        updatedAt: settings.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
