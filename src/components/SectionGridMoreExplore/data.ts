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

MENU_TREE_DATA.set("Nature & Landscapes", [
  {
    id: 1,
    name: "Nature Prints",
    desc: "Nature & Landscapes",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/Tree.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=nature-prints#root",
  },
  {
    id: 2,
    name: "Botanical Art",
    desc: "Nature & Landscapes",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/plant.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=botanical-art#root",
  },
  {
    id: 3,
    name: "Animal Art",
    desc: "Nature & Landscapes",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/photo.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=animal-art#root",
  },
  {
    id: 4,
    name: "Space and Astronomy",
    desc: "Nature & Landscapes",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/modern.webp',
    svgBg: explore3Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=space-and-astronomy#root",
  },
  {
    id: 5,
    name: "Maps and Cities",
    desc: "Nature & Landscapes",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/city.webp',
    svgBg: explore1Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=maps-and-cities#root",
  },
  {
    id: 6,
    name: "Landscapes",
    desc: "Nature & Landscapes",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/Tree.webp',
    svgBg: explore6Svg,
    color: "bg-green-50",
    count: 200,
    link: "/search?category=landscapes#root",
  },
]);

MENU_TREE_DATA.set("Famous Painters", [
  {
    id: 1,
    name: "Art Prints",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/art-print.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=art-prints#root",
  },
  {
    id: 2,
    name: "Renaissance Masters",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/renaissance.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=renaissance-masters#root",
  },
  {
    id: 3,
    name: "Dutch Masters",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/dutch-masters.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=dutch-masters#root",
  },
  {
    id: 4,
    name: "Modern Masters",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/modern-masters.webp',
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=modern-masters#root",
  },
  {
    id: 5,
    name: "Abstract Art",
    desc: "Famous Painters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/abstract-art.webp',
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=abstract-art#root",
  },
]);

MENU_TREE_DATA.set("Posters", [
  {
    id: 1,
    name: "Retro and Vintage",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/retro-vintage.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=retro-and-vintage#root",
  },
  {
    id: 2,
    name: "Black and White",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/black-white.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=black-and-white#root",
  },
  {
    id: 3,
    name: "Historical Posters",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/historical.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=historical-posters#root",
  },
  {
    id: 4,
    name: "Classic Posters",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/classic.webp',
    svgBg: explore1Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=classic-posters#root",
  },
  {
    id: 5,
    name: "Text Posters",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/text.webp',
    svgBg: explore2Svg,
    color: "bg-orange-50",
    count: 222,
    link: "/search?category=text-posters#root",
  },
  {
    id: 6,
    name: "Movies & Games Posters",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/movies-games.webp',
    svgBg: explore6Svg,
    color: "bg-blue-50",
    count: 300,
    link: "/search?category=movies-and-games-posters#root",
  },
  {
    id: 7,
    name: "Music Posters",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/music.webp',
    svgBg: explore9Svg,
    color: "bg-green-50",
    count: 250,
    link: "/search?category=music-posters#root",
  },
  {
    id: 8,
    name: "Sports Posters",
    desc: "Posters",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/sports.webp',
    svgBg: explore6Svg,
    color: "bg-yellow-50",
    count: 180,
    link: "/search?category=sports-posters#root",
  },
]);

MENU_TREE_DATA.set("Art Styles", [
  {
    id: 1,
    name: "Illustrations",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/illustrations.webp',
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
    link: "/search?category=illustrations#root",
  },
  {
    id: 2,
    name: "Photographs",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/photographs.webp',
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
    link: "/search?category=photographs#root",
  },
  {
    id: 3,
    name: "Iconic Photos",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/iconic-photos.webp',
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
    link: "/search?category=iconic-photos#root",
  },
  {
    id: 4,
    name: "General Posters",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/general-posters.webp',
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
    link: "/search?category=general-posters#root",
  },
  {
    id: 5,
    name: "Kids' Wall Art",
    desc: "Art Styles",
    image: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/kids-wall-art.webp',
    svgBg: explore6Svg,
    color: "bg-yellow-50",
    count: 200,
    link: "/search?category=kids-wall-art#root",
  },
]);



export default MENU_TREE_DATA;
