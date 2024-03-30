import LessonSidebar from "@/components/ui/courses/[courseId]/[lessonId]/lesson-sidebar";

export default function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  return (
    <main className="relative">
      <LessonSidebar courseId={params.courseId} lessonId={params.lessonId} />
      {children}
    </main>
  );
}
