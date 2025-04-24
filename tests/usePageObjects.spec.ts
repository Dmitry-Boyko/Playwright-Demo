import { test, expect } from "@playwright/test"
import {NavigationPage} from "../util/navigationPage"
import {FormLayoutsPage} from "../util/formLayoutPage"
import { DatepickerPage } from "../util/datepickerPage"

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200/')
})

test('navigate to the form page', async({page}) => {
  const navigateTo = new NavigationPage(page)
  await navigateTo.formLayoutsPage()
  await navigateTo.datePickerPage()
})

test('parametrized methods', async({page}) => {
  const navigateTo = new NavigationPage(page)
  const onFormLayoutPage = new FormLayoutsPage(page)
  const ondatepickerPage = new DatepickerPage(page)

  await navigateTo.formLayoutsPage()
  await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'mywelcome1', 'Option 1')
  await onFormLayoutPage.submitInLineFormWithNameEmailAndCheckbox('John Smith', "john@test.com", true)
  await navigateTo.datePickerPage()
  await ondatepickerPage.selectCommonDatePickerDateFromToday(4)
})