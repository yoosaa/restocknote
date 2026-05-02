import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/restocks');
	await page.evaluate(() => {
		window.localStorage.clear();
	});
});

test('can create a restock item from the list page', async ({ page }) => {
	await page.goto('/restocks');

	await expect(page.getByRole('heading', { name: 'Restocknote' })).toBeVisible();

	await page.getByRole('link', { name: '新規追加' }).click();

	await expect(page.getByRole('heading', { name: '新規補充メモ' })).toBeVisible();

	await page.getByLabel('商品名').fill('テスト用 ペーパータオル');
	await page.getByLabel('必要日').fill('2026-05-10');
	await page.getByLabel('数量メモ').fill('12ロール');
	await page.getByLabel('補足メモ').fill('Playwright で追加したデータ');

	await page.getByRole('button', { name: '保存' }).click();

	await expect(page).toHaveURL(/\/restocks$/);
	await expect(page.getByText('テスト用 ペーパータオル')).toBeVisible();
});
