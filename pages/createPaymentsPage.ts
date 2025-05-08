import { Locator, Page, expect } from "@playwright/test";

export class CreatePaymentsPage {
  private readonly oneTimePaymentTab: Locator;
  private readonly searchMemberLocator: Locator;
  private readonly amountInput: Locator;
  private readonly noteInput: Locator;
  private readonly createPaymentButton: Locator;
  private readonly confirmButton: Locator;
  private readonly exportPaymentModal: Locator;
  private readonly notNowModalButton: Locator;

  private readonly page: Page;
  private readonly selectMemberByName: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.oneTimePaymentTab = page.getByRole("link", {
      name: "One-time amount",
    });
    this.searchMemberLocator = page.locator('input[type="search"]');
    this.amountInput = page.locator("#team_payment_total_amount");
    this.noteInput = page.locator("#team_payment_note");
    this.createPaymentButton = page.getByRole("link", {
      name: "Create payment",
    });
    this.confirmButton = page.locator('input[name="commit"]');
    this.exportPaymentModal = page.locator("#export-payment-modal");
    this.notNowModalButton = page
      .locator("#export_payment")
      .getByText("Not now");

    this.selectMemberByName = (name: string) =>
      page.getByRole("treeitem", { name });
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.oneTimePaymentTab).toBeVisible();
  }

  async createOneTimeBonus(
    member: string,
    amount: string,
    note: string
  ): Promise<void> {
    await this.oneTimePaymentTab.click();
    // Select member
    await this.searchMemberLocator.click();
    await this.selectMemberByName(member).click();

    // Fill out payment info
    await this.amountInput.fill(amount);
    await this.noteInput.fill(note);

    // Create payment
    await this.createPaymentButton.click();
    await this.confirmButton.waitFor({ state: "visible" });
    await this.confirmButton.click();

    // Handle modal
    await expect(this.exportPaymentModal).toBeVisible();
    await this.notNowModalButton.click();
  }
}
