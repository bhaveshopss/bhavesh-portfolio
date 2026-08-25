import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:5190';
const OUT = 'screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

const desktopShots = [
  { name: 'desktop-1440-hero', width: 1440, height: 900, scroll: 0 },
  { name: 'desktop-1440-career', width: 1440, height: 900, scroll: '#career' },
  { name: 'desktop-1440-work', width: 1440, height: 900, scroll: '#work' },
  { name: 'desktop-1440-credentials', width: 1440, height: 900, scroll: '#credentials' },
  { name: 'desktop-1440-about-blog', width: 1440, height: 900, scroll: '#about' },
  { name: 'desktop-1440-contact', width: 1440, height: 900, scroll: '#contact' },
];

for (const shot of desktopShots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  if (shot.scroll) {
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView(), shot.scroll);
    await page.waitForTimeout(1800);
  }
  await page.screenshot({ path: `${OUT}/${shot.name}.png` });
  await page.close();
}

for (const width of [1024, 768]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/${width}-hero.png` });
  await page.evaluate(() => document.querySelector('#work')?.scrollIntoView());
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${width}-work.png` });
  await page.close();
}

const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
await mobile.goto(BASE, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(2500);
await mobile.screenshot({ path: `${OUT}/mobile-375-hero.png` });
await mobile.evaluate(() => document.querySelector('#career')?.scrollIntoView());
await mobile.waitForTimeout(1500);
await mobile.screenshot({ path: `${OUT}/mobile-375-career.png` });

await mobile.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
await mobile.waitForTimeout(1200);
await mobile.screenshot({ path: `${OUT}/mobile-375-concierge.png` });
await mobile.keyboard.press('Escape');
await mobile.waitForTimeout(800);

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(BASE, { waitUntil: 'networkidle' });
await desktop.waitForTimeout(2500);
await desktop.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
await desktop.waitForTimeout(1200);
await desktop.screenshot({ path: `${OUT}/desktop-1440-concierge.png` });
await desktop.getByLabel('Ask the concierge').fill('Show his projects');
await desktop.keyboard.press('Enter');
await desktop.waitForTimeout(2600);
await desktop.screenshot({ path: `${OUT}/desktop-1440-concierge-answer.png` });

await mobile.evaluate(() => window.scrollTo(0, 0));
await browser.close();
console.log('screenshots written to', OUT);
