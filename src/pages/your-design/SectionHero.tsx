import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
// import { PhotoIcon } from "@heroicons/react/24/outline"; 
import { BuildingStorefrontIcon, DocumentCheckIcon, PhotoIcon ,PaintBrushIcon} from "@heroicons/react/24/solid";


export interface SectionHeroProps {
  className?: string;
}


const SectionHero1: FC<SectionHeroProps> = ({
  className = "",
}) => {
  const features = [
    {
      name: 'Upload Your Image',
      description:
        'Simply upload your favorite photo or artwork. We accept PNG, JPG, and GIF files up to 10MB.',
      icon: (<PhotoIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Customize Your Design',
      description:
        'Choose from a variety of frames, sizes, and mats. Visualize your design instantly before finalizing your order.',
      icon: (<PaintBrushIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Professional Review',
      description:
        'Our expert designer will review your design, make any necessary adjustments, and send it to you for approval before printing.',
      icon: (<DocumentCheckIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
    },
    {
      name: 'Order with Confidence',
      description:
        'Complete your purchase with our secure checkout. Your custom art will be professionally printed and delivered to your door.',
      icon: (<BuildingStorefrontIcon className="hidden text-white sm:inline-block w-5 h-5 mb-0.5" />),
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
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('Print Your Design')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
             {t('Turn Your Photos into Art')} 
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('Upload your favorite image, customize your design, and let our designer ensure a stunning framed print, approved by you before we print.')} 
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
        </div>
      </div>
    </div>
  );
};

export default SectionHero1;
