import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EventWithId, UpdateEventInput } from "./types";
import { goalKeys } from "./useGoalsQuery";

// API functions
async function updateEvent(
  id: string,
  input: UpdateEventInput
): Promise<EventWithId> {
  const response = await fetch(`/api/goal-events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("Failed to update event");
  return response.json();
}

async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(`/api/goal-events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete event");
}

// Hooks
export function useUpdateEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateEventInput;
    }) => updateEvent(id, input),
    onSuccess: () => {
      // Invalidate all goals queries since events are nested
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useDeleteEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      // Invalidate all goals queries since events are nested
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}
