import { Thread } from "./assistant-ui/thread";

export function ChatboxComponent() {
  return (
    <div className="flex h-full w-full min-h-[60vh]">
      <Thread />
    </div>
  );
}
