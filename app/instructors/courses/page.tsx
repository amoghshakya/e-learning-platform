import { Button } from "@/components/ui/button";
import Link from "next/link";
import { body } from "@/app/fonts";
import { DataTable } from "@/components/ui/instructors/courses/data-table";
import { columns } from "@/components/ui/instructors/courses/columns";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getLoggedInInstructor, isLoggedInInstructor } from "@/lib/actions";

export default async function InstructorCoursesPage() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return redirect("/");

  const isInstructor = await isLoggedInInstructor();

  if (!isInstructor) return redirect("/instructors");

  const instructor = await getLoggedInInstructor();

  const courses = await prisma.course.findMany({
    where: {
      instructor_id: instructor?.id,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      category: true
    }
  });
  
  return (
    <div className={`${body.className} p-6`}>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
