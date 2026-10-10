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
import heroBanner from "@/assets/trust/hero-banner.jpg";
import logo from "@/assets/trust/logo.png.asset.json";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Shri Akhand Dharma Trust — Empowering Lives Through Service" },
      {
        name: "description",
        content:
          "Shri Akhand Dharma Trust — a non-profit organisation empowering communities through skill development, education, healthcare, social welfare and self-reliant livelihood initiatives across India.",
      },
      { property: "og:title", content: "Shri Akhand Dharma Trust" },
      { property: "og:description", content: "Empowering lives through faith, service and compassion." },
      { property: "og:url", content: "https://shriakhanddharmatrust.org/trust" },
      { property: "og:image", content: "https://shriakhanddharmatrust.org/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:title", content: "Shri Akhand Dharma Trust" },
      { name: "twitter:description", content: "Empowering lives through faith, service and compassion." },
      { name: "twitter:image", content: "https://shriakhanddharmatrust.org/og-image.png" },
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
const TRUST_CAROUSEL_FOLDER_ID = "1Rk9YUBpb5EZe3tRUa2Iw7qljV_uHneoh";
const carouselTitle = "Our Service in Action";

// ---- Menu (Trust page header & footer) ------------------------------------
const trustNavLinks = [
  { label: "About", href: "/trust#about" },
  { label: "Vision", href: "/trust#vision" },
  { label: "Values", href: "/trust#values" },
  { label: "Gallery", href: "/gallery" },
  { label: "Funders", href: "/funders" },
  { label: "Partner", href: "/trust#partner" },
  { label: "Contact", href: "/trust#contact" },
];

// ---- Hero -----------------------------------------------------------------
const hero = {
  eyebrow: "Est. for Generations to Come",
  titleLine1: "Shri Akhand",
  titleLine2: "Dharma Trust",
  tagline: "Empowering lives through faith, service and compassion.",
  intro:
    "A non-profit organisation dedicated to empowering communities through skill development, education, social welfare and self-reliant livelihood initiatives. The Trust works to promote inclusive growth and improve the quality of life for underprivileged individuals through impactful programmes and partnerships.",
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
    "Shri Akhand Dharma Trust is a non-profit organisation dedicated to fostering a compassionate, inclusive and resilient society, guided by the enduring values of humanity, service and integrity.",
    "The Trust works to uplift underserved communities through impactful initiatives in education, healthcare, poverty alleviation, environmental conservation and social welfare.",
    "By empowering individuals, supporting families and strengthening communities, Shri Akhand Dharma Trust is committed to creating meaningful and lasting social impact. Through collaboration, transparency and selfless service, we strive to build a future where every individual can live with dignity, equality and hope.",
  ],
};

// ---- Vision & Mission -----------------------------------------------------
const vision = {
  label: "Our Vision",
  title: "A Future of Dignity & Opportunity",
  paragraphs: [
    "Our vision is to build a compassionate and resilient society where every individual has access to education, healthcare, dignity, and opportunity. A future where communities prosper, nature is protected, cultural heritage is preserved, and every life is empowered to thrive.",
  ],
};

const mission = {
  label: "Our Mission",
  title: "Enriching Lives, Preserving Heritage",
  paragraphs: [
    "Our mission is to enrich lives through education, healthcare, women and child empowerment, environmental conservation, animal welfare, rural development, skill enhancement, and community welfare.",
    "With compassion, innovation, and a commitment to preserving our cultural heritage, we strive to build a better future for all.",
  ],
};

// ---- Core values ----------------------------------------------------------
const valuesSection = {
  label: "Principles",
  title: "Core Values",
  intro:
    "Shri Akhand Dharma Trust is guided by a strong set of core values that define its mission, actions and long-term vision for serving society with dedication and integrity.",
  items: [
    { title: "Compassion", desc: "We serve with empathy and respect for every individual." },
    { title: "Integrity", desc: "We uphold honesty, transparency and accountability." },
    { title: "Service", desc: "We are committed to selfless service and social welfare." },
    { title: "Inclusivity", desc: "We believe in equality and equal opportunities for all." },
    { title: "Empowerment", desc: "We enable individuals and communities to become self-reliant." },
    { title: "Sustainability", desc: "We promote responsible practices for lasting social and environmental impact." },
    { title: "Collaboration", desc: "We work together to create meaningful and enduring change." },
  ],
};

// ---- Significance ---------------------------------------------------------
const significance = {
  label: "Significance",
  title: "Why These Initiatives Matter",
  paragraphs: [
    "At Shri Akhand Dharma Trust, we believe true progress is rooted in compassion, selfless service, integrity and respect for humanity. Our initiatives apply these values through sustainable, community-driven efforts in education, healthcare, environmental care, cultural preservation and social empowerment.",
    "By honouring heritage while embracing innovation, we work to build stronger communities and a more inclusive, compassionate and resilient future.",
  ],
  quote:
    "\"Designed to transform timeless values into meaningful action, creating lasting social impact through community empowerment, responsible development and selfless service.\"",
};

