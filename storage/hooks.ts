import { useCallback } from "react";
import {
  useGoalsQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
} from "./useGoalsQuery";
import {
  useUpdateEventMutation as useUpdateGoalEventMutation,
  useDeleteEventMutation as useDeleteGoalEventMutation,
} from "./useGoalEventsQuery";
import {
  useEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "./useEventsQuery";
import {
  useInfoTagsQuery,
  useCreateInfoTagMutation,
  useUpdateInfoTagMutation,
  useDeleteInfoTagMutation,
} from "./useInfoTagsQuery";
import type {
  GoalWithId,
  EventWithId as GoalEventWithId,
  CalendarEventWithId,
  InfoTagWithId,
  CreateGoalInput,
  UpdateGoalInput,
  UpdateEventInput as UpdateGoalEventInput,
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
  CreateInfoTagInput,
  UpdateInfoTagInput,
} from "./types";

// Goals Hook
export function useGoals() {
  const query = useGoalsQuery();
  const createMutation = useCreateGoalMutation();
  const updateMutation = useUpdateGoalMutation();
  const deleteMutation = useDeleteGoalMutation();

  const create = useCallback(
    async (input: CreateGoalInput): Promise<GoalWithId> => {
      return new Promise((resolve, reject) => {
        createMutation.mutate(input, {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        });
      });
    },
    [createMutation]
  );

  const update = useCallback(
    async (id: string, input: UpdateGoalInput): Promise<GoalWithId | null> => {
      return new Promise((resolve, reject) => {
        updateMutation.mutate(
          { id, input },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error),
          }
        );
      });
    },
    [updateMutation]
  );

  const deleteGoal = useCallback(
    async (id: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        deleteMutation.mutate(id, {
          onSuccess: () => resolve(true),
          onError: (error) => reject(error),
        });
      });
    },
    [deleteMutation]
  );

  return {
    goals: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    create,
    update,
    delete: deleteGoal,
  };
}

// Goal Events Hook
export function useGoalEvents() {
  const updateMutation = useUpdateGoalEventMutation();
  const deleteMutation = useDeleteGoalEventMutation();

  const update = useCallback(
    async (
      id: string,
      input: UpdateGoalEventInput
    ): Promise<GoalEventWithId | null> => {
      return new Promise((resolve, reject) => {
        updateMutation.mutate(
          { id, input },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error),
          }
        );
      });
    },
    [updateMutation]
  );

  const deleteGoalEvent = useCallback(
    async (id: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        deleteMutation.mutate(id, {
          onSuccess: () => resolve(true),
          onError: (error) => reject(error),
        });
      });
    },
    [deleteMutation]
  );

  return {
    update,
    delete: deleteGoalEvent,
  };
}

// Calendar Events Hook
export function useCalendarEvents() {
  const query = useEventsQuery();
  const createMutation = useCreateEventMutation();
  const updateMutation = useUpdateEventMutation();
  const deleteMutation = useDeleteEventMutation();

  const create = useCallback(
    async (input: CreateCalendarEventInput): Promise<CalendarEventWithId> => {
      return new Promise((resolve, reject) => {
        createMutation.mutate(input, {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        });
      });
    },
    [createMutation]
  );

  const update = useCallback(
    async (
      id: string,
      input: UpdateCalendarEventInput
    ): Promise<CalendarEventWithId | null> => {
      return new Promise((resolve, reject) => {
        updateMutation.mutate(
          { id, input },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error),
          }
        );
      });
    },
    [updateMutation]
  );

  const deleteEvent = useCallback(
    async (id: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        deleteMutation.mutate(id, {
          onSuccess: () => resolve(true),
          onError: (error) => reject(error),
        });
      });
    },
    [deleteMutation]
  );

  return {
    events: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    create,
    update,
    delete: deleteEvent,
  };
}

// Info Tags Hook
export function useInfoTags() {
  const query = useInfoTagsQuery();
  const createMutation = useCreateInfoTagMutation();
  const updateMutation = useUpdateInfoTagMutation();
  const deleteMutation = useDeleteInfoTagMutation();

  const create = useCallback(
    async (input: CreateInfoTagInput): Promise<InfoTagWithId> => {
      return new Promise((resolve, reject) => {
        createMutation.mutate(input, {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        });
      });
    },
    [createMutation]
  );

  const update = useCallback(
    async (
      id: string,
      input: UpdateInfoTagInput
    ): Promise<InfoTagWithId | null> => {
      return new Promise((resolve, reject) => {
        updateMutation.mutate(
          { id, input },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error),
          }
        );
      });
    },
    [updateMutation]
  );

  const deleteInfoTag = useCallback(
    async (id: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        deleteMutation.mutate(id, {
          onSuccess: () => resolve(true),
          onError: (error) => reject(error),
        });
      });
    },
    [deleteMutation]
  );

  return {
    infoTags: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    create,
    update,
    delete: deleteInfoTag,
  };
}
