import { NavItemType } from "../shared/Navigation/NavigationItem";
import ncNanoId from "../utils/ncNanoId";

export const MEGAMENU_PRINTS: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Nature",
    children: [
      { id: ncNanoId(), href: "/search?category=nature-prints", name: "Nature prints" },
      { id: ncNanoId(), href: "/search?category=botanical", name: "Botanical" },
      { id: ncNanoId(), href: "/search?category=animals", name: "Animals" },
      { id: ncNanoId(), href: "/search?category=space-and-astronomy", name: "Space and astronomy" },
      { id: ncNanoId(), href: "/search?category=maps-and-cities", name: "Maps and cities" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Vintage & Retro",
    children: [
      { id: ncNanoId(), href: "/search?category=retro-and-vintage", name: "Retro and vintage" },
      { id: ncNanoId(), href: "/search?category=black-and-white", name: "Black and white" },
      { id: ncNanoId(), href: "/search?category=gold-and-silver", name: "Gold and silver" },
      { id: ncNanoId(), href: "/search?category=historical-prints", name: "Historical prints" },
      { id: ncNanoId(), href: "/search?category=classic-posters", name: "Classic posters" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Art Styles",
    children: [
      { id: ncNanoId(), href: "/search?category=illustrations", name: "Illustrations" },
      { id: ncNanoId(), href: "/search?category=photographs", name: "Photographs" },
      { id: ncNanoId(), href: "/search?category=art-prints", name: "Art prints" },
      { id: ncNanoId(), href: "/search?category=text-posters", name: "Text posters" },
      { id: ncNanoId(), href: "/search?category=graphical", name: "Graphical" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Famous Painters",
    children: [
      { id: ncNanoId(), href: "/search?category=famous-painters", name: "Famous painters" },
      { id: ncNanoId(), href: "/search?category=iconic-photos", name: "Iconic photos" },
      { id: ncNanoId(), href: "/search?category=studio-collections", name: "Studio Collections" },
      { id: ncNanoId(), href: "/search?category=modern-artists", name: "Modern artists" },
      { id: ncNanoId(), href: "/search?category=abstract-art", name: "Abstract art" },
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
    href: "/",
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
