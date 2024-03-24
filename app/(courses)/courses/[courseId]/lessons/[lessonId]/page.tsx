import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Video from "next-video";
import { Preview } from "@/components/preview";
import { updateCourseProgress } from "@/lib/courses";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/auth";
import LessonVideo from "@/components/lesson-video";

export default async function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
    },
  });
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return redirect("/join/login");

  if (!lesson) return redirect("/dashboard");

  return (
    <div className="p-4 md:ml-[25%]">
      <div className="grid grid-cols-1 grid-rows-[repeat(3,fit-content)] items-center gap-y-2">
        <div className="border-b border-slate-300 p-2 py-3">
          <h2 className="font-semibold">{lesson.title}</h2>
        </div>
        <div className="space-y-2">
          <h5 className="text-lg font-medium">Lesson video</h5>
          <div className="rounded bg-slate-200 p-2 shadow">
            {lesson.video_url ? (
              <LessonVideo
                src={lesson.video_url}
                params={params}
                userId={userId}
              />
            ) : (
              <div className="flex w-full items-center justify-center rounded bg-slate-200 text-xs text-slate-800 md:h-60">
                No video for this lesson
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-lg font-medium">Description</h5>
          <div>
            {lesson.description && <Preview value={lesson.description} />}
            {!lesson.description && (
              <div className="font-muted-foreground text-xs">
                No description for this lesson.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
