import { body, heading } from "@/app/fonts";

import { auth } from "@/auth";
import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import Actions from "@/components/ui/instructors/courses/courseId/actions";
import { AttachmentForm } from "@/components/ui/instructors/courses/courseId/attachment-form";
import { CategoryForm } from "@/components/ui/instructors/courses/courseId/category-form";
import { DescriptionForm } from "@/components/ui/instructors/courses/courseId/description-form";
import { ImageForm } from "@/components/ui/instructors/courses/courseId/image-form";
import { LessonsForm } from "@/components/ui/instructors/courses/courseId/lessons-form";
import { PriceForm } from "@/components/ui/instructors/courses/courseId/price-form";
import { TitleForm } from "@/components/ui/instructors/courses/courseId/title-form";
import { fetchCategories } from "@/lib/categories";
import { isUserOwner } from "@/lib/instructor";
import prisma from "@/lib/prisma";
import {
  CurrencyDollarIcon,
  ListBulletIcon,
  PaintBrushIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
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

  const userOwnsCourse = await isUserOwner(params.courseId);

  if (!userOwnsCourse) return redirect("/instructors/");

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      lessons: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await fetchCategories();

  if (!course) return redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.thumbnail,
    course.category_id,
    course.lessons.some((lesson) => lesson.title),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the public until you publish this course." />
      )}
      <div className={`${body.className} p-12`}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <h1 className={`text-3xl font-bold ${heading.className}`}>
              Course setup
            </h1>
            <span className="text-sm text-slate-600">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            courseId={params.courseId}
            disabled={!isComplete}
            isPublished={course.isPublished}
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={PaintBrushIcon} />
              <h2 className={`text-xl font-semibold ${heading.className}`}>
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
                <h2 className={`text-xl font-semibold ${heading.className}`}>
                  Add course lessons
                </h2>
              </div>
              <LessonsForm initialData={course} courseId={params.courseId} />
            </div>

            {/* Price section */}
            {/* Comment this if no price for any course :) */}
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CurrencyDollarIcon} />
                <h2 className={`text-xl font-semibold ${heading.className}`}>
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
                <h2 className={`text-xl font-semibold ${heading.className}`}>
                  Add course attachments
                </h2>
              </div>
              <AttachmentForm initialData={course} courseId={params.courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
