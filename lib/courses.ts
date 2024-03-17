"use server";

import { auth } from "@/auth";
import prisma from "./prisma";
import { getUserById } from "./actions";
import { unstable_noStore as noStore } from "next/cache";

export async function getUserEnrolledCourses() {
  const session = await auth();
  try {
    const enrolledCourses = await prisma.enrollment.findMany({
      where: {
        user_id: session?.user.id,
      },
      orderBy: {
        last_accessed: "asc",
      },
    });

    console.log(enrolledCourses);

    return enrolledCourses;
  } catch (err) {
    throw err;
  }
}

export async function getCompletedCourses() {
  noStore();
  const enrollments = await getUserEnrolledCourses();
  return enrollments.filter((enrollment) => enrollment.progress === 100);
}

export async function getInProgressCourses() {
  noStore();
  const enrollments = await getUserEnrolledCourses();
  return enrollments.filter((enrollment) => enrollment.progress < 100);
}

export async function getCourseDetails(courseId: string) {
  noStore();
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

export async function getInstructor(instructorId: string | null | undefined) {
  if (!instructorId) return null;
  try {
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: instructorId,
      },
    });
    if (instructor) {
      const user = await getUserById(instructor.user_id);

      return user?.name;
    }

    return "";
  } catch (err) {
    throw err;
  }
}
