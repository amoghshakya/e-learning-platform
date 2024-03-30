import { auth } from "@/auth";
import { Progress } from "@/components/ui/progress";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getUserProgress } from "@/lib/courses";
import prisma from "@/lib/prisma";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import AttachmentList from "./attachments-list";

export default async function MobileLessonContent({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) {
  const session = await auth();
  const userId = session?.user.id;
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

  const userProgress = await getUserProgress(userId, courseId);
  return (
    <div>
      <SheetHeader>
        <SheetTitle>{course.title}</SheetTitle>
        <div className="mx-4 flex items-center justify-center gap-x-2">
          <p className="text-xs">Progress</p>
          <Progress value={userProgress} />
          <span className="text-xs">{userProgress}%</span>
        </div>
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
                {
                  "rounded-r-none border-2 border-r-slate-500 bg-slate-200 text-sky-800":
                    lesson.id === lessonId,
                },
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
  );
}
