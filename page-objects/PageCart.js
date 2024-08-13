import { test, expect } from "@playwright/test";

export class PageCart {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('[data-hook="CartItemsDataHook.item"]');
        this.cartItemPrice = page.locator('div.OoDGxd');
        this.cartItemName = page.locator('[data-hook="CartItemDataHook.name"]');
        this.cartItemQuantity = page.locator('input[aria-label="Choose quantity"]');
        this.cartRemoveButton = page.locator('[data-hook="CartItemDataHook.remove"]');
        this.cartTotalPrice = this.page.locator('[data-hook="Total.formattedValue"]');
        this.buttonCheckout = this.page.locator('[data-hook="CheckoutButtonDataHook.button"]');
    }

    countProductsQuantity = async () => {
        let totalSum = 0;
        const inputCount = await this.cartItemQuantity.count();
        for (let i = 0; i < inputCount; i++) {
            const valueStr = await this.cartItemQuantity.nth(i).getAttribute('value');
            const value = Number(valueStr);
            totalSum += value;
        }
        console.log(`Total sum of values: ${totalSum}`);
        return totalSum

    }

    countCartProducts = async () => {
        const itemCount = await this.cartItems.count();
        console.log(`Number of cart items: ${itemCount}`);
        return itemCount;
    }


    //console.warn({convertedPrices});
    //await page.pause();
}