import type { Metadata } from "next";
import "./globals.css";

import { inter } from "./fonts";
import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={clsx(inter.className, "antialiased")}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
