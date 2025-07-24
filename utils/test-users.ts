/**
 * Generates a test user object with the default values and a randomized email.
 * Environment variables can override default fields to allow customization.
 *
 * @returns A user object with form data for account creation or login tests.
 */
export function generateTestUser() {
    const random = Math.floor(Math.random() * 100000);

    return {
        name: process.env.TEST_NAME!,
        email: `${random}@example.com`,
        title: process.env.TEST_TITLE!,
        password: process.env.TEST_PASSWORD!,
        birth_day: process.env.TEST_BIRTH_DAY!,
        birth_month: process.env.TEST_BIRTH_MONTH!,
        birth_year: process.env.TEST_BIRTH_YEAR!,
        firstname: process.env.TEST_FIRST_NAME!,
        lastname: process.env.TEST_LAST_NAME!,
        company: process.env.TEST_COMPANY!,
        address1: process.env.TEST_ADDRESS1!,
        address2: process.env.TEST_ADDRESS2!,
        country: process.env.TEST_COUNTRY!,
        zipcode: process.env.TEST_ZIPCODE!,
        state: process.env.TEST_STATE!,
        city: process.env.TEST_CITY!,
        mobile_number: process.env.TEST_MOBILE_NUMBER!,

        cc_name: process.env.TEST_CC_NAME!,
        cc_number: process.env.TEST_CC_NUMBER!,
        cc_cvc: process.env.TEST_CC_CVC!,
        cc_exp_month: process.env.TEST_CC_EXP_MONTH!,
        cc_exp_year: process.env.TEST_CC_EXP_YEAR!
    };
}