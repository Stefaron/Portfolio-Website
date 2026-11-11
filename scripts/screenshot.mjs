import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] ?? "http://localhost:4321/";
const width = Number(process.argv[3] ?? 1440);
const output =
  process.argv[4] ??
  `/private/var/folders/7p/3fpsxnhj5_b5nxdqlb5vcvw00000gn/T/opencode/shot-${width}.png`;

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((resolve) => setTimeout(resolve, 300));
await mkdir(output.substring(0, output.lastIndexOf("/")), { recursive: true });
await page.screenshot({ path: output, fullPage: true });
console.log(output);
await browser.close();
