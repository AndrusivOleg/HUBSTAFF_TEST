import { Locator, Page } from "@playwright/test";

export class CookiesBannerFragment {
  private readonly banner: Locator;
  private readonly acceptButton: Locator;

  constructor(private readonly page: Page) {
    this.banner = this.page.locator("#CybotCookiebotDialogBody");
    this.acceptButton = this.page.locator(
      "#CybotCookiebotDialogBodyLevelButtonAccept"
    );
  }

  private async isBannerState(
    state: "visible" | "hidden",
    timeout = 3000
  ): Promise<boolean> {
    try {
      await this.banner.waitFor({
        state,
        timeout: process.env.CI ? 1000 : timeout,
      });
      return state === "visible";
    } catch {
      return state === "hidden" && (await this.banner.count()) === 0;
    }
  }

  async acceptCookies(): Promise<void> {
    if (await this.isBannerState("visible", 10000)) {
      await this.acceptButton.click({ force: true });
      await this.isBannerState("hidden");
    }
  }

  async assertBannerNotVisible(): Promise<void> {
    const isHidden = await this.isBannerState("hidden");
    if (!isHidden) {
      throw new Error("Cookies banner is still visible");
    }
  }
}
