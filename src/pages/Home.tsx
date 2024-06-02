
import React, { FC, useEffect, useState } from "react";
import SectionHowItWork from "../components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import SectionHero2 from "../components/SectionHero/SectionHero2";
import SectionSliderProductCard from "../components/SectionSliderProductCard";
import DiscoverMoreSlider from "../components/DiscoverMoreSlider";
import SectionGridMoreExplore from "../components/SectionGridMoreExplore/SectionGridMoreExplore";
import Heading from "../components/Heading/Heading";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "../data/data";
import SectionGridFeatureItems from "../components/SectionGridFeatureItems";
import SectionMagazine5 from "../pages/blog/SectionMagazine5";
import { getFeaturedItems, getPaginatedItems } from "../services/catalogService";
import ProductCard from "../components/ProductCard";
import { useMsal } from "@azure/msal-react";

const Home: FC<any> = ({ }) => {

  const [featuredItems, setFeaturedItems] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const fetchItems = async () => {
      let res = await getFeaturedItems(instance, accounts);
      setFeaturedItems(res.data);
      res = await getPaginatedItems(instance, accounts);
      setTrendingItems(res.data);
    };

    fetchItems();
    return () => {
    };
  }, []);

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />
      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>
      <div>
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {
          featuredItems.length > 0 ? <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
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

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>
        {/* <SectionClientSay /> */}
      </div>
    </div>
  );
}

export default Home;
