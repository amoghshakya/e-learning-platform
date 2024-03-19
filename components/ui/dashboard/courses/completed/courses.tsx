import {
  getCompletedCourses,
  getCourseDetails,
  getInstructorName,
} from "@/lib/courses";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { CourseCard } from "../../CourseCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function CompletedCoursesSection() {
  const completedEnrollments = await getCompletedCourses();
  const completedCourses = await Promise.all(
    completedEnrollments.map(async (enrollment) => {
      const course = await getCourseDetails(enrollment.course_id);
      return course;
    })
  );
  const instructorDetails = await Promise.all(
    completedCourses.map(async (course) => {
      const instructor = await getInstructorName(course?.instructor_id);
      return instructor;
    })
  );

  return (
    <>
      {completedEnrollments.length ? (
        completedEnrollments.map((enrollment, index) => (
          <CourseCard enrollment={enrollment} key={enrollment.id} />
        ))
      ) : (
        <Alert className="px-6 py-4 md:w-[55vw]" variant="default">
          <FaceFrownIcon className="h-6 w-6" />
          <AlertTitle>No courses completed... yet!</AlertTitle>
          <AlertDescription>
            Finish your courses to see your courses here!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
