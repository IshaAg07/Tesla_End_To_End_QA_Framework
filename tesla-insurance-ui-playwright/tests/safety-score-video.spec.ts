// tests/safety-score-video.spec.ts
import { test, expect } from '@playwright/test';
import { SafetyScorePage } from '../pages/SafetyScorePage';

test('UI-09: Safety Score promo video toggles play/pause', async ({ page }) => {
  const safetyPage = new SafetyScorePage(page);

  // 1) Navigate to Tesla Insurance page
  await safetyPage.goto();

  // 2) Scroll to Safety Score section
  await safetyPage.scrollToSafetyScore();

  // 3) Click Play
  await safetyPage.playVideo();

  // Capture current time after short wait
  const timeBefore = await safetyPage.getCurrentTime();
  await page.waitForTimeout(2000);
  const timeAfter = await safetyPage.getCurrentTime();

  // Assert video is playing (time increases)
  expect(timeAfter).toBeGreaterThan(timeBefore);

  // 4) Click Pause
  await safetyPage.pauseVideo();

  // Assert paused
  const isPlaying = await safetyPage.isPlaying();
  expect(isPlaying).toBe(false);
});
