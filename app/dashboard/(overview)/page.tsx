import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/dashboard/CourseCard";
import { bricolage } from "@/app/fonts";
import {
  getCompletedCourses,
  getInProgressCourses,
  getUserEnrolledCourses,
} from "@/lib/courses";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function Dashboard() {
  const enrollments = await getUserEnrolledCourses();
  const completedCourses = await getCompletedCourses();
  const inProgressCourses = await getInProgressCourses();

  return (
    <main>
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
                  <CourseCard
                    enrollment={enrollment}
                    key={enrollment.id}
                    isDashboardRoute={true}
                  />
                ))
            ) : (
              <Alert className="px-6 py-4 md:w-[55vw]" variant="default">
                <MagnifyingGlassCircleIcon className="h-6 w-6" />
                <AlertTitle>No courses enrolled</AlertTitle>
                <AlertDescription>
                  Enroll in some courses to see your courses here!
                </AlertDescription>
                <Link href="/courses">
                  <Button>Browses courses</Button>
                </Link>
              </Alert>
            )}
          </div>
        </div>
        <Card className="hidden bg-gray-100 md:block my-[3.687rem]">
          <CardHeader>Courses</CardHeader>
          <CardContent className="flex flex-col gap-2 *:text-gray-500 *:underline hover:*:text-gray-600">
            <Link href="/dashboard/courses/inprogress">
              In progress ({inProgressCourses.length})
            </Link>
            <Link href="/dashboard/courses/completed">
              Completed ({completedCourses.length})
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
