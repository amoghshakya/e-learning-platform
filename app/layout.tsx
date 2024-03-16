import type { Metadata } from "next";
import "./ui/globals.css";

// const inter = Inter({ subsets: ["latin"] });
import { inter } from "./ui/fonts";
import clsx from "clsx";

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
        {children}
      </body>
    </html>
  );
}
