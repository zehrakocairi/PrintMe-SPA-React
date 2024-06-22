import React, { FC, ReactNode } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Image from "../../shared/Image";
import { useTranslation } from "react-i18next";

export interface SectionHeroProps {
  className?: string;
  rightImg: string;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`nc-SectionHero relative ${className}`} data-nc-id="SectionHero">
    <div className="flex flex-col lg:flex-row items-center relative text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-10">
      <div className="w-full lg:w-1/2 space-y-3 lg:space-y-4">
        <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">{t("Our Frames")}</span>
        <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
        {t('Choose Your Perfect Frame')}
        </h2>
        <span className="block text-base xl:text-lg text-neutral-600 dark:text-neutral-400">
        {t("Explore our wide range of frames to find the perfect match for your paintings and photos. Our high-quality framing options ensure durability and style, enhancing the presentation of your artwork. Select from various styles and finishes to suit your preferences and decor.")}
        </span>
        {!!btnText && <ButtonPrimary href="/login">{btnText}</ButtonPrimary>}
      </div>
      <div className="w-full lg:w-1/2">
        <Image className="w-full h-auto object-cover rounded-lg box-with-shadow" src={rightImg} alt="" priority />
      </div>
    </div>
  </div>
  );
};

export default SectionHero;
