import { test, expect } from "../../fixtures";
import { testUser } from "../../utils/testData";

test.describe("Sign in", () => {
  test("check that the user can sign in from the marketing page navigation bar", async ({
    page,
    mainPage,
    loginPage,
  }) => {
    await mainPage.goto();

    await mainPage.headerFragment.clickSignIn();
    await loginPage.login(testUser);

    await expect(page).toHaveURL(/\/getting_started\/\d+$/);
  });
});
