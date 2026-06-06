import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-temple.jpg";
import trivananaImg from "@/assets/trivanana.jpg";
import heritageImg from "@/assets/heritage-detail.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shri Akhand Dharma Trust — Preserving Heritage. Serving Humanity." },
      {
        name: "description",
        content:
          "A spiritual, cultural and charitable institution preserving India's heritage and supporting humanitarian initiatives. Discover Trivanana, our flagship initiative in Uttar Pradesh.",
      },
      { property: "og:title", content: "Shri Akhand Dharma Trust" },
      { property: "og:description", content: "Preserving Heritage. Inspiring Generations. Serving Humanity." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Trivanana", href: "#trivanana" },
  { label: "Partner", href: "#partner" },
  { label: "Contact", href: "#contact" },
];

const values = [
  { title: "Faith", desc: "Preserving spiritual traditions and sacred heritage." },
  { title: "Service", desc: "Supporting communities through meaningful charitable initiatives." },
  { title: "Unity", desc: "Bringing people, traditions and communities together." },
  { title: "Heritage", desc: "Protecting India's civilisational and cultural identity." },
  { title: "Integrity", desc: "Ensuring transparent and responsible governance." },
  { title: "Sustainability", desc: "Building future-ready institutions with long-term impact." },
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

function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M24 8 C30 16, 30 32, 24 40 C18 32, 18 16, 24 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 24 C16 18, 32 18, 40 24 C32 30, 16 30, 8 24 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-xs font-medium">
      <span className="h-px w-8 bg-gold" />
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-navy/85 text-navy-foreground border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <Emblem className="w-9 h-9 text-gold" />
            <div className="leading-tight">
              <div className="font-display text-sm tracking-[0.25em]">SHRI AKHAND</div>
              <div className="font-display text-[10px] tracking-[0.4em] text-gold">DHARMA TRUST</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-gold transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#partner"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-md bg-gold text-navy font-medium text-sm hover:bg-gold-soft transition-colors"
          >
            Become a Partner
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center text-navy-foreground overflow-hidden">
        <img
          src={heroImg}
          alt="Heritage temple complex at sunrise"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-32 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-gold uppercase tracking-[0.35em] text-xs mb-8">
              <Emblem className="w-5 h-5" />
              <span>Est. for Generations to Come</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-wide">
              Shri Akhand
              <br />
              <span className="text-gold">Dharma Trust</span>
            </h1>
            <p className="mt-8 font-display text-xl md:text-2xl text-ivory/90 tracking-wide">
              Preserving Heritage. Inspiring Generations. Serving Humanity.
            </p>
            <p className="mt-8 text-base md:text-lg text-ivory/80 leading-relaxed max-w-2xl">
              A spiritual, cultural and charitable institution dedicated to preserving India's religious heritage,
              strengthening communities and supporting humanitarian initiatives through collective participation and
              responsible development.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#vision"
                className="inline-flex items-center px-7 py-3.5 rounded-md bg-gold text-navy font-medium hover:bg-gold-soft transition-colors shadow-[var(--shadow-elegant)]"
              >
                Explore the Vision
              </a>
              <a
                href="#partner"
                className="inline-flex items-center px-7 py-3.5 rounded-md border border-gold/60 text-ivory hover:bg-gold/10 transition-colors"
              >
                Become a Partner
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-3.5 rounded-md text-ivory hover:text-gold transition-colors"
              >
                Contact Us →
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70 text-xs tracking-[0.4em] uppercase">
          Scroll
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-navy leading-tight">
              About Shri Akhand
              <br />
              Dharma Trust
            </h2>
            <div className="mt-8 h-px w-16 bg-gold" />
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-charcoal/85">
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
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10">
            <article className="bg-ivory p-10 md:p-14 rounded-lg shadow-[var(--shadow-card)] border-t-4 border-gold">
              <SectionLabel>Our Vision</SectionLabel>
              <h3 className="mt-6 font-display text-3xl md:text-4xl text-navy">A Living Heritage</h3>
              <div className="mt-6 space-y-5 text-charcoal/85 leading-relaxed">
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
            <article className="bg-navy text-navy-foreground p-10 md:p-14 rounded-lg shadow-[var(--shadow-elegant)] border-t-4 border-gold">
              <SectionLabel>Our Mission</SectionLabel>
              <h3 className="mt-6 font-display text-3xl md:text-4xl text-gold">A Unified Platform</h3>
              <div className="mt-6 space-y-5 text-ivory/85 leading-relaxed">
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
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center"><SectionLabel>Principles</SectionLabel></div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-navy">Core Values</h2>
            <p className="mt-6 text-charcoal/75">
              Six guiding principles that shape every initiative we undertake and every institution we build.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group bg-ivory p-10 hover:bg-beige transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-gold/70 text-sm">0{i + 1}</span>
                  <h3 className="font-display text-2xl text-navy">{v.title}</h3>
                </div>
                <div className="mt-4 h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />
                <p className="mt-5 text-charcoal/75 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIVANANA */}
      <section id="trivanana" className="relative bg-navy text-navy-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heritageImg} alt="" width={1400} height={1000} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative section-pad">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6">
                <SectionLabel>Project One</SectionLabel>
                <h2 className="mt-6 font-display text-5xl md:text-6xl text-gold tracking-wide">Trivanana</h2>
                <p className="mt-6 font-display text-xl text-ivory/85 leading-relaxed">
                  A landmark spiritual, cultural and community destination — reflecting India's diverse dharmic heritage
                  within one integrated environment.
                </p>
                <p className="mt-6 text-ivory/75 leading-relaxed">
                  Envisioned as the flagship initiative of Shri Akhand Dharma Trust in Uttar Pradesh, Trivanana
                  combines spirituality, cultural continuity, charitable service and community participation in a
                  future-ready institution.
                </p>

                <ul className="mt-10 space-y-4">
                  {[
                    "A centre for spiritual reflection and cultural learning",
                    "A platform for community engagement and social impact",
                    "A destination for heritage preservation and cultural tourism",
                    "A sustainable institution supported by modern infrastructure",
                    "A symbol of unity across traditions and generations",
                  ].map((item) => (
                    <li key={item} className="flex gap-4 text-ivory/85">
                      <span className="mt-2 h-px w-6 bg-gold flex-none" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6">
                <div className="relative">
                  <div className="absolute -inset-4 border border-gold/40 rounded-lg" />
                  <img
                    src={trivananaImg}
                    alt="Trivanana campus rendering"
                    width={1600}
                    height={1100}
                    loading="lazy"
                    className="relative rounded-lg shadow-[var(--shadow-elegant)] w-full h-auto"
                  />
                </div>
                <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                  {[
                    { k: "1", v: "Flagship Campus" },
                    { k: "∞", v: "Generations Served" },
                    { k: "UP", v: "Uttar Pradesh, India" },
                  ].map((s) => (
                    <div key={s.v} className="border-t border-gold/30 pt-4">
                      <div className="font-display text-3xl text-gold">{s.k}</div>
                      <div className="text-xs uppercase tracking-widest text-ivory/60 mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <SectionLabel><span className="mx-auto">Significance</span></SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-navy leading-tight">
            Why This Initiative Matters
          </h2>
          <div className="mt-8 mx-auto h-px w-20 bg-gold" />
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-charcoal/85">
            <p>
              India's spiritual and cultural traditions represent one of the world's oldest living civilisations. In a
              rapidly changing world, preserving these values while making them accessible to future generations has
              become increasingly important.
            </p>
            <p>
              Shri Akhand Dharma Trust aims to bridge heritage and modernity through sustainable institutions that
              support spirituality, community wellbeing, education and cultural continuity.
            </p>
            <p className="font-display text-xl text-navy italic">
              "Designed not only to preserve tradition, but to create meaningful social impact through service,
              awareness, participation and responsible development."
            </p>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner" className="section-pad bg-sand">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>Involvement</SectionLabel>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-navy leading-tight">
              Partner With Us
            </h2>
            <p className="mt-8 text-charcoal/85 leading-relaxed">
              The Trust welcomes support and participation from individuals and organisations who share our commitment
              to building institutions that serve society and future generations.
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center px-7 py-3.5 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition-colors"
            >
              Start a Conversation
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-px bg-navy/15 border border-navy/15 rounded-lg overflow-hidden">
              {partners.map((p, i) => (
                <div key={p} className="bg-ivory p-6 flex items-center gap-4">
                  <span className="font-display text-gold text-sm">0{i + 1}</span>
                  <span className="text-navy font-medium">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad bg-ivory">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <SectionLabel><span className="mx-auto">Get in Touch</span></SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-navy">Connect With Us</h2>
          <div className="mt-8 mx-auto h-px w-20 bg-gold" />
          <p className="mt-10 text-lg leading-relaxed text-charcoal/85">
            We welcome conversations, partnerships and support from individuals and organisations who believe in
            preserving heritage, strengthening communities and building meaningful institutions rooted in service and
            dharma.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 gap-6 text-left">
            <div className="p-8 rounded-lg border border-border bg-card">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Email</div>
              <a href="mailto:info@akhanddharma.org" className="mt-3 block font-display text-2xl text-navy hover:text-copper transition-colors">
                info@akhanddharma.org
              </a>
            </div>
            <div className="p-8 rounded-lg border border-border bg-card">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Offices</div>
              <div className="mt-3 font-display text-2xl text-navy">India · United Kingdom</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3">
                <Emblem className="w-10 h-10 text-gold" />
                <div className="font-display text-lg tracking-[0.2em]">SHRI AKHAND DHARMA TRUST</div>
              </div>
              <p className="mt-6 text-ivory/70 leading-relaxed text-sm">
                A spiritual, cultural and charitable institution preserving India's heritage and serving humanity.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Reach</div>
              <ul className="mt-5 space-y-2 text-ivory/85">
                <li>India · United Kingdom</li>
                <li><a href="mailto:info@akhanddharma.org" className="hover:text-gold">info@akhanddharma.org</a></li>
                <li><a href="https://www.akhanddharma.org" className="hover:text-gold">www.akhanddharma.org</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Navigate</div>
              <ul className="mt-5 space-y-2 text-ivory/85">
                {nav.map((n) => (
                  <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="font-display tracking-[0.35em] text-gold">
              FAITH · INNER PEACE · MEANING · CONNECTION
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
