import { auth } from "@/auth";
import {
  enrollCourse,
  getInstructorName,
  getUserProgress,
} from "@/lib/courses";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { body, heading } from "@/app/fonts";
import Image from "next/image";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import EnrollButton from "@/components/ui/courses/[courseId]/enroll-button";

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await auth();
  const userId = session?.user.id;

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      lessons: {
        orderBy: {
          position: "asc",
        },
      },
      enrollments: {
        where: {
          user_id: userId,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const instructor = await getInstructorName(course?.instructor_id);

  if (!course) return redirect("/");

  const progress = await getUserProgress(userId, params.courseId);
  const isEnrolled = course.enrollments.length !== 0;

  return (
    <main className="overflow-clip">
      <div className="grid grid-cols-1 grid-rows-3 gap-6 overflow-x-clip bg-slate-50 md:grid-cols-2">
        <section className="relative col-span-1 row-start-1 h-[300px] w-screen shadow-inner md:col-span-2">
          <Image
            src={course.thumbnail!}
            alt={course.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            fill
          />
        </section>
        <div className="flex flex-col gap-y-4 bg-slate-50 pl-24">
          <div className="flex flex-col">
            <h1
              className={`${body.className} text-2xl font-semibold md:text-3xl`}
            >
              {course.title}
            </h1>
            <span className="text-xs text-muted-foreground">
              by {instructor}
            </span>
            <span className="text-xs text-slate-500">
              {course.category?.name}
            </span>
          </div>

          <div className="md:col-start-1">
            <p className="text-sm">{course.description}</p>
          </div>
          <div>
            {isEnrolled ? (
              <div className="w-1/2">
                <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                  Progress
                  <Progress value={progress} />
                  {progress}%
                </div>
                <Link href="/dashboard">
                  <Button variant="ghost" className="hover:shadow">
                    Continue
                  </Button>
                </Link>
              </div>
            ) : (
              <EnrollButton
                courseId={course.id}
                userId={userId}
                price={Number(course.price)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-4 space-y-3 bg-slate-50 pr-16 md:col-start-2">
          <h3 className="text-xl font-medium md:text-xl">Course contents</h3>
          <div className="flex flex-col gap-y-2 rounded-md border border-slate-200 bg-slate-100 p-2 text-sm shadow">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex cursor-pointer items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 p-2 text-sm text-slate-700 hover:bg-slate-300/60 hover:underline"
              >
                <BookOpenIcon className="mr-2 h-4 w-4" />
                {lesson.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
