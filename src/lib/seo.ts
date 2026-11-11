import { site } from "../config/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).href;
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.firstName,
    url: site.url,
    image: absoluteUrl("/og-image.png"),
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    telephone: site.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yogyakarta",
      addressCountry: "ID",
    },
    sameAs: site.socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => social.href),
    knowsAbout: [
      "Android development",
      "Kotlin",
      "Jetpack Compose",
      "Smart contracts",
      "Solidity",
      "Applied machine learning",
    ],
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  url: string;
  datePublished?: Date;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.url),
    ...(input.datePublished && {
      datePublished: input.datePublished.toISOString().slice(0, 10),
    }),
    author: {
      "@type": "Person",
      name: input.author ?? site.name,
      url: site.url,
    },
  };
}

export function breadcrumbSchema(items: Array<{ label: string; href?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: absoluteUrl(item.href) }),
    })),
  };
}
