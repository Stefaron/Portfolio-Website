import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const executablePath = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].find((candidate) => candidate && existsSync(candidate));

if (!executablePath) {
  throw new Error("Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.");
}

const base = process.argv[2] ?? process.env.BASE_URL ?? "http://localhost:4321";

const routes = [
  { path: "/", status: 200 },
  { path: "/work", status: 200 },
  { path: "/work/gambit", status: 200 },
  { path: "/writing", status: 200 },
  { path: "/writing/batik-resnet50", status: 200 },
  { path: "/contact", status: 200 },
  { path: "/robots.txt", status: 200 },
  { path: "/sitemap-index.xml", status: 200 },
  { path: "/missing-page", status: 404 },
];

const widths = [1440, 390, 320];
const failures = [];

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const width of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1000 });
  await page.setCacheEnabled(false);

  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  for (const route of routes) {
    consoleErrors.length = 0;

    const response = await page.goto(`${base}${route.path}`, {
      waitUntil: "networkidle0",
    });
    const status = response?.status() ?? 0;

    if (status !== route.status && status !== 304) {
      failures.push(`${width}px ${route.path}: expected ${route.status}, got ${status}`);
    }

    if (!route.path.includes(".txt") && !route.path.includes(".xml")) {
      const result = await page.evaluate(() => ({
        h1: document.querySelectorAll("h1").length,
        overflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
        imagesWithoutAlt: [...document.querySelectorAll("img:not([alt])")].length,
        emptyLinks: [...document.querySelectorAll("a")].filter((a) => {
          const href = a.getAttribute("href");
          return !href || href === "#";
        }).length,
      }));

      if (result.h1 === 0) failures.push(`${width}px ${route.path}: missing <h1>`);
      if (result.overflow > 1) {
        failures.push(
          `${width}px ${route.path}: horizontal overflow ${result.overflow}px`,
        );
      }
      if (result.imagesWithoutAlt > 0) {
        failures.push(
          `${width}px ${route.path}: ${result.imagesWithoutAlt} image(s) without alt`,
        );
      }
      if (result.emptyLinks > 0) {
        failures.push(`${width}px ${route.path}: ${result.emptyLinks} empty link(s)`);
      }
    }

    if (consoleErrors.length > 0 && route.status === 200 && !route.path.includes(".")) {
      failures.push(`${width}px ${route.path}: console error — ${consoleErrors[0]}`);
    }
  }

  await page.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(failures.map((failure) => `✗ ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `✓ Smoke test passed for ${routes.length} routes at ${widths.join("px, ")}px`,
);
