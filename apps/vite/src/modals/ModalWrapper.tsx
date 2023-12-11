import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { selectModal, setModal } from "../store/modal";

import { InvoiceModal } from "./InvoiceModal";
import { BillModal } from "./BillModal";

const modals: any = { InvoiceModal, BillModal };

export function Modal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  return (
    <Transition.Root show={modal.isVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          dispatch(setModal({ ...modal, isVisible: false }));
          const rootPath = window.location.pathname
            .split("/")
            .slice(0, -1)
            .join("/");
          navigate(rootPath);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-auto sm:max-w-lg">
                {modals[modal.name]}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
