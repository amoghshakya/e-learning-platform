import { Metadata } from "next";
import { DNavbar } from "@/components/ui/dashboard/DashboardNavbar";
import { inter } from "../fonts";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "E-learning platform",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen flex-col md:flex-row">
      <DNavbar />
      <div
        className={`${inter.className} flex-grow md:overflow-y-auto md:overflow-x-clip`}
      >
        {children}
      </div>
    </main>
  );
}
