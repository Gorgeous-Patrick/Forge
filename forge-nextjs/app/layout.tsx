import "./globals.css";

import { Provider } from "@/components/ui/provider";
import { VibeKanbanWebCompanion } from "vibe-kanban-web-companion";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          {children}
          <VibeKanbanWebCompanion />
        </Provider>
      </body>
    </html>
  );
}
