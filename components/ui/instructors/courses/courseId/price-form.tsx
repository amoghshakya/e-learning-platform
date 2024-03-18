"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateCourseDescription, updateCoursePrice } from "@/lib/instructor";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { bricolage, inter } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

export function PriceForm({
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
      coursePrice: Number(initialData.price),
    },
    errorMessage: null,
    successMessage: null,
  };
  const [messages, dispatch] = useFormState(updateCoursePrice, initialState);

  useEffect(() => {
    setIsEditing((current) => !current);
    router.refresh();
    if (messages.errorMessage)
      toast({
        title: "Failed to update price",
        description: messages.errorMessage,
        variant: "destructive",
      });

    if (messages.successMessage)
      toast({
        title: "Price updated",
        description: messages.successMessage,
      });
  }, [messages]);

  return (
    <div
      className={`${inter.className} mt-3 border bg-slate-100 rounded-md p-4 shadow`}
    >
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <Cross1Icon className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Pencil1Icon className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <>
          <form action={dispatch}>
            <Label htmlFor="description" hidden>
              Price
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder={`$${initialData.price}`}
              className="mt-2"
              id="price"
              name="price"
            />
            <div className="flex items-center gap-x-2 mt-2">
              <SaveButton />
            </div>
          </form>
        </>
      ) : (
        <p
          className={clsx("text-sm mt-2 px-3 font-medium", {
            "italic text-slate-500": !Number(initialData.price),
          })}
        >
          {Number(initialData.price)
            ? formatPrice(Number(initialData.price))
            : "Free"}
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
