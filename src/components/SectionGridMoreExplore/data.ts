import explore1Svg from "../../data/images/collections/explore1.svg";
import explore2Svg from "../../data/images/collections/explore2.svg";
import explore3Svg from "../../data/images/collections/explore3.svg";
import explore4Svg from "../../data/images/collections/explore4.svg";
import explore5Svg from "../../data/images/collections/explore5.svg";
import explore6Svg from "../../data/images/collections/explore6.svg";
import explore7Svg from "../../data/images/collections/explore7.svg";
import explore8Svg from "../../data/images/collections/explore8.svg";
import explore9Svg from "../../data/images/collections/explore9.svg";
//
import explore1Png from "../../data/images/collections/explore1.png";
import explore2Png from "../../data/images/collections/explore2.png";
import explore3Png from "../../data/images/collections/explore3.png";
import explore4Png from "../../data/images/collections/explore4.png";
import explore5Png from "../../data/images/collections/explore5.png";
import explore6Png from "../../data/images/collections/explore6.png";
import explore7Png from "../../data/images/collections/explore7.png";
import explore8Png from "../../data/images/collections/explore8.png";
import explore9Png from "../../data/images/collections/explore9.png";

export interface ExploreType {
  id: number;
  name: string;
  desc: string;
  image: string;
  svgBg: string;
  color?: string;
  count?: number;
  link: string;
}

export const DEMO_MORE_EXPLORE_DATA_2: ExploreType[] = [
  {
    id: 4,
    name: "Cycling Shorts",
    desc: "Manufacturar",
    image: explore9Png,
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 5,
    name: "Cycling Jersey",
    desc: "Manufacturar",
    image: explore5Png,
    svgBg: explore5Svg,
    color: "bg-blue-50",
    count: 222,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 6,
    name: "Car Coat",
    desc: "Manufacturar",
    image: explore6Png,
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 155,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 7,
    name: "Sunglasses",
    desc: "Manufacturar",
    image: explore7Png,
    svgBg: explore7Svg,
    color: "bg-stone-100",
    count: 98,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 8,
    name: "kid hats",
    desc: "Manufacturar",
    image: explore8Png,
    svgBg: explore8Svg,
    color: "bg-blue-50",
    count: 33,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 9,
    name: "Wool Jacket",
    desc: "Manufacturar",
    image: explore4Png,
    svgBg: explore4Svg,
    color: "bg-slate-100/80",
    count: 122,
    link: "/search?category=nature-prints#root",
  },
];
export const DEMO_MORE_EXPLORE_DATA: ExploreType[] = [
  {
    id: 1,
    name: "Nature Prints",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/Tree.png',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 2,
    name: "Botanical",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/plant.png',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=botanical#root",
  },
  {
    id: 3,
    name: "Photography",
    desc: "Art & Photography",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/photo.png',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=animals#root",
  },
  {
    id: 4,
    name: "Abstract",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/modern.png',
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=space-and-astronomy#root",
  },
  {
    id: 5,
    name: "Art & Illustration",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/van gogh.png',
    svgBg: explore5Svg,
    color: "bg-blue-50",
    count: 222,
    link: "/search?category=maps-and-cities#root",
  },
  {
    id: 6,
    name: "Maps and Cities",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/city.png',
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=maps-and-cities#root",
  },
];
