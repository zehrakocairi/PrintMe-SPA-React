"use client";

import { useEffect, useState } from "react";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import NcImage from "../../shared/NcImage/NcImage";
import ReviewItem from "../../components/ReviewItem";
import IconDiscount from "../../components/IconDiscount";
import NcInputNumber from "../../components/NcInputNumber";
import BagIcon from "../../components/BagIcon";
import toast from "react-hot-toast";
import { StarIcon } from "@heroicons/react/24/solid";
import SectionSliderProductCard from "../../components/SectionSliderProductCard";
import NotifyAddTocart from "../../components/NotifyAddTocart";
import LikeSaveBtns from "../../components/LikeSaveBtns";
import AccordionInfo from "../../components/AccordionInfo";
import Policy from "./Policy";
import ModalViewAllReviews from "./ModalViewAllReviews";
import ListingImageGallery from "../../components/listing-image-gallery/ListingImageGallery";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCatalogItem } from "../../services/catalogService";
import { Product, Size } from "../../models/ProductModels";
import { Sizes } from '../../data/types';
import { getFeaturedItems } from '../../services/catalogService';
import { useCart } from "../../contexts/CartContext";
import { CartItem } from '../../models/CartItem';
import { useApplication } from "../../contexts/ApplicationContext";
import UpdateProduct from "../../components/UpdateProduct";
import { useTranslation } from "react-i18next";
import {PlusIcon} from "@heroicons/react/24/outline";
import ModalPreviewDesign from "../../components/ModalPreviewDesign";

