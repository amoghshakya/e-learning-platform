import { auth } from "@/auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { heading, body } from "@/app/fonts";
import { IconBadge } from "@/components/icon-badge";
import { LessonTitleForm } from "@/components/ui/instructors/courses/courseId/lessonId/lesson-title-form";
import { LessonDescriptionForm } from "@/components/ui/instructors/courses/courseId/lessonId/description-form";

export default async function LessonIdPage({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) redirect("/");

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
      course_id: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!lesson) return redirect("/");

  const requiredFields = [lesson.title, lesson.description, lesson.video_url];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className={`p-6 ${body.className}`}>
      <div className="items-center justify-between flex">
        <div className="w-full">
          <Link
            href={`/instructors/courses/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className={`text-3xl font-bold ${heading.className}`}>
                Lesson setup
              </h1>
              <span className="text-sm text-slate-600">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={BookOpenIcon} />
              <h2 className={`text-xl ${heading.className} font-semibold`}>
                Customize your lesson
              </h2>
            </div>
            {/* Lesson title */}
            <LessonTitleForm
              initialData={lesson}
              courseId={params.courseId}
              lessonId={params.lessonId}
            />
            <LessonDescriptionForm
              initialData={lesson}
              courseId={params.courseId}
              lessonId={params.lessonId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
