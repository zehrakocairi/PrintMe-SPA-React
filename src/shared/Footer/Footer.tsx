import Logo from "../Logo/Logo";
import SocialsList1 from "../SocialsList1/SocialsList1";
import { CustomLink } from "../../data/types";
import React from "react";
import { useTranslation } from "react-i18next";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Navigation",
    menus: [
      { href: "/search", label: "Prints" },
      { href: "/our-services", label: "Frames" },
      { href: "/about", label: "About Us" },
      { href: "/search?tags=1", label: "Bestsellers" },
    ],
  },
  {
    id: "2",
    title: "Nature & Landscapes",
    menus: [
      { href: "/search?category=nature-prints", label: "Nature prints" },
      { href: "/search?category=botanical-art", label: "Botanical art" },
      { href: "/search?category=animal-art", label: "Animal art" },
      { href: "/search?category=space-and-astronomy", label: "Space and astronomy" },
      { href: "/search?category=maps-and-cities", label: "Maps and cities" },
      { href: "/search?category=landscapes", label: "Landscapes" },
    ],
  },
  {
    id: "3",
    title: "Famous Painters",
    menus: [
      { href: "/search?category=art-prints", label: "Art prints" },
      { href: "/search?category=renaissance-masters", label: "Renaissance Masters" },
      { href: "/search?category=dutch-masters", label: "Dutch masters" },
      { href: "/search?category=modern-masters", label: "Modern masters" },
      { href: "/search?category=abstract-art", label: "Abstract art" },
    ],
  },
  {
    id: "4",
    title: "Posters",
    menus: [
      { href: "/search?category=retro-and-vintage", label: "Retro and vintage" },
      { href: "/search?category=black-and-white", label: "Black and white" },
      { href: "/search?category=historical-posters", label: "Historical posters" },
      { href: "/search?category=classic-posters", label: "Classic posters" },
      { href: "/search?category=text-posters", label: "Text posters" },
      { href: "/search?category=movies-and-games-posters", label: "Movies & Games posters" },
      { href: "/search?category=music-posters", label: "Music posters" },
      { href: "/search?category=sports-posters", label: "Sports posters" },
    ],
  }
];

const WidgetMenuItem: React.FC<{ menu: WidgetFooterMenu }> = React.memo(({ menu }) => {
  const { t } = useTranslation();
  return (
    <div className="text-sm">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
        {t(menu.title)}
      </h2>
      <ul className="mt-5 space-y-4">
        {menu.menus.map((item, index) => (
          <li key={index}>
            <a
              className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              href={item.href}
              rel="noopener noreferrer"
            >
              {t(item.label)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

const Footer: React.FC = React.memo(() => {
  return (
    <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map((menu, index) => (
          <WidgetMenuItem key={index} menu={menu} />
        ))}
      </div>
    </div>
  );
});

export default Footer;
