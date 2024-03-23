"use client";

import { Button } from "@/components/ui/button";
import { Course, Lesson } from "@prisma/client";
import { XMarkIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  createLesson,
  onReorderLesson,
  updateCourseDescription,
} from "@/lib/instructor";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { heading, body } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import { LessonsList } from "./lesson-list";
import prisma from "@/lib/prisma";
import { LoadingCircleIcon } from "@/components/loading-spinner";

export function LessonsForm({
  initialData,
  courseId,
}: {
  initialData: Course & { lessons: Lesson[] };
  courseId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreate = () => {
    setIsCreating((current) => !current);
  };

  const initialState = {
    data: {
      courseId: courseId,
      courseLesson: initialData.lessons,
    },
    errorMessage: null,
    successMessage: null,
  };
  const [messages, dispatch] = useFormState(createLesson, initialState);

  useEffect(() => {
    setIsCreating((current) => !current);
    router.refresh();
    if (messages.errorMessage)
      toast({
        title: "Failed to add a lesson",
        description: messages.errorMessage,
        variant: "destructive",
      });

    if (messages.successMessage)
      toast({
        title: "Lesson added",
        description: messages.successMessage,
      });
  }, [messages]);

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      const updatedLesson = await onReorderLesson(updateData);

      if (updatedLesson) {
        toast({
          title: "Lesson order updated",
        });
      } else {
        toast({
          title: "Failed to update lesson order",
          variant: "destructive",
        });
      }
    } catch (err) {
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/instructors/courses/${courseId}/lessons/${id}`);
  };

  return (
    <div
      className={`${body.className} relative mt-6 border bg-slate-100 rounded-md p-4 shadow`}
    >
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-400/20 top-0 right-0 rounded-md flex items-center justify-center">
          <LoadingCircleIcon className="h-4 w-4 animate-spin" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course lessons
        <Button variant="ghost" onClick={toggleCreate}>
          {isCreating ? (
            <>
              <XMarkIcon className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add a lesson
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <>
          <form action={dispatch}>
            <Label htmlFor="title" hidden aria-hidden>
              Title
            </Label>
            <Input
              type="text"
              placeholder="E.g. Introduction to Python Programming"
              className="mt-2"
              id="title"
              name="title"
            />
            <div className="flex items-center gap-x-2 mt-2">
              <CreateButton />
            </div>
          </form>
        </>
      )}

      {!isCreating && (
        <div
          className={clsx("text-sm mt-2 transition-all", {
            "text-slate-500 italic": !initialData.lessons.length,
          })}
        >
          {!initialData.lessons.length && "No lessons"}
          <LessonsList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.lessons || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag to reorder the lessons
        </p>
      )}
    </div>
  );
}

function CreateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      Create
    </Button>
  );
}
