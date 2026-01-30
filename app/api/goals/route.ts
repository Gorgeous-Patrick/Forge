import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/goals - Get all goals with their events and infoTags
export async function GET() {
  try {
    const userId = await requireAuth();

    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      include: {
        events: {
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
    const { title, description, dueDate, events, infoTags } = body;

    // Generate placeholder events if none provided and dueDate exists
    let eventsToCreate = events;
    if ((!events || events.length === 0) && dueDate) {
      const goalDueDate = new Date(dueDate);
      const now = new Date();

      // Calculate time from now to due date
      const totalHours = Math.max(1, Math.floor((goalDueDate.getTime() - now.getTime()) / (1000 * 60 * 60)));

      // Generate 3 placeholder events spread over the time period
      const placeholderEvents = [];
      const eventDuration = 2; // 2 hours per event
      const numEvents = 3;

      for (let i = 0; i < numEvents; i++) {
        // Space events evenly before the due date
        const hoursBeforeDue = totalHours - (i * Math.floor(totalHours / (numEvents + 1)));
        const eventStart = new Date(goalDueDate.getTime() - (hoursBeforeDue * 60 * 60 * 1000));
        const eventEnd = new Date(eventStart.getTime() + (eventDuration * 60 * 60 * 1000));

        placeholderEvents.push({
          title: `Work on: ${title} (Part ${i + 1})`,
          start: eventStart.toISOString(),
          end: eventEnd.toISOString(),
          completed: false,
          minutesEstimate: eventDuration * 60,
        });
      }

      eventsToCreate = placeholderEvents;
    }

    const goal = await prisma.goal.create({
      data: {
        userId,
        title,
        description,
        dueDate,
        events: {
          create:
            eventsToCreate?.map((d: any, index: number) => ({
              title: d.title,
              start: d.start,
              end: d.end,
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
        events: {
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
