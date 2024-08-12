import { test, expect } from "@playwright/test";
import { TestData } from "../common/TestData";
import { URLs } from "../common/URLs";
import { PageSignUp } from "../page-objects/PageSignUp";
import { PageMyAccount } from "../page-objects/PageMyAccount";

test("id:001-login As an user with correct credentials I would like to be able to login to the web shop", async ({ page }) => {

  const pageSignup = new PageSignUp(page);
  const pageMyAccount = new PageMyAccount(page);

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

// await page.waitForTimeout(2000);
// await page.pause()

