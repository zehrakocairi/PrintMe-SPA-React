
import { FC, useEffect, useState } from "react";
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

const Home: FC<any> = ({ }) => {

  const [featuredItems, setFeaturedItems] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  const { filter, filterChanged, setIsLoading, pageIndex, pageSize } = useFilter();
  const { instance, accounts } = useMsal();

  const fetchTrendingItems = async () => {
    setIsLoading(true);
    const res = await getFilteredPaginatedItems(instance, accounts, filter, pageSize, pageIndex);
    setTrendingItems(res.data);
    setIsLoading(false);
  };
  const fetchFeaturedtems = async () => {
    const res = await getFeaturedItems(instance, accounts);
    setFeaturedItems(res.data);
  };

  useEffect(() => {
    fetchFeaturedtems();
  }, []);

  useEffect(() => {
    fetchTrendingItems();
  }, [filterChanged]);

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
            heading="Art Lovers Also Bought"
            subHeading="Popular Picks for You"
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
            data={featuredItems}
          /> : <></>
        }

        {trendingItems ?? [] ? <SectionGridFeatureItems data={trendingItems} /> : <></>}

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        {/* <div className="relative py-24 lg:py-32">
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
        </div> */}
        {/* <SectionClientSay /> */}
        <SectionPromo1 />
      </div>
    </div>
  );
}

export default Home;
