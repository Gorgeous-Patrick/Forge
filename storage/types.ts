// Re-export types from states for consistency
export type { Goal, Deliverable } from "../states/goals";
export type { InfoTag } from "../states/InfoTag";
export type { CalendarEvent } from "../states/events";
import { Deliverable } from "../states/goals";
import { InfoTag } from "../states/InfoTag";
import { CalendarEvent } from "../states/events";

// API response types with IDs for database records
export interface GoalWithId
  extends Omit<import("../states/goals").Goal, "deliverables" | "infoTags"> {
  id: string;
  deliverables: DeliverableWithId[];
  infoTags: InfoTagWithId[];
}

export interface DeliverableWithId extends Deliverable {
  id: string;
  goalId: string;
}

export interface InfoTagWithId extends InfoTag {
  id: string;
  goalId?: string; // Optional for user-level info tags
}

export interface CalendarEventWithId extends CalendarEvent {
  id: string;
}

// Create/Update types (without IDs)
export type CreateGoalInput = {
  title: string;
  description: string;
  dueDate: string | null;
  deliverables: Array<{
    title: string;
    completed: boolean;
    minutesEstimate?: number;
  }>;
  infoTags: Array<{
    title: string;
    info: string;
  }>;
};

export type UpdateGoalInput = Partial<CreateGoalInput>;

export type CreateDeliverableInput = {
  title: string;
  completed: boolean;
  minutesEstimate?: number;
  goalId: string;
};

export type UpdateDeliverableInput = Partial<
  Omit<CreateDeliverableInput, "goalId">
>;

export type CreateCalendarEventInput = {
  title: string;
  start: Date;
  end: Date;
  extendedProps?: { kind?: string };
};

export type UpdateCalendarEventInput = Partial<CreateCalendarEventInput>;

export type CreateInfoTagInput = {
  title: string;
  info: string;
  goalId?: string;
};

export type UpdateInfoTagInput = Partial<Omit<CreateInfoTagInput, "goalId">>;
