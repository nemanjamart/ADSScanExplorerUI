import { test, expect } from '@playwright/test'

test('should use nav buttons to filter between article, collection and page', async ({ page }) => {
  await page.goto('./search?q=bibstem%3AApJ&page=1&limit=10&t=article')

  // Navigate to collections
  await page.click('.nav-link:has-text("Collections")')
  await expect(page).toHaveURL(/.*search\?.*t=collection.*/)

  // Navigate to pages
  await page.click('.nav-link:has-text("Pages")')
  await expect(page).toHaveURL(/.*search\?.*t=page.*/)

  // Navigate to articles
  await page.click('.nav-link:has-text("Articles")')
  await expect(page).toHaveURL(/.*search\?.*t=article.*/)
})


test('should use pagination buttons change page', async ({ page }) => {
    await page.goto('./search?q=bibstem%3AApJ&page=1&limit=1&t=page')

    // Navigate to page 2
    await page.click('text=next')
    await expect(page).toHaveURL(/.*search\?.*page=2.*/)

    // Navigate to page 1
    await page.click('text=prev')
    await expect(page).toHaveURL(/.*search\?.*page=1.*/)

    // Change per page to 20
    await page.selectOption('#pagination-limit', '20')
    await expect(page).toHaveURL(/.*search\?.*limit=20.*/)
  })

  test('should open one of the search results in the image viewer', async ({ page }) => {
    await page.goto('./search?q=bibcode%3A1988ApJ...333L..69M&page=1&limit=10&t=article')

    // Open the article in the manifest viewer
    await page.click('.anchor-manifest-viewer >> nth=0')
    await expect(page).toHaveURL(/.*\/manifest\/1988ApJ...333L..69M/)

  })