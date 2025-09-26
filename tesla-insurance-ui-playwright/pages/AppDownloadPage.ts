// pages/AppDownloadPage.ts
import { Page, Locator, expect } from '@playwright/test';

const GOOGLE_PLAY_REGEX = /https?:\/\/play\.google\.com\/store\/apps\/details\?id=com\.teslamotors\.tesla/i;
// Apple URLs vary by region; allow any locale path + numeric app id
const APP_STORE_REGEX   = /https?:\/\/apps\.apple\.com\/[a-z-]+\/app\/.*\/id\d+/i;

export class AppDownloadPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly googlePlayLink: Locator;
  readonly appStoreLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /download tesla app/i });

    // Realistic robust locators:
    // - Prefer explicit href domain matches
    // - Fall back to aria-labels if markup changes
    this.googlePlayLink = page.locator('a[href*="play.google.com"]').first();
    this.appStoreLink   = page.locator('a[href*="apps.apple.com"]').first();
  }

  async assertOnDownloadLanding() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.heading).toBeVisible({ timeout: 15_000 });
  }

  async openGooglePlay(): Promise<Page> {
    // Store links usually open in a new tab
    const popupPromise = this.page.waitForEvent('popup').catch(() => null);
    await expect(this.googlePlayLink).toBeVisible();
    await this.googlePlayLink.click();
    const popup = await popupPromise;
    return popup ?? this.page;
  }

  async openAppStore(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup').catch(() => null);
    await expect(this.appStoreLink).toBeVisible();
    await this.appStoreLink.click();
    const popup = await popupPromise;
    return popup ?? this.page;
  }

  async expectGooglePlayUrl(target: Page) {
    await target.waitForLoadState('domcontentloaded');
    await target.waitForURL(/play\.google\.com\/store\/apps\/details/i, { timeout: 20_000 });
    expect(target.url()).toMatch(GOOGLE_PLAY_REGEX);
  }

  async expectAppStoreUrl(target: Page) {
    await target.waitForLoadState('domcontentloaded');
    await target.waitForURL(/apps\.apple\.com/i, { timeout: 20_000 });
    expect(target.url()).toMatch(APP_STORE_REGEX);
  }
}
