import { Thread } from "./assistant-ui/thread";

type ChatboxProps = {
  name: string;
};

export function ChatboxComponent({ name }: ChatboxProps) {
  return (
    <div
      className="flex h-full w-full min-h-[60vh]"
      aria-label={`Chat with ${name}`}
    >
      <Thread />
    </div>
  );
}
