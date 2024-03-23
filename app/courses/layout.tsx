"use client";

import NavBar from "@/components/ui/landing/Navbar";
import { usePathname } from "next/navigation";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main>
      {pathname === "/courses" ? (
        <NavBar showLinks={true} />
      ) : (
        <NavBar showSearch={true} />
      )}
      {children}
    </main>
  );
}
