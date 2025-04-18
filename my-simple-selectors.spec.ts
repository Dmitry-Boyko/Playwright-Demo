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
})
