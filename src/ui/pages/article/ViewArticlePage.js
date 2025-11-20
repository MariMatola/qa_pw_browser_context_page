import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' }).first();
    this.homeTab = page.getByRole('link', { name: 'Home' });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async goToHomeTab () {
    await test.step(`Go to Home tab`, async () => {
      await this.homeTab.click();
    });
  }

  async clickEditArticleButton () {
    await test.step('Click Edit Article button', async () => {
      await this.editArticleButton.click();
    });
  }

  async followAuthor(authorUsername) {
    await test.step('Follow the author', async () => {
      await this.page
        .getByRole('button', { name: `  Follow ${authorUsername}` })
        .first().click();
    });
  } 

  async unfollowAuthor(authorUsername) {
    await test.step('Unfollow the author', async () => {
      await this.page
        .getByRole('button', { name: `  Unfollow ${authorUsername}` })
        .first().click();
    });
  } 

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(
        `Assert the article has correct author username`, 
        async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }
}
