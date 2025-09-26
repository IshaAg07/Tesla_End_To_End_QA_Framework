// pages/SafetyScorePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class SafetyScorePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly video: Locator;
  readonly playPauseButton: Locator;
  readonly learnMoreLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // "Safety Score" heading
    this.heading = page.locator('span:has-text("Safety Score")');

    // Video element in the section
    this.video = page.locator('video.tcl-video_asset');

    // Play/Pause button
    this.playPauseButton = page.locator('button[aria-label="play pause toggle"]');

    // "Learn More" link inside Safety Score section
    this.learnMoreLink = page.locator('a[href*="/support/insurance"]');
  }

  // Navigate to the Insurance page
  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  // Scroll to Safety Score section
  async scrollToSafetyScore() {
    await this.heading.scrollIntoViewIfNeeded();
    await expect(this.heading).toBeVisible();
  }

  // Play video
  async playVideo() {
    await this.playPauseButton.click();
  }

  // Pause video
  async pauseVideo() {
    await this.playPauseButton.click();
  }

  // Check if video is currently playing
  async isPlaying(): Promise<boolean> {
    return await this.video.evaluate((el: HTMLVideoElement) => !el.paused);
  }

  // Get current playback time of video
  async getCurrentTime(): Promise<number> {
    return await this.video.evaluate((el: HTMLVideoElement) => el.currentTime);
  }

  // Click Learn More (opens new tab)
  async clickLearnMore() {
    await expect(this.learnMoreLink).toBeVisible();
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.learnMoreLink.click()
    ]);
    return newPage;
  }

  // Validate Learn More article page
  async validateLearnMorePage(newPage: Page) {
    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL(/support\.tesla\.com/);
    await expect(newPage.locator('h1')).toBeVisible();
  }
}
