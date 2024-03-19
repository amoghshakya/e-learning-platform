import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourseDetails, getInstructorName } from "@/lib/courses";
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
  let instructor;
  if (course) {
    instructor = await getInstructorName(course.instructor_id);

    return (
      <Card className="md:grid md:w-[55vw] md:grid-cols-[fit-content,1fr,1fr] md:grid-rows-[1fr,min-content]">
        <Image
          src={course.thumbnail ?? "/static/favioc.png"}
          alt="thumbnail"
          width={100}
          height={100}
          className="aspect-video place-self-center md:ml-6 h-fit w-full rounded object-cover md:col-start-1 md:row-span-2 md:aspect-square md:h-max md:w-fit m-1"
          priority
        />
        <CardHeader className="overflow-hidden md:col-start-2 md:row-span-1">
          <CardTitle>{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
          <p className="text-xs text-gray-500">{instructor}</p>
        </CardHeader>
        {isDashboardRoute && (
          <CardContent className="my-8 hidden hover:*:underline md:block border-l border-l-slate-400 md:col-start-3 md:row-span-2 *:text-gray-700">
            <Link href="" className="peer">
              <p className="font-bold">Next up</p>
            </Link>
            <Link href="" className="peer-hover:underline">
              <p className="text-xs">Next lesson</p>
            </Link>
          </CardContent>
        )}
        <CardFooter className="flex gap-1 items-center justify-center md:col-start-2 md:row-start-2">
          <p className="text-xs mr-1">Progress: </p>
          <Progress value={enrollment.progress} />
          <p className="text-xs md:m-1">{enrollment.progress}%</p>
        </CardFooter>
      </Card>
    );
  }
}
