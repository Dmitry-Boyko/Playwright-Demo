# Playwright-Demo
Playwright: home-project-01
- The project was created for an in-depth study of the Playwright framework for UI testing.
- To install: yarn create playwright
- To run 'demo-test': yarn playwright test
- To run on selected browser type:
- yarn playwright test --project=chromium
- yarn playwright test --project=chromium --headed
- Test runs on Google Chrome. Find other browser setups inside playwright.config.ts
  
- To see report: yarn playwright show-report

- Running the Example Test in UI Mode: yarn playwright test --ui

- To Updating Playwright:
  yarn add --dev @playwright/test@latest
  # Also download new browser binaries and their dependencies:
  yarn playwright install --with-deps
- To see current Playwright version: yarn playwright --version
