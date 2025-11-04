 /*
--- Playwright vs Cypress exploretion ---

 Playwright Locator Methods (page.getBy...)
| Method                      | Description                                         | 
| page.getByText(text)        | Finds element by visible text                       | 
| page.getByRole(role)        | Finds element by ARIA role (e.g., button, textbox)  | 
| page.getByLabel(label)      | Finds form control by associated label              | 
| page.getByPlaceholder(text) | Finds input by placeholder text                     | 
| page.getByTitle(title)      | Finds element by title attribute                    | 
| page.getByAltText(text)     | Finds image by alt text                             | 
| page.getByTestId(id)        | Finds element by 'data-testid' attribute            | 

*/

// Example Usage
await page.getByText('Submit').click();
await page.getByRole('button', { name: 'Save' }).click();
await page.getByLabel('Email').fill('user@example.com');
await page.getByTestId('login-button').click();


// These methods are part of Playwright’s testing library-style selectors, 
// which make tests more readable and resilient.

// cy
// const getBydataTestId = (id: string) => cy.get(`[data-tested=${id}]`)

// pw
const getBydataTestId = (id: string, page: Page) => page.locator(`[data-tested="${id}"]`)
const clickByDataTestId = (id: string, page: Page) => getByDataTestId(id, page).click()
const typeByDataTestID = async (id: string, page: Page, inputText: string) => {
  await getByDataTestId(id, page).type(inputText)
}



// action-helper.ts file
import { Page } from '@playwright/test';

export const getByDataTestId = (id: string, page: Page) =>
  page.locator(`[data-tested="${id}"]`);

export const clickByDataTestId = async (id: string, page: Page) =>
  await getByDataTestId(id, page).click();

export const typeByDataTestId = async (
  id: string,
  page: Page,
  inputText: string
) => {
  await getByDataTestId(id, page).type(inputText);
}


// test.spec.ts file

import { getByDataTestId, clickByDataTestId, typeByDataTestId } from './qa-utils'

test('login flow', async ({ page }) => {
  await typeByDataTestId('username', page, 'qa-develop')
  await typeByDataTestId('password', page, 'securePass123')
  await clickByDataTestId('submit-button', page)
})

*/
