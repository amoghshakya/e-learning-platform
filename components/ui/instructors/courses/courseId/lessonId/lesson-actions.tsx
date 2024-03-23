"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import { deleteLesson } from "@/lib/instructor";
import { TrashIcon } from "@heroicons/react/24/outline";
import { redirect, useRouter } from "next/navigation";

interface Props {
  courseId: string;
  lessonId: string;
}

export default function LessonActions({ courseId, lessonId }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const onDelete = async () => {
    try {
      const result = await deleteLesson(lessonId, courseId);

      if (result) {
        toast({
          title: "Lesson deleted.",
          description: "Successfully deleted the lesson",
        });
        router.push(`/instructors/courses/${courseId}/`);
      } else {
        toast({
          title: "Failed to delete the lesson",
          description: "Something went wrong...",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: "Failed to delete the lesson",
        variant: "destructive",
      });
      throw err;
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="destructive" className="shadow" size="sm">
          <TrashIcon className="mr-2 h-4 w-4 text-white" />
          Delete lesson
        </Button>
      </ConfirmModal>
    </div>
  );
}
