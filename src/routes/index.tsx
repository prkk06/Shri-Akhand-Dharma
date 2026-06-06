import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Mail, MapPin, Globe, ArrowRight } from "lucide-react";
import logoImg from "@/assets/sadt-logo.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shri Akhand Dharma Trust — Preserving Heritage. Serving Humanity." },
      {
        name: "description",
        content:
          "A spiritual, cultural and charitable institution preserving India's heritage and supporting humanitarian initiatives across temples, gurudwaras and community institutions.",
      },
      { property: "og:title", content: "Shri Akhand Dharma Trust" },
      { property: "og:description", content: "Preserving Heritage. Inspiring Generations. Serving Humanity." },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Values", href: "#values" },
  { label: "Partner", href: "#partner" },
  { label: "Contact", href: "#contact" },
];

const values = [
  { title: "Faith", desc: "Preserving spiritual traditions and sacred heritage with reverence." },
  { title: "Service", desc: "Supporting communities through meaningful charitable initiatives." },
  { title: "Unity", desc: "Bringing people, traditions and communities together as one." },
  { title: "Heritage", desc: "Protecting India's civilisational and cultural identity for tomorrow." },
  { title: "Integrity", desc: "Ensuring transparent, accountable and responsible governance." },
  { title: "Sustainability", desc: "Building future-ready institutions with long-term, lasting impact." },
];

const partners = [
  "Philanthropists",
  "Corporate CSR Initiatives",
  "Community Leaders",
  "Spiritual Organisations",
  "Architects & Planners",
  "Volunteers & Professionals",
  "Global Indian Communities",
  "Technology & Infrastructure Partners",
];

function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-[10px] sm:text-xs font-medium ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-6 sm:w-8 bg-gold" />
      <span>{children}</span>
      {center && <span className="h-px w-6 sm:w-8 bg-gold" />}
    </div>
  );
}

