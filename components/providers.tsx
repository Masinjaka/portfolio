"use client";

import { ThemeProvider } from "next-themes";
import { preferenceKeys } from "@/lib/preferences";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey={preferenceKeys.theme}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
