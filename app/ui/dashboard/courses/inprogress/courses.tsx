import {
  getCourseDetails,
  getInProgressCourses,
  getInstructor,
} from "@/lib/courses";
import Image from "next/image";

export async function InProgressCoursesSection() {
  const inProgressEnrollments = await getInProgressCourses();

  const inProgressCourses = await Promise.all(
    inProgressEnrollments.map(async (enrollment) => {
      const courseDetails = await getCourseDetails(enrollment.course_id);
      return courseDetails;
    })
  );

  const instructorDetails = await Promise.all(
    inProgressCourses.map(async (course) => {
      const instructor = await getInstructor(course?.instructor_id);
      return instructor;
    })
  );

  return (
    <>
      {inProgressEnrollments.length ? (
        inProgressEnrollments.map((enrollment, index) => (
          <div
            className="flex h-fit flex-wrap gap-1 md:grid md:grid-cols-[fit-content,1fr] md:grid-rows-[min-content,.5fr,min-content] rounded-md bg-slate-200 p-3 shadow md:w-full md:flex-nowrap"
            key={enrollment.id}
          >
            <Image
              src={inProgressCourses[index]?.thumbnail ?? "/static/snoopy.jpg"}
              width={100}
              height={100}
              alt="thumbnail"
              className="aspect-video h-fit w-full rounded object-cover md:col-start-1 md:row-span-3 md:mr-3 md:aspect-square md:h-max md:w-fit"
              priority
            />

            <div className="w-fit overflow-hidden md:col-start-2 md:row-start-2">
              <h3 className={`text-lg font-semibold`}>
                {inProgressCourses[index]?.title}
              </h3>
              <p
                className="text-ellipsis text-sm"
                title={inProgressCourses[index]?.description.slice(0, 30)}
              >
                {inProgressCourses[index]?.description}
              </p>
            </div>

            <p className="my-1 text-xs text-gray-600 md:col-start-2 md:row-start-1">
              {instructorDetails[index]}
            </p>

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
          </div>
        ))
      ) : (
        <div className="flex h-fit justify-center items-center gap-1 rounded-md bg-slate-200 p-20 shadow md:w-full md:flex-nowrap">
          <p className="text-gray-500 text-sm">
            Enroll in a new course to see your courses here
          </p>
        </div>
      )}
    </>
  );
}
