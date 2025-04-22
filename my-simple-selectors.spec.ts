import {test, expect} from "@playwright/test"

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200')
})

test.describe('Form layout page', () => {
  test.beforeEach( async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })
  

  test('input fields', async({page}) => {
    const email1 = 'test@test.com'
    const email2 = 'test2@test.com'
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    
    await usingTheGridEmailInput.fill(email1)
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially(email2, {delay: 500})

    // generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual(email2)

    // locaor assertion
    await expect(usingTheGridEmailInput).toHaveValue(email2)
  })

  test('radio buttons', async({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    // await usingTheGridForm.getByLabel('Option 1').check({force: true})
    await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
    // validation types
    const  radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
    expect(radioStatus).toBeTruthy()
    await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

    await usingTheGridForm.getByLabel('Option 2').check({force: true})
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
  })

  test('xheckboxes', async({page}) => {
    // navigation on the page sub menu
    // await page.getByText('Modal & Overlays').click()
    // await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})
    await page.getByRole('checkbox', {name: "Hide on click"}).isChecked()

    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).uncheck({force: true})

    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).click({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).isChecked()
    
    const allBoxes = page.getByRole('checkbox')

    // allBoxes.all   '.all - create a array!
    for(const box of await allBoxes.all()) {
      await box.check({force: true})
      expect(await box.isChecked).toBeTruthy()
    }

    for(const box of await allBoxes.all()) {
      await box.uncheck({force: true})
      expect(await box.isChecked).toBeFalsy()
    }
  })

  test('list and dropdowns', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')      // when the list has a UL tag
    page.getByRole('listitem')  // when the list has LI tag

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    await optionList.filter({hasText: "Cosmic"}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', "rgb (50, 50,89")

    const colors = {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)"
    }

    await(dropDownMenu.click())
    for(const color in colors){
      await optionList.filter({hasText: color}).click()
      await expect(header).toHaveCSS('background-color', colors[color])
      if(color != "Corporate")
        await dropDownMenu.click()
    }
  })

  test('tooltips verification', async({page}) => {
    const tooltipCard = page.locator('nb-card', {hasText: "Tooltip Placement"})
    await tooltipCard.getByRole('button', {name: "Top"}).hover()

    page.getByRole('tooltip')  // will works only if you have a role tooltip created

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
  })

  test('dialog box', async({page}) => {

    // create a listener:
    page.on('dialog', dialog => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?')
      dialog.accept()
    })
    
    await page.getByRole('table').locator('tr', {hasText: "ddd@hhh.com"}).locator('.nb-trash').click()

    await expect(page.locator('table tr').first()).not.toHaveText("ddd@hhh.com")
  })

  test('update table data', async({page}) => {
    // 1. get the raw by any text in this row
    const targetRow = page.getByRole('row', {name: "emsil1@email.com"})
    await targetRow.locator('.nb edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('39')
    await page.locator('.nb-checkmark').clear()

    // 2. getthe row based on the value in the specific column
    await page.locator('.nd-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('email2@email.com')
    await page.locator('.nb-checkmark').clear()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('email2@email.com')

    // 3 test filter of the table
    const ages = ["20", "30", "40", "200"]
    for( let age of ages){
      await page.locator('input-filter').getByPlaceholder('Age').clear()
      await page.locator('input-filter').getByPlaceholder('Age').fill(age)
      await page.waitForTimeout(200)
      const ageRows = page.locator('tbody tr')
      
      for(let row of await ageRows.all()){
        const cetValue = await row.locator('td').textContent()

        if(age == "200"){
          expect(await page.getByRole('table').textContent()).toContain('NO data found')
        } else {
          expect(cetValue).toEqual(age)
        }
      }
    }

  })
})

test('date picker', async({page}) => {
  await page.getByText('Forms').click()
  await page.getByText('DatePicker').click()

  const calendarInputField = page.getByPlaceholder('Form Picker')
  await calendarInputField.click()

  let dateToday = new Date()
  dateToday.setDate(dateToday.getDate() + 1) // will show date tomorrow
  const expectedDate = dateToday.getDate().toString()
  const expectedMonthShort = dateToday.toLocaleDateString('En-US', {month: 'short'})
  const expectedMonthLong = dateToday.toLocaleDateString('En-US', {month: 'long'})
  const expectedYear = dateToday.getFullYear()
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

  while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
    await page.locator('nb-calendar-pageable-navigation [date-name="chevron-right"]').click()
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  }

  await page.locator('[calss="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
  await expect(calendarInputField).toHaveValue(dateToAssert)
})

test('mouse moving', async({page}) => {
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded()

  const box = await tempBox.boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x +100, y)
  await page.mouse.move(x+100, y+100)
  await page.mouse.up()
  await expect(tempBox).toContainText('30')
})
