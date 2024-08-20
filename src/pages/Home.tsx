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


const Home: FC<any> = ({ }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [featuredItems, setFeaturedItems] = useState<any[]>([]); // Adjust type if necessary
  const [trendingItems, setTrendingItems] = useState<any[]>([]); // Adjust type if necessary
  const [initialRenderCompleted, setInitialRenderCompleted] = useState(false);
  const { filter, filterChanged, setFilterChanged, setIsLoading, pageIndex, pageSize, updateCategoryState, updateTagState } = useFilter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCatalogVisible, setIsCatalogVisible] = useState(false);
  const { i18n } = useTranslation();
  const fetchTrendingItems = async () => {
    setIsLoading(true);
    const { data } = await getFilteredPaginatedItems(filter, pageSize, pageIndex);
    setTrendingItems(data);
    setIsLoading(false);
  };

  const fetchFeaturedItems = async () => {
    const { data } = await getFeaturedItems();
    setFeaturedItems(data);
  };

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  useEffect(() => {
    updateCategoryState(Category.None);
    updateTagState(undefined);
    setInitialRenderCompleted(true);
    setFilterChanged(prev => !prev);
    fetchFeaturedItems();
    handleScrollToEl('root');
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  useEffect(() => {
    if (initialRenderCompleted) {
      fetchTrendingItems();
    }
  }, [filterChanged]);

  return (
    <div className="nc-PageHome relative overflow-hidden">
       <Helmet>
        <title>PrintMeArt - {t('High-Quality Art Prints, Posters, Custom Framing, and Stunning Photography for Your Home')}</title>
        <link rel="canonical" href={'/?lang='+i18n.language} />
      </Helmet>
      {/* <SectionHero2 /> */}
      <div className="mt-12 md:mt-24 lg:mt-32">
        {/* <DiscoverMoreSlider /> */}
      </div>



      
    </div>
  );
}

export default memo(Home);
