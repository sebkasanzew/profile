import { test, expect } from '@playwright/test'
import { staticPath } from '#/app/$path'

test('initial', async ({ page }) => {
	await page.goto('./')

	await expect(page.getByText('rotation')).toBeVisible()
	await expect(page).toHaveScreenshot({ maxDiffPixels: 50, timeout: 20_000 })
})

test('renders 3D canvas and loads GLB room model without runtime errors', async ({
	page,
}) => {
	const pageErrors: Error[] = []
	const consoleErrors: string[] = []

	page.on('pageerror', (err) => pageErrors.push(err))
	page.on('console', (msg) => {
		if (
			msg.type() === 'error' &&
			!msg.text().includes('Failed to load resource')
		) {
			consoleErrors.push(msg.text())
		}
	})

	const glbResponsePromise = page.waitForResponse(
		(response) =>
			response
				.url()
				.endsWith(
					staticPath.assets.rooms.low_poly_isometric_rooms_glb,
				) && response.status() === 200,
	)

	await page.goto('./')

	const glbResponse = await glbResponsePromise
	expect(glbResponse.ok()).toBe(true)

	const canvas = page.locator('canvas')
	await expect(canvas).toBeVisible()

	const dimensions = await canvas.evaluate((el: HTMLCanvasElement) => ({
		width: el.width,
		height: el.height,
		clientWidth: el.clientWidth,
		clientHeight: el.clientHeight,
	}))
	expect(dimensions.width).toBeGreaterThan(0)
	expect(dimensions.height).toBeGreaterThan(0)
	expect(dimensions.clientWidth).toBeGreaterThan(0)
	expect(dimensions.clientHeight).toBeGreaterThan(0)

	expect(pageErrors).toEqual([])
	expect(consoleErrors).toEqual([])
})

test('supports interactive OrbitControls dragging on the 3D canvas', async ({
	page,
}) => {
	const pageErrors: Error[] = []
	page.on('pageerror', (err) => pageErrors.push(err))

	await page.goto('./')
	await expect(page.getByText('rotation')).toBeVisible()

	const canvas = page.locator('canvas')
	await expect(canvas).toBeVisible()

	const box = await canvas.boundingBox()
	expect(box).not.toBeNull()

	if (box) {
		const startX = box.x + box.width / 2
		const startY = box.y + box.height / 2

		await page.mouse.move(startX, startY)
		await page.mouse.down()
		await page.mouse.move(startX + 120, startY + 60, { steps: 10 })
		await page.mouse.up()
	}

	await expect(canvas).toBeVisible()
	expect(pageErrors).toEqual([])
})

test('toggles credits checkbox and renders attribution links', async ({
	page,
}) => {
	await page.goto('./')

	const checkbox = page.locator('#credits-modal')
	await expect(checkbox).not.toBeChecked()

	const triggerLabel = page.locator('label[for="credits-modal"]').first()
	await expect(triggerLabel).toHaveText('credits')

	await triggerLabel.click()
	await expect(checkbox).toBeChecked()

	await expect(
		page.getByRole('heading', { name: 'Thanks for the inspiration!' }),
	).toBeVisible()

	await expect(
		page.locator(
			'a[href="https://sketchfab.com/3d-models/low-poly-isometric-rooms-d53af0ad289a403598ee2cb41d84608b"]',
		),
	).toBeVisible()
	await expect(
		page.locator('a[href="https://sketchfab.com/Brynnnnn"]'),
	).toBeVisible()
	await expect(
		page.locator('a[href="http://creativecommons.org/licenses/by/4.0/"]'),
	).toBeVisible()

	await triggerLabel.click()
	await expect(checkbox).not.toBeChecked()
})

test('applies layout font variables and Tailwind viewport styles', async ({
	page,
}) => {
	await page.goto('./')

	await expect(page.locator('html')).toHaveAttribute('lang', 'en')

	const htmlClass = await page.locator('html').getAttribute('class')
	expect(htmlClass).toBeTruthy()

	const styles = await page.locator('main').evaluate((el) => {
		const computed = window.getComputedStyle(el)
		return {
			overflow: computed.overflow,
			position: computed.position,
		}
	})
	expect(styles.overflow).toBe('hidden')
	expect(styles.position).toBe('relative')
})
