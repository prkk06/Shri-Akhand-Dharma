import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/sadt-logo-circular.png.asset.json";

// Single source of truth for the site menu — add new pages/sections here and
// they appear on every page.
export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Vision", href: "/#vision" },
  { label: "Values", href: "/#values" },
  { label: "Gallery", href: "/gallery" },
  { label: "Funders", href: "/funders" },
  { label: "Partner", href: "/#partner" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader({
  overlay = false,
  orgSuffix = "Foundation",
}: {
  overlay?: boolean;
  orgSuffix?: string;
}) {
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

  const solid = !overlay || scrolled || open;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-navy/95 backdrop-blur-md border-b border-gold/20 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.4)]"
            : "bg-navy/40 backdrop-blur-sm"
        } text-navy-foreground`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 h-16 md:h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
            <img
              src={logoImg.url}
              alt={`Shri Akhand Dharma ${orgSuffix} emblem`}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-gold/40 object-cover flex-none"
            />
            <div className="leading-tight min-w-0">
              <div className="font-display text-[13px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] truncate">
                SHRI AKHAND DHARMA
              </div>
              <div className="font-display text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-gold truncate">
                {orgSuffix.toUpperCase()}
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm">
            {NAV_LINKS.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-gold transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href="/#partner"
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
              {NAV_LINKS.map((n) => (
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
              href="/#partner"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center px-5 py-3 rounded-md bg-gold text-navy font-medium"
            >
              Become a Partner
            </a>
          </div>
        </div>
      </header>
      {!overlay && <div aria-hidden className="h-16 md:h-20" />}
    </>
  );
}
