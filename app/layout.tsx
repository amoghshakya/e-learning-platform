import type { Metadata } from "next";
import "./globals.css";

import { body } from "./fonts";
import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "E-learning platform",
  description: "se project 4204",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={clsx(body.className, "antialiased")}>
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
