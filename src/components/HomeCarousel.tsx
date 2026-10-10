import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getCarouselImages } from "@/lib/carousel.functions";

const INTERVAL_MS = 6000;

export default function HomeCarousel() {
  const fetchImages = useServerFn(getCarouselImages);
  const { data } = useQuery({ queryKey: ["home-carousel"], queryFn: () => fetchImages() });
  const images = data?.images ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <section aria-label="Photo highlights" className="bg-navy">
      <Link to="/gallery" className="group relative block w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        {images.map((img, i) => (
          <img
            key={img.id}
            src={`/api/public/drive-image?id=${encodeURIComponent(img.id)}`}
            alt={img.name.replace(/\.[^.]+$/, "")}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span className="absolute bottom-4 right-4 rounded-md bg-navy/80 px-4 py-2 text-sm text-ivory group-hover:text-gold transition-colors">
          View Gallery
        </span>
      </Link>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-2 bg-ivory/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
