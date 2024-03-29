import { SearchBar } from "@/components/Search";
import SearchBarSkeleton from "@/components/skeletons/SearchSkeleton";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { IconBadge } from "@/components/icon-badge";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
    },
    include: {
      lessons: true,
      category: true,
    },
  });

  return (
    <section>
      <div>
        <div className="md:hidden px-8 mt-4">
          <Suspense fallback={<SearchBarSkeleton />}>
            <SearchBar hasButton={true} placeholder="Search for courses..." />
          </Suspense>
        </div>
        <div className="p-8 md:px-16">
          <div className="xl grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {courses &&
              courses.map((course) => {
                const category = course.category?.name;
                const lessonsLength = course.lessons.length;
                return (
                  <Link href={`/courses/${course.id}`} key={course.id}>
                    <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
                      <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <Image
                          src={course.thumbnail!}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col pt-2">
                        <div
                          className={`line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base`}
                        >
                          {course.title}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {category}
                        </p>
                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                          <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpenIcon} />
                            <span className="text-xs text-muted-foreground">
                              {lessonsLength}{" "}
                              {lessonsLength === 1 ? "Lesson" : "Lessons"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
