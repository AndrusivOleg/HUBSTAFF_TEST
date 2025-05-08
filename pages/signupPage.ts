import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { User } from "../utils/testData";

export class SignupPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly createAccountButton: Locator;

  private readonly signupUrl = "/signup";

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId("first_name");
    this.lastNameInput = page.getByTestId("last_name");
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.termsCheckbox = page
      .locator('label:has-text("I agree to the Terms, Privacy") div')
      .first();
    this.createAccountButton = page.getByTestId("create_my_account");
  }

  async goto(): Promise<void> {
    await this.page.goto(this.signupUrl);
    await this.assertSignupFormVisible();
  }

  async assertSignupFormVisible(): Promise<void> {
    await this.waitUntilVisible(this.firstNameInput);
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.termsCheckbox).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
  }

  async signup(user: User): Promise<void> {
    const { firstName, lastName, email, password } = user;

    await this.waitUntilReady();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.termsCheckbox.check({ force: true });
    await this.page.waitForTimeout(2000);
    await this.createAccountButton.click();
  }
}
