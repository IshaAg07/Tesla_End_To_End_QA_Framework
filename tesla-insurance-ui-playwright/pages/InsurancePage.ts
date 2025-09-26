// pages/InsurancePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class InsurancePage {
  readonly page: Page;
  readonly getInsuranceCta: Locator; // title="Get Insurance"
  readonly getQuoteCta: Locator;     // title="Get a quote"

  constructor(page: Page) {
    this.page = page;
    // Using your real attributes from DevTools
    this.getInsuranceCta = page.locator('a[title="Get Insurance"]');
    this.getQuoteCta     = page.locator('a[title="Get a quote"]');
  }

  async goto() {
    // baseURL = https://www.tesla.com/insurance (set in playwright.config.ts)
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async clickGetInsurance() {
    await expect(this.getInsuranceCta).toBeVisible();
    await this.getInsuranceCta.scrollIntoViewIfNeeded();
    await this.getInsuranceCta.click(); // opens ownership.tesla.com (often target=_blank)
  }

  async clickGetQuote() {
    await expect(this.getQuoteCta).toBeVisible();
    await this.getQuoteCta.scrollIntoViewIfNeeded();
    await this.getQuoteCta.click();
  }

  /**
   * Helper that clicks "Get Insurance" and returns the page that loaded
   * (new tab popup if present; otherwise the same page).
   */
  async openAppDownloadViaGetInsurance(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup').catch(() => null);
    await this.clickGetInsurance();
    const popup = await popupPromise;
    return popup ?? this.page;
  }

  /**
   * Same helper for "Get a Quote" (UI-07 reuse).
   */
  async openAppDownloadViaGetQuote(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup').catch(() => null);
    await this.clickGetQuote();
    const popup = await popupPromise;
    return popup ?? this.page;
  }
}
