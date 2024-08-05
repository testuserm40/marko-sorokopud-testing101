import { test, expect } from "@playwright/test";
import { TestData } from "../common/TestData";
import { URLs } from "../common/URLs";
import { PageSignUp } from "../page-objects/PageSignUp"; 
import { PageMyAccount } from "../page-objects/PageMyAccount";

  test("id:006 As a user, I would like to be able to reset my password if I forget my credentials", async ({ page }) => {
    
    const pageSignup = new PageSignUp(page);
    const pageMyAccount = new PageMyAccount(page);
    
    // Step 1. Go to Log in form >> Reset password form
    await pageSignup.goToLoginForm();
    await pageSignup.loginFormForgotPasswordButton.waitFor();
    await pageSignup.loginFormForgotPasswordButton.click();

    // Step 2: Enter email and submit the Reset password form
    await pageSignup.loginFormEmailInput.waitFor();
    await pageSignup.loginFormEmailInput.fill(TestData.userEmail);
    await pageSignup.resetPasswordFormResetPasswordButton.waitFor();
    await pageSignup.resetPasswordFormResetPasswordButton.click();

    // Step 7: Verify the success message is displayed
    await expect(pageSignup.resetPasswordSuccessDialogLinkSentHeader).toBeVisible();
    await expect(pageSignup.resetPasswordSuccessDialogLinkSentHeader).toHaveText("Reset password link was sent");
  });

  // await page.waitForTimeout(2000);
  // await page.pause()

