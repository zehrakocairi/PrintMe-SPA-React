import React, { FC } from "react";
import NcImage from "../../shared/NcImage/NcImage";
import HIW1img from "../../data/images/HIW1img.png";
import HIW2img from "../../data/images/HIW2img.png";
import HIW3img from "../../data/images/HIW3img.png";
import HIW4img from "../../data/images/HIW4img.png";
import VectorImg from "../../data/images/VectorHIW.svg";
import Badge from "../../shared/Badge/Badge";
import Image from "../../shared/Image";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    imgDark: HIW1img,
    title: "Browse & Select",
    desc: "Easily explore our wide range of art prints and find your perfect piece",
  },
  {
    id: 2,
    img: HIW2img,
    imgDark: HIW2img,
    title: "Add to Cart",
    desc: "Choose your print, frame, and paper options, then add to your cart with a click",
  },
  {
    id: 3,
    img: HIW3img,
    imgDark: HIW3img,
    title: "Fast Shipping",
    desc: "We carefully pack and ship your order within two days, ensuring it arrives quickly and safely",
  },
  {
    id: 4,
    img: HIW4img,
    imgDark: HIW4img,
    title: "Enjoy Your Art",
    desc: "Unwrap and enjoy your beautifully crafted art print, made with love and care",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div className={`nc-SectionHowItWork ${className}`}>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <Image
          className="hidden md:block absolute inset-x-0 top-5"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-4 sm:mb-10 max-w-[140px] mx-auto"
              className="rounded-3xl"
              src={item.img}
              sizes="150px"
              alt="HIW"
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "red"
                    : index === 1
                    ? "indigo"
                    : index === 2
                    ? "yellow"
                    : "purple"
                }
              />
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
