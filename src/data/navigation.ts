import { NavItemType } from "../shared/Navigation/NavigationItem";
import ncNanoId from "../utils/ncNanoId";
export const MEGAMENU_PRINTS: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Nature & Landscapes",
    children: [
      { id: ncNanoId(), href: "/search?category=nature-prints", name: "Nature prints" },
      { id: ncNanoId(), href: "/search?category=botanical-art", name: "Botanical art" },
      { id: ncNanoId(), href: "/search?category=animal-art", name: "Animal art" },
      { id: ncNanoId(), href: "/search?category=space-and-astronomy", name: "Space and astronomy" },
      { id: ncNanoId(), href: "/search?category=maps-and-cities", name: "Maps and cities" },
      { id: ncNanoId(), href: "/search?category=landscape", name: "Landscape" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Famous Painters",
    children: [
      { id: ncNanoId(), href: "/search?category=art-prints", name: "Art prints" },
      { id: ncNanoId(), href: "/search?category=renaissance-masters", name: "Renaissance Masters" },
      { id: ncNanoId(), href: "/search?category=dutch-masters", name: "Dutch masters" },
      { id: ncNanoId(), href: "/search?category=modern-masters", name: "Modern masters" },
      { id: ncNanoId(), href: "/search?category=abstract-art", name: "Abstract art" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Posters",
    children: [
      { id: ncNanoId(), href: "/search?category=retro-and-vintage", name: "Retro and vintage" },
      { id: ncNanoId(), href: "/search?category=black-and-white", name: "Black and white" },
      { id: ncNanoId(), href: "/search?category=historical-posters", name: "Historical posters" },
      { id: ncNanoId(), href: "/search?category=classic-posters", name: "Classic posters" },
      { id: ncNanoId(), href: "/search?category=text-posters", name: "Text posters" },
      { id: ncNanoId(), href: "/search?category=movies-and-games-posters", name: "Movies & Games posters" },
      { id: ncNanoId(), href: "/search?category=music-posters", name: "Music posters" },
      { id: ncNanoId(), href: "/search?category=sport-posters", name: "Sport posters" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Art Styles",
    children: [
      { id: ncNanoId(), href: "/search?category=illustrations", name: "Illustrations" },
      { id: ncNanoId(), href: "/search?category=photographs", name: "Photographs" },
      { id: ncNanoId(), href: "/search?category=iconic-photos", name: "Iconic photos" },
      { id: ncNanoId(), href: "/search?category=general-posters", name: "General posters" },
      { id: ncNanoId(), href: "/search?category=kids-wall-art", name: "Kids' Wall Art" },
    ],
  },
];


export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/search",
    name: "Prints",
    type: "megaMenu",
    children: MEGAMENU_PRINTS,
  },
  {
    id: ncNanoId(),
    href: "/our-services",
    name: "Frames",
  },
  {
    id: ncNanoId(),
    href: "/search?tag=4",
    name: "Bestsellers",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Your Design",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "About Us",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Contact Us",
  },
  // {
  //   id: ncNanoId(),
  //   href: "/search",
  //   name: "Explore",
  //   type: "dropdown",
  //   children: OTHER_PAGE_CHILD,
  // },
];
