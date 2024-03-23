"use client";

import { Button } from "@/components/ui/button";
import { Attachment, Course } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { heading, body } from "@/app/fonts";
import { addAttachments, deleteAttachment } from "@/lib/instructor";
import {
  DocumentIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import prisma from "@/lib/prisma";
import { LoadingCircleIcon } from "@/components/loading-spinner";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

export function AttachmentForm({ initialData, courseId }: AttachmentFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        description: "Check the file type before uploading an attachment",
      });
      setErrorMessage("");
    }
  }, [successMessage, errorMessage, router, toast]);

  const handleFileChange = async (url?: string) => {
    if (url) {
      const updatedCourse = await addAttachments(courseId, url);
      if (updatedCourse) {
        setSuccessMessage("Added attachment");
      } else {
        setErrorMessage("Failed to add attachment.");
      }
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const postDeleteReturn = await deleteAttachment(id, courseId);

      if (postDeleteReturn) {
        toast({
          title: "Attachment deleted",
          description: "Attachment deleted successfully.",
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      className={`${body.className} mt-6 border bg-slate-100 rounded-md p-4 shadow`}
    >
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && (
            <>
              <XMarkIcon className="h-4 w-4 mr-2" />
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
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-400 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                  key={attachment.id}
                >
                  <DocumentIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <LoadingCircleIcon className="w-4 h-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition group"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <TrashIcon className="w-4 h-4 group-hover:text-red-800 text-slate-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
