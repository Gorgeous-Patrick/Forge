/**
 * Example Component
 *
 * This file demonstrates how to use the storage hooks in your components.
 * This is NOT meant to be used in production - it's just a reference example.
 */

import { useGoals, useCalendarEvents, useDeliverables, useInfoTags } from "./index";

export function ExampleGoalsComponent() {
  const { goals, isLoading, error, create, update, delete: deleteGoal } = useGoals();

  const handleCreateGoal = async () => {
    try {
      const newGoal = await create({
        title: "Complete Project",
        description: "Finish all the remaining tasks",
        dueDate: "2026-01-30T17:00:00",
        deliverables: [
          { title: "Write tests", completed: false, minutesEstimate: 60 },
          { title: "Fix bugs", completed: false, minutesEstimate: 45 },
        ],
        infoTags: [
          { title: "Priority", info: "High" },
          { title: "Team", info: "Engineering" },
        ],
      });
      console.log("Created goal:", newGoal);
    } catch (err) {
      console.error("Failed to create goal:", err);
    }
  };

  const handleUpdateGoal = async (goalId: string) => {
    try {
      await update(goalId, {
        title: "Updated Goal Title",
        description: "Updated description",
      });
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  if (isLoading) {
    return <div>Loading goals...</div>;
  }

  if (error) {
    return <div>Error loading goals: {error.message}</div>;
  }

  return (
    <div>
      <h2>Goals ({goals.length})</h2>
      <button onClick={handleCreateGoal}>Add New Goal</button>

      {goals.map((goal) => (
        <div key={goal.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
          <p>Due: {goal.dueDate || "No due date"}</p>

          <h4>Deliverables:</h4>
          <ul>
            {goal.deliverables.map((d) => (
              <li key={d.id}>
                {d.title} - {d.completed ? "✓" : "○"} ({d.minutesEstimate || 0} min)
              </li>
            ))}
          </ul>

          <h4>Info Tags:</h4>
          <div>
            {goal.infoTags.map((tag) => (
              <span key={tag.id} style={{ margin: "0 5px", padding: "2px 8px", background: "#eee" }}>
                {tag.title}: {tag.info}
              </span>
            ))}
          </div>

          <button onClick={() => handleUpdateGoal(goal.id)}>Update</button>
          <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export function ExampleDeliverablesComponent() {
  const { update, delete: deleteDeliverable } = useDeliverables();
  const { goals } = useGoals(); // Get goals to access deliverables

  const handleToggleComplete = async (deliverableId: string, currentStatus: boolean) => {
    try {
      await update(deliverableId, { completed: !currentStatus });
    } catch (err) {
      console.error("Failed to toggle deliverable:", err);
    }
  };

  const handleDelete = async (deliverableId: string) => {
    try {
      await deleteDeliverable(deliverableId);
    } catch (err) {
      console.error("Failed to delete deliverable:", err);
    }
  };

  return (
    <div>
      <h2>All Deliverables</h2>
      {goals.map((goal) =>
        goal.deliverables.map((deliverable) => (
          <div key={deliverable.id}>
            <input
              type="checkbox"
              checked={deliverable.completed}
              onChange={() => handleToggleComplete(deliverable.id, deliverable.completed)}
            />
            <span>{deliverable.title}</span>
            <button onClick={() => handleDelete(deliverable.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export function ExampleCalendarComponent() {
  const { events, isLoading, create, update, delete: deleteEvent } = useCalendarEvents();

  const handleCreateEvent = async () => {
    try {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

      await create({
        title: "Team Meeting",
        start: now,
        end: oneHourLater,
        extendedProps: { kind: "meeting" },
      });
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  };

  const handleUpdateEvent = async (eventId: string) => {
    try {
      await update(eventId, {
        title: "Updated Meeting Title",
      });
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <div>
      <h2>Calendar Events ({events.length})</h2>
      <button onClick={handleCreateEvent}>Add Event</button>

      {events.map((event) => (
        <div key={event.id} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
          <h3>{event.title}</h3>
          <p>Start: {event.start.toLocaleString()}</p>
          <p>End: {event.end.toLocaleString()}</p>
          {event.extendedProps?.kind && <p>Type: {event.extendedProps.kind}</p>}

          <button onClick={() => handleUpdateEvent(event.id)}>Update</button>
          <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export function ExampleInfoTagsComponent() {
  const { infoTags, isLoading, create, update, delete: deleteTag } = useInfoTags();

  const handleCreateTag = async () => {
    try {
      await create({
        title: "Skill",
        info: "TypeScript, React",
      });
    } catch (err) {
      console.error("Failed to create tag:", err);
    }
  };

  const handleUpdateTag = async (tagId: string) => {
    try {
      await update(tagId, {
        info: "TypeScript, React, Node.js",
      });
    } catch (err) {
      console.error("Failed to update tag:", err);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      await deleteTag(tagId);
    } catch (err) {
      console.error("Failed to delete tag:", err);
    }
  };

  if (isLoading) {
    return <div>Loading info tags...</div>;
  }

  return (
    <div>
      <h2>Info Tags ({infoTags.length})</h2>
      <button onClick={handleCreateTag}>Add Tag</button>

      {infoTags.map((tag) => (
        <div key={tag.id} style={{ margin: "5px 0" }}>
          <strong>{tag.title}:</strong> {tag.info}
          <button onClick={() => handleUpdateTag(tag.id)}>Edit</button>
          <button onClick={() => handleDeleteTag(tag.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
