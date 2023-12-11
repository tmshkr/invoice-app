import { Provider as ReduxProvider } from "react-redux";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { store } from "./store";
import { useAppSelector } from "./store";
import { selectUser } from "./store/user";

import { AppShell } from "./layouts/AppShell";
import { Modal } from "./modals/ModalWrapper";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { BillsPage } from "./pages/BillsPage";
import { InvoicesPage } from "./pages/InvoicesPage";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <AuthRouter />
        </ReduxProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

function AuthRouter() {
  const user = useAppSelector(selectUser);
  return user ? <ProtectedRouter /> : <PublicRouter />;
}

function ProtectedRouter() {
  return (
    <>
      <AppShell>
        <Routes>
          <Route path="invoices" element={<InvoicesPage />}>
            <Route path=":id" element={<InvoicesPage />} />
          </Route>
          <Route path="bills" element={<BillsPage />}>
            <Route path=":id" element={<BillsPage />} />
          </Route>
        </Routes>
      </AppShell>
      <Modal />
    </>
  );
}

function PublicRouter() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="login" replace={true} />} />
    </Routes>
  );
}
