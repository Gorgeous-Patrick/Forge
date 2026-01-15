import "./globals.css";
import type { ReactNode } from "react";

import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/hooks/useAuth";

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
