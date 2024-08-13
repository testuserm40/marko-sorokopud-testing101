import { test, expect } from "@playwright/test";
import { PageCheckout } from "../page-objects/PageCheckout";
import { PageCategory } from "../page-objects/PageCategory";
import { PageCart } from "../page-objects/PageCart";
import { URLs } from "../common/URLs";
import { TestData } from "../common/TestData";

test.only("End to End purchase", async ({ page }) => {

    const pageCategory = new PageCategory(page);
    const pageCart = new PageCart(page);
    const pageCheckout = new PageCheckout(page);

    //Step 1. Go to the 'products' page
    await page.goto(URLs.pageLinkCategorySortingPage);

    //Step 2. Sort products ASC    
    // Lesson 20 :: Dropdowns
    // https://www.udemy.com/course/automated-web-testing/learn/lecture/35756714
    await pageCategory.productItemName.first().waitFor();
    const prodyctNamesBeforeSorting = await pageCategory.productItemName.allInnerTexts();
    console.warn({ prodyctNamesBeforeSorting });
    await page.waitForTimeout(3000); //adds consistency, for some reason somtimes click at the button doesn't work 
    await pageCategory.dropdownSorting.waitFor();
    await pageCategory.dropdownSorting.click();
    await pageCategory.dropdownOption.waitFor();
    await pageCategory.dropdownOption.click();
    await page.waitForTimeout(1000);
    const prodyctNamesAfterSorting = await pageCategory.productItemName.allInnerTexts();
    console.warn({ prodyctNamesAfterSorting })
    expect(prodyctNamesAfterSorting).not.toEqual(prodyctNamesBeforeSorting);

    //Step 3. Add first product to the cart
    await pageCategory.addProductToCart(0);
    await pageCategory.checkCartTotalPrice('40,01$');
    await pageCategory.checkCartItemsNumber(1);
    await pageCategory.checkCartItemName(0, 'Americano');
    await pageCategory.clickCloseIframeButton();

    //Step 4. Add second product to the cart
    await pageCategory.addProductToCart(1);
    await pageCategory.checkCartTotalPrice('85,51$');
    await pageCategory.checkCartItemsNumber(2);
    await pageCategory.checkCartItemName(1, 'Biscotti');
    await pageCategory.clickCloseIframeButton();

    //Step 5. Add third product to the cart
    await pageCategory.addProductToCart(2);
    await pageCategory.checkCartTotalPrice('111,50$');
    await pageCategory.checkCartItemsNumber(3);
    await pageCategory.checkCartItemName(2, 'Cookie');
    await pageCategory.clickCloseIframeButton();
    //await common.waitSeconds(2000);

    //Step 6. Go to the 'cart' page
    await page.goto(URLs.pageLinkCartPage);
    await page.waitForTimeout(3000); //adds stability for runs for somereason
    const itemsbeforeRemoval = await pageCart.cartItems.count();
    await expect(itemsbeforeRemoval).toEqual(3);
    //Count items in the cart
    await pageCart.cartItems.first().waitFor();
    await pageCart.cartItemPrice.first().waitFor();
    const allPriceTexts = await pageCart.cartItemPrice.allInnerTexts();
    const convertedPrices = allPriceTexts.map((element) => {
        const priceFloat = element.replace(',', '.').replace("$", "");
        return parseFloat(priceFloat);
    })
    const lowestPrice = Math.min(...convertedPrices);
    const lowestPriceIndex = convertedPrices.indexOf(lowestPrice);
    const lowestPricecartRemoveButton = pageCart.cartRemoveButton.nth(lowestPriceIndex);
    console.warn({ lowestPrice });
    console.warn({ lowestPriceIndex });
    await page.waitForTimeout(2000);
    await lowestPricecartRemoveButton.waitFor();
    await lowestPricecartRemoveButton.click();
    await page.waitForTimeout(4000); //adds stability for runs for somereason
    await pageCart.cartTotalPrice.waitFor();
    const itemsAfterRemoval = await pageCart.cartItems.count();
    await expect(itemsAfterRemoval).toEqual(2);
    await expect(pageCart.cartItems).toHaveCount(itemsbeforeRemoval - 1);
    await expect(pageCart.cartTotalPrice).toHaveText('85,51$');
    // await this.page.pause();

    //Step 7. Go to Checkout and check URL with query params
    // Lesson 21 :: Regular Expressions
    // https://regex101.com/
    // https://www.udemy.com/course/automated-web-testing/learn/lecture/35756722
    await pageCart.buttonCheckout.waitFor();
    await pageCart.buttonCheckout.click();
    await pageCart.page.waitForURL(/\/checkout/, { timeout: 5000 });

    //Step 8. Fill form with valid data and proceed
    // Lesson 22 :: Form fields
    // https://www.udemy.com/course/automated-web-testing/learn/lecture/35756730
    await pageCheckout.page.waitForTimeout(3000); //adds stability for runs for somereason
    await pageCheckout.inputEmail.waitFor();
    await pageCheckout.inputEmail.fill(TestData.userEmail);
    await pageCheckout.inputFirstName.waitFor();
    await pageCheckout.inputFirstName.fill("John");
    await pageCheckout.inputLastName.waitFor();
    await pageCheckout.inputLastName.fill("Doe");
    await pageCheckout.inputPhone.waitFor();
    await pageCheckout.inputPhone.fill("17863031484");
    await pageCheckout.inputCountry.waitFor();
    await pageCheckout.inputCountry.fill("France");
    await pageCheckout.inputAddress.waitFor();
    await pageCheckout.inputAddress.fill("Av. Gustave Eiffel");
    await pageCheckout.inputPostalCode.waitFor();
    await pageCheckout.inputPostalCode.fill("75007");
    await pageCheckout.inputCity.waitFor();
    await pageCheckout.inputCity.fill("Paris");
    await pageCheckout.inputRegion.waitFor();
    await pageCheckout.inputRegion.fill("Auvergne-Rhône-Alpes");
    await pageCheckout.buttonFormDetailsContinue.waitFor();
    await pageCheckout.buttonFormDetailsContinue.click();
    await pageCheckout.buttonDeliveryMethodContinue.waitFor();
    await pageCheckout.buttonDeliveryMethodContinue.click();
    await page.pause();
    //await common.waitSeconds(2000);
    //await page.pause();
})