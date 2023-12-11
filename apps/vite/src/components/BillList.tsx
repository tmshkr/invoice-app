import dayjs from "dayjs";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  PrinterIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { formatCurrency, truncate } from "../utils/format";

export function BillList(props: any) {
  const navigate = useNavigate();
  const { bills } = props;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Bills
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all of your Bills.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 flex">
          <PrinterIcon className="w-6 ml-2" />
          <Cog6ToothIcon className="w-6 ml-2" />
          <PencilIcon className="w-6 ml-2" />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <a href="#" className="group inline-flex">
                      Due Date
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Details
                      <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Amount
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Created
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white cursor-pointer">
                {bills.map((bill: any, i: number) => (
                  <tr
                    data-testid={`BillListRow_${i}`}
                    key={bill.id}
                    onClick={() => {
                      navigate(`/bills/${bill.id}`);
                    }}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {dayjs(bill.due_date).format("MMM D, YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {truncate(bill.details, 8)}
                    </td>
                    <td
                      data-testid={`BillListRow_${i}.amount`}
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {formatCurrency(bill.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {dayjs(bill.created_at).format("MMM D, YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
