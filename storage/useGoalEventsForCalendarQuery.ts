import { useQuery } from "@tanstack/react-query";

export type GoalEventForCalendar = {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    goalId: string;
    goalTitle: string;
    completed: boolean;
    minutesEstimate?: number;
    kind: string;
  };
};

async function fetchGoalEvents(): Promise<GoalEventForCalendar[]> {
  const response = await fetch("/api/goal-events");
  if (!response.ok) {
    throw new Error("Failed to fetch goal events");
  }
  return response.json();
}

export function useGoalEventsForCalendarQuery() {
  return useQuery({
    queryKey: ["goal-events-calendar"],
    queryFn: fetchGoalEvents,
  });
}
