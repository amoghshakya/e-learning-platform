import { bricolage } from "@/app/ui/fonts";
import { redirect } from "next/navigation";

export default function MyCoursesPage() {
  // if u go to /dashboard/courses manually, redirect to inprogress
  redirect("/dashboard/courses/inprogress");
  return (
    <div>
      <section className="h-screen">
      </section>
    </div>
  );
}
