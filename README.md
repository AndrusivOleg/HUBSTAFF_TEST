# Hubstaff Playwright Test Suite

This repository contains end-to-end UI tests for the Hubstaff platform, written using Playwright with TypeScript and following the Page Object Model and modular architecture.

## Project Structure

```
HUBSTAFF_TEST/
├── .github/workflows/         # CI setup
│   └── playwright.yml
├── pages/                     # Page objects & UI fragments
│   ├── fragments/             # Header, sidebar, etc.
│   ├── basePage.ts
│   ├── loginPage.ts
│   ├── signupPage.ts
│   └── ...
├── tests/                     # Test specs by feature
│   ├── auth/
│   ├── bonus/
│   └── project/
├── utils/                     # Test data and helpers
│   └── testData.ts            # Test data definitions
├── fixtures.ts                # Playwright fixtures
├── playwright.config.ts       # Playwright configuration
├── package.json
├── README.md
└── test-results/              # Default Playwright output
```

## Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- Modular Fragments for reusable components
- GitHub Actions CI (playwright.yml)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Run all tests

```bash
npx playwright test
```

### 4. Run a single test

```bash
npx playwright test tests/auth/sign-in.spec.ts
```

### 5. View HTML report

```bash
npx playwright show-report
```

## Notes

- Tests follow a strict modular approach: pages, fragments, and tests are separated.
- Use environment variables for sensitive data if needed.
- Tests are designed to be run in CI and support retries and trace generation on failure.

## Test Coverage

| Feature        | Scenario                      |
|----------------|-------------------------------|
| Auth           | Sign in, Sign up              |
| Project        | Create Project                |
| Bonus          | One-time bonus payments       |
| Marketing Nav  | Free trial, top nav actions   |

## Continuous Integration

GitHub Actions is configured in `.github/workflows/playwright.yml` to run all tests on push and pull request.
