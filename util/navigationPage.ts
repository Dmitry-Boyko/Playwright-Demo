import { Locator, Page } from "@playwright/test";

class NavigationPage {
  readonly page: Page
  readonly fromLayoutMenuItem: Locator
  readonly dataPickermenuItem: Locator

  constructor(page: Page){
    this.page = page
    this.fromLayoutMenuItem = page.getByText('Form Layouts')
    this.dataPickermenuItem = page.getByText('Datepicker')
  }

  async formLayoutsPage(){
    await this.page.getByText('Forms').click()
    await this.fromLayoutMenuItem.click()
  }

  async datePickerPage(){
    await this.selectGroupMenuItem('Forms')
    await this.dataPickermenuItem.click()
  }

  private async selectGroupMenuItem(groupitemTitle: string){
    const groupMenuItem = this.page.getByTitle(groupitemTitle)
    const expandedState = await groupMenuItem.getAttribute('area-expanded')
    if(expandedState == 'false')
      await groupMenuItem.click()
  }
}


export{NavigationPage}