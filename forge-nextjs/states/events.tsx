export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  extendedProps?: { kind?: string };
};
function todayAt(hour: number, minute: number) {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
}
export const events: CalendarEvent[] = [
  {
    id: "task-1",
    title: "Forge: Example 50min Block",
    start: todayAt(14, 0),
    end: todayAt(14, 50),
  },
  {
    id: "break-1",
    title: "Break (10m)",
    start: todayAt(14, 50),
    end: todayAt(15, 0),
    extendedProps: { kind: "break" },
  },
];
