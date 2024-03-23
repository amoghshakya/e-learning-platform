"use client";

import NavBar from "@/components/ui/landing/Navbar";
import { body } from "../fonts";
import { usePathname } from "next/navigation";

export default function InstructorsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main className={`${body.className}`}>
      {pathname.startsWith("/instructors/courses/") ? (
        <NavBar showSearch={false} showLinks={false} />
      ) : (
        <NavBar showSearch={false} showLinks={true} />
      )}
      {children}
    </main>
  );
}
