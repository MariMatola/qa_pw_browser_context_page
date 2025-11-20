import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page
    .getByRole('button', { name: 'Update Article' })
  }

  
  async clickUpdateArticleButton () {
    await test.step('Click Update Article button', async () => {
      await this.updateArticleButton.click();
    });
  }
  
  async editArticleText(text, newText) {
    await test.step(`Assert the article has correct text'`, async () => {
      this.page.locator('textarea.form-control').fill(newText);
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

}
