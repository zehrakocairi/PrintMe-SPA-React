import React, { FC } from "react";
import HeaderFilterSection from "./HeaderFilterSection";
import ProductCard from "./ProductCard";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import { PRODUCTS } from "../data/data";
import { Product } from "../models/ProductModels";
import { useFilter } from "../contexts/FilterContext";

export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data = PRODUCTS,
}) => {
  const {isLoading, setPageSize, setFilterChanged} = useFilter();
  return (
    <div className="nc-SectionGridFeatureItems relative">
      <HeaderFilterSection />
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
      >
        {data.map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading={isLoading} onClick={()=>{
          setPageSize((prev)=> prev + 10);
          setFilterChanged((prev)=> !prev);
        }

        }>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureItems;
