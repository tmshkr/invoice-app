import { render } from "@testing-library/react";
import { it, expect } from "vitest";

import App from "./App";

it("should render the app", async () => {
  render(<App />);
  expect(true).toBe(true);
});
