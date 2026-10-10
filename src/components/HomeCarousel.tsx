import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCarouselImages } from "@/lib/carousel.functions";

const INTERVAL_MS = 6000;

function usePerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

export default function HomeCarousel() {
  const fetchImages = useServerFn(getCarouselImages);
  const { data } = useQuery({ queryKey: ["home-carousel"], queryFn: () => fetchImages() });
  const images = (data?.images ?? []).slice(0, 5);
  const perView = usePerView();
  const maxIndex = Math.max(0, images.length - perView);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index > maxIndex) setIndex(0);
  }, [index, maxIndex]);

  useEffect(() => {
    if (maxIndex === 0) return;
    const t = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), INTERVAL_MS);
    return () => clearInterval(t);
  }, [maxIndex]);

  if (images.length === 0) return null;

  const go = (d: number) => setIndex((i) => (i + d < 0 ? maxIndex : i + d > maxIndex ? 0 : i + d));

  return (
    <section
      aria-label="Photo highlights"
      className="bg-ivory pt-12 sm:pt-16 pb-0 -mb-4 sm:-mb-8"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-gold tracking-wide">
          Our Service in Action
        </h2>
        <div className="mx-auto mt-4 sm:mt-5 h-px w-16 sm:w-20 bg-gold" />
        <div className="relative mt-8 sm:mt-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
            >
              {images.map((img, i) => (
                <div key={img.id} className="shrink-0 px-2 sm:px-3" style={{ width: `${100 / perView}%` }}>
                  <Link
                    to="/gallery"
                    className="block overflow-hidden rounded-lg border-2 border-gold/50 hover:border-gold bg-navy shadow-[var(--shadow-elegant)] transition-colors"
                  >
                    <img
                      src={`/api/public/drive-image?id=${encodeURIComponent(img.id)}`}
                      alt={img.name.replace(/\.[^.]+$/, "")}
                      loading={i < 3 ? "eager" : "lazy"}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {maxIndex > 0 && (
            <>
              <button
                type="button"
                aria-label="Previous photos"
                onClick={() => go(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden sm:grid h-10 w-10 place-items-center rounded-full bg-navy text-gold border border-gold/50 hover:bg-gold hover:text-navy transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next photos"
                onClick={() => go(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden sm:grid h-10 w-10 place-items-center rounded-full bg-navy text-gold border border-gold/50 hover:bg-gold hover:text-navy transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 pt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show photos from ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-2 bg-navy/30"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
