import { test, expect } from "@playwright/test";
import { URLs } from "../common/URLs";
import { PageCategory } from "../page-objects/PageCategory";

test("id: 001-c-selector-iframe", async ({ page }) => {

  const pageCategory = new PageCategory(page);

  // Step 1: Navigate to the Category Sorting Page
  await page.goto(URLs.pageCategoryAllProducts);
  await page.waitForTimeout(5000);

  // Step 2: Add product to cart by name
  await pageCategory.addProductToCartByName('Americano');

  await pageCategory.cartIframeItemName.waitFor();
  await expect(pageCategory.cartIframeItemName).toHaveText('Americano');
  await pageCategory.cartIframeItemPrice.waitFor();
  await expect(pageCategory.cartIframeItemPrice).toHaveText('40,01$');
});

// await page.waitForTimeout(2000);
// await page.pause();