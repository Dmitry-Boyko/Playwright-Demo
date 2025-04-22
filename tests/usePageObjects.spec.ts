import { test, expect } from "@playwright/test"
import {NavigationPage} from "../util/navigationPage"

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200/')
})

test('navigate to the form page', async({page}) => {
  const navigateTo = new NavigationPage(page)
  navigateTo.formLayoutsPage()
})