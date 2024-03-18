import { inter, bricolage } from "@/app/fonts";

import { auth } from "@/auth";
import { IconBadge } from "@/components/icon-badge";
import { AttachmentForm } from "@/components/ui/instructors/courses/courseId/attachment-form";
import { CategoryForm } from "@/components/ui/instructors/courses/courseId/category-form";
import { DescriptionForm } from "@/components/ui/instructors/courses/courseId/description-form";
import { ImageForm } from "@/components/ui/instructors/courses/courseId/image-form";
import { PriceForm } from "@/components/ui/instructors/courses/courseId/price-form";
import { TitleForm } from "@/components/ui/instructors/courses/courseId/title-form";
import { fetchCategories } from "@/lib/categories";
import prisma from "@/lib/prisma";
import {
  CurrencyDollarIcon,
  ListBulletIcon,
  PaintBrushIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { Category } from "@prisma/client";
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
    include: {
      Attachment: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  console.log(course);

  const categories = await fetchCategories();

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
        <div className="flex flex-col gap-y-1">
          <h1 className={`text-3xl font-bold ${bricolage.className}`}>
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
            <h2 className={`text-xl font-semibold ${bricolage.className}`}>
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
          <CategoryForm
            initialData={JSON.parse(JSON.stringify(course))}
            courseId={params.courseId}
            options={categories.map((category) => {
              return {
                label: category.name,
                value: category.id,
              };
            })}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListBulletIcon} />
              <h2 className={`text-xl font-semibold ${bricolage.className}`}>
                Add course lessons
              </h2>
            </div>
            <div>TODO: LESSONS</div>
          </div>

          {/* Price section */}
          {/* Comment this if no price for any course :) */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CurrencyDollarIcon} />
              <h2 className={`text-xl font-semibold ${bricolage.className}`}>
                Set course price
              </h2>
            </div>
            <PriceForm
              initialData={JSON.parse(JSON.stringify(course))}
              courseId={params.courseId}
            />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={PaperClipIcon} />
              <h2 className={`text-xl font-semibold ${bricolage.className}`}>
                Add course attachments
              </h2>
            </div>
            <AttachmentForm initialData={course} courseId={params.courseId} />
          </div>
        </div>
      </div>
    </div>
  );
}
