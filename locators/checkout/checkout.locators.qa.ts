/**
 * Checkout page locators.
 * These may change depending on the current ENV (e.g., qa, uat, prod).
 */
export const checkoutLocators = {
    placeOrderButton: 'a[class="btn btn-default check_out"]',
    nameInput: 'input[data-qa="name-on-card"]',
    ccNumberInput: 'input[data-qa="card-number"]',
    cvcInput: 'input[data-qa="cvc"]',
    expMonthInput: 'input[data-qa="expiry-month"]',
    expYearInput: 'input[data-qa="expiry-year"]',
    confirmOrderButton: 'button[data-qa="pay-button"]',
    orderSuccessMessage: 'h2[data-qa="order-placed"]',
};