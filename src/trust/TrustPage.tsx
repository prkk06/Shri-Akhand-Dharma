// Standalone Trust page body (route: /trust). Independent of the Foundation
// homepage — all wording and image sources come from ./content.ts.
import { Mail, MapPin, Globe, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import TrustHeader from "./TrustHeader";
import TrustCarousel from "./TrustCarousel";
import {
  about,
  brandLine1,
  contact,
  footer,
  hero,
  mission,
  partner,
  significance,
  trustImages,
  trustName,
  trustNavLinks,
  trustSuffix,
  valuesSection,
  vision,
} from "./content";

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

export default function TrustPage() {
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
