"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Cross1Icon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { bricolage, inter } from "@/app/fonts";
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
      toast({
        title: successMessage,
      });
      setIsEditing(false);
    }
    if (errorMessage) {
      toast({
        title: errorMessage,
        variant: "destructive",
      });
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
      className={`${inter.className} mt-6 border bg-slate-100 rounded-md p-4 shadow`}
    >
      <div className="font-medium flex items-center justify-between">
        Course thumbnail
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && (
            <>
              <Cross1Icon className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}

          {!isEditing && !initialData.thumbnail && (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}

          {!isEditing && initialData.thumbnail && (
            <>
              <Pencil1Icon className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.thumbnail ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <PhotoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md"
              src={initialData.thumbnail}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload endpoint="courseThumbnail" onChange={handleFileChange} />
          <div className="text-xs text-muted-foreground mt-4">
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
