import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { GiSkills } from "react-icons/gi";
import {
  HiOutlineCpuChip,
  HiOutlineCodeBracket,
  HiOutlineBuildingStorefront,
  HiOutlinePaintBrush,
  HiOutlineLanguage,
  HiOutlineFaceSmile,
  HiOutlineHeart,
  HiOutlineBeaker,
  HiOutlineCalculator,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { Card } from "../card";

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": HiOutlineCpuChip,
  "Programming & Development": HiOutlineCodeBracket,
  "Business & Entrepreneuship": HiOutlineBuildingStorefront,
  "Creative Arts & Design": HiOutlinePaintBrush,
  "Language Learning": HiOutlineLanguage,
  "Personal Development": HiOutlineFaceSmile,
  "Health & Wellness": HiOutlineHeart,
  "STEM (Science, Technology, Engineering, Mathematics)": HiOutlineBeaker,
  "Test Preparation": HiOutlineCalculator,
  "Career-Specific Skills": HiOutlineBriefcase,
  "Data & Analytics": HiOutlineChartBar,
  "Humanities & Social Sciences": LiaPeopleCarrySolid,
  "Life Skills": GiSkills,
};

const categories = [
  {
    id: "clu99wqpm0000sii62h1d5i0k",
    name: "Programming & Development",
  },
  {
    id: "clu99wqpm0001sii6dd8qytea",
    name: "Business & Entrepreneurship",
  },
  { id: "clu99wqpm0002sii6h6qrlrdp", name: "Creative Arts & Design" },
  { id: "clu99wqpm0003sii69kllwndn", name: "Language Learning" },
  { id: "clu99wqpm0004sii61bac8uqo", name: "Personal Development" },
  { id: "clu99wqpm0005sii645nqsh5p", name: "Health & Wellness" },
  {
    id: "clu99wqpm0006sii6u97gbqii",
    name: "STEM (Science, Technology, Engineering, Mathematics)",
  },
  {
    id: "clu99wqpm0007sii6bg1hk0gc",
    name: "Humanities & Social Sciences",
  },
  { id: "clu99wqpm0008sii66bhk9amm", name: "Test Preparation" },
  { id: "clu99wqpm0009sii62nzeajtk", name: "Career-Specific Skills" },
  { id: "clu99wqpm000csii6fdgsa6gp", name: "Life Skills" },
  { id: "clu99wqpm000dsii6viim34ax", name: "Data & Analytics" },
  { id: "cludkuey500007z6zhwujv84u", name: "Computer Science" },
];

export default function FeaturedCategoryList() {
  const router = useRouter();
  return (
    <>
      {categories &&
        categories.slice(2).map((category) => {
          const Icon = iconMap[category.name];

          return (
            <Card
              key={category.id}
              className="group flex h-40 min-w-48 cursor-pointer snap-start flex-col items-center justify-center bg-slate-50 p-6 hover:bg-slate-100 md:min-w-64"
              onClick={() =>
                router.push(`/courses/search?categoryId=${category.id}`)
              }
            >
              {Icon && (
                <>
                  <Icon className="h-8 w-8 flex-grow text-slate-600 group-hover:text-black" />
                  <span className="line-clamp-2 text-sm">{category.name}</span>
                </>
              )}
            </Card>
          );
        })}
    </>
  );
}
