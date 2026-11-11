import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const mark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" fill="#1B202A"/>
  <circle cx="90" cy="90" r="62" fill="none" stroke="#EB495B" stroke-width="8"/>
  <text x="90" y="112" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#FCFCFD">S</text>
</svg>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#F1F1F3"/>
  <circle cx="1080" cy="118" r="74" fill="#EB495B" opacity="0.12"/>
  <circle cx="1080" cy="118" r="46" fill="none" stroke="#EB495B" stroke-width="3"/>
  <text x="1080" y="136" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#1B202A">S</text>
  <text x="80" y="196" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#EB495B">SOFTWARE ENGINEER</text>
  <text x="80" y="316" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="104" font-weight="700" letter-spacing="-4" fill="#1B202A">Stefaron Budhi</text>
  <text x="80" y="420" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="104" font-weight="700" letter-spacing="-4" fill="#1B202A">Santosa</text>
  <text x="80" y="488" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" font-weight="400" fill="#3C4048">Android · smart contracts · applied machine learning</text>
  <line x1="80" y1="536" x2="1120" y2="536" stroke="#D9DAE0" stroke-width="2"/>
  <text x="80" y="584" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#8A919E">Yogyakarta, Indonesia</text>
  <text x="1120" y="584" text-anchor="end" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#8A919E">stefaron.dev</text>
</svg>`;

await mkdir("public", { recursive: true });

await sharp(Buffer.from(mark)).png().toFile("public/apple-touch-icon.png");

await sharp(Buffer.from(og)).png({ quality: 90 }).toFile("public/og-image.png");

console.log("Generated public/apple-touch-icon.png and public/og-image.png");
