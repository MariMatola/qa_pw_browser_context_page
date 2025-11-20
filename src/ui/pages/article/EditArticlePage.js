import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page
    .getByRole('button', { name: 'Update Article' });
    this.editArticleForm = page.locator('div.col-md-10.offset-md-1.col-xs-12');
  }

  
  async clickUpdateArticleButton () {
    await test.step('Click Update Article button', async () => {
      await this.updateArticleButton.click();
    });
  }

  async waitUntillFormLoads() {
    await test.step('Wait untill edit article form loads', async () => {
      await expect(this.editArticleForm).toBeVisible();
    });
  }
  
  async editArticleText(text, newText) {
    await test.step(`Assert the article has correct text'`, async () => {
      await this.page.locator('textarea.form-control').fill(newText);
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

}
