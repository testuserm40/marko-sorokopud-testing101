import { test, expect } from "@playwright/test";
import { Common } from "../common/Common"; 

export class PageSignUp {
    constructor(page) {
        this.page = page;   
        this.userMenuLogInButton = page.locator('xpath=//button[span[text()=\'Log In\']]');
        this.userMenuUserName = page.locator('div.dI69aw'); 
        this.userMenu = page.locator('div.xzldRa');
       
        this.signUpFormLoginButton = page.locator('[data-testid="signUp.switchToSignUp"]');
       
        this.loginFormLoginButton = page.locator('[data-testid="buttonElement"]');
        this.loginFormEmailInput = page.locator('[type="email"]');
        this.loginFormPasswordInput = page.locator('[type="password"]');
        this.loginFormForgotPasswordButton = page.locator('[data-testid="forgotPasswordDesktop"]');
        this.loginFormInvalidLoginErrorMessage = page.locator('[data-testid="siteMembers.inlineErrorMsg"]');
     
        this.resetPasswordFormResetPasswordButton = page.locator('[data-testid="buttonElement"]');
       
        this.resetPasswordSuccessDialogLinkSentHeader = page.locator('[data-testid="title"]');
    }

    goToLoginForm = async () => {
        await this.page.goto("/");
        await this.page.waitForTimeout(2000);
        await this.userMenuLogInButton.waitFor();
        await this.userMenuLogInButton.click();
        await this.signUpFormLoginButton.waitFor();
        await this.signUpFormLoginButton.click();
    }


}