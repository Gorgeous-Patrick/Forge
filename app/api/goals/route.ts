import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/goals - Get all goals with their deliverables and infoTags
export async function GET() {
  try {
    const userId = await requireAuth();

    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      include: {
        deliverables: {
          orderBy: {
            order: "asc",
          },
        },
        infoTags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(goals);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}

// POST /api/goals - Create a new goal
export async function POST(req: Request) {
  try {
    const userId = await requireAuth();
    const body = await req.json();
    const { title, description, dueDate, deliverables, infoTags } = body;

    const goal = await prisma.goal.create({
      data: {
        userId,
        title,
        description,
        dueDate,
        deliverables: {
          create:
            deliverables?.map((d: any, index: number) => ({
              title: d.title,
              completed: d.completed ?? false,
              minutesEstimate: d.minutesEstimate,
              order: index,
            })) ?? [],
        },
        infoTags: {
          create:
            infoTags?.map((tag: any) => ({
              title: tag.title,
              info: tag.info,
            })) ?? [],
        },
      },
      include: {
        deliverables: {
          orderBy: {
            order: "asc",
          },
        },
        infoTags: true,
      },
    });

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}
