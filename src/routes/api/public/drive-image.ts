import { createFileRoute } from "@tanstack/react-router";

import { driveFetch } from "@/lib/gallery.server";

const ID_RE = /^[a-zA-Z0-9_-]{10,200}$/;

export const Route = createFileRoute("/api/public/drive-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id") ?? "";
        if (!ID_RE.test(id)) return new Response("Invalid id", { status: 400 });

        // Thumbnail mode: serve Drive's generated thumbnail (used for video covers,
        // whose googleusercontent URLs browsers block when embedded cross-origin).
        if (url.searchParams.get("thumb") === "1") {
          const meta = await driveFetch(`/files/${id}`, {
            fields: "thumbnailLink",
            supportsAllDrives: "true",
          });
          if (!meta.ok) return new Response("Thumbnail unavailable", { status: meta.status });
          const { thumbnailLink } = (await meta.json()) as { thumbnailLink?: string };
          if (!thumbnailLink) return new Response("No thumbnail", { status: 404 });
          const thumb = await fetch(thumbnailLink.replace(/=s\d+$/, "=s1600"));
          if (!thumb.ok) return new Response("Thumbnail unavailable", { status: thumb.status });
          return new Response(thumb.body, {
            headers: {
              "content-type": thumb.headers.get("content-type") ?? "image/jpeg",
              "cache-control": "public, max-age=3600",
            },
          });
        }

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
