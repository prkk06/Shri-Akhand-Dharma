import { createFileRoute } from "@tanstack/react-router";
import HomePageContent from "@/components/HomePageContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shri Akhand Dharma Foundation — Empowering Lives Through Service" },
      {
        name: "description",
        content:
          "A non-profit organisation empowering communities through skill development, education, healthcare, social welfare and self-reliant livelihood initiatives across India.",
      },
      { property: "og:title", content: "Shri Akhand Dharma Foundation" },
      { property: "og:description", content: "Empowering lives through faith, service and compassion." },
      { property: "og:url", content: "https://shriakhanddharmatrust.org/" },
      { property: "og:image", content: "https://shriakhanddharmatrust.org/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:title", content: "Shri Akhand Dharma Foundation" },
      { name: "twitter:description", content: "Empowering lives through faith, service and compassion." },

      { name: "twitter:image", content: "https://shriakhanddharmatrust.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://shriakhanddharmatrust.org/" }],
  }),
  component: HomePageContent,
});
