import React, { FC, useState, useEffect } from "react";
import PreviewDesign from "../../components/PreviewDesign";
import { useApplication } from "../../contexts/ApplicationContext";
import Options from "../../components/Options";
import { useCart } from "../../contexts/CartContext";
import { CartItem } from '../../models/CartItem';
import toast from "react-hot-toast";
import NotifyAddTocart from "../../components/NotifyAddTocart";
import { Product, Size } from "../../models/ProductModels";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import BagIcon from "../../components/BagIcon";
import { getCustomCatalogItem, uploadCustomerImage } from "../../services/catalogService";
import NcInputNumber from "../../components/NcInputNumber";
import { PhotoIcon} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export interface CustomDesignProps {
  className?: string;
}

const CustomDesign: FC<CustomDesignProps> = ({
  className = "",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const { frames, sizes } = useApplication();
  const [sizeSelected, setSizeSelected] = useState(sizes[0]);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [isMatIncluded, setIsMatIncluded] = useState(false);  
  const [product, setProduct] = useState({} as Product);
  const [calculatedPrice, setCalculatedPrice] = useState(product?.price ?? 0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItemToCart } = useCart();

  const { t } = useTranslation();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));  // Generate and set the image URL
    }
  };

  const fetchProduct = async () => {
    const product = await getCustomCatalogItem();
    setProduct(product);
  };

  const persistImage = async (): Promise<string> => {
    if(selectedFile === null) return Promise.resolve("");
    return uploadCustomerImage(selectedFile);
  };

  const notifyAndAddTocart = async () => {
    var imageUrl = await persistImage();
    addItemToCart(new CartItem(product.id, product.name, calculatedPrice, quantity, imageUrl, sizeSelected?.id, frames[selectedFrameIndex].id, undefined, frames[selectedFrameIndex].name));
    toast.custom(
      (t) => (
        <NotifyAddTocart
          product={{...product, imageThumbnail: imageUrl} as Product}
          qualitySelected={quantity}
          show={t.visible}
          sizeSelected={sizeSelected}
          calculatedPrice={calculatedPrice}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  useEffect(() => {
    // Cleanup the object URL to avoid memory leaks when the component unmounts or the file changes
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

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
    fetchProduct();
  }, []);

  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse md:flex-row relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="w-full md:w-8/12">
        <div className="flex flex-col lg:flex-col space-y-14 lg:space-y-0 lg:space-x-4 items-center relative text-center lg:text-left mb-8">
          <div className="w-screen max-w-full xl:max-w-3xl space-y-5">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              {t('Upload Your Image')}
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span><PhotoIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" /> {t('Upload a file')}</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1"> {t('or drag and drop')}</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                {selectedFile && (
                  <p className="text-sm leading-5 text-gray-900 mt-2">
                    {t('Selected file size')}: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-col space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
          <div className="w-screen max-w-full xl:max-w-3xl space-y-5">
            {image && (
              <PreviewDesign
                frame={frames[selectedFrameIndex]}
                sizeName={sizeSelected?.name}
                isMatIncluded={isMatIncluded}
                image={image}
                showDescription={false}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/12">
      <Options
        frames={frames}
        sizes={sizes}
        selectedFrameIndex={selectedFrameIndex}
        sizeSelected={sizeSelected}
        isMatIncluded={isMatIncluded}
        onFrameSelect={setSelectedFrameIndex}
        onSizeSelect={setSizeSelected}
        onMatToggle={() => setIsMatIncluded(!isMatIncluded)}
      />
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={quantity}
              onChange={setQuantity}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAndAddTocart}
            disabled={!selectedFile}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>
         {/* SUM */}
         <div className="hidden sm:flex flex-col mt-8 space-y-4 ">
            <div className="space-y-2.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="flex">
                  <span>{`€${calculatedPrice?.toFixed(2)}  `}</span>
                  <span className="mx-2">x</span>
                  <span>{`${quantity} `}</span>
                </span>

                <span>{`€${(calculatedPrice * quantity).toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{t("Tax estimate")}</span>
                <span>€{calculatedPrice * quantity * 0.21}</span>
              </div>
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700"></div>
            <div className="flex justify-between font-semibold">
              <span>{t("Total")}</span>
              <span>{`€${(calculatedPrice * quantity).toFixed(2)}`}</span>
            </div>
          </div>

      </div>

    </div>
  );
};

export default CustomDesign;
