import { fireEvent, render } from "../utils/test-utils.tsx";
import { it, expect } from "vitest";

import { RegisterPage } from "./Register";

it("should render the register page", async () => {
  render(<RegisterPage />);
  expect(true).toBe(true);
});
