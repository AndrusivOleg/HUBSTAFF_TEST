import { test, expect } from "../../fixtures";
import { newTestUser } from "../../utils/testData";

test.describe("Sign up", () => {
  test("check that the user can sign up for a 14-day free trial", async ({
    page,
    mainPage,
    signupPage,
  }) => {
    await mainPage.goto();

    await mainPage.headerFragment.clickFreeTrial();
    await signupPage.signup(newTestUser);

    await expect(
      page.getByRole("heading", { name: "Verify your email" })
    ).toBeVisible({timeout: 10000});
  });
});
