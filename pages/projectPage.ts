import { expect, Locator, Page } from "@playwright/test";

export class ProjectPage {
  private readonly addProjectButton: Locator;
  private readonly nameInput: Locator;
  private readonly saveButton: Locator;
  private readonly projectRow: (name: string) => Locator;
  private readonly successToast: Locator;

  constructor(private readonly page: Page) {
    this.addProjectButton = page.getByText("Add Project");
    this.nameInput = page.getByRole("textbox", {
      name: "Add project names separated",
    });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.successToast = page.getByText("Project created");
    this.projectRow = (name: string) =>
      page.locator("table").getByRole("row", { name });
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.addProjectButton).toBeVisible();
  }

  async createProject(name: string): Promise<void> {
    await this.addProjectButton.click();
    await this.nameInput.fill(name);
    await this.saveButton.click();
    await expect(this.successToast).toBeVisible();
  }

  async assertProjectVisible(name: string): Promise<void> {
    await expect(this.projectRow(name)).toBeVisible();
  }
}
