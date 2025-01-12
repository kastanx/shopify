import test, { expect } from "@playwright/test";

test.describe("Product Detail Page", () => {
  test("displays basic product information", async ({ page }) => {
    await page.goto("products/the-complete-snowboard");

    await expect(page.locator("[data-pw=product-title]")).toBeVisible();
    await expect(page.locator("[data-pw=product-description]")).toBeVisible();
    await expect(page.locator("[data-pw=product-images]")).toBeVisible();
    await expect(page.locator("[data-pw=product-image]").first()).toBeVisible();
  });

  test("displays variants information", async ({ page }) => {
    await page.goto("products/the-complete-snowboard");

    await expect(page.locator("[data-pw=variants-title]")).toBeVisible();
    await expect(page.locator("[data-pw=variants-list]")).toBeVisible();

    const firstVariant = page.locator("[data-pw=variant-item]").first();
    await expect(firstVariant.locator("[data-pw=variant-title]")).toBeVisible();
    await expect(firstVariant.locator("[data-pw=variant-price]")).toBeVisible();
    await expect(firstVariant.locator("[data-pw=variant-stock]")).toBeVisible();
  });

  test("displays sale information when applicable", async ({ page }) => {
    await page.goto("products/the-complete-snowboard");

    const variantWithSale = page
      .locator("[data-pw=variant-item]")
      .filter({
        has: page.locator("[data-pw=variant-compare-price]"),
      })
      .first();

    if ((await variantWithSale.count()) > 0) {
      await expect(
        variantWithSale.locator("[data-pw=variant-compare-price]")
      ).toBeVisible();
      await expect(
        variantWithSale.locator("[data-pw=variant-discount]")
      ).toBeVisible();
    }
  });

  test("back button works", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-pw="home-link"]')).toBeVisible();

    await page.locator('[data-pw="dropdown-trigger"]').click();
    await expect(
      page.locator('[data-pw="collection-link"]').first()
    ).toBeVisible();

    const collectionLink = page.locator('[data-pw="collection-link"]').first();
    const collectionPath = (await collectionLink.getAttribute("href")) || "";
    await collectionLink.click();
    await page.waitForURL((url) => url.pathname === collectionPath);
    await expect(page.locator('[data-pw="products-grid"]')).toBeVisible();

    const productCard = page.locator("[data-pw=product-card]").first();
    const productPath = (await productCard.getAttribute("href")) || "";
    await productCard.click();
    await page.waitForURL((url) => url.pathname === productPath);
    await expect(page.locator('[data-pw="product-title"]')).toBeVisible();

    await page.locator('[data-pw="back-button"]').click();
    await page.waitForURL((url) => url.pathname === collectionPath);
    await expect(page.locator("[data-pw=products-grid]")).toBeVisible();
  });

  test("handles non-existent products", async ({ page }) => {
    await page.goto("/products/non-existent-product");

    await expect(page).toHaveURL("/products/non-existent-product");
    await expect(page.locator("h1")).toContainText(/404|not found/i);
  });
});
