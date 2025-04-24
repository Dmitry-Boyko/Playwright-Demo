import { Page, expect } from "@playwright/test";

class DatepickerPage{

  private readonly page: Page

  constructor(page: Page){
    this.page = page
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder('Form Picker')
    await calendarInputField.click()
  
    let dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + numberOfDaysFromToday)
    const expectedDate = dateToday.getDate().toString()
    const expectedMonthShort = dateToday.toLocaleDateString('En-US', { month: 'short' })
    const expectedMonthLong = dateToday.toLocaleDateString('En-US', { month: 'long' })
    const expectedYear = dateToday.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
  
    let calendarMonthAndYear = (await this.page.locator('nb-calendar-view-mode').textContent())!
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
  
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-calendar-pageable-navigation [date-name="chevron-right"]').click()
      calendarMonthAndYear = (await this.page.locator('nb-calendar-view-mode').textContent())!
    }
  
    await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)
  }
}

export {DatepickerPage}