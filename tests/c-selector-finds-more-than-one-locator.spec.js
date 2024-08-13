import { test, expect } from "@playwright/test";
import { URLs } from "../common/URLs";
import { PageCategory } from "../page-objects/PageCategory";

test("id: 001-c-selector-finds-more-than-one-locator", async ({ page }) => {
  const pageCategory = new PageCategory(page);

  // Step 1: Navigate to the Category Sorting Page
  await page.goto(URLs.pageLinkCategorySortingPage);

  // Wait for the first "Add to Cart" button to be available and click it
  await pageCategory.addToCartButton.first().waitFor();
  await pageCategory.addToCartButton.first().click();

  // Click the button to close the iframe
  await pageCategory.clickCloseIframeButton();

  // Wait for the third "Add to Cart" button to be available and click it
  await pageCategory.addToCartButton.nth(2).waitFor();
  await pageCategory.addToCartButton.nth(2).click();
});

// await page.waitForTimeout(2000);
// await page.pause();