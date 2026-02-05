import { PATCH, DELETE } from "@/app/api/goal-events/[id]/route";
import { prismaMock } from "@/__tests__/utils/prisma-mock";
import {
  createMockRequest,
  mockGoalEvent,
} from "@/__tests__/utils/test-helpers";

const mockParams = { params: Promise.resolve({ id: "goal-event-1" }) };

describe("PATCH /api/goal-events/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update goalEvent completed status", async () => {
    const updatedGoalEvent = {
      ...mockGoalEvent,
      completed: true,
    };

    prismaMock.event.update.mockResolvedValue(updatedGoalEvent as any);

    const request = createMockRequest({
      method: "PATCH",
      body: {
        completed: true,
      },
    });

    const response = await PATCH(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.completed).toBe(true);
    expect(prismaMock.event.update).toHaveBeenCalledWith({
      where: { id: "goal-event-1" },
      data: {
        completed: true,
      },
    });
  });

  it("should update goalEvent title", async () => {
    const updatedGoalEvent = {
      ...mockGoalEvent,
      title: "Updated Title",
    };

    prismaMock.event.update.mockResolvedValue(updatedGoalEvent as any);

    const request = createMockRequest({
      method: "PATCH",
      body: {
        title: "Updated Title",
      },
    });

    const response = await PATCH(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.title).toBe("Updated Title");
  });

  it("should update goalEvent minutesEstimate", async () => {
    const updatedGoalEvent = {
      ...mockGoalEvent,
      minutesEstimate: 120,
    };

    prismaMock.event.update.mockResolvedValue(updatedGoalEvent as any);

    const request = createMockRequest({
      method: "PATCH",
      body: {
        minutesEstimate: 120,
      },
    });

    const response = await PATCH(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.minutesEstimate).toBe(120);
  });

  it("should update multiple fields at once", async () => {
    const updatedGoalEvent = {
      ...mockGoalEvent,
      title: "Updated Title",
      completed: true,
      minutesEstimate: 90,
    };

    prismaMock.event.update.mockResolvedValue(updatedGoalEvent as any);

    const request = createMockRequest({
      method: "PATCH",
      body: {
        title: "Updated Title",
        completed: true,
        minutesEstimate: 90,
      },
    });

    const response = await PATCH(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.title).toBe("Updated Title");
    expect(data.completed).toBe(true);
    expect(data.minutesEstimate).toBe(90);
  });

  it("should return 500 when database error occurs", async () => {
    prismaMock.event.update.mockRejectedValue(new Error("Database error"));

    const request = createMockRequest({
      method: "PATCH",
      body: {
        completed: true,
      },
    });

    const response = await PATCH(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to update event");
  });
});

describe("DELETE /api/goal-events/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a goalEvent", async () => {
    prismaMock.event.delete.mockResolvedValue(mockGoalEvent as any);

    const request = createMockRequest({ method: "DELETE" });
    const response = await DELETE(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Event deleted successfully");
    expect(prismaMock.event.delete).toHaveBeenCalledWith({
      where: { id: "goal-event-1" },
    });
  });

  it("should return 500 when database error occurs", async () => {
    prismaMock.event.delete.mockRejectedValue(new Error("Database error"));

    const request = createMockRequest({ method: "DELETE" });
    const response = await DELETE(request, mockParams);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to delete event");
  });
});
