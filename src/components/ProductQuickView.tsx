"use client";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import LikeButton from "./LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "./BagIcon";
import NcInputNumber from "./NcInputNumber";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "./IconDiscount";
import Prices from "./Prices";
import toast from "react-hot-toast";
import NotifyAddTocart from "./NotifyAddTocart";
import AccordionInfo from "./AccordionInfo";
import Image from "../shared/Image";
import Link from "../shared/Link";
import { Product } from "../models/ProductModels";
import { CartItem } from "../models/CartItem";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useApplication } from "../contexts/ApplicationContext";

export interface ProductQuickViewProps {
  className?: string;
  item: Product;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({ item, className = "" }) => {
  let {
    name,
    price,
    motto,
    description,
    status,
    images,
    rating,
    id,
    numberOfReviews,
  } = item;

  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(price);

  const {frames, sizes} = useApplication();

  const {addItemToCart} = useCart();

  const [selectedSizeIndex, setsSelectedSizeIndex] = useState(0);
  const [qualitySelected, setQualitySelected] = useState(1);

  useEffect(() => {
    const newPrice = (price + frames[selectedFrameIndex]?.price) * sizes[selectedSizeIndex]?.multiplier;
    setCalculatedPrice(Math.floor(newPrice));
  }, [
    selectedSizeIndex,
    selectedFrameIndex,
  ]);
  const notifyAddTocart = () => {
    addItemToCart(new CartItem(id, name, price, 1, item.imageThumbnail, undefined, sizes[selectedSizeIndex]?.id, frames[selectedFrameIndex]?.id, frames[selectedFrameIndex]?.name));
    toast.custom(
      (t) => (
        <NotifyAddTocart
          product={item}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizes[selectedSizeIndex]}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderFrames = () => {
    if (!frames || !frames.length) {
      return null;
    }

    return (
      <div>
       <div className="flex justify-between font-medium text-sm">
        <label className="rtl:text-right block" htmlFor="">
          <span className="text-sm font-medium">
            Color:
            <span className="ms-1 font-semibold">
              {frames[selectedFrameIndex].name}
            </span>
          </span>
        </label>
        <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-6000 hover:text-primary-500"
            href="/our-services"
          >
            See frame details
          </a>
        </div>
        <div className="grid grid-cols-6 gap-2 mt-3">
          {frames.map((frame, index) => (
            <div
              title= {frame.name}
              key={index}
              onClick={() => setSelectedFrameIndex(index)}
              className={`relative flex max-w-[75px] h-16 rounded-lg border-2 cursor-pointer ${
                selectedFrameIndex === index
                  ? "border-primary-6000 dark:border-primary-500"
                  : "border-transparent"
              }`}
            >
              <div
                className="absolute inset-0.5 rounded-lg overflow-hidden z-0 bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${frame.thumbnail || ""})`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSizeList = () => {
    if ( !sizes || !sizes.length) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Size:
              <span className="ms-1 font-semibold">{sizes[selectedSizeIndex]?.name}</span>
            </span>
          </label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-6000 hover:text-primary-500"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-2.5">
          {sizes.map((size, index) => {
            const isActive = index === selectedSizeIndex;
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-xl border flex items-center justify-center 
                text-sm  font-semibold select-none overflow-hidden z-0 cursor-pointer ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                onClick={() => {
                  setsSelectedSizeIndex(index);
                }}
              >
                {size.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            <Link href={`/product-detail/${id}`}>{name}</Link>
          </h2>

          <div className="flex justify-start rtl:justify-end items-center mt-5 space-x-4 sm:space-x-5 rtl:space-x-reverse">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={calculatedPrice}
            />
            <div className="h-6 border-s border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <Link
                href={`/product-detail/${id}`}
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ms-1.5 flex">
                {rating || ""}
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    {numberOfReviews} reviews
                  </span>
                </div>
              </Link>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ms-1 leading-none">{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        <div className="">{renderFrames()}</div>
        <div className="">{renderSizeList()}</div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5 rtl:space-x-reverse">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ms-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo
          data={[{name: "Title", content: motto ?? ""}, {name: "Description", content: description}]} 
        />
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
              <Image
                src={item.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>

            {/* STATUS */}
            {renderStatus()}
            {/* META FAVORITES */}
            <LikeButton className="absolute end-3 top-3 " />
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
            {[item.image2, item.image3].map((item, index) => {
              return (
                <div key={index} className="aspect-w-3 aspect-h-4">
                  <Image
                    fill
                    src={item}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full rounded-xl object-cover"
                    alt="product detail 1"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:ps-7 xl:ps-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
