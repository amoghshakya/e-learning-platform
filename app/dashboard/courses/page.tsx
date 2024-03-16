import { bricolage } from "@/app/fonts";
import { redirect } from "next/navigation";

export default function MyCoursesPage() {
  // if u go to /dashboard/courses manually, redirect to inprogress
  redirect("/dashboard/courses/inprogress");
}
