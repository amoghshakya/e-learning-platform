"use server";

import { auth } from "@/auth";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export async function getUserEnrolledCourses() {
  const session = await auth();
  try {
    const enrolledCourses = await prisma.enrollment.findMany({
      where: {
        user_id: session?.user.id,
      },
      select: {
        id: true,
        course_id: true,
        progress: true,
        completed_at: true,
        enrolled_at: true,
        last_accessed: true,
      },
    });

    console.log(enrolledCourses);

    return enrolledCourses;
  } catch (err) {
    throw err;
  }
}

export async function getCourseDetails(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    return course;
  } catch (err) {
    throw err;
  }
}
