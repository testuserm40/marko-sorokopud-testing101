import { TestData } from "../common/TestData";

export class PageCheckout {
    constructor(page) {
        this.page = page;
        this.inputEmail = page.locator('[aria-label="Email"]');
        this.inputFirstName = page.locator('[aria-label="First name"]');
        this.inputLastName = page.locator('[aria-label="Last name"]');
        this.inputPhone = page.locator('[aria-label="Phone"]');
        this.inputAddress = page.locator('[data-hook="form-field-address_line"] [type="text"]');
        this.inputCity = page.locator('[aria-label="City"]');
        this.inputPostalCode = page.locator('[aria-label="Postal code"]');
        this.inputCountry = page.locator('div.s__1XLeS_.sVTOzNC input.s_pqLT_').first();
        this.inputRegion = page.locator('div.s__1XLeS_.sVTOzNC input.s_pqLT_').nth(2);
        this.buttonFormDetailsContinue = page.locator('[data-hook="FormDetailsButtons.continue"]');
        this.buttonDeliveryMethodContinue = page.locator('[data-hook="DeliveryMethodStep.continue"]');
        this.buttonPlaceOrder = page.locator('[data-hook="place-order-button"]');


    }

    // Lesson 22 :: Form fields
    // https://www.udemy.com/course/automated-web-testing/learn/lecture/35756730
    proceedCheckoutSuccess = async () => {
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
        await pageCheckout.buttonContinue.waitFor();
        await pageCheckout.buttonContinue.click();
    }


    //console.warn({convertedPrices});
    //await page.pause();

}