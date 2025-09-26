import { test } from '@playwright/test';
import { SafetyScorePage } from '../pages/SafetyScorePage';

test('UI-10: Learn More link opens Tesla Support Insurance article', async ({ page }) => {
  const safetyScore = new SafetyScorePage(page);

  // 1. Go to Tesla Insurance page
  await safetyScore.goto();

  // 2. Scroll to Safety Score section
  await safetyScore.scrollToSafetyScore();

  // 3. Click Learn More → opens new tab
  const newPage = await safetyScore.clickLearnMore();

  // 4. Validate new page is correct
  await safetyScore.validateLearnMorePage(newPage);
});
