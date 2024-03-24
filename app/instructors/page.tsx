import { Button } from "@/components/ui/button";
import { heading } from "../fonts";
import InstructorsButtons from "@/components/ui/instructors/instructors-button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InstructorsPage() {
  return (
    <main>
      <div className="h-screen w-full space-y-32 bg-gradient-to-b from-background via-sky-200 to-blue-400 p-8 md:p-20">
        <div className="mx-auto grid grid-cols-1 place-items-center content-center items-center justify-center gap-y-4 md:w-1/2">
          <div className="*:text-center">
            <h1
              className={`${heading.className} text-xl font-black md:text-nowrap md:text-4xl`}
            >
              Become an instructor!
              <br />
              Share Your Expertise and Make a Difference
            </h1>
          </div>
          <div className="*:text-center">
            <p className={`text-base`}>
              Share your knowledge, empower learners. Become an instructor on
              our thriving e-learning platform. Flexible schedule, global reach,
              and rewarding income await. Create your own courses and publish
              them for everyone else to enroll!
            </p>
          </div>
          <div className="mt-3">
            <Suspense fallback={<Skeleton className="h-4 w-full" />}>
              <InstructorsButtons />
            </Suspense>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:mt-10">
          <div className="*:text-center">
            <h2
              className={`${heading.className} text-xl font-black md:text-nowrap md:text-3xl`}
            >
              Why become an instructor?
            </h2>
          </div>
          <div className="*:text-center">
            <ul>
              <li>reason 1</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
