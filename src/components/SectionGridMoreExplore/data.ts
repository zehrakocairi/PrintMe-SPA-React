import explore1Svg from "../../data/images/collections/explore1.svg";
import explore2Svg from "../../data/images/collections/explore2.svg";
import explore3Svg from "../../data/images/collections/explore3.svg";
import explore6Svg from "../../data/images/collections/explore6.svg";
import explore9Svg from "../../data/images/collections/explore9.svg";

export interface MenuItemType {
  id: number;
  name: string;
  desc: string;
  image: string;
  svgBg: string;
  color?: string;
  count?: number;
  link: string;
}
export interface MenuType {
  items: Map<string,MenuItemType[]>;
}

const MENU_TREE_DATA = new Map<string, MenuItemType[]>();

MENU_TREE_DATA.set("Nature", [
  {
    id: 1,
    name: "Nature Prints",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/Tree.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 2,
    name: "Botanical",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/plant.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=botanical#root",
  },
  {
    id: 3,
    name: "Animals",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/photo.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=animals#root",
  },
  {
    id: 4,
    name: "Space and Astronomy",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/modern.webp',
    svgBg: explore1Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=space-and-astronomy#root",
  },
  {
    id: 5,
    name: "Maps and Cities",
    desc: "Nature",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/city.webp',
    svgBg: explore2Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=maps-and-cities#root",
  },
]);

MENU_TREE_DATA.set("Vintage and Retro", [
  {
    id: 1,
    name: "Retro and Vintage",
    desc: "Vintage & Retro",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/Tree.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=retro-and-vintage#root",
  },
  {
    id: 2,
    name: "Black and White",
    desc: "Vintage & Retro",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/plant.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=black-and-white#root",
  },
  {
    id: 3,
    name: "Gold and Silver",
    desc: "Vintage & Retro",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/photo.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=gold-and-silver#root",
  },
  {
    id: 4,
    name: "Historical Prints",
    desc: "Vintage & Retro",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/modern.webp',
    svgBg: explore1Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=historical-prints#root",
  },
  {
    id: 5,
    name: "Classic Posters",
    desc: "Vintage & Retro",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/city.webp',
    svgBg: explore2Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=classic-posters#root",
  },
]);

MENU_TREE_DATA.set("Art Styles", [
  {
    id: 1,
    name: "Illustrations",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/Tree.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=illustrations#root",
  },
  {
    id: 2,
    name: "Photographs",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/plant.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=photographs#root",
  },
  {
    id: 3,
    name: "Art Prints",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/photo.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=art-prints#root",
  },
  {
    id: 4,
    name: "Text Posters",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/modern.webp',
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=text-posters#root",
  },
  {
    id: 5,
    name: "Graphical",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/city.webp',
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=graphical#root",
  },
]);

MENU_TREE_DATA.set("Famous Painters", [
  {
    id: 1,
    name: "Famous Painters",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/Tree.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=famous-painters#root",
  },
  {
    id: 2,
    name: "Iconic Photos",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/plant.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=iconic-photos#root",
  },
  {
    id: 3,
    name: "Studio Collections",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/photo.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=studio-collections#root",
  },
  {
    id: 4,
    name: "Modern Artists",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/modern.webp',
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=modern-artists#root",
  },
  {
    id: 5,
    name: "Abstract Art",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/city.webp',
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=abstract-art#root",
  },
]);


export default MENU_TREE_DATA;
