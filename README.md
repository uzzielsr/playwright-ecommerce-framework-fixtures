# Playwright Automation Framework Challenge

This project is an end-to-end and API automation framework for [automationexercise.com](https://www.automationexercise.com/), built with Playwright and TypeScript.

## Installation

```sh
npm install                                                     # Install all dependencies (defined in package.json)
npx playwright install                                          # Install Playwright browsers (Chromium, Firefox, WebKit)
```

## Running Tests

```sh
ENV=prod npx playwright test
# Runs all tests (UI + API if included) in the 'prod' environment

ENV=prod npx playwright test tests/ui/checkout.ui.spec.ts --project=chromium --reporter=list
# Runs only the checkout UI test in Chromium (headless), outputs results in list format to the console

ENV=prod npx playwright test tests/ui/checkout.ui.spec.ts --project=chromium --reporter=list --headed
# Runs only the checkout UI test in Chromium (with browser UI), outputs results in list format to the console

npx playwright show-report
# Opens the HTML report after the test run
```

## Project Structure

```
qa/
├── api/                  # API helpers
├── locators/             # Page selectors by environment
│   └── [cart|checkout|login|pdp|plp|signup]/
│       ├── *.locators.[prod|qa|uat].ts
│       └── index.ts
├── pages/                # Page Objects for each relevant page
├── tests/                # Test files separated by type
│   ├── api/
│   └── ui/
├── utils/                # Utilities (e.g., test user generation)
├── .env.*                # Environment variables (prod, qa, uat)
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Features

- Multi-environment support (`prod`, `qa`, `uat`)
- Separation of UI and API tests
- Page Object Model
- Dynamic locators per environment
- Utilities for test data
