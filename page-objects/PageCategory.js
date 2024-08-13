import { test, expect } from "@playwright/test";

export class PageCategory {
    constructor(page) {
        this.page = page;
        this.cartTotalPrice = page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('[data-hook="cart-widget-total"]');
        this.productList = page.locator('ul[data-hook="product-list-wrapper"]');

        this.cartItem = page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('.cart-line-item-list .cart-line-item');
        this.buttonCloseCart = page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('#cart-widget-close');
        this.addToCartButton = page.locator('[data-hook="product-item-add-to-cart-button"] .suV8w9i')
        this.dropdownSorting = page.locator('div.szP9zHw');
        this.dropdownOption = page.locator('xpath=//span[text()="Name A-Z"]');
        this.productItemName = page.locator('[data-hook="product-item-name"]');
    }

    addAllProductsToCart = async () => {
        const products = this.addToCartButton;
        const count = await products.count();
        for (let i = 0; i < count; i++) {
            await products.nth(i).click();
            await this.clickCloseIframeButton();
        }
    }

    addProductToCart = async (index) => {
        await this.addToCartButton.nth(index).waitFor();
        await this.addToCartButton.nth(index).click();
    }

    addProductToCartByName = async (productName) => {
        const productCount = await this.productItemName.count();
        let productIndex = -1;
        for (let i = 0; i < productCount; i++) {
            const name = await this.productItemName.nth(i).innerText();
            if (name.trim() === productName) {
                productIndex = i;
                break;
            }
        }
        await this.addToCartButton.nth(productIndex).click();
    }


    clickCloseIframeButton = async () => {
        await this.buttonCloseCart.waitFor();
        await this.buttonCloseCart.click();
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
        const CartItemText = await this.page.frameLocator('xpath=/html/body/div/div/div/iframe').locator('#item-name-' + index).innerText();
        expect(CartItemText).toBe(productname);
    }

    // Lesson 20 :: Dropdowns
    // https://www.udemy.com/course/automated-web-testing/learn/lecture/35756714
    // sortItems = async () => {
    //     await pageCategory.productItemName.first().waitFor();
    //     const prodyctNamesBeforeSorting = await pageCategory.productItemName.allInnerTexts();
    //     console.warn({prodyctNamesBeforeSorting});
    //     await pageCategory.dropdownSorting.waitFor();
    //     await pageCategory.dropdownSorting.click();
    //     await pageCategory.dropdownOption.waitFor();
    //     await pageCategory.dropdownOption.click();
    //     const prodyctNamesAfterSorting = await pageCategory.productItemName.allInnerTexts();
    //     console.warn({prodyctNamesAfterSorting})
    //     expect(prodyctNamesAfterSorting).not.toEqual(prodyctNamesBeforeSorting);
    // }

    //await page.pause();

}