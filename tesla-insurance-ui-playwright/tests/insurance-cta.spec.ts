// tests/insurance-cta.spec.ts
import { test, expect, Page } from '@playwright/test';
import { InsurancePage } from '../pages/InsurancePage';

/**
 * UI-06: Verify "Get Insurance" CTA → App Download Page
 * UI-07: Verify "Get a Quote" CTA → Insurance Get App Page
 */
test.describe('CTA deep-links', () => {
  test('UI-06: Get Insurance CTA → https://ownership.tesla.com/1/app/home', async ({ page, context }) => {
    const insurancePage = new InsurancePage(page);

    // 1) Open insurance landing
    await insurancePage.goto();

    // 2) Handle popup vs same-tab navigation
    const popupPromise = page.waitForEvent('popup').catch(() => null);
    const navPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => null);

    // Click CTA
    await insurancePage.clickGetInsurance();

    // 3) Resolve target page
    const popup = await popupPromise;
    let targetPage: Page = popup ?? page;
    if (!popup) await navPromise;

    // 4) Validate final URL
    await targetPage.waitForLoadState('domcontentloaded');
    expect(targetPage.url()).toBe('https://ownership.tesla.com/1/app/home');

    // 5) Validate content
    await expect(
      targetPage.getByRole('heading', { name: /download tesla app/i })
    ).toBeVisible({ timeout: 15000 });
  });

  test('UI-07: Get Quote CTA → https://ownership.tesla.com/get-app/insurance/get', async ({ page, context }) => {
    const insurancePage = new InsurancePage(page);

    // 1) Open insurance landing
    await insurancePage.goto();

    // 2) Handle popup vs same-tab navigation
    const popupPromise = page.waitForEvent('popup').catch(() => null);
    const navPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => null);

    // Click CTA
    await insurancePage.clickGetQuote();

    // 3) Resolve target page
    const popup = await popupPromise;
    let targetPage: Page = popup ?? page;
    if (!popup) await navPromise;

    // 4) Validate final URL
    await targetPage.waitForLoadState('domcontentloaded');
    expect(targetPage.url()).toBe('https://ownership.tesla.com/get-app/insurance/get');

    // 5) Validate content
    await expect(
      targetPage.getByRole('heading', { name: /download tesla app/i })
    ).toBeVisible({ timeout: 15000 });
  });
});
