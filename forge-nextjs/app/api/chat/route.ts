import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const modelMessages = await convertToModelMessages(messages);
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: modelMessages,
  });
  return result.toUIMessageStreamResponse();
}
