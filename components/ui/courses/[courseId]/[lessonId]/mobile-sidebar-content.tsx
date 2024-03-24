import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import prisma from "@/lib/prisma";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MobileLessonContent({
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
    <>
      <SheetHeader>
        <SheetTitle>{course.title}</SheetTitle>
      </SheetHeader>
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
    </>
  );
}
