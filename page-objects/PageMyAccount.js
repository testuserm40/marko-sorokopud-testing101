import { test, expect } from "@playwright/test";
import { Common } from "../common/Common"; 

export class PageMyAccount {
    constructor(page) {
        this.page = page;   
        this.accountFormDisplayNameInput = page.locator('#display-name-id');
    }
}