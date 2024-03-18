"use server";

import { z } from "zod";
import prisma from "./prisma";

type State = {
  fieldErrors?: {
    title?: string[] | null;
    description?: string[] | null;
  };
  errorMessage?: string | null;
  successMessage?: string | null;
  course_id?: string;
};

const CreateCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
});

export async function createCourse(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateCourseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) return { errorMessage: "Invalid fields" };
  const { title, description } = validatedFields.data;

  try {
    const course = await prisma.course.create({
      data: {
        title: title,
        description: description,
      },
    });

    if (course)
      return {
        successMessage: "Course created successfully!",
        course_id: course.id,
      };

    return {
      errorMessage: "Something went wrong.",
    };
  } catch (err) {
    throw err;
  }
}

type UpdateTitleState = {
  data: {
    courseId: string;
    courseTitle: string;
  };
  errorMessage?: string | null;
  successMessage?: string | null;
};

export async function updateCourseTitle(
  prevState: UpdateTitleState,
  formData: FormData
): Promise<UpdateTitleState> {
  const validatedFields = z
    .object({
      title: z.string().min(1, "Title is required"),
    })
    .safeParse({
      title: formData.get("title"),
    });

  if (!validatedFields.success)
    return {
      data: {
        courseId: prevState.data.courseId,
        courseTitle: prevState.data.courseTitle,
      },
      errorMessage: "Invalid fields",
    };
  const { title: newTitle } = validatedFields.data;

  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: prevState.data.courseId,
      },
      data: {
        title: newTitle,
      },
    });

    if (updatedCourse)
      return {
        data: {
          courseId: prevState.data.courseId,
          courseTitle: newTitle,
        },
        successMessage: "Successfully updated the course title.",
      };
    else
      return {
        data: {
          courseId: prevState.data.courseId,
          courseTitle: prevState.data.courseTitle,
        },
        errorMessage: "Failed to update the course title.",
      };
  } catch (err) {
    throw err;
  }
}

type UpdateDescriptionState = {
  data: {
    courseId: string;
    courseDescription: string;
  };
  errorMessage?: string | null;
  successMessage?: string | null;
};

export async function updateCourseDescription(
  prevState: UpdateDescriptionState,
  formData: FormData
): Promise<UpdateDescriptionState> {
  const validatedFields = z
    .object({
      description: z
        .string()
        .max(300, "Description should be maximum of 300 character"),
    })
    .safeParse({
      description: formData.get("description"),
    });

  if (!validatedFields.success)
    return {
      data: {
        courseId: prevState.data.courseId,
        courseDescription: prevState.data.courseDescription,
      },
      errorMessage: "Invalid fields",
    };
  const { description: description } = validatedFields.data;

  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: prevState.data.courseId,
      },
      data: {
        description: description,
      },
    });

    if (updatedCourse)
      return {
        data: {
          courseId: prevState.data.courseId,
          courseDescription: description,
        },
        successMessage: "Successfully updated the course description.",
      };
    else
      return {
        data: {
          courseId: prevState.data.courseId,
          courseDescription: prevState.data.courseDescription,
        },
        errorMessage: "Failed to update the course description.",
      };
  } catch (err) {
    throw err;
  }
}

export async function updateCourseThumbnail(
  courseId: string,
  thumbnailURL: string
) {
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        thumbnail: thumbnailURL,
      },
    });

    if (updatedCourse) return true;
    else return false;
  } catch (err) {
    throw err;
  }
}
