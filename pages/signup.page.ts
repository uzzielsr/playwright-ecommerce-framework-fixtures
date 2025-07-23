import { Page, Locator, expect } from '@playwright/test';
import { signupLocators } from '../locators/signup/index';

/**
 * Page Object representing the Signup page.
 * Handles new user account creation by interacting with the signup form.
 */
export class SignupPage {
    /** Locators for all signup form elements and feedback messages. */
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly signUpButton: Locator;
    private readonly titleMrRadio: Locator;
    private readonly titleMrsRadio: Locator;
    private readonly passwordInput: Locator;
    private readonly birthDaySelect: Locator;
    private readonly birthMonthSelect: Locator;
    private readonly birthYearSelect: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly companyInput: Locator;
    private readonly address1Input: Locator;
    private readonly address2Input: Locator;
    private readonly countrySelect: Locator;
    private readonly stateSelect: Locator;
    private readonly cityInput: Locator;
    private readonly zipcodeInput: Locator;
    private readonly mobileNumberInput: Locator;
    private readonly createAccountButton: Locator;
    private readonly accountCreatedMessage: Locator;

    /**
  * Initializes a new instance of the SignupPage.
  * @param page The Playwright Page object for the signup process.
  */
    constructor(private readonly page: Page) {
        this.nameInput = page.locator(signupLocators.nameInput);
        this.emailInput = page.locator(signupLocators.emailInput);
        this.signUpButton = page.locator(signupLocators.signUpButton);
        this.titleMrRadio = page.locator(signupLocators.titleMrRadio);
        this.titleMrsRadio = page.locator(signupLocators.titleMrsRadio);
        this.passwordInput = page.locator(signupLocators.passwordInput);
        this.birthDaySelect = page.locator(signupLocators.birthDaySelect);
        this.birthMonthSelect = page.locator(signupLocators.birthMonthSelect);
        this.birthYearSelect = page.locator(signupLocators.birthYearSelect);
        this.firstNameInput = page.locator(signupLocators.firstNameInput);
        this.lastNameInput = page.locator(signupLocators.lastNameInput);
        this.companyInput = page.locator(signupLocators.companyInput);
        this.address1Input = page.locator(signupLocators.address1Input);
        this.address2Input = page.locator(signupLocators.address2Input);
        this.countrySelect = page.locator(signupLocators.countrySelect);
        this.stateSelect = page.locator(signupLocators.stateSelect);
        this.cityInput = page.locator(signupLocators.cityInput);
        this.zipcodeInput = page.locator(signupLocators.zipcodeInput);
        this.mobileNumberInput = page.locator(signupLocators.mobileNumberInput);
        this.createAccountButton = page.locator(signupLocators.createAccountButton);
        this.accountCreatedMessage = page.locator(signupLocators.accountCreatedMessage);
    }

    /**
     * Navigates to the signup/login page.
     * @throws Error if BASE_URL is not defined in the environment.
     */
    async navigate() {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error('BASE_URL is not defined in .env');
        }
        await this.page.goto(`${baseUrl}/login`);
        await this.page.waitForLoadState('load');
    }

    /**
     * Completes the signup form using the provided user data.
     * @param user The user data used to fill in the form fields.
     */
    async signUp(user: {
        name: string;
        email: string;
        password: string;
        title: string;
        birth_day: string;
        birth_month: string;
        birth_year: string;
        firstname: string;
        lastname: string;
        company: string;
        address1: string;
        address2: string;
        country: string;
        zipcode: string;
        state: string;
        city: string;
        mobile_number: string;
    }) {
        await this.nameInput.fill(user.name);
        await this.emailInput.fill(user.email);
        await this.signUpButton.click();
        await this.page.waitForLoadState('load');
        await this.titleMrRadio.check(); // You can enhance with dynamic title logic if needed
        await this.passwordInput.fill(user.password);
        await this.birthDaySelect.selectOption(user.birth_day);
        await this.birthMonthSelect.selectOption(user.birth_month);
        await this.birthYearSelect.selectOption(user.birth_year);
        await this.firstNameInput.fill(user.firstname);
        await this.lastNameInput.fill(user.lastname);
        await this.companyInput.fill(user.company);
        await this.address1Input.fill(user.address1);
        await this.address2Input.fill(user.address2);
        await this.countrySelect.selectOption(user.country);
        await this.stateSelect.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.mobile_number);
        await this.createAccountButton.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Asserts that the account was created successfully by checking the confirmation message.
     */
    async verifyAccountCreated() {
        await expect(this.accountCreatedMessage).toContainText('Account Created!');
    }
}