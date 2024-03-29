import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return {
    userId: session.user.id,
  };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseThumbnail: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),

  lessonVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
