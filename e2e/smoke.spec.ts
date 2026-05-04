import { expect, test } from "@playwright/test";

test.describe("marketing site", () => {
  test("home loads with default meta when Sanity env is absent", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/EXPERGO/i);
    await expect(page.getByRole("link", { name: "Platform" })).toBeVisible();
  });

  test("platform page renders", async ({ page }) => {
    await page.goto("/platform");
    await expect(page.getByRole("link", { name: "Platform" })).toBeVisible();
  });
});

