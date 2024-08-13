import { test, expect } from "@playwright/test";

export class PageCategory {
    constructor(page) {
        this.page = page;
        this.cartTotalPrice = page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('[data-hook="cart-widget-total"]');          
        this.cartItem = page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('.cart-line-item-list .cart-line-item');          
        this.buttonCloseCart = page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('#cart-widget-close');          
        this.addToCartButton = page.locator('[data-hook="product-item-add-to-cart-button"] .suV8w9i')
        this.dropdownSorting = page.locator('div.szP9zHw');
        this.dropdownOption = page.locator('xpath=//span[text()="Name A-Z"]');
        this.productItemName = page.locator('[data-hook="product-item-name"]');
    }

    addProductToCart = async (index) => {
        await this.addToCartButton.nth(index).waitFor();
        await this.addToCartButton.nth(index).click();
    }

    clickCloseIframeButton = async () => {
        await this.buttonCloseCart.waitFor();
        await this.buttonCloseCart.click();
    }
    
    checkCartTotalPrice = async (price) => {
        await this.cartTotalPrice.waitFor();
        await expect(this.cartTotalPrice).toHaveText(price)
    }

    checkCartItemsNumber = async (basketproducts) => {
        const cartItems = await this.cartItem;
        const count = await cartItems.count();
        expect(count).toEqual(basketproducts); 
    }

    checkCartItemName = async (index, productname) => {
        const CartItemText = await this.page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('#item-name-'+index).innerText();
        expect(CartItemText).toBe(productname);
    }
    
    // Lesson 20 :: Dropdowns
    // https://www.udemy.com/course/automated-web-testing/learn/lecture/35756714
    sortItems = async () => {
        await this.productItemName.first().waitFor();
        const prodyctNamesBeforeSorting = await this.productItemName.allInnerTexts();
        console.warn({prodyctNamesBeforeSorting});
        await this.dropdownSorting.waitFor();
        await this.dropdownSorting.click();
        await this.dropdownOption.waitFor();
        await this.dropdownOption.click();
        const prodyctNamesAfterSorting = await this.productItemName.allInnerTexts();
        console.warn({prodyctNamesAfterSorting})
        expect(prodyctNamesAfterSorting).not.toEqual(prodyctNamesBeforeSorting);
    }

    //await page.pause();

}