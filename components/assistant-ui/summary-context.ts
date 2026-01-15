import { createContext, useContext } from "react";
import { DEFAULT_SUMMARY_PROMPT } from "../prompts";

export const SummaryPromptContext = createContext<string>(
  DEFAULT_SUMMARY_PROMPT
);

export function useSummaryPrompt() {
  return useContext(SummaryPromptContext);
}
