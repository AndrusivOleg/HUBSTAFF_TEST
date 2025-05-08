import { test } from "../../fixtures";
import { OrganizationSideMenuFragment } from "../../pages/fragments";
import { bonusData, testUser } from "../../utils/testData";

test.describe("Bonus payment", () => {
  test("check that the user can send a one-time bonus payment", async ({
    page,
    loginPage,
    createPaymentsPage,
  }) => {
    const sideMenu = new OrganizationSideMenuFragment(page);
    await loginPage.goto();
    await loginPage.login(testUser);

    await sideMenu.navigateToFinancials();
    await sideMenu.navigateToCreatePayment();
    await createPaymentsPage.assertPageLoaded();
    await createPaymentsPage.createOneTimeBonus(
      bonusData.member,
      bonusData.amount,
      bonusData.note
    );

  });
});
