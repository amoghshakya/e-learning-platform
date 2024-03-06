import { CourseCard } from "@/app/ui/dashboard/CourseCard";
import { bricolage } from "@/app/ui/fonts";

export default  function Dashboard() {
  return (
    <div>
      <h1
        className={`${bricolage.className} mb-4 bg-slate-800 p-6 pl-10 text-2xl font-[625] text-background md:p-12 md:pl-24 md:text-4xl`}
      >
        Dashboard
      </h1>
      <section className="md:grid md:grid-cols-[2fr,1fr] md:grid-rows-3">
        <div className="p-1 px-6 md:p-4 md:px-24">
          <h2
            className={`${bricolage.className} text-lg font-[555] md:text-xl`}
          >
            Continue learning
          </h2>
          <div className="py-2 *:my-2">
            <CourseCard />
          </div>
        </div>
      </section>
    </div>
  );
}
