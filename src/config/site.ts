/**
 * Single source of truth for identity, contact details, navigation, and
 * site-wide copy. Anything that is not long-form content lives here.
 */
export const site = {
  /**
   * Production origin. Used for canonical URLs, Open Graph tags, the sitemap,
   * and structured data.
   */
  url: "https://portfolio.evanproject.com",
  name: "Stefaron Budhi Santosa",
  firstName: "Evan",
  role: "Software engineer",
  location: "Yogyakarta, Indonesia",
  email: "stefaronbs@gmail.com",
  phone: "+62 813-9221-2950",
  phoneHref: "+6281392212950",
  title: "Evan — Android & Software Engineer",
  description:
    "Android engineer in Yogyakarta. Production Compose POS for Indomaret, Solidity contracts, applied ML, and a published ResNet-50 paper.",

  nav: [
    { label: "Home", href: "/", icon: "house" },
    { label: "Work", href: "/work", icon: "briefcase-business" },
    { label: "Writing", href: "/writing", icon: "pencil" },
    { label: "Contact", href: "/contact", icon: "message-circle" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/Stefaron", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/stefaron-budhi/",
      icon: "linkedin",
    },
    { label: "CV", href: "/cv/stefaron-cv.pdf", icon: "file-text" },
  ],

  cv: {
    label: "Download CV",
    href: "/cv/stefaron-cv.pdf",
  },

  hero: {
    lead: "1.5+ years shipping production Android for Indomaret — a Compose POS headed for 24,351 stores and field apps used across the chain. Also Solidity contracts, applied ML, and a published ResNet-50 paper.",
    stats: [
      { value: "24,351 stores", label: "phased POS rollout · Indomaret" },
      { value: "225M+ transactions", label: "every month, 5-person mobile team" },
      { value: "97.8% accuracy", label: "batik classification · AITI 2026" },
    ],
  },

  footerLinks: [
    { label: "Work", href: "/work" },
    { label: "Experience", href: "/#experience" },
    { label: "Writing", href: "/writing" },
    { label: "FAQ", href: "/#faq" },
  ],
} as const;

export type Site = typeof site;
