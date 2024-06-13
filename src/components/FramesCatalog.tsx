import Heading from "../components/Heading/Heading";
import { useLocation, useNavigate } from "react-router-dom";
import NcImage from "../shared/NcImage/NcImage";
import ListingImageGallery from "../components/listing-image-gallery/ListingImageGallery";
import { FC, useState } from "react";

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
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "2",
    name: `Black Picture Frame`,
    desc: "A sleek black frame perfect for a modern look.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "3",
    name: `Wood Frame Light`,
    desc: "A light wood frame that highlights your photos beautifully.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "4",
    name: `Dark Oak Frame`,
    desc: "A dark oak frame that adds elegance to your artwork.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "1",
    name: `Oak Picture Frame`,
    desc: "A classic oak frame that adds rustic charm to your photos.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "2",
    name: `Black Picture Frame`,
    desc: "A sleek black frame perfect for a modern look.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "3",
    name: `Wood Frame Light`,
    desc: "A light wood frame that highlights your photos beautifully.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  },
  {
    id: "4",
    name: `Dark Oak Frame`,
    desc: "A dark oak frame that adds elegance to your artwork.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    allImages: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"],
  }
];


const FramesCatalog = () => {
  const navigate = useNavigate();
  const thisPathname = useLocation();
  const searchParams = new URLSearchParams(thisPathname.search);
  const modal = searchParams?.get("modal");

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
        desc="PrintMeArt was founded by our passionate family, dedicated to bringing your cherished memories to life through beautiful, high-quality prints."
      >
        Frames
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {/*  */}
        {FRAMES.map(
          (item, index) => (
            <div key={index}>
              <div
                className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 ${index >= 2 ? "block" : ""
                  }`}
              >
                <NcImage
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  containerClassName="aspect-w-4 aspect-h-5 lg:aspect-h-5"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={item.image || ""}
                />

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                  onClick={() => handleOpenModalImageGallery(index)}
                />
                <div
                  className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
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
              <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
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
