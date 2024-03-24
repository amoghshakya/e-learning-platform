"use server";

import { auth } from "@/auth";
import prisma from "./prisma";
import { getUserById } from "./actions";
import { unstable_noStore as noStore } from "next/cache";
import { Category, Course, Enrollment, Lesson } from "@prisma/client";

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

export async function getInstructorName(
  instructorId: string | null | undefined,
) {
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

export async function getUserProgress(userId?: string, courseId?: string) {
  if (!userId || !courseId) return null;
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId,
        },
      },
      select: {
        progress: true,
        completedLessons: true,
      },
    });

    const courseLessons = await prisma.lesson.findMany({
      where: {
        course_id: courseId,
      },
    });

    const totalLessons = courseLessons.length;

    if (enrollment && totalLessons) {
      const progress = enrollment.completedLessons / totalLessons;
      if (progress) return progress;
      return 0;
    } else {
      return null;
    }
  } catch (err) {
    console.log("User progress: ", err);
    return null;
  }
}

type CourseExtended = Course & {
  lessons: { id: string }[];
  category: Category | null;
  enrollments: Enrollment[] | null;
  progress: number | null;
};

export async function getCourses({
  userId,
  title,
  categoryId,
}: {
  userId?: string;
  title?: string;
  categoryId?: string;
}): Promise<CourseExtended[]> {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        category_id: categoryId,
      },
      include: {
        lessons: {
          select: {
            id: true,
          },
        },
        category: true,
        enrollments: {
          where: {
            user_id: userId,
          },
        },
      },
    });

    const coursesWithProgress = Promise.all(
      courses.map(async (course) => {
        if (course.enrollments.length === 0) {
          return { ...course, progress: null };
        }

        const userProgress = await getUserProgress(userId, course.id);

        return { ...course, progress: userProgress };
      }),
    );

    return coursesWithProgress;
  } catch (err) {
    console.log("getCourses: ", err);
    return [];
  }
}

export async function enrollCourse(courseId?: string, userId?: string) {
  if (!courseId || !userId) {
    return null;
  }
  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        user_id: userId,
        course_id: courseId,
        progress: 0,
        completedLessons: 0,
      },
    });

    if (enrollment) return enrollment;

    return null;
  } catch (err) {
    throw err;
  }
}

export async function getNextLesson(courseId?: string, userId?: string) {
  if (!courseId || !userId) {
    return null;
  }
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        enrollments: true,
        lessons: {
          where: {
            course_id: courseId,
          },
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            title: true,
            position: true,
          },
        },
      },
    });

    if (course) {
      const enrollment = course.enrollments[0];

      if (enrollment) {
        const nextLesson = course.lessons.filter(
          (lesson) => lesson.position === enrollment.progress + 1,
        );
        if (nextLesson) {
          return nextLesson[0];
        }
      }
    }
    return null;
  } catch (err) {
    throw err;
  }
}

export async function updateCourseProgress(
  courseId?: string,
  lessonId?: string,
  userId?: string,
) {
  if (!courseId || !lessonId || !userId) return null;
  try {
    const currentProgress = await prisma.enrollment.findUnique({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId,
        },
      },
      select: {
        progress: true,
        completedLessons: true,
      },
    });

    if (!currentProgress) return null;

    const currentLesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
        course_id: courseId,
        position: currentProgress.progress,
      },
      select: {
        position: true,
      },
    });

    // first lesson
    if (!currentLesson) {
      const enrollmentProgress = await prisma.enrollment.update({
        where: {
          user_id_course_id: {
            user_id: userId,
            course_id: courseId,
          },
        },
        data: {
          progress: currentProgress.progress + 1,
        },
      });

      return enrollmentProgress;
    } else {
      const enrollmentProgress = await prisma.enrollment.update({
        where: {
          user_id_course_id: {
            user_id: userId,
            course_id: courseId,
          },
        },
        data: {
          progress: currentLesson.position + 1,
        },
      });
      return enrollmentProgress;
    }

    return null;
  } catch (err) {
    throw err;
  }
}
