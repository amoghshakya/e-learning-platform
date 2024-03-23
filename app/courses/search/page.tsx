import { auth } from "@/auth";
import { SearchBar } from "@/components/Search";
import CoursesList from "@/components/courses-list";
import SearchBarSkeleton from "@/components/skeletons/SearchSkeleton";
import Categories from "@/components/ui/courses/search/categories";
import { getCourses } from "@/lib/courses";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const session = await auth();
  const userId = session?.user.id;
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({ userId, ...searchParams });

  console.log(courses);
  return (
    <>
      <div className="block px-6 pt-6 md:mb-0 md:hidden">
        <Suspense fallback={<SearchBarSkeleton />}>
          <SearchBar placeholder="Search courses..." />
        </Suspense>
      </div>
      <div className="space-y-4 p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}
