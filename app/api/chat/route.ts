import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(process.env.ANTHROPIC_API_KEY);
  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20250929"),
    messages: await convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
