"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { bricolage, inter } from "@/app/fonts";
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
    (option) => option.value === initialData.category_id
  );

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
        description: "Something went wrong. Please try again later!",
        variant: "destructive",
      });
    }
  }, [successMessage, errorMessage]);

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
      className={`${inter.className} mt-6 border bg-slate-100 rounded-md p-4 shadow`}
    >
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <Cross1Icon className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Pencil1Icon className="h-4 w-4 mr-2" />
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
            value={selectedOption?.label}
          />
        </form>
      )}
    </div>
  );
}
