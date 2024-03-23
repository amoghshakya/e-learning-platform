"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateCourseDescription } from "@/lib/instructor";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { heading, body } from "@/app/fonts";

export function DescriptionForm({
  initialData,
  courseId,
}: {
  initialData: Course;
  courseId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const initialState = {
    data: {
      courseId: courseId,
      courseDescription: initialData.description,
    },
    errorMessage: null,
    successMessage: null,
  };
  const [messages, dispatch] = useFormState(
    updateCourseDescription,
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
        title: "Description updated",
        description: messages.successMessage,
      });
  }, [messages, router, toast]);
  return (
    <div
      className={`${body.className} mt-6 border bg-slate-100 rounded-md p-4 shadow`}
    >
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <XMarkIcon className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
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
              placeholder={initialData.description}
              className="mt-2"
              id="description"
              name="description"
            />
            <div className="flex items-center gap-x-2 mt-2">
              <SaveButton />
            </div>
          </form>
        </>
      ) : (
        <p
          className={clsx("text-sm mt-2 px-3", {
            "italic text-slate-500": !initialData.description,
          })}
        >
          {initialData.description || "No description"}
        </p>
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
