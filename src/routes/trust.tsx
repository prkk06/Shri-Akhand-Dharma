// ============================================================================
// TRUST PAGE (route: /trust) — THE ONLY FILE FOR THE TRUST PAGE
// ----------------------------------------------------------------------------
// All Trust wording, menu links, image sources, the Drive slideshow folder,
// header, slideshow and page layout live here. Edit the CONTENT section below
// to change text. Independent of the Foundation homepage.
// Images: src/assets/trust/
// ============================================================================
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { Menu, X, ChevronLeft, ChevronRight, Mail, MapPin, Globe, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/trust/hero-banner.jpg";
import logo from "@/assets/trust/sadt-trust-logo.png.asset.json";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Shri Akhand Dharma Trust — Preserving Heritage, Serving Humanity" },
      {
        name: "description",
        content:
          "A spiritual, cultural and charitable institution preserving India's heritage and supporting humanitarian initiatives across temples, gurudwaras and community institutions.",
      },
      { property: "og:title", content: "Shri Akhand Dharma Trust" },
      { property: "og:description", content: "Preserving Heritage. Inspiring Generations. Serving Humanity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://shriakhanddharmatrust.org/trust" },
      { name: "twitter:title", content: "Shri Akhand Dharma Trust" },
      { name: "twitter:description", content: "Preserving Heritage. Inspiring Generations. Serving Humanity." },
    ],
    links: [{ rel: "canonical", href: "https://shriakhanddharmatrust.org/trust" }],
  }),
  component: TrustPage,
});

// ============================== CONTENT ======================================

const trustName = "Shri Akhand Dharma Trust";
const trustSuffix = "Trust"; // second line of the logo text
const brandLine1 = "SHRI AKHAND DHARMA";

// ---- Image sources --------------------------------------------------------
const trustImages = {
  /** Opening banner background (replace the file in src/assets/trust/). */
  hero: heroBanner,
  /** Circular emblem used in header and footer. */
  logo: logo.url,
};

/** Google Drive folder that feeds the "Our Service in Action" slideshow. */
const TRUST_CAROUSEL_FOLDER_ID = "1ahLqZ6IOqHNSTLOKlTwp5VRoFEquaJgG";
const carouselTitle = "Our Service in Action";

// ---- Menu (Trust page header & footer) ------------------------------------
const trustNavLinks = [
  { label: "About", href: "/trust#about" },
  { label: "Vision", href: "/trust#vision" },
  { label: "Values", href: "/trust#values" },
  { label: "Gallery", href: "/trust/gallery" },
  { label: "Partner", href: "/trust#partner" },
  { label: "Contact", href: "/trust#contact" },
];

// ---- Hero -----------------------------------------------------------------
const hero = {
  eyebrow: "Est. for Generations to Come",
  titleLine1: "Shri Akhand",
  titleLine2: "Dharma Trust",
  tagline: "Preserving Heritage. Inspiring Generations. Serving Humanity.",
  intro:
    "A spiritual, cultural and charitable institution dedicated to preserving India's religious heritage, strengthening communities and supporting humanitarian initiatives through collective participation and responsible development.",
  buttons: {
    vision: "Explore the Vision",
    partner: "Become a Partner",
    contact: "Contact Us",
  },
};

// ---- About ----------------------------------------------------------------
const about = {
  label: "About",
  titleLine1: "About Shri Akhand",
  titleLine2: "Dharma Trust",
  paragraphs: [
    "Shri Akhand Dharma Trust is committed to preserving and strengthening India's spiritual and cultural heritage by supporting the renovation, development and maintenance of temples, gurudwaras and other religious institutions across the country.",
    "The Trust also supports NGOs and charitable organisations engaged in spiritual development, child welfare, education, humanitarian activities and community wellbeing.",
    "With a long-term vision focused on service, heritage preservation and social responsibility, the Trust seeks to create sustainable institutions that positively impact both faith-based communities and society at large.",
  ],
};

