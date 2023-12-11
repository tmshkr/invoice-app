import { test } from "@playwright/test";
import { readFileSync } from "fs";
import { wait } from "../utils";

test.use({ storageState: { cookies: [], origins: [] } });
test("user can sign in", async ({ page }) => {
  const testUser = JSON.parse(readFileSync("testUser.json", "utf-8"));
  await page.goto("/login");
  await page.fill("#email", testUser.email);
  await page.fill("#password", testUser.password);
  await page.click("#submit");
  await page.getByText(testUser.name); // user's name should be visible at top right
  await wait();
});
