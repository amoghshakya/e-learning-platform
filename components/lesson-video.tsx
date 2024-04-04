"use client";

import Video from "next-video";
import { useToast } from "./ui/use-toast";
import { updateCourseProgress } from "@/lib/courses";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function LessonVideo({
  src,
  params,
  userId,
}: {
  src: string;
  params: {
    courseId: string;
    lessonId: string;
  };
  userId: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const updateProgress = async () => {
    const updatedEnrollment = await updateCourseProgress(
      params.courseId,
      params.lessonId,
      userId,
    );

    if (updatedEnrollment) {
      toast({ title: "Progress updated" });
      router.refresh()
    } else {
      console.error("Something went wrong.");
    }
  };

  return <Video src={src} onEnded={updateProgress} />;
}
