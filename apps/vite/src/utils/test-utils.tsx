import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { setupStore, RootState } from "../store";

afterEach(() => {
  cleanup();
});

function customRender(
  ui: React.ReactElement,
  preloadedState?: Partial<RootState>
) {
  const store = setupStore(preloadedState);
  const queryClient = new QueryClient();
  const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Providers });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
