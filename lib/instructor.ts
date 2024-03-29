/**
 * These are instructor actions aka Actions only an instructor can perform
 * These include creating courses, updating their properties (title, description, price?, category)
 * and so on
 */

"use server";

import { z } from "zod";
import prisma from "./prisma";
import { auth } from "@/auth";
import {
  getInstructorDetails,
  getLoggedInInstructor,
  isLoggedInInstructor,
} from "./actions";
import { NextResponse } from "next/server";
import { Course, Lesson } from "@prisma/client";
import { getCourseDetails } from "./courses";

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
  formData: FormData,
): Promise<State> {
  const validatedFields = CreateCourseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) return { errorMessage: "Invalid fields" };
  const { title, description } = validatedFields.data;

  try {
    const session = await auth();
    if (session) {
      const instructor = await prisma.instructor.findUnique({
        where: {
          user_id: session.user.id,
        },
        select: {
          id: true,
        },
      });

      if (instructor) {
        const course = await prisma.course.create({
          data: {
            title: title,
            description: description,
            instructor_id: instructor.id,
          },
        });

        if (course)
          return {
            successMessage: "Course created successfully!",
            course_id: course.id,
          };

        return {
          errorMessage: "Failed to create a course.",
        };
      }

      return {
        errorMessage: "You are not an instructor.",
      };
    }
    return {
      errorMessage: "Please log in to create a course.",
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
  formData: FormData,
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
    courseDescription?: string | null;
  };
  errorMessage?: string | null;
  successMessage?: string | null;
};

export async function updateCourseDescription(
  prevState: UpdateDescriptionState,
  formData: FormData,
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
  thumbnailURL: string,
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

type UpdatePriceState = {
  data: {
    courseId: string;
    coursePrice: number;
  };
  errorMessage?: string | null;
  successMessage?: string | null;
};

const coursePriceSchema = z.object({
  price: z.coerce.number(),
});

export async function updateCoursePrice(
  prevState: UpdatePriceState,
  formData: FormData,
): Promise<UpdatePriceState> {
  const validatedFields = coursePriceSchema.safeParse({
    price: formData.get("price"),
  });

  if (!validatedFields.success) {
    return {
      data: { ...prevState.data },
      errorMessage: "Invalid fields",
    };
  }

  const { price: newPrice } = validatedFields.data;

  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: prevState.data.courseId,
      },
      data: {
        price: newPrice,
      },
    });

    if (updatedCourse) {
      return {
        data: {
          courseId: prevState.data.courseId,
          coursePrice: newPrice,
        },
        successMessage: "Price updated successfully",
      };
    } else {
      return {
        data: {
          ...prevState.data,
        },
        errorMessage: "Failed to update the price",
      };
    }
  } catch (err) {
    throw err;
  }
}

export async function addAttachments(courseId: string, attachmentURL: string) {
  if (!attachmentURL || !courseId) return;
  const isUserInstructor = await isLoggedInInstructor();
  if (!isUserInstructor) return;

  try {
    const instructor = await getLoggedInInstructor();
    if (instructor) {
      const courseOwner = await prisma.course.findUnique({
        where: {
          id: courseId,
          instructor_id: instructor?.id,
        },
      });

      if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const attachment = await prisma.attachment.create({
        data: {
          url: attachmentURL,
          name: attachmentURL.split("/").pop() ?? "Attachment",
          course_id: courseId,
        },
      });

      return true;
    }
  } catch (err) {
    throw err;
  }
}

export async function deleteAttachment(attachmentId: string, courseId: string) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return;
  try {
    const attachment = await prisma.attachment.delete({
      where: {
        id: attachmentId,
        course_id: courseId,
      },
    });

    return attachment;
  } catch (error) {
    throw error;
  }
}

type CreateLessonState = {
  data: {
    courseId: string;
    courseLesson: Lesson[];
  };
  errorMessage?: string | null;
  successMessage?: string | null;
};

