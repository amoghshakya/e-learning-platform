import { body } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

export default async function LessonSidebar({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      lessons: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/dashboard");

  return (
    <div className="hidden h-screen w-1/4 flex-col gap-y-2 border-slate-200 bg-slate-100 md:absolute md:flex">
      <div className="flex h-fit w-full items-center justify-start border-b border-slate-300 p-2 py-4 pr-8 shadow">
        <Link href="/dashboard">
          <Button variant="ghost">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
          </Button>
        </Link>
        <h1 className={`${body.className} font-semibold`}>{course.title}</h1>
      </div>
      <div className="">
        <div className="mx-2">
          <h3 className="text-sm">Course lessons</h3>
        </div>
        <div className="flex flex-col overflow-y-scroll">
          {course.lessons.map((lesson) => (
            <Link
              href={`/courses/${courseId}/lessons/${lesson.id}`}
              key={lesson.id}
            >
              <div
                className={clsx(
                  "m-1 line-clamp-1 flex items-center gap-x-1 overflow-ellipsis rounded-md border border-sky-100 bg-slate-100 p-3 px-4 text-sm text-slate-600 hover:bg-slate-300",
                  { "bg-slate-300/80 text-sky-800": lesson.id === lessonId },
                )}
              >
                <div className="mr-2 flex items-center gap-1">
                  <BookOpenIcon className="h-4 w-4" />
                  {lesson.position}
                </div>
                <p>{lesson.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
