import { Page } from "@playwright/test";

class NavigationPage {
  readonly page: Page
  constructor(page: Page){
    this.page = page
  }

  async formLayoutsPage(){
    await this.page.getByText('Forms').click()
    await this.page.getByText('Form Layouts').click()
  }

  async datePickerPage(){
    await this.selectGroupMenuItem('Forms')
    await this.page.getByText('Datepicker').click()
  }

  private async selectGroupMenuItem(groupitemTitle: string){
    const groupMenuItem = this.page.getByTitle(groupitemTitle)
    const expandedState = await groupMenuItem.getAttribute('area-expanded')
    if(expandedState == 'false')
      await groupMenuItem.click()
  }
}


export{NavigationPage}