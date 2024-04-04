"use client";

import { enrollCourse } from "@/lib/courses";
import { Button } from "../../button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useToast } from "../../use-toast";
import { revalidatePath } from "next/cache";

export default function EnrollButton({
  courseId,
  userId,
  price,
}: {
  courseId?: string;
  userId?: string;
  price: number;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const handleEnroll = async () => {
    const enrollment = await enrollCourse(courseId, userId);
    if (enrollment) {
      toast({
        title: "Course enrolled",
        description: "You should now see the course in your dashboard",
      });
      router.refresh()
      router.push("/dashboard/courses/inprogress");
    } else {
      toast({
        title: "Failed to enroll",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  return (
    <Button onClick={handleEnroll}>
      Enroll for {Number(price) ? formatPrice(Number(price)) : "free"}
    </Button>
  );
}
