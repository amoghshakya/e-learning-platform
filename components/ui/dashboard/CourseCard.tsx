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
      <Card className="mt-2 h-fit w-full gap-x-2 p-3 md:grid md:grid-cols-[140px,1fr,120px] md:grid-rows-[fit-content,min-content] md:justify-start">
        <div className="relative flex items-center justify-center overflow-hidden rounded transition md:col-start-1 md:row-span-2 md:row-start-1 md:h-max">
          <Image
            src={course.thumbnail ?? "/static/logo.svg"}
            alt="thumbnail"
            height={80}
            width={80}
            className="aspect-video h-fit w-full rounded object-cover md:aspect-square"
            priority
          />
        </div>
        <CardHeader className="w-full overflow-hidden md:col-start-2 md:row-span-1">
          <CardTitle className="peer w-full hover:text-sky-800 hover:underline">
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
          </CardTitle>
          <CardDescription className="line-clamp-2 w-full peer-hover:underline">
            <Link href={`/courses/${course.id}`}>{course.description}</Link>
          </CardDescription>
          <p className="text-xs text-gray-500">by {instructor}</p>
        </CardHeader>

        <CardFooter className="w-full md:col-start-2 md:row-start-2">
          <div className="flex w-full grow items-center justify-center gap-1">
            <p className="mr-1 text-xs">Progress: </p>
            <Progress value={userProgress} className="flex-grow" />
            <p className="text-xs md:mx-1">{userProgress}%</p>
          </div>
        </CardFooter>
        {isDashboardRoute && (
          <CardContent className="group flex w-fit items-center gap-2 border-l-slate-400 *:text-gray-700 md:col-start-3 md:row-span-2 md:my-8 md:block md:w-40 md:border-l">
            {!nextLesson ? (
              <></>
            ) : (
              <div className="pr-4">
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
                  <p className="line-clamp-2 break-words text-xs">
                    {nextLesson?.title ?? "Next lesson"}
                  </p>
                </Link>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    );
  }
}
