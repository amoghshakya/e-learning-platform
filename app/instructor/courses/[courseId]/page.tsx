import { inter, bricolage } from "@/app/fonts";

import { auth } from "@/auth";
import { IconBadge } from "@/components/icon-badge";
import { DescriptionForm } from "@/components/ui/instructor/courses/courseId/description-form";
import { ImageForm } from "@/components/ui/instructor/courses/courseId/image-form";
import { TitleForm } from "@/components/ui/instructor/courses/courseId/title-form";
import prisma from "@/lib/prisma";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await auth();
  if (!session?.user.id) return redirect("/");

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) return redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.thumbnail,
    course.category_id,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className={`p-6 ${inter.className}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className={`text-2xl font-medium ${bricolage.className}`}>
            Course setup
          </h1>
          <span className="text-sm text-slate-600">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={PaintBrushIcon} />
            <h2 className={`text-xl ${bricolage.className}`}>
              Customize your course
            </h2>
          </div>
          <TitleForm
            initialData={JSON.parse(JSON.stringify(course))}
            courseId={params.courseId}
          />
          <DescriptionForm
            initialData={JSON.parse(JSON.stringify(course))}
            courseId={params.courseId}
          />
          <ImageForm
            initialData={JSON.parse(JSON.stringify(course))}
            courseId={params.courseId}
          />
        </div>
      </div>
    </div>
  );
}
