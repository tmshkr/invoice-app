import { nestAPI } from "./nestAPI";
import { store } from "../store";
import { queryClient } from "../App";
import { setModal } from "../store/modal";
import { faker } from "@faker-js/faker";

export const fetchBills = async () => {
  const { data } = await nestAPI.get("/bills").catch((error) => {
    if (error.response?.status === 404) {
      console.log(error.response.data.message);
      return { data: null };
    }
    throw error;
  });
  return data;
};

export const fetchBillById = async (id: string) => {
  const { data: bill } = await nestAPI.get(`/bills/${id}`);
  store.dispatch(
    setModal({
      isVisible: true,
      name: "BillModal",
      data: { bill },
    })
  );
};

export const seedBills = async () => {
  const fakeBill = () => ({
    amount: Number(faker.finance.amount({ min: 1, max: 1000 })),
    details: faker.finance.transactionDescription(),
    due_date: faker.date.future(),
  });
  const bills = Array.from({ length: 10 }, fakeBill);
  await nestAPI.post("/bills", bills);

  await queryClient.fetchQuery({
    queryKey: "bills",
    queryFn: fetchBills,
  });
};
