import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchBills, fetchBillById, seedBills } from "../services/bill";
import { BillList } from "../components/BillList";

export function BillsPage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery("bills", fetchBills);

  useEffect(() => {
    if (id) {
      fetchBillById(id);
    }
  }, [id]);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return (
      <div className="bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              It looks like you don't have any bills yet.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={seedBills}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Create Bills
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <BillList bills={data} />;
}
