import { nestAPI } from "./nestAPI";
import { store } from "../store";
import { queryClient } from "../App";
import { setModal } from "../store/modal";
import { faker } from "@faker-js/faker";

export const fetchInvoices = async () => {
  const { data } = await nestAPI.get("/invoices").catch((error) => {
    if (error.response?.status === 404) {
      console.log(error.response.data.message);
      return { data: null };
    }
    throw error;
  });
  return data;
};

export const fetchInvoiceById = async (id: string) => {
  const { data: invoice } = await nestAPI.get(`/invoices/${id}`);
  store.dispatch(
    setModal({
      isVisible: true,
      name: "InvoiceModal",
      data: { invoice },
    })
  );
};

export const seedInvoices = async () => {
  const fakeInvoice = () => ({
    amount: Number(faker.finance.amount({ min: 1, max: 1000 })),
    details: faker.finance.transactionDescription(),
    due_date: faker.date.future(),
  });
  const invoices = Array.from({ length: 10 }, fakeInvoice);
  await nestAPI.post("/invoices", invoices);

  await queryClient.fetchQuery({
    queryKey: "invoices",
    queryFn: fetchInvoices,
  });
};
