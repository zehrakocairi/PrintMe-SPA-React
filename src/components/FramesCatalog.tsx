import Heading from "../components/Heading/Heading";
import { useLocation, useNavigate } from "react-router-dom";
import NcImage from "../shared/NcImage/NcImage";
import ListingImageGallery from "../components/listing-image-gallery/ListingImageGallery";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Frame {
  id: string;
  name: string;
  desc: string;
  image: string;
  allImages: string[];
}

const FRAMES: Frame[] = [
  {
    id: "1",
    name: `Oak Picture Frame`,
    desc: "A classic oak frame that adds rustic charm to your photos.",
    image:
      "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251232_pe924196_s5.jpg?f=xxs, https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1298269_pe936170_s5.jpg?f=u", "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1298259_pe936159_s5.jpg?f=u", "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1298276_pe936177_s5.jpg?f=u"],
  },
  {
    id: "2",
    name: `Black Picture Frame`,
    desc: "A sleek black frame perfect for a modern look.",
    image:
      "https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661047_pe711292_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661045_pe711296_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661047_pe711292_s5.jpg?f=xxs"],
  },
  {
    id: "3",
    name: `Wood Frame Light`,
    desc: "A light wood frame that highlights your photos beautifully.",
    image:
      "https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0902941_pe661098_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs"],
  },
  {
    id: "4",
    name: `Dark Oak Frame`,
    desc: "A dark oak frame that adds elegance to your artwork.",
    image:
      "https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0902161_pe597470_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs"],
  },
  {
    id: "1",
    name: `Oak Picture Frame`,
    desc: "A classic oak frame that adds rustic charm to your photos.",
    image:
      "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251232_pe924196_s5.jpg?f=xxs, https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=xxs"],
  },
  {
    id: "2",
    name: `Black Picture Frame`,
    desc: "A sleek black frame perfect for a modern look.",
    image:
      "https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661047_pe711292_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661045_pe711296_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661047_pe711292_s5.jpg?f=xxs"],
  },
  {
    id: "3",
    name: `Wood Frame Light`,
    desc: "A light wood frame that highlights your photos beautifully.",
    image:
      "https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0902941_pe661098_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs"],
  },
  {
    id: "4",
    name: `Dark Oak Frame`,
    desc: "A dark oak frame that adds elegance to your artwork.",
    image:
      "https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0902161_pe597470_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs"],
  },
];


const FramesCatalog = () => {
  const navigate = useNavigate();
  const thisPathname = useLocation();
  const searchParams = new URLSearchParams(thisPathname.search);
  const modal = searchParams?.get("modal");
  const { t } = useTranslation();

  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);

  const handleOpenModalImageGallery = (index: number) => {
    setSelectedFrameIndex(index);
    navigate(`${thisPathname.pathname}?modal=PHOTO_TOUR_SCROLLABLE`);
  };
  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    navigate(`${thisPathname.pathname}?${params.toString()}`);
  };

  return (
    <div className="nc-SectionFounder relative">
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 "
        desc={t("PrintMeArt was founded by our passionate family, dedicated to bringing your cherished memories to life through beautiful, high-quality prints")}
        rightDescText={t("Explore Our Exquisite Frame Collection")}
      >
       {t("Frames")}
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 xl:gap-x-8">
        {/*  */}
        {FRAMES.map(
          (item, index) => (
            <div key={index}>
              <div
                className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 ${index >= 2 ? "block" : ""
                  }`}
              >
                <div  className="block block group relative">
                  <NcImage
                    containerClassName="flex aspect-w-3 aspect-h-4 w-full h-0"
                    src={item.image} 
                    className="object-cover w-full h-full drop-shadow-xl group-hover:hidden"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    alt="product"
                  />

                  {/* Hover View Image */}
                  <NcImage
                    containerClassName="flex aspect-w-3 aspect-h-4 w-full h-0 absolute inset-0 product-card"
                    src={item.allImages[0]} 
                    className="object-cover w-full h-full drop-shadow-xl hidden group-hover:block"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    alt="product"
                  />
                </div>

                <div
                  className="absolute hidden md:flex md:items-center md:justify-center left-5 bottom-5 px-4 py-2 rounded-l bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
                  onClick={() => handleOpenModalImageGallery(index)}
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
              <h3 className="text-lg font-semibold text-neutral-900 mt-5 md:text-l dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-md text-neutral-600 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          )
        )}
      </div>
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={FRAMES[selectedFrameIndex].allImages.map((image, index) => {
          return {
            id: index,
            url: image,
          };
        })}
      />
    </div>
  );
};

export default FramesCatalog;
