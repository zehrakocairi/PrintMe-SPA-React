import React, { FC } from "react";

export interface BackgroundSectionProps {
  className?: string;
  zIndex?: number;
}

const BackgroundSection: FC<BackgroundSectionProps> = ({
  className = "bg-slate-50",
  zIndex = 0,
}) => {
  return (
    <div
      className={`nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-[${zIndex ?? 0}] ${className}`}
    ></div>
  );
};

export default BackgroundSection;
