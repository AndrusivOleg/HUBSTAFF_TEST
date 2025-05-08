import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitUntilReady(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  async waitUntilVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" });
  }
}
