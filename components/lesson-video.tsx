"use client";

import Video from "next-video";
import { useToast } from "./ui/use-toast";
import { updateCourseProgress } from "@/lib/courses";

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
  const updateProgress = async () => {
    const updatedEnrollment = await updateCourseProgress(
      params.courseId,
      params.lessonId,
      userId,
    );

    if (updatedEnrollment) {
      console.log("Updated progress!!");
      toast({ title: "Progress updated" });
    } else {
      console.error("Something went wrong.");
    }
  };

  return <Video src={src} onEnded={updateProgress} />;
}
