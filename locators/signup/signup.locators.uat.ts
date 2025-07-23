/**
 * Signup page locators.
 * These may change depending on the current ENV (e.g., qa, uat, prod).
 */
export const signupLocators = {
    nameInput: 'input[data-qa="signup-name"]',
    emailInput: 'input[data-qa="signup-email"]',
    signUpButton: 'button[data-qa="signup-button"]',
    titleMrRadio: 'input[id="id_gender1"]',
    titleMrsRadio: 'input[id="id_gender2"]',
    passwordInput: 'input[data-qa="password"]',
    birthDaySelect: 'select[data-qa="days"]',
    birthMonthSelect: 'select[data-qa="months"]',
    birthYearSelect: 'select[data-qa="years"]',
    firstNameInput: 'input[data-qa="first_name"]',
    lastNameInput: 'input[data-qa="last_name"]',
    companyInput: 'input[data-qa="company"]',
    address1Input: 'input[data-qa="address"]',
    address2Input: 'input[data-qa="address2"]',
    countrySelect: 'select[data-qa="country"]',
    stateSelect: 'input[data-qa="state"]',
    cityInput: 'input[data-qa="city"]',
    zipcodeInput: 'input[data-qa="zipcode"]',
    mobileNumberInput: 'input[data-qa="mobile_number"]',
    createAccountButton: 'button[data-qa="create-account"]',
    accountCreatedMessage: 'h2[data-qa="account-created"]',
};