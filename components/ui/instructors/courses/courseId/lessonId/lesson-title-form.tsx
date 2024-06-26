"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { updateCourseTitle, updateLessonTitle } from "@/lib/instructor";
import { Course, Lesson } from "@prisma/client";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export function LessonTitleForm({
  initialData,
  courseId,
  lessonId
}: {
  initialData: Lesson;
  courseId: string;
  lessonId: string;
}) {
  const initialState = {
    data: {
      courseId: courseId,
      lessonId: lessonId,
      lessonTitle: initialData.title,
    },
    errorMessage: null,
    successMessage: null,
  };
  const [messages, dispatch] = useFormState(updateLessonTitle, initialState);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  useEffect(() => {
    setIsEditing((current) => !current);
    router.refresh();
    if (messages.errorMessage)
      toast({
        title: "Failed to update title",
        description: messages.errorMessage,
        variant: "destructive",
      });

    if (messages.successMessage)
      toast({
        title: "Title updated",
        description: messages.successMessage,
      });
  }, [messages, router, toast]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 shadow">
      <div className="font-medium flex items-center justify-between">
        Lesson title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <XMarkIcon className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <>
          <form action={dispatch}>
            <Label htmlFor="title" hidden>
              Title
            </Label>
            <Input
              type="text"
              placeholder={initialData.title}
              className="mt-2"
              id="title"
              name="title"
            />
            <div className="flex items-center gap-x-2 mt-2">
              <SaveButton />
            </div>
          </form>
        </>
      ) : (
        <p className="text-sm mt-2 px-3">{initialData.title}</p>
      )}
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      Save
    </Button>
  );
}
