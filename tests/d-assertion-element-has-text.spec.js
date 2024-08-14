import { test, expect } from "@playwright/test";
import { URLs } from "../common/URLs";
import { PageCategory } from "../page-objects/PageCategory";

test("id: 001-d-assertion-element-has-text.spec", async ({ page }) => {

  const pageCategory = new PageCategory(page);

  // Step 1: Navigate to the Category Sorting Page
  await page.goto(URLs.pageCategoryAllProducts);
  await page.waitForTimeout(5000);

  // Step 2: Add product to cart by name
  await pageCategory.addProductToCartByName('Americano');

  // Step 3: Navigate to the Cart Page
  await page.goto(URLs.pageLinkCartPage);
  await page.locator('[data-hook="CartItemDataHook.name"] [data-hook="ItemLinkDataHooks.Anchor"]').waitFor();
  await expect(page.locator('[data-hook="CartItemDataHook.name"] [data-hook="ItemLinkDataHooks.Anchor"]')).toHaveText('Americano');
});

// await page.waitForTimeout(2000);
// await page.pause();