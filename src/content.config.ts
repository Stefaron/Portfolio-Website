import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number(),
      role: z.string(),
      stack: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string().default("Project cover"),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
      metrics: z.array(metricSchema).default([]),
      links: z.array(linkSchema).default([]),
    }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.coerce.date(),
      kind: z.enum(["article", "paper"]),
      journal: z.string().optional(),
      authors: z.string().optional(),
      doi: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().default("Writing cover"),
      externalUrl: z.url().optional(),
      tags: z.array(z.string()).default([]),
      metrics: z.array(metricSchema).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const experience = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml}",
    base: "./src/content/experience",
  }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    location: z.string().optional(),
    meta: z.string().optional(),
    logo: z.string(),
    current: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    bullets: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    metrics: z.array(metricSchema).default([]),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/skills" }),
  schema: z.object({
    group: z.string(),
    items: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/education" }),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    location: z.string().optional(),
    meta: z.string(),
    gpa: z.string().optional(),
    certifications: z.array(z.object({ name: z.string(), year: z.number() })).default([]),
    order: z.number().default(0),
  }),
});

const languages = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/languages" }),
  schema: z.object({
    name: z.string(),
    level: z.string(),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects,
  writing,
  experience,
  services,
  skills,
  education,
  languages,
  faq,
};
