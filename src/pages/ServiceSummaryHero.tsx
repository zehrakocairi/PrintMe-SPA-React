import React, { FC, ReactNode } from "react";
import Image from "../shared/Image";
import { useTranslation } from "react-i18next";

export interface SectionHeroProps {
}

const ServiceSummaryHero: FC<SectionHeroProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <div className={`nc-SectionHero relative`} data-nc-id="SectionHero">
    <div className="flex flex-col lg:flex-row items-center relative text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-10">
      <div className="w-full lg:w-1/2 space-y-3 lg:space-y-4">
        <h2 className="text-xl !leading-tight font-semibold text-primary-6000 md:text-2xl xl:text-3xl dark:text-neutral-100">
        {t('We Print & Frame')}
        </h2>
        <h4 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
        {t('Gallery-Quality Art & Photography')}
        </h4>
        <span className="block text-base xl:text-lg text-neutral-600 dark:text-neutral-400">
        {t("Elevate your home with museum-grade art prints and stunning photography. Our curated collection offers exceptional clarity and vibrant color. Discover beautiful posters, elegant art prints, and captivating photographs to transform any space, with custom framing options at affordable prices.")}
        </span>
        <span className="block text-base xl:text-lg text-neutral-600 dark:text-neutral-400">
          <span className="text-xl">{t('We Print')} </span> 
          <span className="inline-block text-yellow-800 bg-yellow-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">{t("Photographs")}</span>
          <span className="inline-block text-green-800 bg-green-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">{t("Artwork")}</span>
          <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">{t("Your Designs")}</span>

        </span>
      </div>
      <div className="w-full lg:w-1/2">
        <Image className="w-full h-auto object-cover rounded-lg box-with-shadow" src={'https://genstorageaccount3116.blob.core.windows.net/printme-images/home-hero-1.jpeg'} alt="" priority />
      </div>
    </div>

    <div className="w-full flex gap-10 mt-10 -translate-x-20">
      <div className="self-start">
      <Image className="w-full h-auto object-cover rounded-lg box-with-shadow self-start" src={'https://genstorageaccount3116.blob.core.windows.net/printme-images/home-hero-3.jpeg'} alt="" priority />

      </div>
      <div>
      <Image className="w-full h-auto object-cover rounded-lg box-with-shadow self-start" src={'https://genstorageaccount3116.blob.core.windows.net/printme-images/home-hero-2.jpeg'} alt="" priority />

      </div>
      <div className="self-end">
      <Image className="w-full h-auto object-cover rounded-lg box-with-shadow " src={'https://genstorageaccount3116.blob.core.windows.net/printme-images/home-hero-4.jpeg'} alt="" priority />

      </div>
      </div>
  </div>
  );
};

export default ServiceSummaryHero;
