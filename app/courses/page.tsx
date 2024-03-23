import { SearchBar } from "@/components/Search";
import SearchBarSkeleton from "@/components/skeletons/SearchSkeleton";
import { Suspense } from "react";

export default function CoursesPage() {
  return (
    <section>
      <div className="md:px-24">
      <Suspense fallback={<SearchBarSkeleton />} >
        <SearchBar hasButton={true} placeholder="Search for courses..." />

      </Suspense>
      </div>
    </section>
  );
}
