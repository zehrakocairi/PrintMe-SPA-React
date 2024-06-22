"use client";

import { Dialog, Transition } from "../headlessui";
import React, { FC, Fragment, useRef } from "react";
import ButtonClose from "../shared/ButtonClose/ButtonClose";
import ProductQuickView from "./ProductQuickView";
import { motion } from "framer-motion";
import { Product } from "../models/ProductModels";

export interface ModalQuickViewProps {
  item: Product;
  show: boolean;
  onCloseModalQuickView: () => void;
}

const ModalQuickView: FC<ModalQuickViewProps> = ({
  item,
  show,
  onCloseModalQuickView,
}) => {
  let overlayRef = useRef<HTMLDivElement>(null);
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
      as="div"
      className="fixed inset-0 z-50"
      onClose={onCloseModalQuickView}
    >
      <div className="flex items-center justify-center h-full text-center md:px-4">
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <motion.div
            ref={overlayRef}
            key="backdrop"
            className="fixed inset-0 bg-black/40 dark:bg-black/70"
            onClick={onCloseModalQuickView}
          />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative inline-flex xl:py-8 w-[1000px] max-w-[90vw] lg:max-w-7xl max-h-full align-middle">
            <div
              className="flex-1 flex overflow-hidden max-h-full p-8 w-full text-left align-middle transition-all transform lg:rounded-2xl bg-white 
              dark:bg-neutral-900 dark:border dark:border-slate-700 dark:text-slate-100 shadow-xl"
            >
              <span className="absolute end-3 top-3 z-50">
                <ButtonClose onClick={onCloseModalQuickView} />
              </span>

              <div className="flex-1 overflow-y-auto rounded-xl hiddenScrollbar max-h-[80vh]">
                <ProductQuickView item={item} />
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
    </Transition>
  );
};

export default ModalQuickView;
