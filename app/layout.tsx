import "./globals.css";
import type { ReactNode } from "react";

import { Provider } from "@/components/ui/provider";

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