// ---- Vision & Mission -----------------------------------------------------
const vision = {
  label: "Our Vision",
  title: "A Living Heritage",
  paragraphs: [
    "A living heritage, preserved and strengthened through the renovation, development and maintenance of temples, gurudwaras and sacred institutions — connecting tradition with future generations.",
  ],
};

const mission = {
  label: "Our Mission",
  title: "A Unified Platform",
  paragraphs: [
    "To establish a unified and accessible platform that brings together temples, gurudwaras and spiritual institutions in one ecosystem — promoting spiritual growth, cultural preservation and community engagement.",
    "The Trust seeks to enhance awareness among younger generations, strengthen India's religious heritage and ensure affordable access to spiritual and cultural experiences for all.",
  ],
};

// ---- Core values ----------------------------------------------------------
const valuesSection = {
  label: "Principles",
  title: "Core Values",
  intro:
    "Six guiding principles that shape every initiative we undertake and every institution we build.",
  items: [
    { title: "Faith", desc: "Preserving spiritual traditions and sacred heritage with reverence." },
    { title: "Service", desc: "Supporting communities through meaningful charitable initiatives." },
    { title: "Unity", desc: "Bringing people, traditions and communities together as one." },
    { title: "Heritage", desc: "Protecting India's civilisational and cultural identity for tomorrow." },
    { title: "Integrity", desc: "Ensuring transparent, accountable and responsible governance." },
    { title: "Sustainability", desc: "Building future-ready institutions with long-term, lasting impact." },
  ],
};

// ---- Significance ---------------------------------------------------------
const significance = {
  label: "Significance",
  title: "Why This Initiative Matters",
  paragraphs: [
    "India's spiritual and cultural traditions represent one of the world's oldest living civilisations. In a rapidly changing world, preserving these values while making them accessible to future generations has become increasingly important.",
    "Shri Akhand Dharma Trust aims to bridge heritage and modernity through sustainable institutions that support spirituality, community wellbeing, education and cultural continuity.",
  ],
  quote:
    "\"Designed not only to preserve tradition, but to create meaningful social impact through service, awareness, participation and responsible development.\"",
};

// ---- Partner --------------------------------------------------------------
const partner = {
  label: "Involvement",
  title: "Partner With Us",
  intro:
    "The Trust welcomes support and participation from individuals and organisations who share our commitment to building institutions that serve society and future generations.",
  button: "Start a Conversation",
  categories: [
    "Philanthropists",
    "Corporate CSR Initiatives",
    "Community Leaders",
    "Spiritual Organisations",
    "Architects & Planners",
    "Volunteers & Professionals",
    "Global Indian Communities",
    "Technology & Infrastructure Partners",
  ],
};

// ---- Contact & footer -----------------------------------------------------
const contact = {
  label: "Get in Touch",
  title: "Connect With Us",
  paragraphs: [
    "We welcome conversations, partnerships and support from individuals and organisations who believe in preserving heritage, strengthening communities and building meaningful institutions rooted in service and dharma.",
  ],
  email: "info@shriakhanddharmatrust.org",
  officeCountry: "India",
  officeRegion: "Mathura, Uttar Pradesh",
  formTitle: "Send a Message",
};

const footer = {
  blurb:
    "A spiritual, cultural and charitable institution preserving India's heritage and serving humanity.",
  registrationNumber: "161/2026-27",
  address: "7, Old Income Tax Office Compound, Brij Nagar, Mathura (281001)",
  phones: "+91 92174 96213 · +91 96270 77778",
  motto: "FAITH · PEACE · MEANING · CONNECTION",
};

// ============================== SLIDESHOW DATA ===============================

