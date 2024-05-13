import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@wellchart/ui";
import { Toaster } from "@wellchart/ui/sonner";
import { ThemeProvider } from "@wellchart/ui/theme";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { OpenAPI } from "@wellchart/api/client";

import { env } from "~/env";

if (env.NODE_ENV === "production") {
  OpenAPI.BASE = env.FASTAPI_URL;
}

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://app.getwellchart.com"
      : "http://localhost:3000",
  ),
  title: "WellChart",
  description: "Pre-charting for digital health companies",
  openGraph: {
    title: "WellChart",
    description: "Pre-charting for digital health companies",
    url: "https://www.getwellchart.com",
    siteName: "WellChart",
  },
  twitter: {
    card: "summary_large_image",
    site: "@trevorpfiz",
    creator: "@trevorpfiz",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
