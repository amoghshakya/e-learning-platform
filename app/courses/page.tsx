import { SearchBar } from "@/components/ui/Search";

export default function CoursesPage() {
  return (
    <section>
      <div className="md:px-24">
        <SearchBar hasButton={true} placeholder="Search for courses..." />
      </div>
    </section>
  );
}
