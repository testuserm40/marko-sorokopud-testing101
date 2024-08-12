import { TestData } from "../common/TestData";

export class PageSignUp {
    constructor(page) {
        this.page = page;
        this.userMenuLogInButton = page.locator('.jjPduP span.YT_9QV');
        this.userMenuUserName = page.locator('div.dI69aw');
        this.userMenu = page.locator('div.xzldRa');
        this.userMenuLogOutOption = page.locator("xpath=//span[text()='Log Out']");

        this.signUpDialog = page.locator('[aria-labelledby="signUpHeadline_SM_ROOT_COMP710"]');
        this.signUpFormLoginButton = page.locator('[data-testid="signUp.switchToSignUp"]');
        this.signupFormEmailInput = page.locator('[type="email"]');
        this.signupFormPasswordInput = page.locator('[type="password"]');
        this.signUpFormSignUpButton = page.locator('[data-testid="buttonElement"]');

        this.loginFormSignUpButton = page.locator('[data-testid="switchToSignUp"]');
        this.loginFormEmailInput = page.locator('[type="email"]');
        this.loginFormPasswordInput = page.locator('[type="password"]');
        this.loginFormLoginButton = page.locator('[data-testid="buttonElement"]');
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

    logIn = async () => {
        await this.goToLoginForm();
        await this.loginFormEmailInput.waitFor();
        await this.loginFormEmailInput.fill(TestData.userEmail);
        await this.loginFormPasswordInput.waitFor();
        await this.loginFormPasswordInput.fill(TestData.userPassword);
        await this.loginFormLoginButton.waitFor();
        await this.loginFormLoginButton.click();
    }

    logOut = async () => {
        await this.page.waitForTimeout(5000);
        await this.userMenuUserName.waitFor();
        await this.userMenuUserName.click();
        await this.userMenuLogOutOption.waitFor();
        await this.userMenuLogOutOption.click();
        await this.userMenuLogInButton.waitFor();
    }


}