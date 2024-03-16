import { MyCoursesButtons } from "@/components/ui/dashboard/courses/buttonlayout";
import { bricolage } from "@/app/fonts";

export default function MyCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1
        className={`${bricolage.className} mb-4 bg-slate-800 p-6 pl-10 text-2xl font-[625] text-background md:p-12 md:pl-24 md:text-4xl`}
      >
        My courses
      </h1>
      <section className="md:px-24 h-screen px-8">
        <MyCoursesButtons />
        {children}
      </section>
    </div>
  );
}
