import { test, expect } from "@playwright/test";
import { URLs } from "../common/URLs";
import { TestData } from "../common/TestData";
import { PageSignUp } from "../page-objects/PageSignUp";
import { PageMyAccount } from "../page-objects/PageMyAccount";

test.describe.serial('Sequential Test Suite', async () => {

  let UserGeneratedEmail = null;
  let pageSignup;
  let testData;
  let pageMyAccount;

  test.beforeEach(async ({ page }) => {
    pageSignup = new PageSignUp(page);
    testData = new TestData(page);
    pageMyAccount = new PageMyAccount(page);
  });

  test.skip("id:0012-e2e-registration Sign Up", async ({ page }) => {

    // Step 1. Go to Sign Up form
    await page.goto("/");
    await pageSignup.userMenuLogInButton.waitFor();
    await pageSignup.userMenuLogInButton.click();

    // Step 2. Fill form with valid data and submit
    UserGeneratedEmail = await testData.generateEmail();
    console.log('UserGeneratedEmail: ' + UserGeneratedEmail);
    await pageSignup.signupFormEmailInput.waitFor();
    await pageSignup.signupFormEmailInput.fill(UserGeneratedEmail);
    await pageSignup.signupFormPasswordInput.waitFor();
    await pageSignup.signupFormPasswordInput.fill(TestData.userPassword);
    await pageSignup.signUpFormSignUpButton.waitFor();
    await pageSignup.signUpFormSignUpButton.click();

    // Step 3. Check if user successfully signed up and then logout
    await pageSignup.userMenuUserName.waitFor();
    await expect(pageSignup.userMenuUserName).toHaveText(UserGeneratedEmail);
    await page.goto(URLs.pageLinkMyAccountPage);
    const inputDisplayNameValue = await pageMyAccount.accountFormDisplayNameInput.getAttribute('value');
    expect(inputDisplayNameValue).toBe(UserGeneratedEmail.replace('@proton.me', ''));
  });

  test.skip('Test Login', async ({ page }) => {

    await pageSignup.goToLoginForm();
    await pageSignup.loginFormEmailInput.waitFor();
    await pageSignup.loginFormEmailInput.fill(UserGeneratedEmail);
    await pageSignup.loginFormPasswordInput.waitFor();
    await pageSignup.loginFormPasswordInput.fill(TestData.userPassword);
    await pageSignup.loginFormLoginButton.waitFor();
    await pageSignup.loginFormLoginButton.click();

    await pageSignup.userMenuUserName.waitFor();
    await expect(pageSignup.userMenuUserName).toHaveText(UserGeneratedEmail.replace('@proton.me', ''));
    await page.goto(URLs.pageLinkMyAccountPage);
    const inputDisplayNameValue = await pageMyAccount.accountFormDisplayNameInput.getAttribute('value');
    expect(inputDisplayNameValue).toBe(UserGeneratedEmail.replace('@proton.me', ''));

    await page.goto("/");
    await pageSignup.logOut();
    await expect(pageSignup.userMenuLogInButton).toBeVisible();
    await page.goto(URLs.pageLinkMyAccountPage);
    await expect(pageSignup.signUpFormSignUpButton).toBeVisible();
    await page.pause();
  });

});