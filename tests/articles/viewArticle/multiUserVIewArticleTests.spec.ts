import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithOneTag }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithOneTag);
});

test('view an article created by another user in the Global Feed', async ({
  user1,
  articleWithOneTag,
  homePage2
}) => {
  await homePage2.refreshThePage();
  await homePage2.openGlobalFeed();

  await homePage2.filterByTag(articleWithOneTag.tags[0]);

  await homePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await homePage2.assertArticleDescriptionIsVisible(articleWithOneTag.description);
  await homePage2.assertArticleAuthorNameIsVisible(user1.username);
});

test('User can follow the article created by another user.', async ({
  articleWithOneTag,
  homePage2
}) => {
  await homePage2.refreshThePage();
  await homePage2.openGlobalFeed();

  await homePage2.filterByTag(articleWithOneTag.tags[0]);
  await homePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await homePage2.followTheArticle(articleWithOneTag.title);

});

test('User can unfollow the article created by another user', async ({
  articleWithOneTag,
  homePage2
}) => {
  await homePage2.refreshThePage();
  await homePage2.openGlobalFeed();

  await homePage2.filterByTag(articleWithOneTag.tags[0]);
  await homePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await homePage2.followTheArticle(articleWithOneTag.title);
  await homePage2.unfollowTheArticle(articleWithOneTag.title);
});

test('User can view an article updated by another user.', async ({
  articleWithOneTag,
  page2, 
  user1,
  page1
}) => {
  const viewArticlePage1 = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);
  const viewArticlePage2 = new ViewArticlePage(page2);
  const newText = faker.lorem.sentences(2)

  await viewArticlePage1.clickEditArticleButton();
  await editArticlePage.waitUntillFormLoads();

  await editArticlePage.editArticleText(articleWithOneTag.text, newText);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePage1.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage1.assertArticleTextIsVisible(newText);

  await viewArticlePage2.open(articleWithOneTag.url);

  await viewArticlePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage2.assertArticleTextIsVisible(newText);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
});

test("User can see other user's new articles in 'Your Feed' after following their profile.", async ({
  page2,
  user1,
  articleWithOneTag,
  homePage2
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.followAuthor(user1.username);
  await viewArticlePage.goToHomeTab();

  await homePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await homePage2.assertArticleDescriptionIsVisible(articleWithOneTag.description);
  await homePage2.assertArticleAuthorNameIsVisible(user1.username);
});

test("User doesn't see other user's articles in 'Your Feed' after unfollowing their profile", async ({
  page2,
  user1,
  articleWithOneTag,
  homePage2
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.followAuthor(user1.username);
  await viewArticlePage.goToHomeTab();

  await homePage2.assertArticleTitleIsVisible(articleWithOneTag.title);

  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.unfollowAuthor(user1.username);
  await viewArticlePage.goToHomeTab();

  await homePage2.assertNoArticlesMessageIsVisible();
});

