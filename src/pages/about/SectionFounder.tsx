import Heading from "../../components/Heading/Heading";
import React from "react";
import NcImage from "../../shared/NcImage/NcImage";
import { useTranslation } from "react-i18next";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Zek Kocairi`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://genstorageaccount3116.blob.core.windows.net/print-me-custom-product-images/294b3eeb-fd4a-40de-a035-c5cbd79433a3",
  },
  {
    id: "2",
    name: `Zehra Kocairi`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://genstorageaccount3116.blob.core.windows.net/print-me-custom-product-images/ec54f8c5-f3e1-4800-b7e5-b62f7b2dca0b",
  }
];

const SectionFounder = () => {
  const { t } = useTranslation();
  
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc={t("PrintMeArt was founded by our passionate family, dedicated to bringing your cherished memories to life through beautiful, high-quality prints.")}
      >
        ⛱ {t("Founders")}
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              alt=""
              fill
              sizes="300px"
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.avatar}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {t(item.job)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
