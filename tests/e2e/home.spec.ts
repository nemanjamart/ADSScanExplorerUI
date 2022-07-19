import { test, expect } from '@playwright/test'

test('should use search function and navigate to result page', async ({ page }) => {
  await page.goto('./')
  await page.fill('#search-box-input', 'bibstem:apj')
  await page.click('#search-box-btn')
  await expect(page).toHaveURL(/.*search\?.*q=bibstem%3Aapj.*/)
})

test('should use search example to populate the search box', async ({ page }) => {
  await page.goto('./')
  await page.click('.list-group-item-action:has-text("bibstem:apj")')
  await expect(page.locator('#search-box-input')).toHaveValue('bibstem:ApJ')
})

test('should use quick field to populate the search box', async ({ page }) => {
  await page.goto('./')
  await page.click('text=Publication')
  await expect(page.locator('#search-box-input')).toHaveValue(/bibstem\:.*/)
})