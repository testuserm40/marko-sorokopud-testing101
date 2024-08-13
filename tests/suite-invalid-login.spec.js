import { test, expect } from "@playwright/test";
import { TestData } from "../common/TestData";
import { URLs } from "../common/URLs";
import { PageSignUp } from "../page-objects/PageSignUp";
import { PageMyAccount } from "../page-objects/PageMyAccount";


test.describe("User Login Tests", () => {
  let pageSignup;
  let pageMyAccount;

  test.beforeEach(async ({ page }) => {
    pageSignup = new PageSignUp(page);
    pageMyAccount = new PageMyAccount(page);
  });

  test.skip("Id:001-suite-invalid-login As a user I would like to receive an error message, if I enter invalid password", async ({ page }) => {

    // Step 1. Go to Log in form
    await pageSignup.goToLoginForm();

    // Step 2: Enter invalid credentials into the Login form fields and submit the form
    await pageSignup.loginFormEmailInput.waitFor();
    await pageSignup.loginFormEmailInput.fill(TestData.userEmail);
    await pageSignup.loginFormPasswordInput.waitFor();
    await pageSignup.loginFormPasswordInput.fill(TestData.userInvalidPassword);
    await pageSignup.loginFormLoginButton.waitFor();
    await pageSignup.loginFormLoginButton.click();

    // Step 3: Wait for the error message to be displayed and verify its content
    await pageSignup.loginFormInvalidLoginErrorMessage.waitFor();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toBeVisible();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toHaveText("Wrong email or password");
  });


  test.skip("Id:002-suite-invalid-login As a user I would like to receive an error message, if I enter invalid email", async ({ page }) => {

    // Step 1. Go to Log in form
    await pageSignup.goToLoginForm();

    // Step 2. Fill in the login form with not existed email submit it
    await pageSignup.loginFormEmailInput.waitFor();
    await pageSignup.loginFormEmailInput.fill(TestData.userNotExistedEmail);
    await pageSignup.loginFormPasswordInput.waitFor();
    await pageSignup.loginFormPasswordInput.fill(TestData.userPassword);
    await pageSignup.loginFormLoginButton.waitFor();
    await pageSignup.loginFormLoginButton.click();

    // Step 3: Wait for the error message to be displayed and verify its content
    await pageSignup.loginFormInvalidLoginErrorMessage.waitFor();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toBeVisible();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toHaveText("This email doesn't match any account. Try again.");
  });


  test.skip("Id:003-suite-invalid-login As a user I would like to receive an error message, if email is empty", async ({ page }) => {

    // Step 1. Go to Log in form
    await pageSignup.goToLoginForm();

    // Step 2: Enter invalid credentials into the Login form fields and submit the form
    await pageSignup.loginFormPasswordInput.waitFor();
    await pageSignup.loginFormPasswordInput.fill(TestData.userPassword);
    await pageSignup.loginFormLoginButton.waitFor();
    await pageSignup.loginFormLoginButton.click();

    // Step 3: Wait for the error message to be displayed and verify its content
    await pageSignup.loginFormInvalidLoginErrorMessage.waitFor();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toBeVisible();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toHaveText("Email cannot be blank");
  });


  test.skip("id:004-suite-invalid-login As a user I would like to receive an error message, if password is empty", async ({ page }) => {

    // Step 1. Go to Log in form
    await pageSignup.goToLoginForm();

    // Step 2: Enter invalid credentials into the Login form fields and submit the form
    await pageSignup.loginFormEmailInput.waitFor();
    await pageSignup.loginFormEmailInput.fill(TestData.userEmail);
    await pageSignup.loginFormLoginButton.waitFor();
    await pageSignup.loginFormLoginButton.click();

    // Step 3: Wait for the error message to be displayed and verify its content
    await pageSignup.loginFormInvalidLoginErrorMessage.waitFor();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toBeVisible();
    await expect(pageSignup.loginFormInvalidLoginErrorMessage).toHaveText("Make sure you enter a password.");
  });
});
// await page.waitForTimeout(2000);
// await page.pause()

