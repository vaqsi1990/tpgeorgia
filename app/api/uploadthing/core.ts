import { isAdminAuthenticatedFromRequest } from "@/lib/admin-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f(
    { image: { maxFileSize: "16MB", maxFileCount: 10 } },
    { awaitServerData: false },
  )
    .middleware(async ({ req }) => {
      if (!isAdminAuthenticatedFromRequest(req)) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: "admin" };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
