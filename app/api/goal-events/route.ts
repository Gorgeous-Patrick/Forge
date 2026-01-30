import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/goal-events - Get all events from all goals for calendar display
export async function GET() {
  try {
    const userId = await requireAuth();

    // Get all goals for the user with their events
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      include: {
        events: {
          where: {
            start: {
              not: null,
            },
            end: {
              not: null,
            },
          },
          orderBy: {
            start: "asc",
          },
        },
      },
    });

    // Flatten events from all goals and transform for FullCalendar
    const events = goals.flatMap((goal) =>
      goal.events.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        extendedProps: {
          goalId: goal.id,
          goalTitle: goal.title,
          completed: event.completed,
          minutesEstimate: event.minutesEstimate,
          kind: "goal-event",
        },
      }))
    );

    return NextResponse.json(events);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.error("Error fetching goal events:", error);
    return NextResponse.json(
      { error: "Failed to fetch goal events" },
      { status: 500 }
    );
  }
}