const ProductDetailPage = ({ }) => {

  const { t } = useTranslation();
  const { id } = useParams();

  const navigate = useNavigate();
  const thisPathname = useLocation();
  const searchParams = new URLSearchParams(thisPathname.search);
  const modal = searchParams?.get("modal");

  const fetchFeaturedtems = async () => {
    const { data } = await getFeaturedItems();
    setCustomersAlsoPurchesed(data);
  };

  const fetchProduct = async () => {
    const product = await getCatalogItem(+(id ?? "0"),);
    setProduct(product);
  };

  const { addItemToCart } = useCart();
  const { frames, sizes, isAdmin } = useApplication();

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  useEffect(() => {
    fetchProduct();
    fetchFeaturedtems();
    handleScrollToEl('root');
  }, [id]);


  const status = "New in"; // TODO : Complete here by the category of the product
  const [product, setProduct] = useState({} as Product);
  const [customerAlsoPurchased, setCustomersAlsoPurchesed] = useState([]);
  const frameGuideImage = "https://genstorageaccount3116.blob.core.windows.net/printme-images/frame-guide.avif";

  function getAllImages(): string[] {
    return [product?.image, product?.image2, product?.image3, product?.image4, frameGuideImage, "https://genstorageaccount3116.blob.core.windows.net/printme-images/amy-humphries-yu9_c1mt_c4-unsplash.jpeg"];
  }

  const [sizeSelected, setSizeSelected] = useState(sizes[0]);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(product?.price ?? 0);
  const [quantity, setQuantity] = useState(1);
  const [isMatIncluded, setIsMatIncluded] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  useEffect(() => {
    if (product?.price && frames && sizes) {
      const properSize = isMatIncluded ? sizes[Math.min(sizes.length-1, sizes.indexOf(sizeSelected) + 1)] : sizeSelected;
      const newPrice = ((product.price ?? 0) + frames[selectedFrameIndex].price) * (properSize?.multiplier ?? 1);
      setCalculatedPrice(Math.floor(newPrice));
    }
  }, [
    product,
    sizeSelected,
    selectedFrameIndex,
    isMatIncluded
  ]);

  useEffect(() => {
    setSizeSelected(sizes[0]);
  }, [
    sizes,
  ]);

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    navigate(`${thisPathname.pathname}?${params.toString()}`);
  };
  const handleOpenModalImageGallery = () => {
    navigate(`${thisPathname.pathname}?modal=PHOTO_TOUR_SCROLLABLE`);
  };

  const notifyAddTocart = () => {
    addItemToCart(new CartItem(product.id, product.name, calculatedPrice, quantity, product.imageThumbnail, sizeSelected?.id, frames[selectedFrameIndex].id, undefined, frames[selectedFrameIndex].name));
    toast.custom(
      (t) => (
        <NotifyAddTocart
          product={product}
          qualitySelected={quantity}
          show={t.visible}
          sizeSelected={{} as Size}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderSizeList = () => {
    if (!Sizes || !Sizes.length) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Image Size:
              <span className="ml-1 font-semibold">{sizeSelected?.name}</span>
            </span>
          </label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // href=""
            className="text-primary-6000 hover:text-primary-500"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {sizes.map((size, index) => {
            const isActive = size.id === sizeSelected?.id;
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 "cursor-pointer"
                  } ${isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  }`}
                onClick={() => {
                  setSizeSelected(size);
                }}
              >
                {size?.name}
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
      "text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
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
              title={frame.name}
              key={index}
              onClick={() => setSelectedFrameIndex(index)}
              className={`relative flex max-w-[75px] h-16 rounded-lg border-2 cursor-pointer ${selectedFrameIndex === index
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

  const renderSectionSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap lg:shadow-lg">
        <div className="space-y-7 lg:space-y-8">
          {/* PRICE */}
          <div className="">
            {/* ---------- 1 HEADING ----------  */}
            <div className="flex items-center justify-between space-x-5">
              <div className="flex text-2xl font-semibold">
                ${calculatedPrice?.toFixed(0)}
              </div>

              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <div className="">
                  <StarIcon className="w-5 h-5 pb-[1px] text-orange-400" />
                </div>
                <span className="ml-1.5 flex">
                  <span>{'New'} </span>
                  <span className="mx-1.5">·</span>
                  <span className="text-slate-700 dark:text-slate-400 underline">
                    {product.numberOfReviews} reviews
                  </span>
                </span>
              </a>
            </div>
            {/* ---------- FRAMES ----------  */}
            <div className="mt-6 space-y-7 lg:space-y-8">
              <div className="">{renderFrames()}</div>
            </div>
            {/* ---------- MAT OPTION ----------  */}
            <div className="mt-6 space-y-7 lg:space-y-8">
              <div className="">
                <div
                  className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none ${isMatIncluded
                    ? "border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                    }`}
                  onClick={() => setIsMatIncluded(!isMatIncluded)}
                >
                  <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />

                  <span className="line-clamp-1 ml-2">{t('Include Mat')}</span>
                </div>
              </div>
            </div>
            {/* ---------- SIZE LIST ----------  */}
            <div className="mt-6 space-y-7 lg:space-y-8">
              <div className="">{renderSizeList()}</div>
            </div>
          </div>
          {/*  ---------- PREVIEW BUTTON */}
          <div className="flex space-x-3.5">
            <ButtonPrimary
              className="flex-1 flex-shrink-0 !bg-[#517BDE]"
              onClick={()=> setShowPreviewModal(true)}
            >
              <span className="ml-3">Preview Your Design</span>
            </ButtonPrimary>
          </div>
          {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
          <div className="flex space-x-3.5">
            <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
              <NcInputNumber
                defaultValue={quantity}
                onChange={setQuantity}
              />
            </div>
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={notifyAddTocart}
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">Add to cart</span>
            </ButtonPrimary>
          </div>

          {/* SUM */}
          <div className="hidden sm:flex flex-col space-y-4 ">
            <div className="space-y-2.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="flex">
                  <span>{`$${calculatedPrice?.toFixed(2)}  `}</span>
                  <span className="mx-2">x</span>
                  <span>{`${quantity} `}</span>
                </span>

                <span>{`$${(calculatedPrice * quantity).toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Tax estimate</span>
                <span>$0</span>
              </div>
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{`$${(calculatedPrice * quantity).toFixed(2)}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {product?.name}
          </h2>
          <div className="flex items-center mt-4 sm:mt-5">
            <a
              href="#reviews"
              className="hidden sm:flex items-center text-sm font-medium "
            >
              <div className="">
                <StarIcon className="w-5 h-5 pb-[1px] text-slate-800 dark:text-slate-200" />
              </div>
              <span className="ml-1.5">
                <span>New</span>
                <span className="mx-1.5">·</span>
                <span className="text-slate-700 dark:text-slate-400 underline">
                  {product?.numberOfReviews} reviews
                </span>
              </span>
            </a>
            <span className="hidden sm:block mx-2.5">·</span>
            {renderStatus()}

            <div className="ml-auto">
              <LikeSaveBtns />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="block lg:hidden">{renderSectionSidebar()}</div>

        {/*  */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/*  */}
        <AccordionInfo data={[{ name: "Title", content: product.motto ?? "" }, { name: "Description", content: product.description }]} panelClassName="p-4 pt-3.5 text-slate-600 text-base dark:text-slate-300 leading-7" />
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap !border-b-0 !pb-0">
        <h2 className="text-2xl font-semibold">Product details</h2>
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
          <p>
            Our giclée prints are created using cutting-edge technology to ensure exceptional detail and color accuracy. Each print is made with 180 g/m² fine art paper, providing a rich matte finish that enhances the artwork's depth and vibrancy. The added 3.0 cm blank borders allow for easy framing, and our prints come with a 100+ year color guarantee, ensuring that your art remains stunning for generations.
          </p>
          <ul>
            <li>High-quality 180 g/m² fine art paper (matte)</li>
            <li>Giclée printing for vibrant, accurate colors</li>
            <li>
              3.0 cm blank borders for easy framing
            </li>
            <li>50+ year color guarantee</li>
          </ul>
        </div>
        {/* ---------- 6 ----------  */}
        <Policy />
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div id="reviews" className="scroll-mt-[150px]">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 · 142 Reviews</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`ListingDetailPage nc-ProductDetailPage2`}>
      <>
        <header className="container mt-8 sm:mt-10">
          <div className="relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
              <div
                className="md:h-full col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt="firt"
                  containerClassName="aspect-w-3 aspect-h-4 relative md:aspect-none md:absolute md:inset-0"
                  className="object-cover rounded-md sm:rounded-xl max-h-full"
                  src={product?.image}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity rounded-md sm:rounded-xl"></div>
              </div>

              {/*  */}
              <div
                className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden z-0 cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl"
                  src={product?.image2}
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity"></div>
              </div>

              {/*  */}
              {[product?.image3, product?.image4].map(
                (item, index) => (
                  <div
                    key={index}
                    className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 ${index >= 2 ? "block" : ""
                      }`}
                  >
                    <NcImage
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                      className="object-cover w-full h-full rounded-md sm:rounded-xl "
                      src={item || ""}
                    />

                    {/* OVERLAY */}
                    <div
                      className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                      onClick={handleOpenModalImageGallery}
                    />
                  </div>
                )
              )}
            </div>
            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-9 sm:mt-11 flex ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pr-14 lg:space-y-14">
          {renderSection1()}
          {renderSection2()}
        </div>

        {/* SIDEBAR */}
        <div className="flex-grow">
          <div className="hidden lg:block sticky top-28">
            {renderSectionSidebar()}
          </div>
        </div>
      </main>

      {
      isAdmin() && (
      <main className="container relative z-10 mt-9 sm:mt-11 flex ">
        <div className="flex-grow">
          <div className="hidden lg:block sticky top-28">
            <UpdateProduct productId={id}></UpdateProduct>
          </div>
        </div>
      </main>
      )
      }


      {/* OTHER SECTION */}
      <div className="container pb-24 lg:pb-28 pt-14 space-y-14">
        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

        {/* {renderReviews()} */}

        <hr className="border-slate-200 dark:border-slate-700" />

        {
          customerAlsoPurchased.length > 0 ? <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
            data={customerAlsoPurchased}
          /> : <></>
        }
      </div>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
      <ModalPreviewDesign
        show={showPreviewModal}
        onCloseModal={() => setShowPreviewModal(false)}
        image={product.image}
        isMatIncluded={isMatIncluded}
        sizeName={sizeSelected?.name ?? "1x1"}
        frame={frames[selectedFrameIndex]}
      />

      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getAllImages().map((item, index) => {
          return {
            id: index,
            url: item,
          };
        })}
      />
    </div>
  );
};

export default ProductDetailPage;
