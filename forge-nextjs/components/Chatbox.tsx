import { useMemo } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";
import { Thread } from "./assistant-ui/thread";

type ChatboxProps = {
  name: string;
};

export function ChatboxComponent({ name }: ChatboxProps) {
  const transport = useMemo(
    () => new AssistantChatTransport({ api: "/api/chat" }),
    [name]
  );
  const runtime = useChatRuntime({ transport });

  return (
    <div
      className="flex h-full w-full min-h-[60vh]"
      aria-label={`Chat with ${name}`}
    >
      <AssistantRuntimeProvider key={name} runtime={runtime}>
        <Thread />
      </AssistantRuntimeProvider>
    </div>
  );
}
