import { createFileRoute } from "@tanstack/react-router";

import { driveFetch } from "@/lib/gallery.server";

const ID_RE = /^[a-zA-Z0-9_-]{10,200}$/;

export const Route = createFileRoute("/api/public/drive-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!ID_RE.test(id)) return new Response("Invalid id", { status: 400 });

        const range = request.headers.get("range");
        const res = await driveFetch(
          `/files/${id}`,
          { alt: "media", supportsAllDrives: "true" },
          range ? { Range: range } : undefined,
        );

        if (!res.ok && res.status !== 206) {
          const body = await res.text();
          console.error(`Drive media fetch failed [${res.status}]: ${body}`);
          return new Response("Media unavailable", { status: res.status });
        }

        const contentType = res.headers.get("content-type") ?? "image/jpeg";
        if (!contentType.startsWith("image/") && !contentType.startsWith("video/")) {
          return new Response("Unsupported media type", { status: 415 });
        }

        const headers = new Headers({
          "content-type": contentType,
          "cache-control": "public, max-age=86400",
          "accept-ranges": "bytes",
        });
        for (const h of ["content-length", "content-range"]) {
          const v = res.headers.get(h);
          if (v) headers.set(h, v);
        }

        return new Response(res.body, { status: res.status, headers });
      },
    },
  },
});
