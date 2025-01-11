import { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { PRODUCTS } from "../data/data";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import Link from "../shared/Link";
import NcImage from "../shared/NcImage/NcImage";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Product } from "../models/ProductModels";
import { useApplication } from "../contexts/ApplicationContext";
import { useTranslation } from "react-i18next";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ className = "", data = PRODUCTS[0], isLiked }) => {
  const { name, price, motto, description, variantType, status, id } = data;

  const [showModalQuickView, setShowModalQuickView] = useState(false);

  const { t } = useTranslation();

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonSecondary className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg" fontSize="text-xs" sizeClass="py-2 px-4" onClick={() => setShowModalQuickView(true)}>
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">{t("Quick view")}</span>
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <>
      <div className={`nc-ProductCard relative flex flex-col bg-transparent ${className} mx-2`}>
        <Link href={`/product-detail/${id}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-md overflow-hidden z-1 group product-card">
          <Link href={`/product-detail/${id}`} className="block block group relative">
            <NcImage containerClassName="flex aspect-w-3 aspect-h-4 w-full h-0" src={data.imageThumbnail} className="object-cover w-full h-full drop-shadow-xl group-hover:hidden" fill sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw" alt="product" showMobileImage={true} />

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

        <div className="space-y-4 px-0 pt-2.5 pb-2.5">
          {/* {renderVariants()} */}
          <div>
            <div className="flex justify-between items-end ">
              <h2 className="text-gray-700 text-base transition-colors">{name}</h2>
              <Prices price={price} />
            </div>

            <p className={` text-slate-500 dark:text-slate-400 mt-1 text-sm `}>{motto || description}</p>
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
      <ModalQuickView item={data} show={showModalQuickView} onCloseModalQuickView={() => setShowModalQuickView(false)} />
    </>
  );
};

export default ProductCard;
