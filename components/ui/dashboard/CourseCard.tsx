import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  getCourseDetails,
  getInstructorName,
  getNextLesson,
  getUserProgress,
} from "@/lib/courses";
import { Enrollment } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function CourseCard({
  enrollment,
  isDashboardRoute,
}: {
  enrollment: Enrollment;
  isDashboardRoute?: boolean;
}) {
  const session = await auth();
  let userId;
  if (session?.user.id) {
    userId = session.user.id;
  } else {
    return redirect("/");
  }
  const course = await getCourseDetails(enrollment.course_id);
  if (course) {
    const instructor = await getInstructorName(course.instructor_id);

    const nextLesson = await getNextLesson(
      enrollment.course_id,
      enrollment.user_id,
    );

    const userProgress = await getUserProgress(userId, course.id);

    return (
      <Card className="mt-2 h-full justify-start gap-x-2 p-3 md:grid md:w-[55vw] md:grid-cols-[fit-content,1fr,min-content] md:grid-rows-[fit-content,min-content]">
        <div className="relative w-full flex-grow justify-center overflow-hidden rounded transition md:col-start-1 md:row-span-2 md:row-start-1 md:mx-4 md:h-max">
          <Image
            src={course.thumbnail ?? "/static/favioc.png"}
            alt="thumbnail"
            height={100}
            width={100}
            className="aspect-video h-fit w-full rounded object-cover md:aspect-square"
            priority
          />
        </div>
        <CardHeader className="overflow-hidden md:col-start-2 md:row-span-1">
          <CardTitle className="peer hover:text-sky-800 hover:underline">
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
          </CardTitle>
          <CardDescription className="line-clamp-2 peer-hover:underline">
            <Link href={`/courses/${course.id}`}>{course.description}</Link>
          </CardDescription>
          <p className="text-xs text-gray-500">{instructor}</p>
        </CardHeader>

        <CardFooter className="flex items-center justify-center gap-1 md:col-start-2 md:row-start-2">
          <p className="mr-1 text-xs">Progress: </p>
          <Progress value={userProgress} />
          <p className="text-xs md:mx-1">{userProgress}%</p>
        </CardFooter>
        {isDashboardRoute && (
          <CardContent className="group flex items-center gap-2 border-l-slate-400 *:text-gray-700 md:col-start-3 md:row-span-2 md:my-8 md:block md:w-40 md:border-l">
            {!nextLesson ? (
              <></>
            ) : (
              <>
                <Link
                  href={`/courses/${course.id}/lessons/${nextLesson.id}`}
                  className="group-hover:underline"
                >
                  <p className="font-bold">Next up</p>
                </Link>
                <Link
                  href={`/courses/${course.id}/lessons/${nextLesson.id}`}
                  className="group-hover:underline"
                >
                  <p className="break-words text-xs">
                    {nextLesson?.title ?? "Next lesson"}
                  </p>
                </Link>
              </>
            )}
          </CardContent>
        )}
      </Card>
    );
  }
}