// Trust page slideshow source — folder ID lives in src/trust/content.ts.
const getTrustCarouselImages = createServerFn({ method: "GET" }).handler(
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

// ============================== HEADER =======================================

// Header for the standalone Trust page. Menu items live in ./content.ts.
export function TrustHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="trust-header fixed top-0 inset-x-0 z-50 bg-navy border-b border-gold/20 shadow-[var(--shadow-card)] text-navy-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 h-16 md:h-20 grid grid-cols-[minmax(0,1fr)_auto] gap-2 items-center lg:flex lg:justify-between">
        <a href="/trust" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
          <img
            src={trustImages.logo}
            alt={`${trustName} emblem`}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-gold/40 object-cover flex-none"
          />
          <div className="leading-tight min-w-0">
            <div className="font-display text-xs sm:text-sm tracking-normal sm:tracking-[0.25em] truncate">
              {brandLine1}
            </div>
            <div className="font-display text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-gold truncate">
              {trustSuffix.toUpperCase()}
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm">
          {trustNavLinks.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-gold transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="/trust#partner"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-md bg-gold text-navy font-medium text-sm hover:bg-gold-soft transition-colors"
        >
          Become a Partner
        </a>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          aria-controls="trust-mobile-menu"
          className="lg:hidden shrink-0 w-11 h-11 text-ivory hover:bg-navy hover:text-gold"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      <div
        id="trust-mobile-menu"
        inert={!open}
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain px-5 sm:px-8 pb-6 pt-2 border-t border-gold/15">
          <nav className="flex flex-col">
            {trustNavLinks.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-ivory/90 hover:text-gold border-b border-gold/10 last:border-b-0"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="/trust#partner"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center px-5 py-3 rounded-md bg-gold text-navy font-medium"
          >
            Become a Partner
          </a>
        </div>
      </div>
    </header>
  );
}

// ============================== SLIDESHOW ====================================

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

function TrustCarousel() {
  const fetchImages = useServerFn(getTrustCarouselImages);
  const { data } = useQuery({ queryKey: ["trust-carousel"], queryFn: () => fetchImages() });
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
    <section aria-label="Photo highlights" className="bg-ivory pt-12 sm:pt-16 pb-0 -mb-4 sm:-mb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-gold tracking-wide">
          {carouselTitle}
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
                    to="/trust/gallery"
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
              <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Previous photos"
                onClick={() => go(-1)}
                className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-1/2 h-11 w-11 rounded-full bg-navy text-gold border border-gold/50 hover:bg-gold hover:text-navy"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Next photos"
                onClick={() => go(1)}
                className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-1/2 h-11 w-11 rounded-full bg-navy text-gold border border-gold/50 hover:bg-gold hover:text-navy"
              >
                <ChevronRight size={20} />
              </Button>
            </>
          )}
        </div>
        {maxIndex > 0 && (
          <div className="flex justify-center gap-1 pt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <Button
                variant="ghost"
                size="icon"
                key={i}
                type="button"
                aria-label={`Show photos from ${i + 1}`}
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="h-11 w-11 hover:bg-gold/10"
              >
                <span className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-2 bg-navy/30"}`} />
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================== PAGE =========================================

function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-[11px] sm:text-xs font-medium ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-6 sm:w-8 bg-gold" />
      <span>{children}</span>
      {center && <span className="h-px w-6 sm:w-8 bg-gold" />}
    </div>
  );
}

