import { test } from "../../fixtures";
import { OrganizationSideMenuFragment } from "../../pages/fragments";
import { projectName, testUser } from "../../utils/testData";

test.describe("Add/Create project", () => {
  test("check that the user can create a new project", async ({
    page,
    loginPage,
    projectPage,
  }) => {
    const sideMenu = new OrganizationSideMenuFragment(page);
    await loginPage.goto();
    await loginPage.login(testUser);

    await sideMenu.navigateToProjectManagement();
    await projectPage.assertPageLoaded();
    await projectPage.createProject(projectName);

    await projectPage.assertProjectVisible(projectName);
  });
});
