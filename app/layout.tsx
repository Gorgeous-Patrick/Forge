import "./globals.css";
import type { ReactNode } from "react";

import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryProvider } from "@/components/QueryProvider";

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
