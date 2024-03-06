import { Metadata } from "next";
import { DNavbar } from "../ui/dashboard/DashboardNavbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "E-learning platform",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex-col md:flex-row">
      <DNavbar />
      <div className="flex-grow md:overflow-y-auto md:overflow-x-clip">
        {children}
      </div>
    </div>
  );
}
