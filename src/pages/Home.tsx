import { FC, useEffect, useState } from "react";
import SectionHowItWork from "../components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import SectionHero2 from "../components/SectionHero/SectionHero2";
import SectionSliderProductCard from "../components/SectionSliderProductCard";
import DiscoverMoreSlider from "../components/DiscoverMoreSlider";
import SectionGridMoreExplore from "../components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionGridFeatureItems from "../components/SectionGridFeatureItems";
import { getFeaturedItems, getFilteredPaginatedItems } from "../services/catalogService";
import { useFilter } from "../contexts/FilterContext";
import SectionPromo1 from "../components/SectionPromo1";
import { Category } from "../enums/Category";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import ServiceSummaryHero from "./ServiceSummaryHero";
import { memo } from "react";
import { Helmet } from "react-helmet";
import SectionHeroForKeywords from "./SectionHeroForKeywords";
import Loading from "../components/Loading";
import { CatalogTags } from "../enums/CatalogTags";


const Home: FC<any> = ({ }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [featuredItems, setFeaturedItems] = useState<any[]>([]); // Adjust type if necessary
  const [trendingItems, setTrendingItems] = useState<any[]>([]); // Adjust type if necessary
  const { filter, setIsLoading, isLoading, pageIndex, pageSize, updateCategoryState, updateTagState } = useFilter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCatalogVisible, setIsCatalogVisible] = useState(false);
  const { i18n } = useTranslation();
  
  const fetchTrendingItems = async () => {
    const { data } = await getFilteredPaginatedItems(filter, pageSize, pageIndex);
    setTrendingItems(data);
  };

  const fetchFeaturedItems = async () => {
    try {
      setIsLoading(true);
      const { data } = await getFeaturedItems();
      setFeaturedItems(data);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  useEffect(() => {
    if (filter.categoryState != undefined && filter.categoryState !== Category.None) {
      updateCategoryState(Category.None);
    }
    if (filter.tag != undefined) {
      updateTagState(undefined);
    }
    
    handleScrollToEl('root');
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchFeaturedItems();
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [sliderRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchTrendingItems();
          setIsCatalogVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" }
    );

    if (catalogRef.current) {
      observer.observe(catalogRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [catalogRef]);


  return (
    <div className="nc-PageHome relative overflow-hidden">
       <Helmet>
        <title>PrintMeArt - {t('High-Quality Art Prints, Posters, Custom Framing, and Stunning Photography for Your Home')}</title>
        <link rel="canonical" href={'/?lang='+i18n.language} />
      </Helmet>
      <SectionHero2 />
      <div className="mt-20 sm:mt-12 md:mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>



      <div ref={sliderRef} className="container relative space-y-12 md:space-y-20 my-8 md:my-20 " >
        <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>
        {
          isLoading ? (
            <div role="status" className="text-center w-full my-48">
              <Loading className="w-24 h-24"></Loading>
            </div>
          ) : (
            featuredItems.length > 0 && isVisible ? <SectionSliderProductCard
              heading={t("Art Lovers Also Bought")}
              subHeading={t("Popular Picks for You")}
              motto={t('Discover our best-selling art prints, posters, and photos. Find top picks that art enthusiasts and decor lovers adore for every space')}
              headingFontClassName="text-2xl font-semibold"
              headingClassName="mb-2 text-neutral-900 dark:text-neutral-50"
              data={featuredItems}
            /> : <></>
          )
        }
        <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

        <div className="mb-10 md:mb-20">
          <ServiceSummaryHero />
        </div>

        <div id="explore" className="relative py-12 md:py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <hr className="mt-10 border-slate-200 dark:border-slate-700 hidden md:block"></hr>

        <div ref={catalogRef} className="hidden md:block">
          {isCatalogVisible ? <SectionGridFeatureItems data={trendingItems ?? []} /> : <></>}
        </div>


        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        {/* Uncomment and localize as needed */}
        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText={t("From the Ciseco blog")}>
              {t("The latest news")}
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>{t("Show all blog articles")}</ButtonSecondary>
            </div>
          </div>
        </div> */}
        {/* <SectionClientSay /> */}
        <SectionPromo1 />
        <div className="py-24 lg:py-32 border-t">
          <SectionHeroForKeywords />
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
