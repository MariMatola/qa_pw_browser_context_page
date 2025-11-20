import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
    this.followArticleButton = page.getByRole('button', { name: '' });
    this.noArticlesMessage = page.getByText('No articles are here... yet.')
    this.settingsButton = page.getByRole('link', { name: '  Settings' });
  }
  async open() {
    await test.step(`Open Home page`, async () => {
      await this.page.goto('');
    });
  }
  async clickSettingsButton() {
    await test.step("Go to Settings page", async () => {
      await this.settingsButton.click();
    });
  }
  async refreshThePage() {
    await test.step('Refresh the page', async ()=> {
      this.page.reload();
    })
  }

  async openGlobalFeed() {
    await test.step(`Open Global Feed tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async filterByTag(tagName) {
    await test.step(`Filter articles by tag`, async () => {
      // const tag = this.page.getByText(tagName);
      const tag = this.page.locator('a.link.tag-default.tag-pill')
        .filter({hasText: tagName, exact: true}).first();
      await tag.click();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async followTheArticle(title){
    await test.step('Follow the article', async () =>{
      const articleLikeButton = this.page.locator('div.article-preview')
        .filter({ hasText: title })
        .locator("button.btn.btn-sm.btn-outline-primary");
      const likedButton = this.page.locator('div.article-preview')
      .filter({ hasText: title })
      .locator("button.btn.btn-sm.btn-primary");

      const numberOfLikes = parseInt(
        await articleLikeButton.textContent()
      ); 
      await articleLikeButton.click();
  
      const newExpectedNumberOfLikes = numberOfLikes + 1;
      const newActualNumberOfLikes = parseInt(
        await likedButton.textContent()
      );
      expect(newActualNumberOfLikes).toBe(newExpectedNumberOfLikes);
    })
  }

  async unfollowTheArticle(title){
    await test.step('Follow the article', async () =>{
      const articleLikeButton = this.page.locator('div.article-preview')
        .filter({ hasText: title })
        .locator("button.btn.btn-sm.btn-outline-primary");
      const likedButton = this.page.locator('div.article-preview')
        .filter({ hasText: title })
        .locator("button.btn.btn-sm.btn-primary");
        
      const numberOfLikes = parseInt(await likedButton.textContent()); 
      await likedButton.click();
  
      const newExpectedNumberOfLikes = numberOfLikes - 1;
      let newActualNumberOfLikes;

      if (await likedButton.count() > 0) {
        newActualNumberOfLikes = parseInt(await likedButton.textContent());
      } else {
        newActualNumberOfLikes = parseInt(
          await articleLikeButton.textContent()
        );
      }

      expect(newActualNumberOfLikes).toBe(newExpectedNumberOfLikes);
    })
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertNoArticlesMessageIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is empty`, async () => {
      await expect(this.noArticlesMessage).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article is visible`, async () => {
      const articleTitleHeader = this.page.getByText(title).first();
      await expect(articleTitleHeader).toBeVisible();
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert the article is visible`, async () => {
      const articleTitleHeader = this.page.getByText(title).first();
      await expect(articleTitleHeader).toBeHidden();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct text`, async () => {
      const articleTitleDescription = this.page.getByText(description);
      await expect(articleTitleDescription).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(
        `Assert the article has correct author username`, 
        async () => {
      const authorUsername = this.page.getByRole('link', { name: username })
      await expect(authorUsername).toBeVisible();
    });
  }
}
