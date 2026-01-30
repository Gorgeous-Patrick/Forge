import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeliverableWithId, UpdateDeliverableInput } from "./types";
import { goalKeys } from "./useGoalsQuery";

// API functions
async function updateDeliverable(
  id: string,
  input: UpdateDeliverableInput
): Promise<DeliverableWithId> {
  const response = await fetch(`/api/deliverables/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("Failed to update deliverable");
  return response.json();
}

async function deleteDeliverable(id: string): Promise<void> {
  const response = await fetch(`/api/deliverables/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete deliverable");
}

// Hooks
export function useUpdateDeliverableMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateDeliverableInput;
    }) => updateDeliverable(id, input),
    onSuccess: () => {
      // Invalidate all goals queries since deliverables are nested
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

export function useDeleteDeliverableMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDeliverable,
    onSuccess: () => {
      // Invalidate all goals queries since deliverables are nested
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}
