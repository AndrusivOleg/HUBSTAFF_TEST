import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { TestUserCredentials } from "../utils/testData";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  private readonly loginUrl = "/login";

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("#user_email");
    this.passwordInput = page.locator("#user_password");
    this.loginButton = page.getByRole("button", { name: "Sign in" });
  }

  async goto(): Promise<void> {
    await this.page.goto(this.loginUrl);
    await this.assertLoginFormVisible();
  }

  async assertLoginFormVisible(): Promise<void> {
    await this.waitUntilVisible(this.emailInput);
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(user: TestUserCredentials): Promise<void> {
    const { email, password } = user;
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
