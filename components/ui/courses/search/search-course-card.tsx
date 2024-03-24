import { IconBadge } from "@/components/icon-badge";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "../../progress";
import { formatPrice } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  thumbnailURL: string;
  lessonsLength: number;
  progress: number | null;
  category: string;
  price: number;
}

export default function SearchCourseCard({
  category,
  id,
  lessonsLength,
  price,
  progress,
  thumbnailURL,
  title,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image src={thumbnailURL} alt={title} fill className="object-cover" />
        </div>
        <div className="flex flex-col pt-2">
          <div
            className={`line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base`}
          >
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpenIcon} />
              <span className="text-xs text-muted-foreground">
                {lessonsLength} {lessonsLength === 1 ? "Lesson" : "Lessons"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <>
              <p className="text-xs text-muted-foreground">{progress}% complete</p>
              <Progress value={progress} />
            </>
          ) : (
            <p className="text-sm font-semibold md:text-xs">
              {price !== 0 ? formatPrice(price) : "Free"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
