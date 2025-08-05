import { test, expect } from '../../fixtures/ui-fixtures';

/**
 * Test suite to automate login UI with automatic user management.
 * Uses fixtures for clean test isolation and resource management.
 */
test.describe('Automate Login UI', () => {
    test('Should log in successfully with valid credentials', async ({
        loginPage,
        createdUser
    }) => {
        await loginPage.navigate();
        await loginPage.login(createdUser.email, createdUser.password);
        await loginPage.verifyLoginSuccess(createdUser.name);
    });

    test('Should display error for invalid login credentials', async ({
        loginPage
    }) => {
        await loginPage.navigate();

        const random = Math.floor(Math.random() * 100000);
        await loginPage.login(`${random}@invalid.com`, 'WrongPassword');
        await loginPage.verifyLoginFailure();
    });
});