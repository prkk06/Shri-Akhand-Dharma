import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Images, X } from "lucide-react";

import logoImg from "@/assets/sadt-logo-circular.png.asset.json";
import { getGalleryEvents, getEventPhotos } from "@/lib/gallery.functions";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Shri Akhand Dharma Foundation" },
      {
        name: "description",
        content:
          "Photographs from events, ceremonies and community service initiatives of the Shri Akhand Dharma Foundation.",
      },
      { property: "og:title", content: "Gallery — Shri Akhand Dharma Foundation" },
      {
        property: "og:description",
        content: "Event albums and photographs from our community service initiatives.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function imageUrl(id: string) {
  return `/api/public/drive-image?id=${encodeURIComponent(id)}`;
}

function GalleryPage() {
  const fetchEvents = useServerFn(getGalleryEvents);
  const fetchPhotos = useServerFn(getEventPhotos);
  const [openEvent, setOpenEvent] = useState<{ id: string; name: string } | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const eventsQuery = useQuery({ queryKey: ["gallery-events"], queryFn: () => fetchEvents() });
  const photosQuery = useQuery({
    queryKey: ["gallery-photos", openEvent?.id],
    queryFn: () => fetchPhotos({ data: { folderId: openEvent!.id } }),
    enabled: !!openEvent,
  });

  return (
    <div className="min-h-screen bg-ivory text-charcoal antialiased">
      <header className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <img
              src={logoImg.url}
              alt="Shri Akhand Dharma Foundation emblem"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-gold/40 object-cover flex-none"
            />
            <div className="leading-tight min-w-0">
              <div className="font-display text-[13px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] truncate">
                SHRI AKHAND DHARMA
              </div>
              <div className="font-display text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-gold truncate">
                FOUNDATION
              </div>
            </div>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm hover:text-gold transition-colors">
            <ArrowLeft size={16} /> Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-[11px] sm:text-xs font-medium">
          <span className="h-px w-6 sm:w-8 bg-gold" />
          <span>Gallery</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy">
          {openEvent ? openEvent.name : "Moments of Service & Devotion"}
        </h1>
        <p className="mt-4 max-w-3xl text-[17px] sm:text-base leading-relaxed text-charcoal/80 text-justify">
          {openEvent
            ? "Photographs from this event."
            : "Browse our event albums. Each album gathers the photographs from one ceremony, camp or community initiative."}
        </p>

        {openEvent && (
          <button
            type="button"
            onClick={() => setOpenEvent(null)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-navy hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} /> All albums
          </button>
        )}

        {/* ALBUM LIST */}
        {!openEvent && (
          <div className="mt-10">
            {eventsQuery.isLoading && <p className="text-charcoal/60">Loading albums…</p>}

            {eventsQuery.data?.status === "not-configured" && (
              <div className="rounded-lg border border-gold/40 bg-card p-6 sm:p-8">
                <h2 className="font-display text-lg font-semibold text-navy">Almost ready</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-charcoal/80">
                  Share the link to your main Gallery folder in Google Drive and the albums will appear here.
                </p>
              </div>
            )}

            {eventsQuery.data?.status === "error" && (
              <p className="text-copper">{eventsQuery.data.message}</p>
            )}

            {eventsQuery.data?.status === "ok" && eventsQuery.data.events.length === 0 && (
              <p className="text-charcoal/70">
                No albums yet. Create a folder inside your Gallery folder in Google Drive for each event.
              </p>
            )}

            {eventsQuery.data?.status === "ok" && eventsQuery.data.events.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {eventsQuery.data.events.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setOpenEvent({ id: event.id, name: event.name })}
                    className="group text-left rounded-lg overflow-hidden border border-border bg-card hover:border-gold transition-colors"
                  >
                    <div className="aspect-[4/3] bg-navy/5 overflow-hidden">
                      {event.coverId ? (
                        <img
                          src={imageUrl(event.coverId)}
                          alt={event.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-navy/30">
                          <Images size={32} />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="font-display text-lg font-semibold text-navy">{event.name}</h2>
                      <p className="mt-1 text-sm text-charcoal/60">
                        {event.photoCount} {event.photoCount === 1 ? "photo" : "photos"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PHOTOS IN ONE EVENT */}
        {openEvent && (
          <div className="mt-10">
            {photosQuery.isLoading && <p className="text-charcoal/60">Loading photos…</p>}
            {photosQuery.isError && <p className="text-copper">Could not load these photos.</p>}
            {photosQuery.data && photosQuery.data.photos.length === 0 && (
              <p className="text-charcoal/70">This album has no photos yet.</p>
            )}
            {photosQuery.data && photosQuery.data.photos.length > 0 && (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {photosQuery.data.photos.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setLightbox(photo.id)}
                    className="aspect-square overflow-hidden rounded-md border border-border bg-navy/5 group"
                  >
                    <img
                      src={imageUrl(photo.id)}
                      alt={photo.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center rounded-md text-ivory hover:text-gold"
          >
            <X size={22} />
          </button>
          <img
            src={imageUrl(lightbox)}
            alt=""
            className="max-h-[88vh] max-w-full object-contain rounded-md"
          />
        </div>
      )}

      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 text-center text-[10px] sm:text-xs text-ivory/60">
          © {new Date().getFullYear()} Shri Akhand Dharma Foundation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
