

# Playwright-Demo
Test Execution with CLI
- The project was created for an in-depth study of the Playwright framework for UI testing.
- To install: yarn create playwright
- To run 'demo-test': yarn playwright test
- To run on selected browser type:
- yarn playwright test --project=chromium
- yarn playwright test --project=chromium --headed
- Test runs on Google Chrome. Find other browser setups inside playwright.config.ts
- To run specific test file:  yarn playwright test <adds full filename here> --project=chromium --headed
- To run specific test by name:  yarn playwright test -g "<test name>" --project=chromium
- TO run bulk tests with skip one: test.skip('test name') => similiar action from the Cypress (it.skip('test name') or it.only('test name'))
  
- To see report: yarn playwright show-report
- 
Debuging type:
- Run test and trace it: yarn playwright test --project=chromium --trace on
- Debug mode: yarn playwright test --project=chromium --debug
- Add red point on test line for the debug

Test Execution with UI mode
- Running the Example Test in UI Mode: yarn playwright test --ui

- To Updating Playwright:
  yarn add --dev @playwright/test@latest
  # Also download new browser binaries and their dependencies:
  yarn playwright install --with-deps
- To see current Playwright version: yarn playwright --version
