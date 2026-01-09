import { useMemo } from "react";
import {
  AssistantRuntimeProvider,
  useAssistantInstructions,
} from "@assistant-ui/react";
import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";
import { Thread } from "./assistant-ui/thread";
import type { FC } from "react";

type ChatboxProps = {
  name: string;
  systemPrompt?: string;
};

const SystemPromptRegistrar: FC<{ prompt?: string }> = ({ prompt }) => {
  useAssistantInstructions(
    prompt ? { instruction: prompt } : { instruction: "", disabled: true }
  );
  return null;
};

export function ChatboxComponent({ name, systemPrompt }: ChatboxProps) {
  const transport = useMemo(
    () => new AssistantChatTransport({ api: "/api/chat" }),
    [name, systemPrompt]
  );
  const runtime = useChatRuntime({ transport });
  const providerKey = `${name}-${systemPrompt ?? "default"}`;

  return (
    <div
      className="flex h-full w-full min-h-[60vh]"
      aria-label={`Chat with ${name}`}
    >
      <AssistantRuntimeProvider key={providerKey} runtime={runtime}>
        <SystemPromptRegistrar prompt={systemPrompt} />
        <Thread />
      </AssistantRuntimeProvider>
    </div>
  );
}
