import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { DriveEvent, DrivePhoto } from "./gallery.server";

export type GalleryEventsResult =
  | { status: "ok"; events: DriveEvent[] }
  | { status: "not-configured" }
  | { status: "error"; message: string };

export const getGalleryEvents = createServerFn({ method: "GET" }).handler(
  async (): Promise<GalleryEventsResult> => {
    if (!process.env["GALLERY_DRIVE_FOLDER_ID"]) return { status: "not-configured" };
    try {
      const { listEvents } = await import("./gallery.server");
      return { status: "ok", events: await listEvents() };
    } catch (error) {
      console.error(error);
      return { status: "error", message: "Could not load albums from Google Drive." };
    }
  },
);

export const getEventPhotos = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ folderId: z.string().min(5).max(200) }).parse(data))
  .handler(async ({ data }): Promise<{ photos: DrivePhoto[] }> => {
    const { listEventPhotos } = await import("./gallery.server");
    return { photos: await listEventPhotos(data.folderId) };
  });
