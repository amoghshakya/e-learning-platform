import { Metadata } from "next";
import { DNavbar } from "@/components/ui/dashboard/DashboardNavbar";
import { body } from "../fonts";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "E-learning platform",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <main className="h-screen flex-col md:flex-row">
      <DNavbar />
      <div
        className={`${body.className} flex-grow md:overflow-y-auto md:overflow-x-clip`}
      >
        {children}
      </div>
    </main>
  );
}
