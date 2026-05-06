import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5137/');
  await page.getByRole('button', { name: 'Explore Products' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByRole('link', { name: 'About us' }).click();
  await page.getByRole('link', { name: 'Careers' }).click();
});