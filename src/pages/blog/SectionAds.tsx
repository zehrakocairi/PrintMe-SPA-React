import React, { FC } from "react";
import imgAds from "./images/ads.png";
import Image from "../../shared/Link";

export interface SectionAdsProps {
  className?: string;
}

const SectionAds: FC<SectionAdsProps> = ({ className = "" }) => {
  return (
    <a href="/#" className={`nc-SectionAds block w-full ${className}`}>
      <Image alt="ads" className="w-full" href={imgAds} />
    </a>
  );
};

export default SectionAds;
