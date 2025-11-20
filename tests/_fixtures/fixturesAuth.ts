import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

export const test = base.extend<{
  signUpPage;
  signInPage;
  homePage;
  homePage1;
  homePage2;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  homePage1: async ({ page1 }, use) => {
    const homePage1 = new HomePage(page1);

    await use(homePage1);
  },
  homePage2: async ({ page2 }, use) => {
    const homePage2 = new HomePage(page2);

    await use(homePage2);
  },
});
