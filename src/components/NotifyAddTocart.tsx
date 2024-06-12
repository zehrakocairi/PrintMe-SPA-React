import React, { FC } from "react";
import { Transition } from "../headlessui";
import Prices from "./Prices";
import Image from "../shared/Image";
import { Size } from "../models/ProductModels";
import { Product } from "../models/ProductModels";

interface Props {
  show: boolean;
  product: Product;
  sizeSelected: Size;
  qualitySelected: number;
}

const NotifyAddTocart: FC<Props> = ({
  show,
  product,
  qualitySelected,
  sizeSelected,
}) => {
const { name: productName, price, imageThumbnail: productImage, motto } = product;
  const renderProductCartOnNotify = () => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={productImage}
            alt={productName}
            fill
            sizes="100px"
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{productName}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{sizeSelected?.name || "NO SIZE"}</span>
                </p>
              </div>
              <Prices price={price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">{`Qty ${qualitySelected}`}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-x-20"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-20"
    >
      <div
        className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
      >
        <p className="block text-base font-semibold leading-none">
          Added to cart!
        </p>
        <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
        {renderProductCartOnNotify()}
      </div>
    </Transition>
  );
};

export default NotifyAddTocart;
