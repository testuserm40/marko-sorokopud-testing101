import { test, expect } from "@playwright/test";
import { URLs } from "../common/URLs";
import { PageCategory } from "../page-objects/PageCategory";
import { PageCart } from "../page-objects/PageCart";
import { TestData } from "../common/TestData";


test.describe.serial("Add products to basket tests", () => {
  let pageCategory;
  let pageCart;
  let productName;

  // Set up page objects before each test
  test.beforeEach(async ({ page }) => {
    pageCategory = new PageCategory(page);
    pageCart = new PageCart(page);
    productName = TestData.products[1].name;
  });


  test("id: 001-add-products-to-cart :: Add product by name", async ({ page }) => {
    // Step 1: Navigate to the Category Sorting Page
    await page.goto(URLs.pageLinkCategorySortingPage);
    await page.waitForTimeout(5000); // Wait for the page to load

    // Log the product name being added
    console.log('Product name: ' + productName);

    // Step 2: Add product to cart by name
    await pageCategory.addProductToCartByName(productName);

    // Step 3: Navigate to the Cart Page
    await page.goto(URLs.pageLinkCartPage);

    // Step 4: Verify the number of products in the cart
    const cartProducts = await pageCart.countCartProducts();
    expect(cartProducts).toEqual(1);

    // Step 5: Verify the quantity of products in the cart
    const cartProductsQuantity = await pageCart.countProductsQuantity();
    expect(cartProductsQuantity).toEqual(1);

    // Step 6: Verify the name of the product in the cart
    const cartItemName = await pageCart.cartItemName.innerText();
    console.log(`The text content of the element is: ${cartItemName}`);
    expect(cartItemName).toBe(productName);
  });


  test("id: 001-add-products-to-cart :: Add all products", async ({ page }) => {
    // Step 1: Navigate to the Category Sorting Page
    await page.goto(URLs.pageLinkCategorySortingPage);
    await page.waitForTimeout(5000); // Wait for the page to load

    // Step 2: Add all products to the cart
    await pageCategory.addAllProductsToCart();

    // Step 3: Navigate to the Cart Page
    await page.goto(URLs.pageLinkCartPage);

    // Step 4: Verify the number of products in the cart
    const cartProducts = await pageCart.countCartProducts();
    expect(cartProducts).toEqual(3);

    // Step 5: Verify the quantity of products in the cart
    const cartProductsQuantity = await pageCart.countProductsQuantity();
    expect(cartProductsQuantity).toEqual(3);
  });


  test("id: 001-add-products-to-cart :: Add product by index", async ({ page }) => {
    // Step 1: Navigate to the Category Sorting Page
    await page.goto(URLs.pageLinkCategorySortingPage);
    await page.waitForTimeout(5000); // Wait for the page to load

    // Step 2: Add product to cart by index
    await pageCategory.addProductToCart(0);

    // Step 3: Navigate to the Cart Page
    await page.goto(URLs.pageLinkCartPage);

    // Step 4: Verify the number of products in the cart
    const cartProducts = await pageCart.countCartProducts();
    expect(cartProducts).toEqual(1);

    // Step 5: Verify the quantity of products in the cart
    const cartProductsQuantity = await pageCart.countProductsQuantity();
    expect(cartProductsQuantity).toEqual(1);
  });
});


// await page.waitForTimeout(2000);
// await page.pause()

