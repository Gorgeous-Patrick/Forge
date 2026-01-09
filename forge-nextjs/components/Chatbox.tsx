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
import { DEFAULT_SUMMARY_PROMPT } from "./assistant-ui/prompts";
import { SummaryPromptContext } from "./assistant-ui/summary-context";
import type { FC } from "react";

type ChatboxProps = {
  name: string;
  systemPrompt?: string;
  summaryPrompt?: string;
};

const SystemPromptRegistrar: FC<{ prompt?: string }> = ({ prompt }) => {
  useAssistantInstructions(
    prompt ? { instruction: prompt } : { instruction: "", disabled: true }
  );
  return null;
};

export function ChatboxComponent({
  name,
  systemPrompt,
  summaryPrompt = DEFAULT_SUMMARY_PROMPT,
}: ChatboxProps) {
  const transport = useMemo(() => {
    const params = new URLSearchParams();
    if (summaryPrompt) params.set("summaryPrompt", summaryPrompt);

    return new AssistantChatTransport({
      api: params.size ? `/api/chat?${params.toString()}` : "/api/chat",
    });
  }, [name, systemPrompt, summaryPrompt]);
  const runtime = useChatRuntime({ transport });
  const providerKey = `${name}-${systemPrompt ?? "default"}`;

  return (
    <div
      className="flex h-full w-full min-h-[60vh]"
      aria-label={`Chat with ${name}`}
    >
      <AssistantRuntimeProvider key={providerKey} runtime={runtime}>
        <SystemPromptRegistrar prompt={systemPrompt} />
        <SummaryPromptContext.Provider value={summaryPrompt}>
          <Thread />
        </SummaryPromptContext.Provider>
      </AssistantRuntimeProvider>
    </div>
  );
}
