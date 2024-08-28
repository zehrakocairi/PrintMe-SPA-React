import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
// import { PhotoIcon } from "@heroicons/react/24/outline"; 
import { BuildingStorefrontIcon, BoltIcon, AdjustmentsHorizontalIcon, BuildingLibraryIcon, ArrowUpOnSquareIcon} from "@heroicons/react/24/solid";


export interface SectionHeroForKeywordsProps {
  className?: string;
}


const SectionHeroForKeywords: FC<SectionHeroForKeywordsProps> = ({
  className = "",
}) => {
  const features = [
    {
      name: 'Wide Selection of Art & Posters',
      description:
        'Explore our extensive collection of art prints, custom posters, and photography. From modern designs to classic pieces, our catalog offers something for everyone.',
      icon: (<BuildingLibraryIcon className="text-white inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Upload and Print Your Own Designs',
      description:
        'Have a unique vision? Easily upload your own designs, photos, or artwork, and we’ll transform them into beautiful prints. Perfect for personalizing your space or creating unique personalized gifts in the Netherlands.',
      icon: (<AdjustmentsHorizontalIcon className="text-white inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'High-Quality Prints',
      description:
        'Our prints are made using the finest materials, ensuring vibrant colors and sharp details. Whether you’re decorating your home or surprising a loved one, our high-quality posters are designed to impress.',
      icon: (<BoltIcon className="text-white inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Custom Print Posters and Photo Printing',
      description:
        'Complete your artwork with our stylish framing options, available in various sizes and finishes. Our frames are designed to complement your prints, making them ready to hang and adding elegance to any room.',
      icon: (<ArrowUpOnSquareIcon className="text-white inline-block w-5 h-5 mb-0.5" />),
    },
  ]
  const { t } = useTranslation();

  return (
    <div
      className={`${className}`}
    >
      <div className="bg-white ">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('Our Service')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
             {t('Elevate Your Space with High-Quality Custom Prints and Art')} 
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('Welcome to PrintMeArt, your premier destination for high-quality prints, custom posters, and art prints. Whether you want to enhance your home with stunning art posters from our catalog, or showcase your creativity by uploading and printing your own designs, we’ve got everything you need.')} 
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

export default SectionHeroForKeywords;
