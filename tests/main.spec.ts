import { test, expect } from '@playwright/test'

test('has 3D scene', async ({ page }) => {
	await page.goto('http://localhost:3000')

	// Expect a title "to contain" a substring.
	// await expect(page).toHaveTitle(/Sebastian's Profile/)
	await expect(page).toHaveScreenshot('3D scene.png', {
		maxDiffPixels: 200,
	})
})

test.skip('credits dialog', async ({ page }) => {
	await page.goto('http://playwright.dev/')

	// Click the get started link.
	await page.getByRole('link', { name: 'Get started' }).click()

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*intro/)
})
