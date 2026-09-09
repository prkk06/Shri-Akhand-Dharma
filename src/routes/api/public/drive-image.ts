import { createFileRoute } from "@tanstack/react-router";

import { driveFetch } from "@/lib/gallery.server";

const ID_RE = /^[a-zA-Z0-9_-]{10,200}$/;

export const Route = createFileRoute("/api/public/drive-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!ID_RE.test(id)) return new Response("Invalid id", { status: 400 });

        const res = await driveFetch(`/files/${id}`, {
          alt: "media",
          supportsAllDrives: "true",
        });

        if (!res.ok) {
          const body = await res.text();
          console.error(`Drive image fetch failed [${res.status}]: ${body}`);
          return new Response("Image unavailable", { status: res.status });
        }

        const contentType = res.headers.get("content-type") ?? "image/jpeg";
        if (!contentType.startsWith("image/")) {
          return new Response("Not an image", { status: 415 });
        }

        return new Response(res.body, {
          headers: {
            "content-type": contentType,
            "cache-control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