function TrustPage() {
  return (
    <div className="trust-page min-h-screen bg-ivory text-charcoal antialiased">
      <TrustHeader />

      {/* HERO */}
      <section id="top" className="relative flex items-center text-navy-foreground overflow-hidden">
        <div
          className="absolute inset-0 bg-navy bg-cover bg-no-repeat"
          style={{
            backgroundPosition: "center 30%",
            backgroundImage: `linear-gradient(180deg, oklch(0.22 0.05 255 / 0.82) 0%, oklch(0.22 0.05 255 / 0.75) 45%, oklch(0.22 0.05 255 / 0.92) 100%), url(${trustImages.hero})`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-24 pb-10 sm:pt-32 sm:pb-16 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-[11px] sm:text-xs mb-6 sm:mb-8">
              <span className="h-px w-8 bg-gold" />
              <span>{hero.eyebrow}</span>
            </div>
            <h1 className="font-display text-4xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl tracking-normal">
              {hero.titleLine1}
              <br />
              <span className="text-gold">{hero.titleLine2}</span>
            </h1>
            <p className="mt-6 sm:mt-8 font-display text-xl sm:text-xl md:text-2xl text-ivory/90 tracking-wide">
              {hero.tagline}
            </p>
            <p className="mt-5 sm:mt-7 text-base sm:text-base md:text-lg text-ivory/80 leading-relaxed max-w-2xl">
              {hero.intro}
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#vision"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-md bg-gold text-navy font-medium hover:bg-gold-soft transition-colors shadow-[var(--shadow-elegant)]"
              >
                {hero.buttons.vision}
              </a>
              <a
                href="#partner"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-md border border-gold/60 text-ivory hover:bg-gold/10 transition-colors"
              >
                {hero.buttons.partner}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center sm:px-2 py-3 text-ivory hover:text-gold transition-colors gap-1"
              >
                {hero.buttons.contact} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/70 text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </div>
      </section>

      <TrustCarousel />

      {/* ABOUT */}
      <section id="about" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionLabel>{about.label}</SectionLabel>
            <h2 className="mt-5 sm:mt-6 font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-navy leading-tight">
              {about.titleLine1}
              <br className="hidden sm:block" /> {about.titleLine2}
            </h2>
            <div className="mt-6 sm:mt-8 h-px w-16 bg-gold" />
          </div>
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-[17px] sm:text-lg leading-relaxed text-charcoal/85">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision" className="section-pad bg-beige">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
            <article className="min-w-0 bg-ivory p-5 sm:p-10 md:p-14 rounded-lg shadow-[var(--shadow-card)] border-t-4 border-gold">
              <SectionLabel>{vision.label}</SectionLabel>
              <h3 className="mt-5 font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-navy">{vision.title}</h3>
              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-charcoal/85 leading-relaxed text-[17px] sm:text-base">
                {vision.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
            <article className="min-w-0 bg-navy text-navy-foreground p-5 sm:p-10 md:p-14 rounded-lg shadow-[var(--shadow-elegant)] border-t-4 border-gold">
              <SectionLabel>{mission.label}</SectionLabel>
              <h3 className="mt-5 font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-gold">{mission.title}</h3>
              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-ivory/85 leading-relaxed text-[17px] sm:text-base">
                {mission.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="values" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel center>{valuesSection.label}</SectionLabel>
            <h2 className="mt-5 sm:mt-6 font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-navy">
              {valuesSection.title}
            </h2>
            <p className="mt-5 sm:mt-6 text-[17px] sm:text-base text-charcoal/75 leading-relaxed">{valuesSection.intro}</p>
          </div>
          <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {valuesSection.items.map((v, i) => (
              <div key={v.title} className="group bg-ivory p-6 sm:p-8 lg:p-10 hover:bg-beige transition-colors">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3">
                  <span className="shrink-0 font-display text-gold/70 text-sm">0{i + 1}</span>
                  <h3 className="min-w-0 font-display font-semibold text-xl sm:text-2xl text-navy">{v.title}</h3>
                </div>
                <div className="mt-4 h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />
                <p className="mt-4 sm:mt-5 text-[17px] sm:text-base text-charcoal/75 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNIFICANCE */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 text-center">
          <SectionLabel center>{significance.label}</SectionLabel>
          <h2 className="mt-5 sm:mt-6 font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-navy leading-tight">
            {significance.title}
          </h2>
          <div className="mt-6 sm:mt-8 mx-auto h-px w-16 sm:w-20 bg-gold" />
          <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6 text-[17px] sm:text-lg leading-relaxed text-charcoal/85">
            {significance.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="font-display text-lg sm:text-xl text-navy italic border-l-2 border-gold pl-5 sm:pl-6 max-w-2xl mx-auto">
              {significance.quote}
            </p>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner" className="section-pad bg-sand">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>{partner.label}</SectionLabel>
            <h2 className="mt-5 sm:mt-6 font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-navy leading-tight">
              {partner.title}
            </h2>
            <p className="mt-6 sm:mt-8 text-charcoal/85 leading-relaxed text-[17px] sm:text-base">{partner.intro}</p>
            <a
              href="#contact"
              className="mt-8 sm:mt-10 inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition-colors gap-2"
            >
              {partner.button} <ArrowRight size={16} />
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-px bg-navy/15 border border-navy/15 rounded-lg overflow-hidden">
              {partner.categories.map((p, i) => (
                <div key={p} className="min-w-0 bg-ivory p-5 sm:p-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                  <span className="shrink-0 font-display text-gold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 text-navy font-medium text-[17px] sm:text-base">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad bg-ivory">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 text-center">
          <SectionLabel center>{contact.label}</SectionLabel>
          <h2 className="mt-5 sm:mt-6 font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-navy">{contact.title}</h2>
          <div className="mt-6 sm:mt-8 mx-auto h-px w-16 sm:w-20 bg-gold" />
          {contact.paragraphs.map((p, i) => (
            <p
              key={p}
              className={`${i === 0 ? "mt-8 sm:mt-10" : "mt-5"} text-[17px] sm:text-lg leading-relaxed text-charcoal/85`}
            >
              {p}
            </p>
          ))}

          <div className="mt-10 sm:mt-12 grid lg:grid-cols-5 gap-6 sm:gap-8 text-left">
            <div className="min-w-0 lg:col-span-2 space-y-4 sm:space-y-5">
              <a
                href={`mailto:${contact.email}`}
                className="group block min-w-0 p-4 sm:p-7 rounded-lg border border-border bg-card hover:border-gold/60 hover:shadow-[var(--shadow-card)] transition-all"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
                  <Mail size={14} /> Email
                </div>
                <div className="mt-3 font-display text-[13px] sm:text-sm text-navy group-hover:text-copper transition-colors break-words">
                  {contact.email}
                </div>
              </a>
              <div className="p-6 sm:p-7 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
                  <MapPin size={14} /> Offices
                </div>
                <div className="mt-3 font-display text-base sm:text-base text-navy">{contact.officeCountry}</div>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{contact.officeRegion}</p>
              </div>
            </div>
            <div className="trust-contact-form min-w-0 lg:col-span-3 p-4 sm:p-8 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold mb-5 sm:mb-6">
                <span className="h-px w-6 bg-gold" /> {contact.formTitle}
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 xl:gap-16 items-start [&>div]:min-w-0">
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-4">
                <img
                  src={trustImages.logo}
                  alt=""
                  className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full ring-1 ring-gold/40 object-cover"
                />
                <div className="leading-tight">
                  <div className="font-display text-sm md:text-base tracking-[0.2em]">{brandLine1}</div>
                  <div className="font-display text-sm md:text-base tracking-[0.2em] text-gold">
                    {trustSuffix.toUpperCase()}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-ivory/70 leading-relaxed text-[15px] sm:text-sm">{footer.blurb}</p>
              <p className="mt-4 text-ivory/60 text-[13px] sm:text-xs">
                Trust Registration No.: <span className="text-gold">{footer.registrationNumber}</span>
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Reach</div>
              <ul className="mt-5 space-y-3 text-ivory/85 text-[15px] sm:text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="text-gold flex-none mt-1" /> <span>{footer.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="text-gold flex-none" />{" "}
                  <a href={`mailto:${contact.email}`} className="hover:text-gold break-all">
                    {contact.email}
                  </a>
                </li>
                <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <Globe size={14} className="text-gold mt-1 shrink-0" /> <span className="min-w-0">{footer.phones}</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Navigate</div>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-ivory/85 text-[15px] sm:text-sm">
                {trustNavLinks.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-gold">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 sm:mt-14 md:mt-16 pt-6 sm:pt-8 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-center md:text-left">
            <div className="font-display tracking-[0.3em] sm:tracking-[0.35em] text-gold">{footer.motto}</div>
            <div className="text-ivory/60">
              © {new Date().getFullYear()} {trustName}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

