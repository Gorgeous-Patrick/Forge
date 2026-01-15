import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  InfoTagWithId,
  CreateInfoTagInput,
  UpdateInfoTagInput,
} from "./types";

// Query keys
export const infoTagKeys = {
  all: ["infoTags"] as const,
  detail: (id: string) => ["infoTags", id] as const,
};

// Note: Info tags are nested in goals, so there may not be dedicated API endpoints
// This is a placeholder implementation. Adjust based on your actual API structure.

// API functions
async function fetchInfoTags(): Promise<InfoTagWithId[]> {
  // This might need to be implemented differently depending on your API
  // For now, assuming there's an endpoint for user-level info tags
  const response = await fetch("/api/infoTags");
  if (!response.ok) throw new Error("Failed to fetch info tags");
  return response.json();
}

async function fetchInfoTag(id: string): Promise<InfoTagWithId> {
  const response = await fetch(`/api/infoTags/${id}`);
  if (!response.ok) throw new Error("Failed to fetch info tag");
  return response.json();
}

async function createInfoTag(input: CreateInfoTagInput): Promise<InfoTagWithId> {
  const response = await fetch("/api/infoTags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("Failed to create info tag");
  return response.json();
}

async function updateInfoTag(
  id: string,
  input: UpdateInfoTagInput
): Promise<InfoTagWithId> {
  const response = await fetch(`/api/infoTags/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("Failed to update info tag");
  return response.json();
}

async function deleteInfoTag(id: string): Promise<void> {
  const response = await fetch(`/api/infoTags/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete info tag");
}

// Hooks
export function useInfoTagsQuery() {
  return useQuery({
    queryKey: infoTagKeys.all,
    queryFn: fetchInfoTags,
  });
}

export function useInfoTagQuery(id: string) {
  return useQuery({
    queryKey: infoTagKeys.detail(id),
    queryFn: () => fetchInfoTag(id),
    enabled: !!id,
  });
}

export function useCreateInfoTagMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInfoTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: infoTagKeys.all });
    },
  });
}

export function useUpdateInfoTagMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateInfoTagInput }) =>
      updateInfoTag(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: infoTagKeys.all });
      queryClient.invalidateQueries({ queryKey: infoTagKeys.detail(variables.id) });
    },
  });
}

export function useDeleteInfoTagMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInfoTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: infoTagKeys.all });
    },
  });
}
