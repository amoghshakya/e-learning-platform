"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { updateCourseTitle } from "@/lib/instructor";
import { Course } from "@prisma/client";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export function TitleForm({
  initialData,
  courseId,
}: {
  initialData: Course;
  courseId: string;
}) {
  const initialState = {
    data: {
      courseId: courseId,
      courseTitle: initialData.title,
    },
    errorMessage: null,
    successMessage: null,
  };
  const [messages, dispatch] = useFormState(updateCourseTitle, initialState);
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
  }, [messages, toast, router]);
  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4 shadow">
      <div className="flex items-center justify-between font-medium">
        Course title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <XMarkIcon className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="mr-2 h-4 w-4" />
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
            <div className="mt-2 flex items-center gap-x-2">
              <SaveButton />
            </div>
          </form>
        </>
      ) : (
        <p className="mt-2 px-3 text-sm">{initialData.title}</p>
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
