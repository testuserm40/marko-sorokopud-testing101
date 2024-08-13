import { test, expect } from "@playwright/test";

export class PageCart {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('[data-hook="CartItemsDataHook.item"]');
        this.cartItemPrice = page.locator('div.OoDGxd');
        this.cartRemoveButton = page.locator('[data-hook="CartItemDataHook.remove"]');
        this.cartTotalPrice = this.page.locator('[data-hook="Total.formattedValue"]');
        this.buttonCheckout = this.page.locator('[data-hook="CheckoutButtonDataHook.button"]');
    }

    //console.warn({convertedPrices});
    //await page.pause();
}