// ---- Partner --------------------------------------------------------------
const partner = {
  label: "Involvement",
  title: "Partner With Us",
  intro:
    "The Trust welcomes support and participation from individuals and organisations who share our commitment to build infrastructure, networks and an ecosystem that serve society and future generations.",
  button: "Start a Conversation",
  categories: [
    "Philanthropists & Donors",
    "Corporate CSR Partners",
    "Educational Institutions",
    "Healthcare Partners",
    "Community Leaders",
    "Environmental Organisations",
    "Government & Public Sector Bodies",
    "NGOs & Civil Society Organisations",
    "Technology & Infrastructure Partners",
    "Volunteers & Skilled Professionals",
    "Media & Communication Partners",
    "Global Indian Communities",
  ],
};

// ---- Contact & footer -----------------------------------------------------
const contact = {
  label: "Get in Touch",
  title: "Connect With Us",
  paragraphs: [
    "At Shri Akhand Dharma Trust, we believe that meaningful impact is achieved through collective action. We invite individuals, organisations, corporate partners, educational institutions and development agencies to collaborate with us through volunteering, donations or knowledge sharing for advancing education, healthcare, environmental sustainability and community well-being.",
    "Together, we can create lasting solutions that empower lives and strengthen communities for generations to come.",
  ],
  email: "info@shriakhanddharma.org",
  officeCountry: "India",
  officeRegion: "Mathura, Uttar Pradesh",
  formTitle: "Send a Message",
};

const footer = {
  blurb:
    "To drive inclusive and responsible development through strategic partnerships that create lasting social impact.",
  address: "7, Old Income Tax Office Compound, Brij Nagar, Mathura (281001)",
  phones: "+91 92174 96213 · +91 96270 77778",
  motto: "FAITH IN VALUES · SERVICE TO HUMANITY · COMMITMENT TO NATION",
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
function TrustHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-navy/95 backdrop-blur-md border-b border-gold/20 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.4)]"
          : "bg-navy/40 backdrop-blur-sm"
      } text-navy-foreground`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="/trust" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
          <img
            src={trustImages.logo}
            alt={`${trustName} emblem`}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-gold/40 object-cover flex-none"
          />
          <div className="leading-tight min-w-0">
            <div className="font-display text-[13px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] truncate">
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

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-ivory hover:text-gold transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <div className="px-5 sm:px-8 pb-6 pt-2 border-t border-gold/15">
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

// ============================== PAGE =========================================
  brandLine1,

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
    <div className="min-h-screen bg-ivory text-charcoal antialiased">
      <TrustHeader />

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] flex items-center text-navy-foreground overflow-hidden">
        <div
          className="absolute inset-0 bg-navy bg-cover bg-no-repeat"
          style={{
            backgroundPosition: "center 30%",
            backgroundImage: `linear-gradient(180deg, oklch(0.22 0.05 255 / 0.82) 0%, oklch(0.22 0.05 255 / 0.75) 45%, oklch(0.22 0.05 255 / 0.92) 100%), url(${trustImages.hero})`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-28 pb-20 sm:pt-32 sm:pb-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-[11px] sm:text-xs mb-6 sm:mb-8">
              <span className="h-px w-8 bg-gold" />
              <span>{hero.eyebrow}</span>
            </div>
            <h1 className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl tracking-wide">
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
            <article className="bg-ivory p-8 sm:p-10 md:p-14 rounded-lg shadow-[var(--shadow-card)] border-t-4 border-gold">
              <SectionLabel>{vision.label}</SectionLabel>
              <h3 className="mt-5 font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-navy">{vision.title}</h3>
              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-charcoal/85 leading-relaxed text-[17px] sm:text-base">
                {vision.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
            <article className="bg-navy text-navy-foreground p-8 sm:p-10 md:p-14 rounded-lg shadow-[var(--shadow-elegant)] border-t-4 border-gold">
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
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-gold/70 text-sm">0{i + 1}</span>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-navy">{v.title}</h3>
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
                <div key={p} className="bg-ivory p-5 sm:p-6 flex items-center gap-4">
                  <span className="font-display text-gold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-navy font-medium text-[17px] sm:text-base">{p}</span>
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
            <div className="lg:col-span-2 space-y-4 sm:space-y-5">
              <a
                href={`mailto:${contact.email}`}
                className="group block p-6 sm:p-7 rounded-lg border border-border bg-card hover:border-gold/60 hover:shadow-[var(--shadow-card)] transition-all"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
                  <Mail size={14} /> Email
                </div>
                <div className="mt-3 font-display text-sm sm:text-base text-navy group-hover:text-copper transition-colors whitespace-nowrap">
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
            <div className="lg:col-span-3 p-6 sm:p-8 rounded-lg border border-border bg-card">
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
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 items-start">
            <div className="text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
                <img
                  src={trustImages.logo}
                  alt=""
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full ring-1 ring-gold/40 object-cover"
                />
                <div className="leading-tight">
                  <div className="font-display text-sm md:text-base tracking-[0.2em]">{brandLine1}</div>
                  <div className="font-display text-sm md:text-base tracking-[0.2em] text-gold">
                    {trustSuffix.toUpperCase()}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-ivory/70 leading-relaxed text-[15px] sm:text-sm">{footer.blurb}</p>
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
                <li className="flex items-center gap-3">
                  <Globe size={14} className="text-gold flex-none" /> {footer.phones}
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

