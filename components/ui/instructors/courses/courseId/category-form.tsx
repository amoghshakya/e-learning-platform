"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { heading, body } from "@/app/fonts";
import { Combobox } from "@/components/ui/combobox";
import { updateCourseCategory } from "@/lib/categories";

export function CategoryForm({
  initialData,
  courseId,
  options,
}: {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedOption = options.find(
    (option) => option.value === initialData.category_id,
  );

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
      router.refresh();
      toast({
        title: errorMessage,
        description: "Something went wrong. Please try again later!",
        variant: "destructive",
      });
      setErrorMessage("");
    }
  }, [successMessage, errorMessage, router, toast]);

  const handleCategorySelection = async (categoryId: string) => {
    if (categoryId) {
      const updatedCourse = await updateCourseCategory(courseId, categoryId);
      if (updatedCourse) {
        setSuccessMessage("Course category updated");
      } else {
        setErrorMessage("Failed to update course category");
      }
    }
  };

  return (
    <div
      className={`${body.className} mt-6 border bg-slate-100 rounded-md p-4 shadow`}
    >
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <XMarkIcon className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p
          className={clsx("text-sm mt-2", {
            "text-slate-500 italic": !initialData.category_id,
          })}
        >
          {selectedOption?.label || "No category"}
        </p>
      )}

      {isEditing && (
        <form action="">
          <Label htmlFor="category" hidden aria-hidden>
            Course category
          </Label>
          <Combobox
            options={[...options]}
            onChange={handleCategorySelection}
            value={initialData.category_id ?? ""}
          />
        </form>
      )}
    </div>
  );
}
