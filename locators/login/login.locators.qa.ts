/**
 * Login page locators.
 * These may change depending on the current ENV (e.g., qa, uat, prod).
 */
export const loginLocators = {
    emailInput: 'input[data-qa="login-email"]',
    passwordInput: 'input[data-qa="login-password"]',
    loginButton: 'button[data-qa="login-button"]',
    loggedInIndicator: 'a:has-text("Logged in as")',
    loginErrorMessage: 'p:has-text("Your email or password is incorrect!")',
};