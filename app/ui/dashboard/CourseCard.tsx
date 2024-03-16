import {
  getCourseDetails,
  getInstructor,
  getUserEnrolledCourses,
} from "@/lib/courses";
import { Course, Enrollment } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

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
    instructor = await getInstructor(course.instructor_id);
    return (
      <div className="flex h-fit flex-wrap gap-1 rounded-md bg-slate-200 p-3 shadow md:grid md:w-full md:grid-cols-[fit-content,1fr,1fr] md:grid-rows-[min-content,.5fr,min-content] md:flex-nowrap">
        {/* Course thumbnail */}
        <Image
          src="/static/snoopy.jpg"
          width={100}
          height={100}
          alt="thumbnail"
          className="aspect-video h-fit w-full rounded object-cover md:col-start-1 md:row-span-3 md:mr-3 md:aspect-square md:h-max md:w-fit"
          priority
        />

        {/* Course title and description */}
        <div className="w-fit overflow-hidden md:col-start-2 md:row-start-2">
          <h3 className={`text-lg font-semibold`}>{course.title}</h3>
          <p
            className="text-ellipsis text-sm"
            title={course.description.slice(0, 30)}
          >
            {course.description}
          </p>
        </div>

        {/* Course instructor */}
        <p className="my-1 text-xs text-gray-600 md:col-start-2 md:row-start-1">
          {instructor}
        </p>

        {/* Course progress */}
        <div
          className="flex w-full items-center justify-center md:col-start-2 md:row-start-3"
          title={`Progress: ${enrollment.progress}%`}
        >
          <p className="mr-1 text-xs">Progress</p>
          <div className="mx-2 w-full rounded bg-gray-300">
            <div
              className="h-2 rounded bg-gradient-to-r from-accent-500 to-primary-700"
              style={{ width: `${enrollment.progress}%` }}
            ></div>
          </div>
          <p className="text-xs md:m-1">{`${enrollment.progress}%`}</p>
        </div>

        {isDashboardRoute && (
          <div className="col-start-3 row-span-3 hidden border-l-[1px] border-slate-400 p-3 md:mx-2 md:block">
            <Link href="">
              <h3 className="peer text-sm ">Next up</h3>
              <p className="text-sm hover:underline peer-hover:underline">
                Next lesson
              </p>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
