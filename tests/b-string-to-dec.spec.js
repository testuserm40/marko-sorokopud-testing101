import { test, expect } from "@playwright/test";
import { URLs } from "../common/URLs";
import { PageCategory } from "../page-objects/PageCategory";
import { Common } from "../common/common";

test("id: 001-c-selector-iframe", async ({ page }) => {

  const pageCategory = new PageCategory(page);
  const common = new Common();

  // Step 1: Navigate to the Category Sorting Page
  await page.goto(URLs.pageCategoryAllProducts);
  await page.waitForTimeout(5000);

  // Step 2: Add product to cart by name
  await pageCategory.addProductToCartByName('Americano');
  await pageCategory.clickCloseIframeButton();
  await pageCategory.addProductToCartByName('Biscotti');

  // Step 3: Get the price of the first product
  await pageCategory.cartIframeItemPrice.first().waitFor();
  const priceText001 = await pageCategory.cartIframeItemPrice.first().textContent();
  console.log('product001 price: ' + priceText001);

  const priceDecimal001 = await common.convertPriceToDecimal(priceText001);
  console.log('product001 price dec: ' + priceDecimal001);

  // Step 4: Get the price of the second product
  await pageCategory.cartIframeItemPrice.nth(1).waitFor();
  const priceText002 = await pageCategory.cartIframeItemPrice.nth(1).textContent();
  console.log('product002 price: ' + priceText002);

  const priceDecimal002 = await common.convertPriceToDecimal(priceText002);
  console.log('product002 price dec: ' + priceDecimal002);

  // Step 5: Get the total price
  await pageCategory.cartIframeTotalPrice.waitFor();
  const totalPriceText = await pageCategory.cartIframeTotalPrice.textContent();
  console.log('total price: ' + totalPriceText);

  const totalPriceDecimal = await common.convertPriceToDecimal(totalPriceText);
  console.log('Total price dec: ' + totalPriceDecimal);

  // Step 6: Expectation to check if totalPriceDecimal equals the sum of priceDecimal001 and priceDecimal002
  expect(totalPriceDecimal).toBeCloseTo(priceDecimal001 + priceDecimal002, 2);

});

// await page.waitForTimeout(2000);
// await page.pause();
// console.log(priceDecimal);