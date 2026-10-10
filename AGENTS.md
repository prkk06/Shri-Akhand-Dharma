
- The Foundation homepage body lives in src/components/HomePageContent.tsx (route "/"). The Trust page (route "/trust") is fully separate: all its text, nav links, image sources and Drive slideshow folder are in src/trust/content.ts, rendered by src/trust/TrustPage.tsx — edit each independently. /trust is intentionally absent from the header menu.
