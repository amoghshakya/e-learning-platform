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
} from "@/lib/courses";
import { Enrollment } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export async function CourseCard({
  enrollment,
  isDashboardRoute,
}: {
  enrollment: Enrollment;
  isDashboardRoute?: boolean;
}) {
  const course = await getCourseDetails(enrollment.course_id);
  if (course) {
    const instructor = await getInstructorName(course.instructor_id);

    const nextLesson = await getNextLesson(
      enrollment.course_id,
      enrollment.user_id,
    );

    return (
      <Card className="mt-2 items-center justify-start gap-x-2 md:grid md:w-[55vw] md:grid-cols-[100px,1fr,min-content] md:grid-rows-[fit-content,min-content]">
        <div className="mx-4 h-fit w-full rounded md:col-start-1 md:row-span-2 md:row-start-1 md:h-max">
          <Image
            src={course.thumbnail ?? "/static/favioc.png"}
            alt="thumbnail"
            height={100}
            width={100}
            className="aspect-video rounded object-cover md:aspect-square"
            priority
          />
        </div>
        <CardHeader className="flex-grow overflow-hidden md:col-start-2 md:row-span-1">
          <CardTitle className="peer hover:text-sky-800 hover:underline">
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
          </CardTitle>
          <CardDescription className="line-clamp-2 peer-hover:underline">
            <Link href={`/courses/${course.id}`}>{course.description}</Link>
          </CardDescription>
          <p className="text-xs text-gray-500">{instructor}</p>
        </CardHeader>
        {isDashboardRoute && (
          <CardContent className="group my-8 hidden border-l border-l-slate-400 *:text-gray-700 md:col-start-3 md:row-span-2 md:block md:w-40">
            <Link href="" className="group-hover:underline">
              <p className="font-bold">Next up</p>
            </Link>
            <Link
              href={`/courses/${course.id}/lessons/${nextLesson?.id}`}
              className="group-hover:underline"
            >
              <p className="break-words text-xs">
                {nextLesson?.title ?? "Next lesson"}
              </p>
            </Link>
          </CardContent>
        )}
        <CardFooter className="flex items-center justify-center gap-1 md:col-start-2 md:row-start-2">
          <p className="mr-1 text-xs">Progress: </p>
          <Progress value={enrollment.progress} />
          <p className="text-xs md:m-1">{enrollment.progress}%</p>
        </CardFooter>
      </Card>
    );
  }
}
