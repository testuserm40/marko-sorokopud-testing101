// import { test, expect } from "@playwright/test";

// import { TestData } from "../common/TestData";
// import { URLs } from "../common/URLs";
// import { PageSignUp } from "../page-objects/PageSignUp"; 
// import { PageMyAccount } from "../page-objects/PageMyAccount";

// Lesson 22 :: Form fields
// https://www.udemy.com/course/automated-web-testing/learn/lecture/35756730

// test.describe.serial('Sequential Test Suite', async () => {
  
//   let currentUserEmail = null;

//   test.skip('Test SignUp', async ({ page }) => {
    
//     const common = new Common(page);
//     const pageSignup = new PageSignUp(page);
//     const pageMyAccount = new PageMyAccount(page);

//     await common.visit("/");
//     await pageSignup.buttonLogIn.waitFor();
//     await expect(pageSignup.buttonLogIn).toBeVisible();
//     await expect(pageSignup.buttonLogIn).toHaveCount(1);
//     await expect(pageSignup.menuUser).not.toBeVisible();
//     await expect(pageSignup.menuUser).toHaveCount(0);
//     await pageSignup.buttonLogIn.click();

//     currentUserEmail = await common.generateEmail();
//     await pageSignup.inputEmail.waitFor();
//     await pageSignup.inputEmail.fill(currentUserEmail);
//     await pageSignup.inputPassword.waitFor();
//     await pageSignup.inputPassword.fill(common.hardcodedUserPassword);

//     await pageSignup.buttonSignUp.waitFor();
//     await pageSignup.buttonSignUp.click();

//     await common.waitSeconds(5000);
    
//     await common.visit(common.pageLinkAccountMyAccountPage);

//     await common.waitSeconds(1000);

//     const inputDisplayNameValue = await pageMyAccount.inputDisplayName.getAttribute('value');
//     expect(inputDisplayNameValue).toBe(currentUserEmail.replace('@proton.me', ''));
//     console.log(currentUserEmail);

// });

//   test.skip('Test Login', async ({ page }) => {
    
//     const common = new Common(page);
//     const pageSignup = new PageSignUp(page);
//     const pageMyAccount = new PageMyAccount(page);

//     await common.visit("/");
//     await common.waitSeconds(3000);
//     console.log('a ' + currentUserEmail);
//     await page.pause()
//     await pageSignup.buttonLogIn.waitFor();
//     await pageSignup.buttonLogIn.click();
//     await pageSignup.buttonSignUpFormLoginButton.waitFor();
//     await pageSignup.buttonSignUpFormLoginButton.click();
//     await common.waitSeconds(3000);
//     await pageSignup.inputEmail.waitFor();
//     await pageSignup.inputEmail.fill(currentUserEmail);
//     await pageSignup.inputPassword.waitFor();
//     await pageSignup.inputPassword.fill(common.hardcodedUserPassword);
//     await pageSignup.buttonLoginFormLoginButton.waitFor();
//     await pageSignup.buttonLoginFormLoginButton.click();
//     await common.waitSeconds(3000);
//     await common.visit(common.pageLinkAccountMyAccountPage);

//     await common.waitSeconds(1000);

//     const inputDisplayNameValue = await pageMyAccount.inputDisplayName.getAttribute('value');
//     expect(inputDisplayNameValue).toBe(currentUserEmail.replace('@proton.me', ''));



//    await page.pause()

//   });
// });

  // await common.waitSeconds(3000);
  // await this.page.waitForTimeout(1000);
  // console.warn({lowestPrice});
  // await page.pause()
  // await this.page.pause()

