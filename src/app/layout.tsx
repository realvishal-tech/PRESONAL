import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vishal | Futuristic Developer Portfolio",
  description:
    "Premium, futuristic portfolio and developer dashboard for Vishal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
