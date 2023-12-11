import { chromium, FullConfig } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

async function globalSetup(config: FullConfig) {
  const testUser = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  };

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:8000/register");
  await page.fill("#email", testUser.email);
  await page.fill("#name", testUser.name);
  await page.fill("#password", testUser.password);
  await page.fill("#confirm_password", testUser.password);
  await page.click("#submit");
  await page.waitForURL("http://localhost:8000/invoices");
  await page.context().storageState({ path: "storageState.json" });
  writeFileSync("testUser.json", JSON.stringify(testUser));
}

export default globalSetup;
