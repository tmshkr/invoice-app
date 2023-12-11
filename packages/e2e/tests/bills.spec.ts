import { test, expect } from "@playwright/test";
import { wait } from "../utils";

test.describe.configure({ mode: "serial" });
test.afterEach(async () => {
  await wait();
});

test("creates bills and displays them", async ({ page }) => {
  await page.goto("/bills");
  await page.getByText("It looks like you don't have any bills yet.");
  await page.getByText("Create Bills").click();
  const tbody = await page.locator("tbody");
  await tbody.waitFor();
  expect((await page.$$("tbody tr")).length).toBe(10);
});

test("displays a modal with the correct amount when clicking on a bill", async ({
  page,
}) => {
  await page.goto("/bills");
  const tbody = await page.locator("tbody");
  await tbody.waitFor();
  const firstRow = await page.getByTestId("BillListRow_0");
  const rowAmount = firstRow.getByTestId("BillListRow_0.amount").innerText;
  firstRow.click();
  await page.waitForSelector("[data-testid=BillModal]");
  const modalAmount = await page.getByTestId("BillModal.amount").innerText;
  expect(modalAmount).toBe(rowAmount);
});
