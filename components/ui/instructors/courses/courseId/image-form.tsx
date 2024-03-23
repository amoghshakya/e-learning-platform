"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { XMarkIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { heading, body } from "@/app/fonts";
import { updateCourseThumbnail } from "@/lib/instructor";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

export function ImageForm({
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
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      setErrorMessage("");
    }
  }, [successMessage, errorMessage]);

  const handleFileChange = async (url?: string) => {
    if (url) {
      const updateCourse = await updateCourseThumbnail(courseId, url);
      if (updateCourse) {
        setSuccessMessage("Successfully updated course thumbnail.");
      } else {
        setErrorMessage("Failed to update thumbnail");
      }
    }
  };

  return (
    <div
      className={`${body.className} mt-6 rounded-md border bg-slate-100 p-4 shadow`}
    >
      <div className="flex items-center justify-between font-medium">
        Course thumbnail
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && (
            <>
              <XMarkIcon className="mr-2 h-4 w-4" />
              Cancel
            </>
          )}

          {!isEditing && !initialData.thumbnail && (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add an image
            </>
          )}

          {!isEditing && initialData.thumbnail && (
            <>
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.thumbnail ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <PhotoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="upload"
              className="rounded-md object-cover"
              src={initialData.thumbnail}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              priority
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload endpoint="courseThumbnail" onChange={handleFileChange} />
          <div className="mt-4 text-xs text-muted-foreground">
            16:4 aspect ratio recommended
          </div>
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
