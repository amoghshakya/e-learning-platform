"use server";

import { Category } from "@prisma/client";
import prisma from "./prisma";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (err) {
    throw err;
  }
}

export async function updateCourseCategory(
  courseId: string,
  categoryId: string
) {
  try {
    const updatedCategory = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        category_id: categoryId,
      },
    });

    return updatedCategory;
  } catch (err) {
    throw err;
  }
}
