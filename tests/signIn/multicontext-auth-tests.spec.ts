import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { signInUser } from '../../src/ui/actions/auth/signInUser';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { faker } from '@faker-js/faker';
import { createArticle } from '../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page1, user }) => {
  await signUpUser(page1, user);
});

test('User can sign in with changed in profile password', async ({
  user,
  homePage1,
  page1,
  page2
}) => {
  user.password = await `${faker.internet.password()}`;
  const settingsPage = new SettingsPage(page1);

  await homePage1.clickSettingsButton();
  await settingsPage.fillInNewPassword(user.password);
  await settingsPage.clickUpdateSettingsButton();

  await signInUser(page2, user);
});

test('User can see own article in "Global feed" when not logged in.', async ({
  articleWithOneTag,
  homePage2, 
  page1,
}) => {
  await createArticle(page1, articleWithOneTag);

  await homePage2.open();
  await homePage2.openGlobalFeed();
  await homePage2.filterByTag(articleWithOneTag.tags[0]);
  await homePage2.waitUntillPageLoad();
  await homePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await homePage2.followTheArticle(articleWithOneTag.title);
});
