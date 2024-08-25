import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
// import { PhotoIcon } from "@heroicons/react/24/outline"; 
import { BuildingStorefrontIcon, BoltIcon, AdjustmentsHorizontalIcon, BuildingLibraryIcon, ArrowUpOnSquareIcon} from "@heroicons/react/24/solid";


export interface SectionHeroBottomProps {
  className?: string;
}


const SectionHeroBottom: FC<SectionHeroBottomProps> = ({
  className = "",
}) => {
  const features = [
    {
      name: 'Premium Quality Custom Posters',
      description:
        'From personal photos to unique artwork, our custom art prints are crafted with care, ensuring vibrant colors and long-lasting quality. Perfect for European homes, our prints bring your vision to life.',
      icon: (<BuildingLibraryIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Personalized Framed Prints',
      description:
        'Choose from a variety of elegant poster frames, sizes, and mats to create a custom framed print that fits your style. Each print is delivered ready to hang, making it easy to transform your space.',
      icon: (<AdjustmentsHorizontalIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Fast & Reliable European Shipping',
      description:
        'We understand the importance of speed. That’s why we offer fast delivery custom photo prints across Europe, including the Netherlands, ensuring your artwork arrives quickly and in perfect condition.',
      icon: (<BoltIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Upload and Print Your Own Designs',
      description:
        'Simply upload your design or photo, and we’ll handle the rest. Our expert team ensures that your high-quality custom poster is printed and framed to perfection, with fast shipping guaranteed.',
      icon: (<ArrowUpOnSquareIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
    },
  ]
  const { t } = useTranslation();

  return (
    <div
      className={`${className}`}
      data-nc-id="SectionHero1"
    >
      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('Print Custom Poster')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
             {t('Bring Your Vision to Life with High-Quality Custom Prints')} 
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('Turn your photos and designs into stunning, high-quality custom art prints that elevate any space. Whether you’re looking for personalized wall art, custom posters, or framed prints, we deliver exceptional results across the Netherlands, Germany, and all of Europe.')} 
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-8">
              {features.map((feature) => (
                <div key={t(feature.name)} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      {feature.icon}
                    </div>
                    {t(feature.name)}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{t(feature.description)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mx-auto max-w-4xl lg:text-center">
            <p className="mt-8 text-md leading-8 text-gray-600">
            {t('From Amsterdam to Berlin, our European poster printing service ensures that your custom art prints and personalized gifts are delivered with Dutch quality and reliability. Order today and experience the difference!')} 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeroBottom;
