// For learning purposes and to enhance code transparency, 
// the presented code is not formatted according to the Page Object Model.

import {test, expect} from "@playwright/test"

test('frag and drop with iframe', async({page}) => {
  await page.goto('http://www.globalsqa.com/demo-site/draganddrop/')

  const frame = page.frameLocator('[rel-title="photo Manager"] iframe')
  await frame.locator('li', {hasText: "High Tatras 2"}).hover()

  // more presice control
  await frame.locator('li', {hasText: "High Tatras 4"}).hover()
  await page.mouse.down()
  await frame.locator('#trash').hover() // web element with 'id' calling by '#'
  await page.mouse.up()

  await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})
