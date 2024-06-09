import { FC } from "react";
import NcImage from "../shared/NcImage/NcImage";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Logo from "../shared/Logo/Logo";
import ButtonSecondary from "../shared/Button/ButtonSecondary";

export interface SectionPromo1Props {
  className?: string;
}

const SectionPromo1: FC<SectionPromo1Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionPromo1 relative flex flex-col lg:flex-row items-center ${className}`}
    >
      <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight">
        Visit Us <br />in Den Bosch 
        </h2>
        <span className="block mt-6 text-slate-500 dark:text-slate-400 text-xl">
        Experience our craftsmanship firsthand. Pick up your prints, enjoy a coffee, and see where the magic happens.
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary href="/collection" className="">
          Plan Your Visit
          </ButtonPrimary>
          <ButtonSecondary
            href="/search"
            className="border border-slate-100 dark:border-slate-700"
          >
            Learn More
          </ButtonSecondary>
        </div>
      </div>
      <div className="relative flex-1 max-w-xl lg:max-w-none object-right-bottom">
        <NcImage
          alt=""
          containerClassName="block dark:hidden"
          src='https://genstorageaccount3116.blob.core.windows.net/printme-images/alone-painter.jpg'
          sizes="(max-width: 768px) 100vw, 50vw"
          className="promo-image"
        />
        <NcImage
          alt=""
          containerClassName="hidden dark:block"
          src='https://genstorageaccount3116.blob.core.windows.net/printme-images/alone-painter.jpg'
          sizes="(max-width: 768px) 100vw, 50vw"
          className="promo-image"
        />
      </div>
    </div>
  );
};

export default SectionPromo1;
