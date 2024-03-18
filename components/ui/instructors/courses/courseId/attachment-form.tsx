"use client";

import { Button } from "@/components/ui/button";
import { Attachment, Course } from "@prisma/client";
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

interface AttachmentFormProps {
  initialData: { Attachment: Attachment[] } & Course;
  courseId: string;
}

export function AttachmentForm({ initialData, courseId }: AttachmentFormProps) {
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
      // TODO: UPDATE DATABASE WITH ATTACHMENTS
    }
  };

  return (
    <div
      className={`${inter.className} mt-6 border bg-slate-100 rounded-md p-4 shadow`}
    >
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && (
            <>
              <Cross1Icon className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}

          {!isEditing && (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData.Attachment.length === 0 && (
            <p className="text-sm mt-2 text-slate-400 italic">
              No attachments yet
            </p>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload endpoint="courseAttachment" onChange={handleFileChange} />
          <div className="text-xs text-muted-foreground mt-4">
            Add resources that are necessary for the course
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
