/**
 * Extracts inline base64 images from a pen.dev HTML export into real files.
 *
 * Usage:
 *   node scripts/extract-assets.mjs <export.html> [outDir]
 *
 * The export used by this project has seven images in this order:
 * avatar, duplicate avatar, Android media, Yogyakarta media, and three
 * project covers. Re-map `targets` if the design changes.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const input = process.argv[2];
const outDir = process.argv[3] ?? "src/assets/images";

if (!input) {
  console.error("Usage: node scripts/extract-assets.mjs <export.html> [outDir]");
  process.exit(1);
}

const html = await readFile(input, "utf8");
const images = [...html.matchAll(/data:image\/([a-z+]+);base64,([A-Za-z0-9+/=]+)/g)];

const targets = [
  "avatar.png",
  null, // duplicate avatar in the export
  "media/android.jpg",
  "media/yogyakarta.jpg",
  "projects/gambit.jpg",
  "projects/payroute.jpg",
  "projects/liqu-finance.jpg",
];

let written = 0;

for (const [index, image] of images.entries()) {
  const target = targets[index];
  if (!target) continue;

  const destination = path.join(outDir, target);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(image[2], "base64"));
  written += 1;
  console.log(`wrote ${destination}`);
}

console.log(`${written} image(s) extracted from ${images.length} inline image(s).`);
