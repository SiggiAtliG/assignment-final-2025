import { test, expect } from "@playwright/test";

// TODO replace these with tic tac toe e2e tests

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

test.describe("Tic Tac Toe Game", () => {
  test("homepage loads and has the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Tic Tac Toe/);
    
    // Check that the title is displayed
    const title = page.getByRole("heading", { name: /Tic Tac Toe/i });
    await expect(title).toBeVisible();
  });

  test("requires player names to start a game", async ({ page }) => {
    await page.goto("/");
    
    // Try to submit without names
    await page.getByRole("button", { name: "Start Game" }).click();
    
    // Both form fields should be marked as invalid
    await expect(page.getByPlaceholder(/Your Name/)).toHaveAttribute("required", "");
    await expect(page.getByPlaceholder(/Opponent Name/)).toHaveAttribute("required", "");
  });

  test("creates a new game when form is submitted with both player names", async ({ page }) => {
    await page.goto("/");
    
    // Fill player names
    await page.getByPlaceholder(/Your Name/).fill("Player 1");
    await page.getByPlaceholder(/Opponent Name/).fill("Player 2");
    
    // Submit the form
    await page.getByRole("button", { name: "Start Game" }).click();
    
    // Game page should load
    await expect(page).toHaveURL(/\/game\/.+/);
    
    // Board should be displayed
    await expect(page.locator("[role=button]").first()).toBeVisible();
  });

  test("player can make moves and game detects a win", async ({ page }) => {
    await page.goto("/");
    
    // Fill player names
    await page.getByPlaceholder(/Your Name/).fill("Player 1");
    await page.getByPlaceholder(/Opponent Name/).fill("Player 2");
    
    // Submit the form
    await page.getByRole("button", { name: "Start Game" }).click();
    
    // Game page should load
    await expect(page).toHaveURL(/\/game\/.+/);
    
    // Make winning moves for X (Player 1)
    // X plays top-left
    await page.locator("[role=button]").nth(0).click();
    // O plays top-middle
    await page.locator("[role=button]").nth(1).click();
    // X plays middle-left
    await page.locator("[role=button]").nth(3).click();
    // O plays middle-middle
    await page.locator("[role=button]").nth(4).click();
    // X plays bottom-left (winning move)
    await page.locator("[role=button]").nth(6).click();
    
    // Check for win announcement
    await expect(page.getByText(/Won/i)).toBeVisible();
    await expect(page.getByText(/Player 1/i)).toBeVisible();
  });

  test("game detects a draw", async ({ page }) => {
    await page.goto("/");
    
    // Fill player names
    await page.getByPlaceholder(/Your Name/).fill("Player 1");
    await page.getByPlaceholder(/Opponent Name/).fill("Player 2");
    
    // Submit the form
    await page.getByRole("button", { name: "Start Game" }).click();
    
    // Game page should load
    await expect(page).toHaveURL(/\/game\/.+/);
    
    // Make moves that lead to a draw
    // X plays top-left
    await page.locator("[role=button]").nth(0).click();
    // O plays top-middle
    await page.locator("[role=button]").nth(1).click();
    // X plays top-right
    await page.locator("[role=button]").nth(2).click();
    // O plays middle-left
    await page.locator("[role=button]").nth(3).click();
    // X plays middle-right
    await page.locator("[role=button]").nth(5).click();
    // O plays middle-middle
    await page.locator("[role=button]").nth(4).click();
    // X plays bottom-middle
    await page.locator("[role=button]").nth(7).click();
    // O plays bottom-left
    await page.locator("[role=button]").nth(6).click();
    // X plays bottom-right
    await page.locator("[role=button]").nth(8).click();
    
    // Check for draw announcement
    await expect(page.getByText(/Draw/i)).toBeVisible();
  });

  test("game list page shows existing games", async ({ page }) => {
    // First create a game
    await page.goto("/");
    await page.getByPlaceholder(/Your Name/).fill("List Test 1");
    await page.getByPlaceholder(/Opponent Name/).fill("List Test 2");
    await page.getByRole("button", { name: "Start Game" }).click();
    
    // Navigate to game list
    await page.goto("/game/list");
    
    // Check that game list page loads
    await expect(page).toHaveURL(/\/game\/list/);
    
    // Check that our game is in the list
    await expect(page.getByText("List Test 1")).toBeVisible();
    await expect(page.getByText("List Test 2")).toBeVisible();
  });
});
