import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PlpPage } from '../pages/plp.page';
import { PdpPage } from '../pages/pdp.page';
import { UserApi } from '../api/user.api';
import { generateTestUser } from '../utils/test-users';

/**
 * UI test fixtures with pre-configured page objects and user data.
 */
type UIFixtures = {
    loginPage: LoginPage;
    signupPage: SignupPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    plpPage: PlpPage;
    pdpPage: PdpPage;
    userApi: UserApi;
    testUser: ReturnType<typeof generateTestUser>;
    createdUser: ReturnType<typeof generateTestUser>;
    signupUser: ReturnType<typeof generateTestUser>;
};

/**
 * Extended test with UI fixtures for page objects and user management.
 */
export const test = base.extend<UIFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    plpPage: async ({ page }, use) => {
        await use(new PlpPage(page));
    },

    pdpPage: async ({ page }, use) => {
        await use(new PdpPage(page));
    },

    userApi: async ({ request }, use) => {
        await use(new UserApi(request, process.env.BASE_URL!));
    },

    testUser: async ({ }, use) => {
        await use(generateTestUser());
    },

    createdUser: async ({ userApi, testUser }, use) => {
        await userApi.createUser(testUser);
        await use(testUser);

        try {
            await userApi.deleteUser(testUser.email, testUser.password);
        } catch (error) {
            console.warn(`Failed to cleanup user ${testUser.email}:`, error);
        }
    },

    signupUser: async ({ userApi, testUser }, use) => {
        await use(testUser);

        try {
            await userApi.deleteUser(testUser.email, testUser.password);
        } catch (error) {
            console.warn(`Failed to cleanup user ${testUser.email}:`, error);
        }
    },
});

export { expect } from '@playwright/test';