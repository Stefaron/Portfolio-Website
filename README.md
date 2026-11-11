# Stefaron — Portfolio

Multipage portfolio for Stefaron Budhi Santosa, built with Astro 7, Tailwind CSS v4,
and Astro content collections. The design source is the pen.dev export at
`../design/portfolio-export.html`; this project is a component-based, responsive
implementation with additional Work, Writing, Contact, and case-study pages.

## Stack

- **Astro 7** — static output, zero client framework
- **Tailwind CSS v4** — design tokens defined in `src/styles/global.css`
- **Astro content collections** — MDX/YAML content with Zod validation
- **Lucide Astro** — icons (GitHub/LinkedIn are inline brand paths)
- **Geist Variable** — self-hosted through Fontsource

No client-side JavaScript is shipped. FAQ and service disclosures use native
`<details>` elements.

## Commands

| Command                  | Action                                              |
| ------------------------ | --------------------------------------------------- |
| `npm run dev`            | Start the dev server                                |
| `npm run build`          | Build the static site to `dist/`                    |
| `npm run preview`        | Preview the production build                        |
| `npm run check`          | Run `astro check` (types + content schemas)         |
| `npm run format`         | Format with Prettier + `prettier-plugin-astro`      |
| `npm run smoke`          | Headless Chrome smoke test against a running server |
| `npm run screenshot`     | Full-page screenshot helper                         |
| `npm run assets:brand`   | Regenerate favicon/apple-touch/OG images            |
| `npm run assets:extract` | Extract inline base64 images from a pen.dev export  |
| `npm run cv`             | Regenerate `public/cv/stefaron-cv.pdf`              |

For the smoke test, point it at a running server:

```sh
npm run build && npm run preview -- --port 4322
npm run smoke -- http://localhost:4322
```

## Structure

```text
src/
├── assets/                 # images and fonts processed by Astro
├── components/
│   ├── ui/                 # atoms: Button, Icon, Pill, Chip, Tag, Avatar
│   ├── layout/             # Container, header, footer, CTA band, page hero
│   └── sections/           # home, projects, writing, experience, skills, faq, contact
├── config/site.ts          # identity, contact, nav, socials, hero copy
├── content/                # editable content, one file per entry
│   ├── projects/*.mdx
│   ├── writing/*.mdx
│   ├── experience/*.yaml
│   ├── services/*.yaml
│   ├── skills/*.yaml
│   ├── education/*.yaml
│   ├── languages/*.yaml
│   └── faq/*.yaml
├── content.config.ts       # content schemas (the data contract)
├── layouts/
│   ├── BaseLayout.astro    # document head, SEO, JSON-LD
│   ├── PageLayout.astro    # header + main + footer
│   └── ArticleLayout.astro # breadcrumbs, title block, prose
├── lib/
│   ├── content.ts          # data access (the only place that queries collections)
│   ├── seo.ts              # Person/Article/Breadcrumb schema helpers
│   └── cn.ts
├── pages/
│   ├── index.astro
│   ├── work/index.astro
│   ├── work/[slug].astro
│   ├── writing/index.astro
│   ├── writing/[slug].astro
│   ├── contact.astro
│   ├── 404.astro
│   └── robots.txt.ts
└── styles/
    ├── global.css          # Tailwind import + base/component styles
    └── tokens in @theme    # colors, radii, shadows, type scale
```

Dependency direction: `pages → sections → ui`. Pages are the composition root;
sections receive props and never query content themselves. `lib/content.ts` is the
only module that imports `astro:content`.

## Editing content

- **Add a project** — create `src/content/projects/my-project.mdx` with the
  frontmatter required by `content.config.ts`. Set `featured: true` to show it on
  the home page; `order` controls card order.
- **Add writing** — create `src/content/writing/my-note.mdx`. `kind: paper` uses
  the publication card; `kind: article` uses the note card.
- **Experience / services / skills / education / languages / FAQ** — add or edit a
  YAML file in the matching `src/content/*` directory.
- **Identity, email, phone, nav, socials, hero stats** — edit `src/config/site.ts`.
- **Drafts** — set `draft: true` on projects/writing. Drafts remain visible in
  `dev` and are excluded from production builds.

## Design tokens

All colors, radii, shadows, and type sizes live in the `@theme` block in
`src/styles/global.css`. Components use semantic utilities such as `bg-canvas`,
`text-ink`, `text-ink-muted`, `text-ink-subtle`, `bg-paper`, `rounded-card`, and
`shadow-float`. Avoid raw hex values in components.

## Before deploying

1. Set the real production domain in `src/config/site.ts` (`url`). It is reused by
   `astro.config.mjs`, canonical URLs, Open Graph tags, `robots.txt`, and the
   sitemap.
2. Replace the CV at `public/cv/stefaron-cv.pdf` if the generated version is not
   current (`npm run cv` rebuilds it from `scripts/generate-cv.mjs`).
3. Review external links: project links live in each project's frontmatter;
   GitHub/LinkedIn/ORCID links live in `src/config/site.ts` and the Work/Writing
   pages.
4. Run `npm run check`, `npm run build`, then the smoke test at 1440px and 390px.

Deploy `dist/` to any static host (Cloudflare Pages, Netlify, Vercel, GitHub
Pages). No server runtime is required.

## Notes

- Images are processed at build time by Astro's image pipeline; the original
  base64 export is not shipped.
- The site is responsive from 390px up. The design had no mobile spec, so spacing
  and type scale were derived from the 1440px layout with `clamp()`.
- Accessibility: semantic landmarks, skip link, labelled icon-only nav, native
  disclosures, focus-visible outlines, and reduced-motion support are included.
