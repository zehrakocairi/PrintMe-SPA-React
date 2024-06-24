"use client";
import React, { FC } from "react";

import Image from "../shared/Image";
import { Frame } from "../models/ProductModels";

export interface PreviewDesignProps {
  className?: string;
  image: string;
  isMatIncluded: boolean;
  sizeName: string;
  frame?: Frame;
}

const PreviewDesign: FC<PreviewDesignProps> = ({ image, isMatIncluded, frame, sizeName, className = "" }) => {
  // const ratioX = sizeName ? +sizeName.toLowerCase().split("x")[0] : 1;
  // const ratioY = sizeName ? +sizeName.toLowerCase().split("x")[1] : 1;
  const ratioX = 5, ratioY = 7;
  const paddingClass = isMatIncluded ? "p-[12%]" : "p-[3%]";
  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            Preview Of Your Design
          </h2>
          <div className="flex justify-start rtl:justify-end items-center mt-5 space-x-4 sm:space-x-5 rtl:space-x-reverse">
            <div className="h-6 border-s border-slate-300 dark:border-slate-700"></div>
            <div className="listingSection__wrap !border-b-0 !pb-0">
              <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
                <p>
                  See your custom framed artwork come to life!
                </p>
                <ul>
                  <li>Selected Options: This preview shows your chosen frame, mat, and picture</li>
                  <li>Mat Effect: The mat adds a decorative border between the picture and frame, enhancing the look</li>
                  <li>
                    Size Impact: A mat affects the overall frame size. For example, a 50x70 picture fits a 50x70 frame without a mat, but with a mat, it might require a 69x91 frame
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      {/* MAIN */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full">
          {/* HEADING */}
          <div className="relative overflow-hidden">
            <div className="relative z-10" >
              <Image
                src={(isMatIncluded ? frame?.mask : frame?.maskWithoutMat) ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full object-cover"
                alt="product preview"
              />
            </div>
            <div style={{ aspectRatio: `${ratioX} / ${ratioY}` }} className={`absolute inset-0 h-full mx-auto ${paddingClass}`}>
              <Image
                src={image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full object-cover"
                alt="product preview"
              />
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full pt-6 lg:pt-0 lg:ps-7 xl:ps-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default PreviewDesign;
