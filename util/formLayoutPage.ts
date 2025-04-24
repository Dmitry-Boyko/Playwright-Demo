import { Locator, Page } from "@playwright/test";

class FormLayoutsPage {
  private readonly page: Page

  constructor(page: Page){
    this.page = page
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
    const usingTheGrinForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
    await usingTheGrinForm.getByRole('textbox', {name: "Email"}).fill(email)
    await usingTheGrinForm.getByRole('textbox', {name: "Password"}).fill(password)
    await usingTheGrinForm.getByRole('radio', {name: optionText}).click({force: true})
    await usingTheGrinForm.getByRole('button').click()
  }

  /**
   * This methos will out the form  with user details
   * @param name - should be first and last name
   * @param email - valid email for the test user
   * @param rememberMe - true or false if user session to be safed
   */

  async submitInLineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
    const inlineForm = this.page.locator('nb-card, {hasText: "Inline form}')
    await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
    await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
    if(rememberMe)
      await inlineForm.getByRole('checkbox').check({force: true})
    await inlineForm.getByRole('button').click()
  }
}

export {FormLayoutsPage}