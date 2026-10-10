import { createFileRoute } from "@tanstack/react-router";
import HomePageContent from "@/components/HomePageContent";

// Standalone Trust page — a mirror of the homepage for connecting the
// trust's own domain. Deliberately NOT listed in the header menu
// (see src/components/SiteHeader.tsx NAV_LINKS). The only difference is
// wording: this page reads "Trust" where the main site reads "Foundation".
function TrustPage() {
  return <HomePageContent orgSuffix="Trust" />;
}

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
