import { Category, Course, Enrollment } from "@prisma/client";
import SearchCourseCard from "./ui/courses/search/search-course-card";

type CourseExtended = Course & {
  category: Category | null;
  lessons: { id: string }[];
  enrollments: Enrollment[] | null;
  progress: number | null;
};

interface CoursesListProps {
  items: CourseExtended[];
}

export default function CoursesList({ items }: CoursesListProps) {
  return (
    <div>
      <div className="xl grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => (
          <SearchCourseCard
            key={item.id}
            title={item.title}
            id={item.id}
            thumbnailURL={item.thumbnail!}
            lessonsLength={item.lessons.length}
            price={Number(item.price)}
            progress={item.progress}
            category={item.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground md:mt-16">
          No courses found
        </div>
      )}
    </div>
  );
}
