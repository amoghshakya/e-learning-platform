import {
  getCourseDetails,
  getInProgressCourses,
  getInstructorName,
} from "@/lib/courses";
import Image from "next/image";
import { CourseCard } from "../../CourseCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

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
      const instructor = await getInstructorName(course?.instructor_id);
      return instructor;
    })
  );

  return (
    <>
      {inProgressEnrollments.length ? (
        inProgressEnrollments.map((enrollment, index) => (
          <CourseCard enrollment={enrollment} key={enrollment.id} />
        ))
      ) : (
        <Alert className="px-6 py-4 md:w-[55vw]" variant="default">
          <AcademicCapIcon className="h-6 w-6" />
          <AlertTitle>No courses in progress</AlertTitle>
          <AlertDescription>
            Enroll in new courses to see your courses here!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
