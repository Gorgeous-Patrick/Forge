// Main hooks - TanStack Query powered
export {
  useGoals,
  useGoalEvents,
  useCalendarEvents,
  useInfoTags,
} from "./hooks";

// Types
export type {
  Goal,
  Event,
  InfoTag,
  CalendarEvent,
  GoalWithId,
  EventWithId,
  InfoTagWithId,
  CalendarEventWithId,
  CreateGoalInput,
  UpdateGoalInput,
  CreateEventInput,
  UpdateEventInput,
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
  CreateInfoTagInput,
  UpdateInfoTagInput,
} from "./types";

// Low-level TanStack Query hooks (exported for advanced use cases)
export {
  useGoalsQuery,
  useGoalQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
} from "./useGoalsQuery";

export {
  useUpdateEventMutation as useUpdateGoalEventMutation,
  useDeleteEventMutation as useDeleteGoalEventMutation,
} from "./useGoalEventsQuery";

export {
  useEventsQuery,
  useEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "./useEventsQuery";

export {
  useInfoTagsQuery,
  useInfoTagQuery,
  useCreateInfoTagMutation,
  useUpdateInfoTagMutation,
  useDeleteInfoTagMutation,
} from "./useInfoTagsQuery";