function Index() {
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

  return (
    <div className="min-h-screen bg-ivory text-charcoal antialiased">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-navy/95 backdrop-blur-md border-b border-gold/20 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.4)]"
            : "bg-navy/40 backdrop-blur-sm"
        } text-navy-foreground`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 h-16 md:h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
            <img
              src={logoImg.url}
              alt="Shri Akhand Dharma Trust emblem"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-gold/40 object-cover flex-none"
            />
            <div className="leading-tight min-w-0">
              <div className="font-display text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] truncate">
                SHRI AKHAND
              </div>
              <div className="font-display text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-gold truncate">
                DHARMA TRUST
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-gold transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href="#partner"
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

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
            open ? "max-h-[80vh]" : "max-h-0"
          }`}
        >
          <div className="px-5 sm:px-8 pb-6 pt-2 border-t border-gold/15">
            <nav className="flex flex-col">
              {nav.map((n) => (
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
              href="#partner"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center px-5 py-3 rounded-md bg-gold text-navy font-medium"
            >
              Become a Partner
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative min-h-[100svh] flex items-center text-navy-foreground overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-navy bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, oklch(0.22 0.05 255 / 0.82) 0%, oklch(0.22 0.05 255 / 0.75) 45%, oklch(0.22 0.05 255 / 0.92) 100%), url('https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-28 pb-20 sm:pt-32 sm:pb-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-6 sm:mb-8">
              <span className="h-px w-8 bg-gold" />
              <span>Est. for Generations to Come</span>
            </div>
            <h1 className="font-display text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl tracking-wide">
              Shri Akhand
              <br />
              <span className="text-gold">Dharma Trust</span>
            </h1>
            <p className="mt-6 sm:mt-8 font-display text-lg sm:text-xl md:text-2xl text-ivory/90 tracking-wide">
              Preserving Heritage. Inspiring Generations. Serving Humanity.
            </p>
            <p className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-ivory/80 leading-relaxed max-w-2xl">
              A spiritual, cultural and charitable institution dedicated to preserving India's religious heritage,
              strengthening communities and supporting humanitarian initiatives through collective participation and
              responsible development.
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#vision"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-md bg-gold text-navy font-medium hover:bg-gold-soft transition-colors shadow-[var(--shadow-elegant)]"
              >
                Explore the Vision
              </a>
              <a
                href="#partner"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-md border border-gold/60 text-ivory hover:bg-gold/10 transition-colors"
              >
                Become a Partner
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center sm:px-2 py-3 text-ivory hover:text-gold transition-colors gap-1"
              >
                Contact Us <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/70 text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-5 sm:mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-navy leading-tight">
              About Shri Akhand
              <br className="hidden sm:block" /> Dharma Trust
            </h2>
            <div className="mt-6 sm:mt-8 h-px w-16 bg-gold" />
          </div>
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed text-charcoal/85">
            <p>
              Shri Akhand Dharma Trust is committed to preserving and strengthening India's spiritual and cultural
              heritage by supporting the renovation, development and maintenance of temples, gurudwaras and other
              religious institutions across the country.
            </p>
            <p>
              The Trust also supports NGOs and charitable organisations engaged in spiritual development, child welfare,
              education, humanitarian activities and community wellbeing.
            </p>
            <p>
              With a long-term vision focused on service, heritage preservation and social responsibility, the Trust
              seeks to create sustainable institutions that positively impact both faith-based communities and society
              at large.
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision" className="section-pad bg-beige">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
            <article className="bg-ivory p-8 sm:p-10 md:p-14 rounded-lg shadow-[var(--shadow-card)] border-t-4 border-gold">
              <SectionLabel>Our Vision</SectionLabel>
              <h3 className="mt-5 font-display text-2xl sm:text-3xl md:text-4xl text-navy">A Living Heritage</h3>
              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-charcoal/85 leading-relaxed text-sm sm:text-base">
                <p>
                  Dedicated to preserving and strengthening India's spiritual heritage by supporting the renovation,
                  development and maintenance of temples, gurudwaras and other religious institutions across the
                  country.
                </p>
                <p>
                  The Trust also supports deserving NGOs and charitable organisations engaged in spiritual and social
                  welfare activities — including child welfare, education and humanitarian causes.
                </p>
              </div>
            </article>
            <article className="bg-navy text-navy-foreground p-8 sm:p-10 md:p-14 rounded-lg shadow-[var(--shadow-elegant)] border-t-4 border-gold">
              <SectionLabel>Our Mission</SectionLabel>
              <h3 className="mt-5 font-display text-2xl sm:text-3xl md:text-4xl text-gold">A Unified Platform</h3>
              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-ivory/85 leading-relaxed text-sm sm:text-base">
                <p>
                  To establish a unified and accessible platform that brings together temples, gurudwaras and spiritual
                  institutions in one ecosystem — promoting spiritual growth, cultural preservation and community
                  engagement.
                </p>
                <p>
                  The Trust seeks to enhance awareness among younger generations, strengthen India's religious heritage
                  and ensure affordable access to spiritual and cultural experiences for all.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="values" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel center>Principles</SectionLabel>
            <h2 className="mt-5 sm:mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-navy">Core Values</h2>
            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-charcoal/75 leading-relaxed">
              Six guiding principles that shape every initiative we undertake and every institution we build.
            </p>
          </div>
          <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {values.map((v, i) => (
              <div key={v.title} className="group bg-ivory p-6 sm:p-8 lg:p-10 hover:bg-beige transition-colors">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-gold/70 text-sm">0{i + 1}</span>
                  <h3 className="font-display text-xl sm:text-2xl text-navy">{v.title}</h3>
                </div>
                <div className="mt-4 h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />
                <p className="mt-4 sm:mt-5 text-sm sm:text-base text-charcoal/75 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIVANANA section removed */}


      {/* WHY IT MATTERS */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 text-center">
          <SectionLabel center>Significance</SectionLabel>
          <h2 className="mt-5 sm:mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-navy leading-tight">
            Why This Initiative Matters
          </h2>
          <div className="mt-6 sm:mt-8 mx-auto h-px w-16 sm:w-20 bg-gold" />
          <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed text-charcoal/85">
            <p>
              India's spiritual and cultural traditions represent one of the world's oldest living civilisations. In a
              rapidly changing world, preserving these values while making them accessible to future generations has
              become increasingly important.
            </p>
            <p>
              Shri Akhand Dharma Trust aims to bridge heritage and modernity through sustainable institutions that
              support spirituality, community wellbeing, education and cultural continuity.
            </p>
            <p className="font-display text-lg sm:text-xl text-navy italic border-l-2 border-gold pl-5 sm:pl-6 text-left max-w-2xl mx-auto">
              "Designed not only to preserve tradition, but to create meaningful social impact through service,
              awareness, participation and responsible development."
            </p>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner" className="section-pad bg-sand">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>Involvement</SectionLabel>
            <h2 className="mt-5 sm:mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-navy leading-tight">
              Partner With Us
            </h2>
            <p className="mt-6 sm:mt-8 text-charcoal/85 leading-relaxed text-sm sm:text-base">
              The Trust welcomes support and participation from individuals and organisations who share our commitment
              to building institutions that serve society and future generations.
            </p>
            <a
              href="#contact"
              className="mt-8 sm:mt-10 inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition-colors gap-2"
            >
              Start a Conversation <ArrowRight size={16} />
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-px bg-navy/15 border border-navy/15 rounded-lg overflow-hidden">
              {partners.map((p, i) => (
                <div key={p} className="bg-ivory p-5 sm:p-6 flex items-center gap-4">
                  <span className="font-display text-gold text-sm">0{i + 1}</span>
                  <span className="text-navy font-medium text-sm sm:text-base">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad bg-ivory">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 text-center">
          <SectionLabel center>Get in Touch</SectionLabel>
          <h2 className="mt-5 sm:mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-navy">Connect With Us</h2>
          <div className="mt-6 sm:mt-8 mx-auto h-px w-16 sm:w-20 bg-gold" />
          <p className="mt-8 sm:mt-10 text-base sm:text-lg leading-relaxed text-charcoal/85">
            We welcome conversations, partnerships and support from individuals and organisations who believe in
            preserving heritage, strengthening communities and building meaningful institutions rooted in service and
            dharma.
          </p>
          <div className="mt-10 sm:mt-12 grid sm:grid-cols-2 gap-4 sm:gap-6 text-left">
            <a
              href="mailto:info@akhanddharma.org"
              className="group p-6 sm:p-8 rounded-lg border border-border bg-card hover:border-gold/60 hover:shadow-[var(--shadow-card)] transition-all"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
                <Mail size={14} /> Email
              </div>
              <div className="mt-3 font-display text-lg sm:text-2xl text-navy group-hover:text-copper transition-colors break-all">
                info@akhanddharma.org
              </div>
            </a>
            <div className="p-6 sm:p-8 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
                <MapPin size={14} /> Offices
              </div>
              <div className="mt-3 font-display text-lg sm:text-2xl text-navy">India · United Kingdom</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 items-start">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logoImg.url}
                  alt=""
                  className="w-10 h-10 rounded-full ring-1 ring-gold/40 object-cover"
                />
                <div className="font-display text-sm md:text-base tracking-[0.2em]">
                  SHRI AKHAND DHARMA TRUST
                </div>
              </div>
              <p className="mt-5 text-ivory/70 leading-relaxed text-sm">
                A spiritual, cultural and charitable institution preserving India's heritage and serving humanity.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Reach</div>
              <ul className="mt-5 space-y-3 text-ivory/85 text-sm">
                <li className="flex items-center gap-3"><MapPin size={14} className="text-gold flex-none" /> India · United Kingdom</li>
                <li className="flex items-center gap-3"><Mail size={14} className="text-gold flex-none" /> <a href="mailto:info@akhanddharma.org" className="hover:text-gold break-all">info@akhanddharma.org</a></li>
                <li className="flex items-center gap-3"><Globe size={14} className="text-gold flex-none" /> <a href="https://www.akhanddharma.org" className="hover:text-gold">www.akhanddharma.org</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Navigate</div>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-ivory/85 text-sm">
                {nav.map((n) => (
                  <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-center md:text-left">
            <div className="font-display tracking-[0.3em] sm:tracking-[0.35em] text-gold">
              FAITH · PEACE · MEANING · CONNECTION
            </div>
            <div className="text-ivory/60">
              © {new Date().getFullYear()} Shri Akhand Dharma Trust. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
