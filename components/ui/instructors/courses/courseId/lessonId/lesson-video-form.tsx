"use client";

import { Button } from "@/components/ui/button";
import { Lesson, MuxData } from "@prisma/client";
import {
  XMarkIcon,
  PencilIcon,
  PlusIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { heading, body } from "@/app/fonts";
import { updateLessonVideo } from "@/lib/instructor";

import Video from "next-video";
import { FileUpload } from "@/components/file-upload";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";

export function ChapterVideoForm({
  initialData,
  courseId,
  lessonId,
}: {
  initialData: Lesson & { MuxData?: MuxData };
  courseId: string;
  lessonId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      setIsEditing((current) => !current);
      router.refresh();
      toast({
        title: successMessage,
      });
      setSuccessMessage("");
    }
    if (errorMessage) {
      setIsEditing((current) => !current);
      router.refresh();
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      setErrorMessage("");
    }
  }, [successMessage, errorMessage, router, toast]);

  const handleSubmission = async (url?: string) => {
    if (url) {
      const updateLesson = await updateLessonVideo(lessonId, url);
      if (updateLesson) {
        setSuccessMessage("Successfully updated the video.");
      } else {
        setErrorMessage("Failed to update video.");
      }
    }
  };

  return (
    <div
      className={`${body.className} mt-6 rounded-md border bg-slate-100 p-4 shadow`}
    >
      <div className="flex items-center justify-between font-medium">
        Course video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && (
            <>
              <XMarkIcon className="mr-2 h-4 w-4" />
              Cancel
            </>
          )}

          {!isEditing && !initialData.video_url && (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add a video
            </>
          )}

          {!isEditing && initialData.video_url && (
            <>
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.video_url ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <VideoCameraIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Video src={initialData.video_url} accentColor="#aaa0fc" />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload endpoint="lessonVideo" onChange={handleSubmission} />

          <div className="mt-4 text-xs text-muted-foreground">
            Upload a video for this lesson
          </div>
        </div>
      )}
      {initialData.video_url && !isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          Videos can take a while to process. Refresh the page if the video does
          not appear.
        </div>
      )}
    </div>
  );
}
