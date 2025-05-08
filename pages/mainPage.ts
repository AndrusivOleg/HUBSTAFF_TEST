import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { LoginPage } from "./loginPage";
import { CookiesBannerFragment, HeaderFragment } from "./fragments";

export class MainPage extends BasePage {
  readonly headerFragment: HeaderFragment;
  readonly loginPage: LoginPage;
  readonly cookiesBannerFragment: CookiesBannerFragment;

  private readonly homeUrl = "/";

  constructor(page: Page) {
    super(page);
    this.headerFragment = new HeaderFragment(page);
    this.loginPage = new LoginPage(page);
    this.cookiesBannerFragment = new CookiesBannerFragment(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.homeUrl);
    await this.cookiesBannerFragment.acceptCookies();
  }

  async assertMainPageLoaded(): Promise<void> {
    await this.headerFragment.assertHeaderVisible();
  }
}
