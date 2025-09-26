// tests/insurance-storebadges.spec.ts
import { test } from '@playwright/test';
import { InsurancePage } from '../pages/InsurancePage';
import { AppDownloadPage } from '../pages/AppDownloadPage';

/**
 * UI-08: App Store and Google Play badges open correct store pages
 * Flow we’ll use:
 *   - Open /insurance
 *   - Click "Get Insurance" CTA → App Download page (ownership.tesla.com)
 *   - Click Google Play badge → verify play.google.com app details URL
 *   - Click App Store badge → verify apps.apple.com app URL
 * Note: allow regional redirects; we assert by domain/regex.
 */
test.describe('UI-08 Store badges', () => {
  test('Badges open Google Play and App Store correctly', async ({ page }) => {
    // Step 1: land on Insurance page
    const insurance = new InsurancePage(page);
    await insurance.goto();

    // Step 2: Click "Get Insurance" to reach the App Download page
    const appDownloadTab = await insurance.openAppDownloadViaGetInsurance();
    const download = new AppDownloadPage(appDownloadTab);
    await download.assertOnDownloadLanding();

    // Step 3: Google Play badge → play.google.com app details
    const googlePlayTab = await download.openGooglePlay();
    await download.expectGooglePlayUrl(googlePlayTab);
    // (optional) close the tab so the next click goes to a fresh one
    if (googlePlayTab !== appDownloadTab) await googlePlayTab.close();

    // Step 4: App Store badge → apps.apple.com app page
    const appStoreTab = await download.openAppStore();
    await download.expectAppStoreUrl(appStoreTab);
    if (appStoreTab !== appDownloadTab) await appStoreTab.close();
  });
});
