import { expect, test } from "@playwright/test";

test.describe("Collection Page", () => {
  test("displays collection title and products", async ({ page }) => {
    await page.goto("/categories/frontpage");

    await expect(page.locator("[data-pw=collection-title]")).toBeVisible();
    await expect(page.locator("[data-pw=products-grid]")).toBeVisible();
  });

  test("product cards display correct information", async ({ page }) => {
    await page.goto("/categories/automated-collection");

    const firstProduct = page.locator("[data-pw=product-card]").first();

    await expect(firstProduct.locator("[data-pw=product-image]")).toBeVisible();
    await expect(firstProduct.locator("[data-pw=product-title]")).toBeVisible();
    await expect(firstProduct.locator("[data-pw=product-price]")).toBeVisible();

    const description = firstProduct.locator("[data-pw=product-description]");
    if ((await description.textContent()) !== "") {
      await expect(description).toBeVisible();
    }
  });

  test("displays sale badge and compare price when applicable", async ({
    page,
  }) => {
    await page.goto("/categories/frontpage");

    const productWithSale = page
      .locator("[data-pw=product-card]")
      .filter({
        has: page.locator("[data-pw=sale-badge]"),
      })
      .first();

    if ((await productWithSale.count()) > 0) {
      await expect(
        productWithSale.locator("[data-pw=sale-badge]")
      ).toBeVisible();
      await expect(
        productWithSale.locator("[data-pw=product-compare-price]")
      ).toBeVisible();
    }
  });

  test("pagination works correctly", async ({ page }) => {
    await page.goto("/categories/frontpage");

    const pagination = page.locator('nav[aria-label="Pagination"]');

    if (await pagination.isVisible()) {
      const initialProductTitle = await page
        .locator("[data-pw=product-title]")
        .first()
        .textContent();

      const nextButton = page.getByRole("link", { name: "Next" });
      if (await nextButton.isVisible()) {
        await nextButton.click();

        await expect(page).toHaveURL(/.*page=2/);

        const newProductTitle = await page
          .locator("[data-pw=product-title]")
          .first()
          .textContent();
        expect(newProductTitle).not.toBe(initialProductTitle);
      }
    }
  });

  test("back button works", async ({ page }) => {
    await page.goto("/");

    await page.locator('[data-pw="dropdown-trigger"]').click();
    await page.locator('[data-pw="collection-link"]').first().click();

    await page.locator('[data-pw="back-button"]').click();

    await expect(page).toHaveURL("/");
    await expect(page.locator('[data-pw="home-link"]')).toBeVisible();
  });

  test("product links navigate correctly", async ({ page }) => {
    await page.goto("/categories/frontpage");

    const firstProductCard = page.locator("[data-pw=product-card]").first();
    const productUrl = await firstProductCard.getAttribute("href");
    await firstProductCard.click();

    await expect(page).toHaveURL(productUrl || "");
  });

  test("handles non-existent collections", async ({ page }) => {
    await page.goto("/categories/non-existent-collection");

    await expect(page).toHaveURL("/categories/non-existent-collection");
    await expect(page.locator("h1")).toContainText(/404|not found/i);
  });
});
