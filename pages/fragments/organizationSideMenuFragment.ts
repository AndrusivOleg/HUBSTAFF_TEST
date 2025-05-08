import { Locator, Page, expect } from "@playwright/test";

export class OrganizationSideMenuFragment {
  private readonly projectManagementButton: Locator;
  private readonly financialsButton: Locator;
  private readonly createPaymentButton: Locator;

  constructor(private readonly page: Page) {
    this.projectManagementButton = page.getByRole("menuitem", {
      name: "library_add_check Project",
    });
    this.financialsButton = page.getByRole("menuitem", {
      name: "monetization_on Financials",
    });
    this.createPaymentButton = page.getByRole("menuitem", {
      name: "Create payments",
    });
  }

  async navigateToProjectManagement(): Promise<void> {
    await this.projectManagementButton.click();
  }

  async navigateToFinancials(): Promise<void> {
    await this.financialsButton.click();
  }

  async navigateToCreatePayment(): Promise<void> {
    await this.createPaymentButton.click();
  }

  async assertSideMenuVisible(): Promise<void> {
    await expect(this.projectManagementButton).toBeVisible();
    await expect(this.financialsButton).toBeVisible();
    await expect(this.createPaymentButton).toBeVisible();
  }
}
