import { Page, Locator, expect } from '@playwright/test';
import { checkoutLocators } from '../locators/checkout/index';

/**
 * Page Object for the Checkout page.
 * Provides methods to handle payment processing and order verification.
 */
export class CheckoutPage {
    /** Locators for checkout page elements. */
    private readonly placeOrderButton: Locator;
    private readonly nameInput: Locator;
    private readonly ccNumberInput: Locator;
    private readonly cvcInput: Locator;
    private readonly expMonthInput: Locator;
    private readonly expYearInput: Locator;
    private readonly confirmOrderButton: Locator;
    private readonly orderSuccessMessage: Locator;

    /**
     * Initializes a new instance of the CheckoutPage.
     * @param page The Playwright Page object to interact with the checkout page.
     */
    constructor(private readonly page: Page) {
        this.placeOrderButton = this.page.locator(checkoutLocators.placeOrderButton);
        this.nameInput = this.page.locator(checkoutLocators.nameInput);
        this.ccNumberInput = this.page.locator(checkoutLocators.ccNumberInput);
        this.cvcInput = this.page.locator(checkoutLocators.cvcInput);
        this.expMonthInput = this.page.locator(checkoutLocators.expMonthInput);
        this.expYearInput = this.page.locator(checkoutLocators.expYearInput);
        this.confirmOrderButton = this.page.locator(checkoutLocators.confirmOrderButton);
        this.orderSuccessMessage = this.page.locator(checkoutLocators.orderSuccessMessage);
    }

    /**
     * Proceeds to the payment section by clicking the place order button.
     * Waits for the page to fully load after the action.
     */
    async proceedToPayment() {
        await this.placeOrderButton.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Fills the payment details form with the provided card information.
     * @param card An object containing name, number, cvc, expMonth, and expYear.
     */
    async fillPaymentDetails(card: {
        name: string;
        number: string;
        cvc: string;
        expMonth: string;
        expYear: string;
    }) {
        await this.nameInput.fill(card.name);
        await this.ccNumberInput.fill(card.number);
        await this.cvcInput.fill(card.cvc);
        await this.expMonthInput.fill(card.expMonth);
        await this.expYearInput.fill(card.expYear);
    }

    /**
     * Confirms the order by clicking the confirm order button.
     * Waits for the page to fully load after the action.
     */
    async confirmOrder() {
        await this.confirmOrderButton.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Verifies that the order was successfully placed by checking the success message.
     */
    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toContainText('Order Placed!');
    }
}