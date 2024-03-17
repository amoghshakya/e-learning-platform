"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { bricolage } from "@/app/fonts";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { createCourse } from "@/lib/instructor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function CreateCourse() {
  const { toast } = useToast();
  const initialState = {
    fieldErrors: {},
    errorMessage: null,
    successMessage: null,
  };
  const [messages, dispatch] = useFormState(createCourse, initialState);

  useEffect(() => {
    if (messages.errorMessage) {
      toast({
        title: "Error",
        description: messages.errorMessage,
        variant: "destructive",
      });
    }
    if (messages.successMessage) {
      toast({
        title: "Success",
        description: messages.successMessage,
      });
      redirect(`/instructor/courses/${messages.course_id}`);
    }
  }, [messages]);

  return (
    <main className="flex">
      <form action={dispatch}>
        <h3 className={`text-3xl font-bold ${bricolage.className}`}>
          What will your name your course?
        </h3>
        <div>
          <Label htmlFor="title">Course title</Label>
          <Input
            name="title"
            placeholder="E.g. Python for Data Analysis"
            type="text"
            id="title"
          />
        </div>
        <div>
          <Label htmlFor="description">Course description</Label>
          <Textarea
            name="description"
            placeholder="E.g. This Python data science course will take you from knowing nothing about Python to coding and analyzing data with Python using tools like Pandas, NumPy, and Matplotlib."
            id="description"
            rows={4}
          />
        </div>
        <Button
          type="reset"
          variant="ghost"
          onClick={() => redirect("/instructor/courses")}
        >
          Cancel
        </Button>
        <CreateButton />
      </form>
    </main>
  );
}

function CreateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      Create course
    </Button>
  );
}
