import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { wait } from "../utils";

test.use({ storageState: { cookies: [], origins: [] } });
test("a new user can be registered", async ({ page }) => {
  const testUser = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  };
  await page.goto("/register");
  await page.fill("#email", testUser.email);
  await page.fill("#name", testUser.name);
  await page.fill("#password", testUser.password);
  await page.fill("#confirm_password", testUser.password);
  await page.click("#submit");
  await page.waitForURL("/invoices");
  await page.getByText(testUser.name); // user's name should be visible at top right
  await wait();
});
