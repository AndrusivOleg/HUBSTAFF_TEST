import { Locator, Page, expect } from "@playwright/test";

export class HeaderFragment {
  private readonly page: Page;
  private readonly freeTrialButtonLocator: Locator;
  private readonly signInButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.freeTrialButtonLocator = page.getByRole("link", {
      name: /Free 14-day trial/i,
    });
    this.signInButtonLocator = page.getByTestId("sign_in_button");
  }

  async clickSignIn(): Promise<void> {
    await this.signInButtonLocator.click();
  }

  async clickFreeTrial(): Promise<void> {
    await this.freeTrialButtonLocator.click();
  }

  async assertHeaderVisible(): Promise<void> {
    await expect(this.signInButtonLocator).toBeVisible();
    await expect(this.freeTrialButtonLocator).toBeVisible();
  }
}
