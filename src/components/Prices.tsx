import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`min-w-[120px] float-right flex justify-end mb-auto ${className}`}>
      <div
        className={`flex items-center  border-natural-900 rounded-md ${contentClass}`}
      >
        <span className="text-lg text-gray-900 font-serif  !leading-none"><span className="inline-block text-primary-50 bg-primary-6000 text-sm font-medium px-2.5 py-0.5 rounded-full">From</span> €{price.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default Prices;
