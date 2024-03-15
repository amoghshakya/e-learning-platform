import { Button } from "@/app/ui/Button";
import { CourseCard } from "@/app/ui/dashboard/CourseCard";
import { bricolage } from "@/app/ui/fonts";
import {
  getCompletedCourses,
  getInProgressCourses,
  getUserEnrolledCourses,
} from "@/lib/courses";
import Link from "next/link";

export default async function Dashboard() {
  const enrollments = await getUserEnrolledCourses();
  const completedCourses = await getCompletedCourses();
  const inProgressCourses = await getInProgressCourses();

  return (
    <div>
      <h1
        className={`${bricolage.className} mb-4 bg-slate-800 p-6 pl-10 text-2xl font-[625] text-background md:p-12 md:pl-24 md:text-4xl`}
      >
        Dashboard
      </h1>
      <section className="md:mr-24 md:grid md:grid-cols-[2fr,1fr] md:grid-rows-3">
        <div className="p-1 px-6 md:p-4 md:pl-24">
          <h2
            className={`${bricolage.className} text-lg font-[555] md:text-xl`}
          >
            Continue learning
          </h2>
          <div className="py-2 *:my-2">
            {enrollments.length ? (
              enrollments
                .slice(0, 2)
                .map((enrollment) => (
                  <CourseCard enrollment={enrollment} key={enrollment.id} />
                ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 place-self-center rounded-md bg-gray-100 p-16 text-center text-sm text-gray-600">
                <p>No courses enrolled... yet! :( </p>
                <Button className="bg-secondary">Browse courses</Button>
              </div>
            )}
          </div>
        </div>
        <div className="hidden flex-col gap-3 rounded-md align-top *:text-sm *:text-gray-600 hover:*:underline md:col-start-2 md:row-start-1 md:mb-24 md:mr-24 md:mt-[3.8rem] md:flex md:bg-gray-200 md:p-4">
          <Link href="">In progress ({inProgressCourses.length})</Link>
          <Link href="">Completed ({completedCourses.length})</Link>
        </div>
      </section>
    </div>
  );
}
