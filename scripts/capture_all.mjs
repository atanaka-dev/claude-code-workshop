import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const TOTAL = 57;
const URL = 'http://localhost:4173/index.html';
const OUT = 'screenshots';
const VIEWPORT = { width: 1366, height: 768 };

const args = new Set(process.argv.slice(2));
const FULL = args.has('--full');
const suffix = FULL ? '_full' : '';

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
const page = await context.newPage();

await page.goto(URL + '#1', { waitUntil: 'networkidle' });

for (let i = 1; i <= TOTAL; i++) {
  await page.evaluate((n) => {
    location.hash = '#' + n;
  }, i);
  await page.waitForTimeout(160);
  const file = `${OUT}/slide_${String(i).padStart(2, '0')}${suffix}.png`;
  await page.screenshot({ path: file, fullPage: FULL });
  process.stdout.write(`captured ${file}\n`);
}

await browser.close();
