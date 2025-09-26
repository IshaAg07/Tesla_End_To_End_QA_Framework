// tests/insurance-locale.spec.ts
import { test } from '@playwright/test';
import { LocalePage } from '../pages/LocalePage';

test('UI-05: Macau locale shows 404 page (POM)', async ({ page }) => {
  const localePage = new LocalePage(page);

  // 1) open Tesla homepage
  await localePage.openTeslaHome();

  // 2) open region selector
  await localePage.clickRegionSelector();

  // 3) select Macau & capture response
  const response = await localePage.selectMacau();

  // 4) assert 404 error page
  await localePage.assert404(response);

  // 5) check no redirect loop
  await localePage.assertNoRedirectLoop();
});
