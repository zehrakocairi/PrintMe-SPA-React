import React, { FC } from "react";
import HeaderFilterSection from "./HeaderFilterSection";
import ProductCard from "./ProductCard";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import { Product } from "../models/ProductModels";
import { useFilter } from "../contexts/FilterContext";
import { useTranslation } from "react-i18next";
import Heading from "./Heading/Heading";
import { useLocation, useNavigate } from "react-router-dom";

export interface SectionGridFeatureItemsProps {
  data?: Product[];
  showPagination?: boolean;
  showFilter?: boolean;
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({ data = [], showPagination = true, showFilter = true }) => {
  const { isLoading, setPageSize, setFilterChanged } = useFilter();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const thisPathname = useLocation();

  return (
    <div className="nc-SectionGridFeatureItems relative">
      {showFilter ? <HeaderFilterSection /> : <Heading desc={t("Discover the most popular prints in our collection.")}>{t("Trending Art Pieces")}</Heading>}
      <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}>
        {data.map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}
      </div>
      {showPagination ? (
        <div className="flex mt-16 justify-center items-center">
          <ButtonPrimary
            loading={isLoading}
            onClick={() => {
              setPageSize((prev) => prev + 10);
              setFilterChanged((prev) => !prev);
            }}
          >
            {t("Show me more")}
          </ButtonPrimary>
        </div>
      ) : (
        <ButtonPrimary
          loading={isLoading}
          onClick={() => {
            navigate(`/search`);
          }}
        >
          {t("Show me more")}
        </ButtonPrimary>
      )}
    </div>
  );
};

export default SectionGridFeatureItems;
