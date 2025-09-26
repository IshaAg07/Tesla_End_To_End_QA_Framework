// pages/LocalePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LocalePage {
  readonly page: Page;
  readonly regionButton: Locator;
  readonly macauLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.regionButton = page.getByRole('button', { name: 'Region & Language' });
    this.macauLink = page.locator('a[href*="zh_MO/insurance"]');
  }

  async openTeslaHome() {
    await this.page.goto('https://www.tesla.com');
  }

  async clickRegionSelector() {
    await expect(this.regionButton).toBeVisible();
    await this.regionButton.click();
  }

  async selectMacau() {
    await expect(this.macauLink).toBeVisible();
    const [response] = await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load' }),
      this.macauLink.click(),
    ]);
    return response;
  }

  async assert404(response) {
    expect(response?.status()).toBe(404);
    await expect(this.page.locator('body')).toContainText('404');
  }

  async assertNoRedirectLoop() {
    const finalUrl = this.page.url();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1200);
    expect(this.page.url()).toBe(finalUrl);
  }
}
