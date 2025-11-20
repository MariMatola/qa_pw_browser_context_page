import { test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page
      .getByRole('button', { name: 'Update Settings' });
  }

  async clickUpdateSettingsButton() {
    await test.step("Save Updates", async () => {
      await this.updateSettingsButton.click();
    });
  }

  async fillInNewPassword(password) {
    await test.step("Enter new Password", async () => {
      await this.newPasswordField.fill(password);
    });
  }
}
