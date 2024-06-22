"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { PRODUCTS } from "../data/data";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import { toast } from 'react-hot-toast';
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import Image from "../shared/Image";
import Link from "../shared/Link";
import NcImage from "../shared/NcImage/NcImage";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/ProductModels";
import NotifyAddTocart from "./NotifyAddTocart";
import { Size } from "../models/ProductModels";
import { useApplication } from "../contexts/ApplicationContext";
import { useTranslation } from "react-i18next";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  isLiked,
}) => {
  const {
    name,
    price,
    motto,
    description,
    variantType,
    status,
    id,
  } = data;

  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const navigate = useNavigate();
  const {addItemToCart} = useCart();
  const {sizes, frames} = useApplication();

  const { t } = useTranslation();

  const notifyAddTocart = (sizeIndex: number, frameId: number) => {
    addItemToCart(new CartItem(id, name, price, 1, data.imageThumbnail, sizes[sizeIndex].id, frameId, 0, "No Frame"));
    toast.custom(
      (t) => (
        <NotifyAddTocart
          product={data}
          qualitySelected={1}
          show={t.visible}
          sizeSelected={sizes[0]}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: Size }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={data.image2}
            alt={name}
            showMobileImage={true}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {frames ? frames[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size?.name }</span>
                </p>
              </div>
              <Prices price={price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass:number) => {
    if (Bgclass === 0) {
      return "border-red-500";
    }
    if (Bgclass === 1) {
      return "border-violet-500";
    }
    if (Bgclass === 2) {
      return "border-orange-500";
    }
    if (Bgclass === 3) {
      return "border-green-500";
    }
    if (Bgclass === 4) {
      return "border-blue-500";
    }
    if (Bgclass === 5) {
      return "border-sky-500";
    }
    if (Bgclass === 6) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const renderVariants = () => {
    if (!frames || !frames.length || !variantType) {
      return null;
    }

    if (variantType === "color") {
      return (
        <div className="flex space-x-1">
          {frames.map((frame, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
                variantActive === index
                  ? getBorderClass(frame.id)
                  : "border-transparent"
              }`}
              title={frame.name}
            >
              <div
                className={`absolute inset-0.5 rounded-full z-0`}
              ></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex ">
        {frames.map((frame, index) => (
          <div
            key={index}
            onClick={() => setVariantActive(index)}
            className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
              variantActive === index
                ? "border-black dark:border-slate-300"
                : "border-transparent"
            }`}
            title={frame.name}
          >
            <div
              className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
              style={{
                backgroundImage: `url(${frame.thumbnail || ""})`,
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {/* <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => notifyAddTocart()}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">Add to bag</span>
        </ButtonPrimary> */}
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">{t('Quick view')}</span>
        </ButtonSecondary>
      </div>
    );
  };

  const renderSizeList = () => {
    if (!sizes || !sizes.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-1 space-x-1.5 rtl:space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
              // onClick={() => notifyAddTocart(size.id)}
            >
              {size.name}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className} mx-2`}
      >
        <Link href={`/product-detail/${id}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-md overflow-hidden z-1 group product-card">
          <Link href={`/product-detail/${id}`} className="block block group relative">
            <NcImage
              containerClassName="flex aspect-w-3 aspect-h-4 w-full h-0"
              src={data.imageThumbnail} //data.imageThumbnail
              className="object-cover w-full h-full drop-shadow-xl group-hover:hidden"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
              showMobileImage={true}
            />

            {/* Hover View Image */}
            <NcImage
              containerClassName="flex aspect-w-3 aspect-h-4 w-full h-0 absolute inset-0 product-card"
              src={data.image2Thumbnail} //data.image2Thumbnail
              className="object-cover w-full h-full drop-shadow-xl hidden group-hover:block"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
              showMobileImage={true}
            />
          </Link>
          <ProductStatus status={status} />
          <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" />
          {renderGroupButtons()}
          {/* {sizes ? renderSizeList() : renderGroupButtons()} */}
        </div>

        <div className="space-y-4 px-0 pt-5 pb-2.5">
          {/* {renderVariants()} */}
          <div>
            <div className="flex justify-between items-end ">
              <h2 className="text-gray-700 text-base transition-colors">
                {name}
              </h2>
              <Prices price={price} />
            </div>
           
            <p className={` text-slate-500 dark:text-slate-400 mt-1 `}>
              { motto || description}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            {/* <Prices price={price} /> */}
            {/* <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {rating || ""} ({numberOfReviews || 0} reviews)
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        item={data}
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
