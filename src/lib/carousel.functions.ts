import { createServerFn } from "@tanstack/react-start";

const CAROUSEL_FOLDER_ID = "1Rk9YUBpb5EZe3tRUa2Iw7qljV_uHneoh";

export const getCarouselImages = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ images: { id: string; name: string }[] }> => {
    try {
      const { listEventPhotos } = await import("./gallery.server");
      const photos = await listEventPhotos(CAROUSEL_FOLDER_ID);
      return {
        images: photos
          .filter((p) => p.mimeType.startsWith("image/"))
          .slice(0, 5)
          .map((p) => ({ id: p.id, name: p.name })),
      };
    } catch (error) {
      console.error(error);
      return { images: [] };
    }
  },
);
