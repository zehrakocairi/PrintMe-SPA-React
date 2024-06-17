import React, { FC, useEffect, useState } from "react";
import SectionHowItWork from "../components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import SectionHero2 from "../components/SectionHero/SectionHero2";
import SectionSliderProductCard from "../components/SectionSliderProductCard";
import DiscoverMoreSlider from "../components/DiscoverMoreSlider";
import SectionGridMoreExplore from "../components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionGridFeatureItems from "../components/SectionGridFeatureItems";
import { getFeaturedItems, getFilteredPaginatedItems } from "../services/catalogService";
import { useMsal } from "@azure/msal-react";
import { useFilter } from "../contexts/FilterContext";
import SectionPromo1 from "../components/SectionPromo1";
import { Category } from "../enums/Category";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Home: FC<any> = ({ }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [featuredItems, setFeaturedItems] = useState<any[]>([]); // Adjust type if necessary
  const [trendingItems, setTrendingItems] = useState<any[]>([]); // Adjust type if necessary
  const [initialRenderCompleted, setInitialRenderCompleted] = useState(false);
  const { filter, filterChanged, setFilterChanged, setIsLoading, pageIndex, pageSize, updateCategoryState } = useFilter();
  const { instance, accounts } = useMsal();

  const fetchTrendingItems = async () => {
    setIsLoading(true);
    const data = await getFilteredPaginatedItems(instance, accounts, filter, pageSize, pageIndex);
    setTrendingItems(data);
    setIsLoading(false);
  };

  const fetchFeaturedItems = async () => {
    const data = await getFeaturedItems(instance, accounts);
    setFeaturedItems(data);
  };

  useEffect(() => {
    updateCategoryState(Category.None);
    setInitialRenderCompleted(true);
    setFilterChanged(prev => !prev);
    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    if (initialRenderCompleted) {
      fetchTrendingItems();
    }
  }, [filterChanged]);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />
      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {
          featuredItems.length > 0 ? <SectionSliderProductCard
            heading={t("Art Lovers Also Bought")}
            subHeading={t("Popular Picks for You")}
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
            data={featuredItems}
          /> : <></>
        }

        {trendingItems.length > 0 ? <SectionGridFeatureItems data={trendingItems} /> : <></>}

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
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
      </div>
    </div>
  );
}

export default Home;
