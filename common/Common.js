import { test, expect } from "@playwright/test";
import { v4 as uuidv4 } from 'uuid';

export class Common {
    constructor(page) {
        this.page = page;
        this.pageLinkMyAccountPage = '/account/my-account';
        this.userEmail = 'testuser.m40+22daff92-6256-4b30-87dd-95d808c89e8c@proton.me';
        this.userPassword = 'Test00!';
        this.userNotExistedEmail = 'testuser@unknownemail.com';
        this.userIvalidPassword = 'InvalidPassword';
    }
   
    //await page.pause();
}