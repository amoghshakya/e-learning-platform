import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import prisma from "@/lib/prisma";
import { ChevronUpDownIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function AttachmentList({
  courseId,
}: {
  courseId: string;
}) {
  const attachments = await prisma.attachment.findMany({
    where: {
      course_id: courseId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <div className="flex w-full cursor-pointer justify-between text-sm">
          Attachments
          <ChevronUpDownIcon className="h-4 w-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {attachments &&
          attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex w-full items-center rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700"
            >
              <DocumentIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <Link href={attachment.url} target="_blank">
                <span className="line-clamp-1 text-xs hover:underline">
                  {attachment.name}
                </span>
              </Link>
            </div>
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
