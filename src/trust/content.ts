// ============================================================================
// TRUST PAGE — ALL EDITABLE CONTENT & IMAGE SOURCES (route: /trust)
// ----------------------------------------------------------------------------
// This file is independent of the Foundation homepage (src/components/
// HomePageContent.tsx). Change text, links, images or the Google Drive folder
// here and only the Trust page is affected.
// ============================================================================
import heroBanner from "./assets/hero-banner.jpg";
import logo from "./assets/logo.png.asset.json";

export const trustName = "Shri Akhand Dharma Trust";
export const trustSuffix = "Trust"; // second line of the logo text
export const brandLine1 = "SHRI AKHAND DHARMA";

// ---- Image sources --------------------------------------------------------
export const trustImages = {
  /** Opening banner background (replace the file in src/trust/assets/). */
  hero: heroBanner,
  /** Circular emblem used in header and footer. */
  logo: logo.url,
};

/** Google Drive folder that feeds the "Our Service in Action" slideshow. */
export const TRUST_CAROUSEL_FOLDER_ID = "1Rk9YUBpb5EZe3tRUa2Iw7qljV_uHneoh";
export const carouselTitle = "Our Service in Action";

// ---- Menu (Trust page header & footer) ------------------------------------
export const trustNavLinks = [
  { label: "About", href: "/trust#about" },
  { label: "Vision", href: "/trust#vision" },
  { label: "Values", href: "/trust#values" },
  { label: "Gallery", href: "/gallery" },
  { label: "Funders", href: "/funders" },
  { label: "Partner", href: "/trust#partner" },
  { label: "Contact", href: "/trust#contact" },
];

// ---- Hero -----------------------------------------------------------------
export const hero = {
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
export const about = {
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
export const vision = {
  label: "Our Vision",
  title: "A Future of Dignity & Opportunity",
  paragraphs: [
    "Our vision is to build a compassionate and resilient society where every individual has access to education, healthcare, dignity, and opportunity. A future where communities prosper, nature is protected, cultural heritage is preserved, and every life is empowered to thrive.",
  ],
};

export const mission = {
  label: "Our Mission",
  title: "Enriching Lives, Preserving Heritage",
  paragraphs: [
    "Our mission is to enrich lives through education, healthcare, women and child empowerment, environmental conservation, animal welfare, rural development, skill enhancement, and community welfare.",
    "With compassion, innovation, and a commitment to preserving our cultural heritage, we strive to build a better future for all.",
  ],
};

// ---- Core values ----------------------------------------------------------
export const valuesSection = {
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
export const significance = {
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
export const partner = {
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
export const contact = {
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

export const footer = {
  blurb:
    "To drive inclusive and responsible development through strategic partnerships that create lasting social impact.",
  address: "7, Old Income Tax Office Compound, Brij Nagar, Mathura (281001)",
  phones: "+91 92174 96213 · +91 96270 77778",
  motto: "FAITH IN VALUES · SERVICE TO HUMANITY · COMMITMENT TO NATION",
};
