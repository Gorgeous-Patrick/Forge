// Main hooks - TanStack Query powered
export { useGoals, useDeliverables, useCalendarEvents, useInfoTags } from "./hooks";

// Types
export type {
  Goal,
  Deliverable,
  InfoTag,
  CalendarEvent,
  GoalWithId,
  DeliverableWithId,
  InfoTagWithId,
  CalendarEventWithId,
  CreateGoalInput,
  UpdateGoalInput,
  CreateDeliverableInput,
  UpdateDeliverableInput,
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
  useUpdateDeliverableMutation,
  useDeleteDeliverableMutation,
} from "./useDeliverablesQuery";

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
