import { test, expect, devices } from '@playwright/test';
import { execSync } from 'child_process';

const BASE = process.env.BASE_URL ?? 'http://localhost:5190';

const SECTION_IDS = ['about', 'work', 'credentials', 'blog', 'contact'];

test.describe('portfolio core', () => {
  test('home loads with no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    expect(errors).toEqual([]);
  });

  test('hero renders name and role', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('h1')).toContainText(/bhavesh/i);
    await expect(page.getByText("Technical Founder's Office").first()).toBeVisible();
  });

  test('nav links scroll to correct sections', async ({ page }) => {
    await page.goto(BASE);
    for (const id of SECTION_IDS.slice(0, 4)) {
      await page.click(`nav[aria-label="Primary"] a[href="#${id}"]`);
      await page.waitForTimeout(900);
      const inView = await page.locator(`#${id}`).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top > -80 && rect.top < 300;
      });
      expect(inView, `#${id} should be near viewport top after nav click`).toBeTruthy();
    }
  });

  test('no horizontal overflow at common widths', async ({ page }) => {
    for (const width of [1440, 1024, 768, 375, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(BASE);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(600);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    }
  });

  test('external links are valid URLs with safe attrs', async ({ page }) => {
    await page.goto(BASE);
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[target="_blank"]')).map((a) => ({
        href: (a as HTMLAnchorElement).href,
        rel: (a as HTMLAnchorElement).rel,
      }))
    );
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const sameOrigin = link.href.startsWith(BASE);
      const safe =
        sameOrigin ||
        link.href.startsWith('https://') ||
        link.href.startsWith('mailto:') ||
        link.href.startsWith('tel:');
      expect(safe, `unsafe link href: ${link.href}`).toBeTruthy();
      if (link.href.startsWith('https://')) {
        expect(link.rel).toContain('noopener');
      }
    }
  });

  test('blog pages load with new design system', async ({ page }) => {
    for (const post of ['kubernetes-edge-latency', 'resilient-llm-chains', 'death-of-staging']) {
      const res = await page.request.get(`${BASE}/blog/${post}.html`);
      expect(res.status()).toBe(200);
      const html = await res.text();
      expect(html).toContain('blog.css');
      expect(html).not.toContain('cdn.tailwindcss.com');
      const h1Count = (html.match(/<h1/g) ?? []).length;
      expect(h1Count).toBe(1);
    }
  });
});

test.describe('AI concierge', () => {
  test('floating button opens and closes panel', async ({ page }) => {
    await page.goto(BASE);
    const fab = page.getByRole('button', { name: /open bhavesh's ai concierge/i });
    await fab.click();
    await expect(page.getByRole('dialog', { name: /bhavesh's ai concierge/i })).toBeVisible();
    await page.getByRole('button', { name: 'Close concierge' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('escape closes the panel', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('focus is trapped inside open panel', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.getByLabel('Ask the concierge').click();
    await page.keyboard.type('hi');
    // input → send (last focusable) → wraps to close (first focusable)
    await page.keyboard.press('Tab');
    const onSend = await page
      .getByRole('button', { name: 'Send question' })
      .evaluate((el) => el === document.activeElement);
    expect(onSend).toBeTruthy();
    await page.keyboard.press('Tab');
    const wrappedToClose = await page
      .getByRole('button', { name: 'Close concierge' })
      .evaluate((el) => el === document.activeElement);
    expect(wrappedToClose).toBeTruthy();
    // shift-tab from first wraps to last
    await page.keyboard.press('Shift+Tab');
    const backToSend = await page
      .getByRole('button', { name: 'Send question' })
      .evaluate((el) => el === document.activeElement);
    expect(backToSend).toBeTruthy();
  });

  test('"what is bhavesh doing now" returns verified content', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    const dialog = page.getByRole('dialog');
    await page.getByLabel('Ask the concierge').fill('What is Bhavesh doing now?');
    await page.keyboard.press('Enter');
    await expect(
      dialog.getByText(/Technical Founder's Office at Shellkode — since August 2026/i)
    ).toBeVisible({ timeout: 6000 });
  });

  test('"show projects" scrolls to work section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    await page.getByLabel('Ask the concierge').fill('Show his projects');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3500);
    const workTop = await page.locator('#work').evaluate((el) => el.getBoundingClientRect().top);
    expect(workTop).toBeLessThan(300);
    const dialogVisible = await page.getByRole('dialog').isVisible();
    expect(dialogVisible).toBeTruthy();
  });

  test('"open blog" shows blog list inside panel', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    await page.getByLabel('Ask the concierge').fill('Open Bhavesh blog');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Kubernetes at the Edge: Latency Lessons')).toBeVisible({
      timeout: 6000,
    });
    await page.getByRole('button', { name: 'Back to conversation' }).click();
    await expect(page.getByLabel('Ask the concierge')).toBeVisible();
  });

  test('project detail view opens from intent', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    const dialog = page.getByRole('dialog');
    await page.getByLabel('Ask the concierge').fill('Tell me about the MCP project');
    await page.keyboard.press('Enter');
    await expect(dialog.getByText('Cloud Inventory Assistant')).toBeVisible({ timeout: 6000 });
  });

  test('unknown question gets honest fallback', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    await page.getByLabel('Ask the concierge').fill('What is his favourite pizza topping?');
    await page.keyboard.press('Enter');
    await expect(page.getByText(/don't have a verified answer/i)).toBeVisible({ timeout: 6000 });
  });

  test('external links inside agent require click (are anchors, not auto-opened)', async ({
    page,
  }) => {
    await page.goto(BASE);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    await page.getByLabel('Ask the concierge').fill('Find his GitHub');
    await page.keyboard.press('Enter');
    const link = page.getByRole('link', { name: /open github/i });
    await expect(link).toBeVisible({ timeout: 6000 });
    const href = await link.getAttribute('href');
    expect(href).toBe('https://github.com/bhaveshopss');
    expect(await link.getAttribute('target')).toBe('_blank');
  });

  test('mobile agent works as bottom sheet at 375px', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await page.goto(BASE);
    await page.waitForTimeout(2300);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBe(375);
    expect(box!.y + box!.height).toBeGreaterThanOrEqual(700);
    await page.getByLabel('Ask the concierge').fill('How can I contact him?');
    await page.keyboard.press('Enter');
    await expect(dialog.getByText(/workwithbhaveshcc@gmail.com/).first()).toBeVisible({
      timeout: 6000,
    });
    await expect(dialog).toBeVisible();
    await context.close();
  });
});

test.describe('reduced motion', () => {
  test('site renders with animations reduced', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await expect(page.locator('h1')).toContainText(/bhavesh/i);
    await page.getByRole('button', { name: /open bhavesh's ai concierge/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    expect(errors).toEqual([]);
    await context.close();
  });
});
