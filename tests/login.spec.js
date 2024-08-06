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


  test("id:001 As an user with correct credentials I would like to be able to login to the web shop", async ({ page }) => {

    // Step 1. Go to Log in form
    await pageSignup.goToLoginForm();
    //

    // Step 2. Enter valid data into the Login form fields and Submit the form
    await pageSignup.loginFormEmailInput.waitFor();
    await pageSignup.loginFormEmailInput.fill(TestData.userEmail);
    await pageSignup.loginFormPasswordInput.waitFor();
    await pageSignup.loginFormPasswordInput.fill(TestData.userPassword);
    await pageSignup.loginFormLoginButton.waitFor();
    await pageSignup.loginFormLoginButton.click();

    // Step 3. Check if logged-in user menu is displayed with valid user name
    await expect(pageSignup.userMenuUserName).toBeVisible();
    const userMenuUserNameValue = (await pageSignup.userMenuUserName.textContent()).trim();
    expect(userMenuUserNameValue).toBe(TestData.userEmail.replace("@proton.me", ""));
  
    // Step 4. Check if user can access My Account page and if the valid user name is displayed
    await page.goto(URLs.pageLinkMyAccountPage);
    await expect(page).toHaveURL(URLs.pageLinkMyAccountPage);
    const accountFormDisplayNameInput = await pageMyAccount.accountFormDisplayNameInput.getAttribute("value");
    expect(accountFormDisplayNameInput).toBe(TestData.userEmail.replace("@proton.me", ""));
  });


  test("id:002 As a user I would like to receive an error message, if I enter invalid password", async ({ page }) => {
    
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


  test("id:003 As a user I would like to receive an error message, if I enter invalid email", async ({ page }) => {

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


  test("id:004 As a user I would like to receive an error message, if email is empty", async ({ page }) => {

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


  test("id:005 As a user I would like to receive an error message, if password is empty", async ({ page }) => {
   
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

