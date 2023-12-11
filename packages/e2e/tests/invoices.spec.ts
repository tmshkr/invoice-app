import { test, expect } from "@playwright/test";
import { wait } from "../utils";

test.describe.configure({ mode: "serial" });
test.afterEach(async () => {
  await wait();
});

test("creates invoices and displays them", async ({ page }) => {
  await page.goto("/invoices");
  await page.getByText("It looks like you don't have any invoices yet.");
  await page.getByText("Create Invoices").click();
  const tbody = await page.locator("tbody");
  await tbody.waitFor();
  expect((await page.$$("tbody tr")).length).toBe(10);
});

test("displays a modal with the correct amount when clicking on a invoice", async ({
  page,
}) => {
  await page.goto("/invoices");
  const tbody = await page.locator("tbody");
  await tbody.waitFor();
  const firstRow = await page.getByTestId("InvoiceListRow_0");
  const rowAmount = firstRow.getByTestId("InvoiceListRow_0.amount").innerText;
  firstRow.click();
  await page.waitForSelector("[data-testid=InvoiceModal]");
  const modalAmount = await page.getByTestId("InvoiceModal.amount").innerText;
  expect(modalAmount).toBe(rowAmount);
});