export async function createLesson(
  prevState: CreateLessonState,
  formData: FormData,
): Promise<CreateLessonState> {
  const isUserInstructor = await isLoggedInInstructor();
  if (!isUserInstructor) {
    return {
      data: prevState.data,
      errorMessage: "Not authorized to create a lesson",
    };
  }

  const validatedFields = z
    .object({
      title: z.string().min(1, "Title is required"),
    })
    .safeParse({
      title: formData.get("title"),
    });

  if (!validatedFields.success) {
    return {
      data: prevState.data,
      errorMessage: "Invalid title",
    };
  }

  const { title: lessonTitle } = validatedFields.data;

  try {
    const lastChapter = await prisma.lesson.findFirst({
      where: {
        course_id: prevState.data.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const lesson = await prisma.lesson.create({
      data: {
        title: lessonTitle,
        position: newPosition,
        course_id: prevState.data.courseId,
      },
    });

    if (lesson) {
      const allLessons = await prisma.lesson.findMany({
        where: {
          course_id: prevState.data.courseId,
        },
        orderBy: {
          position: "asc",
        },
      });
      return {
        data: {
          courseId: prevState.data.courseId,
          courseLesson: allLessons,
        },
        successMessage:
          "Successfully added a lesson. Please add more information to the lesson.",
      };
    } else {
      return {
        data: prevState.data,
        errorMessage: "Something went wrong",
      };
    }
  } catch (err) {
    throw err;
  }
}

export async function onReorderLesson(
  updateData: { id: string; position: number }[],
) {
  const isUserInstructor = await isLoggedInInstructor();
  if (!isUserInstructor) return;
  const instructor = await getLoggedInInstructor();

  let updatedLesson;
  for (let item of updateData) {
    updatedLesson = await prisma.lesson.update({
      where: {
        id: item.id,
      },
      data: {
        position: item.position,
      },
    });
  }

  if (updatedLesson) return true;
  return false;
}

type LessonTitleState = {
  data: {
    courseId: string;
    lessonId: string;
    lessonTitle: string;
  };
  errorMessage?: string | null;
  successMessage?: string | null;
};

export async function updateLessonTitle(
  prevState: LessonTitleState,
  formData: FormData,
): Promise<LessonTitleState> {
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
        lessonId: prevState.data.lessonId,
        lessonTitle: prevState.data.lessonTitle,
      },
      errorMessage: "Invalid fields",
    };
  const { title: newTitle } = validatedFields.data;

  try {
    const updatedCourse = await prisma.lesson.update({
      where: {
        id: prevState.data.lessonId,
        course_id: prevState.data.courseId,
      },
      data: {
        title: newTitle,
      },
    });

    if (updatedCourse)
      return {
        data: {
          courseId: prevState.data.courseId,
          lessonId: prevState.data.lessonId,
          lessonTitle: newTitle,
        },
        successMessage: "Successfully updated the course title.",
      };
    else
      return {
        data: prevState.data,
        errorMessage: "Failed to update the course title.",
      };
  } catch (err) {
    throw err;
  }
}

type LessonDescriptionState = {
  data: {
    courseId: string;
    lessonId: string;
    lessonDescription: string | null;
  };
  errorMessage?: string | null;
  successMessage?: string | null;
};

export async function updateLessonDescription(
  prevState: LessonDescriptionState,
  formData: FormData,
): Promise<LessonDescriptionState> {
  const validatedFields = z
    .object({
      description: z.string(),
    })
    .safeParse({
      description: formData.get("description"),
    });

  if (!validatedFields.success)
    return {
      data: prevState.data,
      errorMessage: "Invalid fields",
    };
  const { description: description } = validatedFields.data;

  try {
    const updatedLesson = await prisma.lesson.update({
      where: {
        id: prevState.data.lessonId,
        course_id: prevState.data.courseId,
      },
      data: {
        description: description,
      },
    });

    if (updatedLesson)
      return {
        data: {
          courseId: prevState.data.courseId,
          lessonId: prevState.data.lessonId,
          lessonDescription: description,
        },
        successMessage: "Successfully updated description.",
      };
    else
      return {
        data: prevState.data,
        errorMessage: "Failed to update description.",
      };
  } catch (err) {
    throw err;
  }
}

export async function updateLessonVideo(lessonId: string, videoURL: string) {
  try {
    const updatedLesson = await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        video_url: videoURL,
      },
    });

    if (updatedLesson) return true;
    else return false;
  } catch (err) {
    throw err;
  }
}

export async function deleteLesson(lessonId: string, courseId: string) {
  const isUserInstructor = await getLoggedInInstructor();
  const course = await getCourseDetails(courseId);
  try {
    const courseOwner = await isUserOwner(courseId);

    if (courseOwner) {
      const result = await prisma.lesson.delete({
        where: {
          id: lessonId,
        },
      });

      return result;
    }
    return null;
  } catch (err) {
    throw err;
  }
}

export async function deleteCourse(courseId: string) {
  const courseOwner = await isUserOwner(courseId);
  try {
    if (courseOwner) {
      const course = await prisma.course.delete({
        where: {
          id: courseId,
        },
      });

      if (course) {
        return course;
      } else {
        return null;
      }
    }
  } catch (err) {
    throw err;
  }
}

export async function isUserOwner(courseId: string) {
  const loggedInInstructor = await getLoggedInInstructor();
  if (!loggedInInstructor) return false;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        instructor_id: loggedInInstructor?.id,
      },
    });

    return !!course;

  } catch (err) {
    throw err;
  }
}

export async function publishCourse(courseId: string) {
  const courseOwner = await isUserOwner(courseId);
  try {
    if (courseOwner) {
      const course = await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: true,
        },
      });

      if (course) return course;
      return null;
    }
  } catch (err) {
    throw err;
  }
}

export async function unpublishCourse(courseId: string) {
  const courseOwner = await isUserOwner(courseId);
  try {
    if (courseOwner) {
      const course = await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });

      if (course) return course;
      return null;
    }
  } catch (err) {
    throw err;
  }
}

export async function getCategory(categoryId: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (category) return category;
    return null;
  } catch (err) {
    throw err;
  }
}
