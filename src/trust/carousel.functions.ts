import { createServerFn } from "@tanstack/react-start";
import { TRUST_CAROUSEL_FOLDER_ID } from "./content";

// Trust page slideshow source — folder ID lives in src/trust/content.ts.
export const getTrustCarouselImages = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ images: { id: string; name: string }[] }> => {
    try {
      const { listEventPhotos } = await import("@/lib/gallery.server");
      const photos = await listEventPhotos(TRUST_CAROUSEL_FOLDER_ID);
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
