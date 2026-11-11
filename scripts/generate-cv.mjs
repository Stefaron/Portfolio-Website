import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #1b202a;
    font-size: 10.5px;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
  }
  .page { padding: 42px 46px 40px; }
  header { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; }
  h1 { margin: 0; font-size: 27px; letter-spacing: -0.8px; line-height: 1.1; }
  .role { margin: 6px 0 0; color: #eb495b; font-size: 10px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; }
  .contact { text-align: right; font-size: 9.5px; color: #3c4048; line-height: 1.55; }
  .contact a { color: #1b202a; text-decoration: none; }
  .rule { height: 1px; background: #d9dae0; margin: 18px 0; }
  h2 { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #8a919e; margin: 0 0 8px; }
  section { margin-bottom: 16px; }
  .item { margin-bottom: 11px; }
  .item:last-child { margin-bottom: 0; }
  .item-head { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
  .item-head h3 { margin: 0; font-size: 11.5px; letter-spacing: -0.2px; }
  .item-head h3 span { color: #3c4048; font-weight: 500; }
  .when { color: #8a919e; font-size: 9px; font-weight: 600; white-space: nowrap; }
  ul { margin: 5px 0 0; padding: 0; list-style: none; }
  li { position: relative; padding-left: 12px; margin-bottom: 3px; color: #3c4048; }
  li::before { content: ""; position: absolute; left: 1px; top: 6px; width: 3px; height: 3px; border-radius: 50%; background: #eb495b; }
  .summary { color: #3c4048; margin: 0; max-width: 560px; }
  .grid { display: grid; grid-template-columns: 88px 1fr; gap: 4px 12px; }
  .grid dt { font-weight: 700; color: #1b202a; }
  .grid dd { margin: 0; color: #3c4048; }
  .project-title { font-weight: 700; }
  .project-title span { color: #8a919e; font-weight: 600; font-size: 9px; }
  .muted { color: #3c4048; }
  .doi { color: #eb495b; font-weight: 600; }
  footer { margin-top: 18px; padding-top: 8px; border-top: 1px solid #d9dae0; color: #8a919e; font-size: 8.5px; display: flex; justify-content: space-between; }
</style>
</head>
<body>
<div class="page">
  <header>
    <div>
      <h1>Stefaron Budhi Santosa</h1>
      <p class="role">Software Engineer · Android · Smart Contracts · Applied ML</p>
    </div>
    <div class="contact">
      Yogyakarta, Indonesia<br />
      stefaronbs@gmail.com<br />
      +62 813-9221-2950<br />
      github.com/Stefaron · linkedin.com/in/stefaron-budhi
    </div>
  </header>

  <div class="rule"></div>

  <section>
    <h2>Summary</h2>
    <p class="summary">Android engineer with 1.5+ years shipping production apps for Indomaret, including a Compose POS headed for 24,351 stores. Also writes Solidity contracts, builds applied ML tools, and has a peer-reviewed ResNet-50 paper in AITI vol. 23.</p>
  </section>

  <section>
    <h2>Experience</h2>
    <div class="item">
      <div class="item-head">
        <h3>Android Developer <span>· PT Indomarco Prismatama (Indomaret)</span></h3>
        <span class="when">Mar 2025 — Present</span>
      </div>
      <ul>
        <li>Building checkout, payment and authorization features for a Kotlin/Compose POS planned for phased rollout across 24,351 stores handling 225M+ transactions per month, in a five-person mobile team.</li>
        <li>Shipped three field-operations apps: a Compose QR-document app, a queue-display app pairing tablets over WiFi with real-time WebSocket updates, and an alarm-monitoring client.</li>
        <li>Migrated transaction data from local Room tables to OWIN REST calls, making the backend the single source of truth.</li>
        <li>Contributes to store-reporting and anti-fraud reporting apps; runs UAT for owned modules and ships fixes driven by store-operations feedback.</li>
      </ul>
    </div>
    <div class="item">
      <div class="item-head">
        <h3>Web3 &amp; Automation Developer <span>· DEKSA</span></h3>
        <span class="when">Dec 2024 — Aug 2025</span>
      </div>
      <ul>
        <li>Wrote Solidity smart contracts (Foundry, Hardhat) and REST backends for a crypto wallet and an animal-donation platform.</li>
        <li>Automated social-media publishing in Make.com for Keraton Surakarta.</li>
      </ul>
    </div>
    <div class="item">
      <div class="item-head">
        <h3>Teaching Assistant <span>· Universitas Kristen Duta Wacana</span></h3>
        <span class="when">2023 — 2024</span>
      </div>
      <ul>
        <li>Assisted students in Android Programming, Web Programming, OOP and Algorithms labs.</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>Selected Projects</h2>
    <div class="item">
      <p class="project-title">Gambit <span>2026</span></p>
      <p class="muted" style="margin: 1px 0 0;">Celo MiniPay chess, backend and on-chain payouts. Contributed 25 of 61 commits in a three-person team.</p>
    </div>
    <div class="item">
      <p class="project-title">Payroute <span>2026</span></p>
      <p class="muted" style="margin: 1px 0 0;">x402 payment rail on Mantle. Sole author of the escrow contracts; shipped a TypeScript SDK (v1.0.1).</p>
    </div>
    <div class="item">
      <p class="project-title">Liqu Finance <span>2026</span></p>
      <p class="muted" style="margin: 1px 0 0;">ERC-8004 agent on Unichain. Identity, reputation and validation registries with Foundry tests; agent manages Uniswap V4 positions under three risk strategies.</p>
    </div>
  </section>

  <section>
    <h2>Skills</h2>
    <dl class="grid">
      <dt>Android</dt><dd>Kotlin, Jetpack Compose, Hilt, Room, Coroutines/Flow, MVVM, Clean Architecture, Retrofit</dd>
      <dt>Languages</dt><dd>Java, TypeScript, SQL, Python</dd>
      <dt>Web3</dt><dd>Solidity, Foundry, Hardhat, Move</dd>
      <dt>Tools</dt><dd>Git, GitHub, Gradle, Postman, Docker, Make.com</dd>
    </dl>
  </section>

  <section>
    <h2>Education &amp; Certifications</h2>
    <div class="item-head">
      <h3>Bachelor of Computer Science (Informatics) <span>· Universitas Kristen Duta Wacana</span></h3>
      <span class="when">Graduated Jan 2025</span>
    </div>
    <p class="muted" style="margin: 2px 0 0;">GPA 3.80 / 4.00 · completed in 3.4 years</p>
    <ul>
      <li>TensorFlow Developer Certificate (2024)</li>
      <li>Bangkit Academy — Machine Learning (2024)</li>
    </ul>
  </section>

  <section>
    <h2>Publication</h2>
    <p class="muted" style="margin: 0; max-width: 570px;">Santosa, S. B., Chrismanto, A. R., &amp; Susanto, B. (2026). Classification of Batik Keraton motifs using ResNet-50 fine-tuning architecture. <em>AITI</em>, 23(1), 46–60. <span class="doi">doi:10.24246/aiti.v23i1.46-60</span></p>
  </section>

  <footer>
    <span>Stefaron Budhi Santosa · Software Engineer</span>
    <span>stefaron.dev</span>
  </footer>
</div>
</body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await mkdir("public/cv", { recursive: true });
await page.pdf({
  path: "public/cv/stefaron-cv.pdf",
  format: "A4",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});
console.log("Generated public/cv/stefaron-cv.pdf");
await browser.close();
