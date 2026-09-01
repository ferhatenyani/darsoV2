import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const url = process.env.URL ?? "http://localhost:3000/student";
const outDir = path.resolve("screenshots");
fs.mkdirSync(outDir, { recursive: true });

const breakpoints = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-820", width: 820, height: 1180 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const browser = await chromium.launch();

for (const bp of breakpoints) {
  const context = await browser.newContext({
    viewport: { width: bp.width, height: bp.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const filePath = path.join(outDir, `${bp.name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`✓ ${bp.name} (${bp.width}×${bp.height}) → ${filePath}`);
  await context.close();
}

await browser.close();
