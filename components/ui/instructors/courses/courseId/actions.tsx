"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteCourse, publishCourse, unpublishCourse } from "@/lib/instructor";
import { EyeIcon, EyeSlashIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface Props {
  courseId: string;
  disabled: boolean;
  isPublished: boolean;
}

export default function Actions({ courseId, disabled, isPublished }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const onDelete = async () => {
    try {
      const result = await deleteCourse(courseId);

      if (result) {
        toast({
          title: "Course deleted.",
        });
        router.push(`/instructors/courses/`);
      } else {
        toast({
          title: "Failed to delete the course",
          description: "Something went wrong...",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Fatal error",
        description: "Failed to delete the course",
        variant: "destructive",
      });
      throw err;
    }
  };

  const onPublish = async () => {
    try {
      if (!isPublished) {
        const result = await publishCourse(courseId);
        if (result) {
          toast({
            title: "Course published",
            description:
              "Your course is now accessible to the public for enrollment.",
          });
          router.refresh();
        } else {
          toast({
            title: "Error",
            description:
              "Something went wrong while trying to publish your course",
            variant: "destructive",
          });
          router.refresh();
        }
      } else {
        const result = await unpublishCourse(courseId);
        if (result) {
          toast({
            title: "Course unpublished",
            description: "Your course is now hidden to the public",
          });
          router.refresh();
        } else {
          toast({
            title: "Error",
            description:
              "Something went wrong while trying to unpublish your course",
            variant: "destructive",
          });
          router.refresh();
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="shadow"
        onClick={onPublish}
        disabled={disabled}
        aria-disabled={disabled}
        
      >
        {isPublished ? (
          <>
            <EyeSlashIcon className="mr-2 h-4 w-4" />
            Unpublish
          </>
        ) : (
          <>
            <EyeIcon className="mr-2 h-4 w-4" />
            Publish
          </>
        )}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="destructive" className="shadow" size="sm">
          <TrashIcon className="mr-2 h-4 w-4 text-white" />
          Delete course
        </Button>
      </ConfirmModal>
    </div>
  );
}
