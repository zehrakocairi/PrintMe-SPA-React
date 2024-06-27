import Heading from "../components/Heading/Heading";
import { useLocation, useNavigate } from "react-router-dom";
import NcImage from "../shared/NcImage/NcImage";
import ListingImageGallery from "../components/listing-image-gallery/ListingImageGallery";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApplication } from "../contexts/ApplicationContext";


const FramesCatalog = () => {
  const navigate = useNavigate();
  const thisPathname = useLocation();
  const searchParams = new URLSearchParams(thisPathname.search);
  const modal = searchParams?.get("modal");
  const { t } = useTranslation();
  const {frames} = useApplication();

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
        {frames.filter(x=>x.id !== 0).map(
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
              <span className="block text-sm text-neutral-600 dark:text-neutral-400">
                {item.description}
              </span>
            </div>
          )
        )}
      </div>
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={frames[selectedFrameIndex].allImages.map((image, index) => {
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
