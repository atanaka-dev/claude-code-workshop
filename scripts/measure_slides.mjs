import { chromium } from 'playwright';

const TOTAL = 55;
const URL = 'http://localhost:4173/index.html';
const VIEWPORT = { width: 1366, height: 768 };

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
const page = await context.newPage();

await page.goto(URL + '#1', { waitUntil: 'networkidle' });

const rows = [];
for (let i = 1; i <= TOTAL; i++) {
  await page.evaluate((n) => { location.hash = '#' + n; }, i);
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => {
    const slide = document.querySelector('.slide.is-active');
    if (!slide) return null;
    const inner = slide.querySelector('.slide-inner');
    const slideRect = slide.getBoundingClientRect();
    const innerRect = inner?.getBoundingClientRect();
    const innerScroll = inner ? { sw: inner.scrollWidth, sh: inner.scrollHeight, cw: inner.clientWidth, ch: inner.clientHeight } : null;
    const slideScroll = { sw: slide.scrollWidth, sh: slide.scrollHeight, cw: slide.clientWidth, ch: slide.clientHeight };
    return {
      slideRect: { w: slideRect.width, h: slideRect.height, top: slideRect.top, bottom: slideRect.bottom },
      innerRect: innerRect ? { w: innerRect.width, h: innerRect.height, top: innerRect.top, bottom: innerRect.bottom } : null,
      innerScroll, slideScroll,
      title: slide.querySelector('.title, .hero-title, .section-title, .closing-msg, .thx')?.textContent.trim().replace(/\s+/g, ' ').slice(0, 50) || ''
    };
  });
  rows.push({ i, ...m });
}

console.log('idx | overflow | slide(ch/sh) | inner(ch/sh) | title');
for (const r of rows) {
  const slideOverflow = r.slideScroll.sh - r.slideScroll.ch;
  const innerOverflow = r.innerScroll ? (r.innerScroll.sh - r.innerScroll.ch) : 0;
  const flag = (slideOverflow > 4 || innerOverflow > 4) ? '⚠️' : '  ';
  console.log(`${String(r.i).padStart(2)} | ${flag} | ${r.slideScroll.ch}/${r.slideScroll.sh} | ${r.innerScroll?.ch}/${r.innerScroll?.sh} | ${r.title}`);
}

await browser.close();
