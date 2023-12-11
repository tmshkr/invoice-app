import {
  CalendarDaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";

import { useAppSelector } from "../store";
import { selectModal } from "../store/modal";
import { formatCurrency } from "../utils/format";

export function InvoiceModal() {
  const { data } = useAppSelector(selectModal);
  const { invoice } = data;
  return (
    <div data-testid="InvoiceModal" className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 pb-8">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              Amount
            </dt>
            <dd
              data-testid="InvoiceModal.amount"
              className="mt-1 text-base font-semibold leading-6 text-gray-900"
            >
              {formatCurrency(invoice.amount)}
            </dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Due date</span>
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              <time dateTime="2023-01-31">
                {dayjs(invoice.due_date).format("MMM D, YYYY")}
              </time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Status</span>
              <DocumentTextIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {invoice.details}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
