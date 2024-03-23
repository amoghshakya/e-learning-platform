"use client";

import { Button } from "@/components/ui/button";
import { Course, Lesson } from "@prisma/client";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  updateCourseDescription,
  updateLessonDescription,
} from "@/lib/instructor";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { heading, body } from "@/app/fonts";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Input } from "@/components/ui/input";

export function LessonDescriptionForm({
  initialData,
  courseId,
  lessonId,
}: {
  initialData: Lesson;
  courseId: string;
  lessonId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [descriptionValue, setDescriptionValue] = useState(
    initialData.description ?? "",
  );

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const initialState = {
    data: {
      courseId: courseId,
      lessonId: lessonId,
      lessonDescription: initialData.description,
    },
    errorMessage: null,
    successMessage: null,
  };
  const [messages, dispatch] = useFormState(
    updateLessonDescription,
    initialState,
  );

  useEffect(() => {
    setIsEditing((current) => !current);
    router.refresh();
    if (messages.errorMessage)
      toast({
        title: "Failed to update description",
        description: messages.errorMessage,
        variant: "destructive",
      });

    if (messages.successMessage)
      toast({
        title: "Lesson description updated",
        description: messages.successMessage,
      });
  }, [messages]);
  return (
    <div
      className={`${body.className} mt-6 rounded-md border bg-slate-100 p-4 shadow`}
    >
      <div className="flex items-center justify-between font-medium">
        Lesson description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <XMarkIcon className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit description
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <>
          <form action={dispatch}>
            <Label htmlFor="description" hidden>
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={descriptionValue}
              className="hidden"
              hidden
              aria-hidden
            />
            <Editor
              onChange={(e) => setDescriptionValue(e)}
              value={descriptionValue}
            />
            <div className="mt-2 flex items-center gap-x-2">
              <SaveButton />
            </div>
          </form>
        </>
      ) : (
        <div
          className={clsx("mt-2 px-3 text-sm", {
            "italic text-slate-500": !initialData.description,
          })}
        >
          {!initialData.description && "No description"}
          {initialData.description && (
            <Preview value={initialData.description} />
          )}
        </div>
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
