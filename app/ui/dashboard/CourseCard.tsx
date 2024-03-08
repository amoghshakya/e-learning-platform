import Image from "next/image";
import { bricolage } from "../fonts";
import Link from "next/link";

export function CourseCard() {
  return (
    <div className="flex h-fit flex-wrap gap-2 rounded-md bg-slate-200 p-3 shadow md:grid md:w-full md:grid-cols-[fit-content,1fr,1fr] md:grid-rows-[min-content,max-content,min-content] md:flex-nowrap">
      {/* Course thumbnail */}
      <Image
        src="/static/snoopy.jpg"
        width={100}
        height={100}
        alt="thumbnail"
        className="aspect-video h-fit w-full rounded object-cover md:col-start-1 md:row-span-3 md:mr-3 md:aspect-square md:h-max md:w-fit"
        priority
      />

      {/* Course title and description */}
      <div className="md:col-start-2 md:row-start-2">
        <h3 className={`text-xl font-semibold`}>Snoopy's Snoopiest Course</h3>
        <p className="text-sm md:text-[0.85rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          quis a nisi?
        </p>
      </div>

      {/* Course instructor */}
      <p className="my-1 text-xs text-gray-600 md:col-start-2 md:row-start-1">
        Snoopy
      </p>

      {/* Course progress */}
      <div className="flex w-full items-center justify-center md:col-start-2 md:row-start-3">
        <p className="mr-1 text-xs">Progress</p>
        <div className="mx-2 w-full rounded bg-gray-300">
          <div
            className="h-2 rounded bg-gradient-to-r from-accent to-primary"
            style={{ width: `65%` }}
          ></div>
        </div>
        <p className="text-xs md:m-1">{`65%`}</p>
      </div>

      <div className="col-start-3 row-span-3 hidden border-l-[1px] border-slate-400 p-3 md:mx-2 md:block">
        <Link href="">
          <h3 className="peer text-sm ">Next up</h3>
          <p className="text-sm peer-hover:underline">Next lesson</p>
        </Link>
      </div>
    </div>
  );
}
