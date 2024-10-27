import { test, expect } from '@playwright/test'

test('initial', async ({ page }) => {
	await page.goto('./')

	await expect(page.getByText('rotation')).toBeVisible()
	await expect(page).toHaveScreenshot({ maxDiffPixels: 50 })
})
