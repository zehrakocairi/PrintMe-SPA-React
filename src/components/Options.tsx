import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Frame, Size } from "../models/ProductModels";


export interface OptionsProps {
    className?: string;
    frames: Frame[];
    sizes: Size[];
    selectedFrameIndex: number;
    sizeSelected: Size;
    isMatIncluded: boolean;
    onFrameSelect: (index: number) => void;
    onSizeSelect: (size: Size) => void;
    onMatToggle: () => void;
}

const Options: FC<OptionsProps> = ({
    className = "mb-12",
    frames,
    sizes,
    selectedFrameIndex,
    sizeSelected,
    isMatIncluded,
    onFrameSelect,
    onSizeSelect,
    onMatToggle,
}) => {
    const { t } = useTranslation();

    const renderFrames = () => {
        if (!frames || !frames.length) {
            return null;
        }

        return (
            <div>
                <div className="flex justify-between font-medium text-sm">
                    <label className="rtl:text-right block" htmlFor="">
                        <span className="text-sm font-medium">
                            Color:
                            <span className="ms-1 font-semibold">
                                {frames[selectedFrameIndex].name}
                            </span>
                        </span>
                    </label>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-6000 hover:text-primary-500"
                        href="/our-services"
                    >
                        See frame details
                    </a>
                </div>
                <div className="grid grid-cols-6 gap-2 mt-3">
                    {frames.map((frame, index) => (
                        <div
                            title={frame.name}
                            key={index}
                            onClick={() => onFrameSelect(index)}
                            className={`relative flex max-w-[75px] h-16 rounded-lg border-2 cursor-pointer max-w-[50px] ${
                                selectedFrameIndex === index
                                    ? "border-primary-6000 dark:border-primary-500"
                                    : "border-transparent"
                            }`}
                        >
                            <div
                                className="absolute inset-0.5 rounded-lg overflow-hidden z-0 bg-no-repeat bg-center bg-cover"
                                style={{
                                    backgroundImage: `url(${frame.thumbnail || ""})`,
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSizeList = () => {
        if (!sizes || !sizes.length) {
            return null;
        }
        return (
            <div>
                <div className="flex justify-between font-medium text-sm">
                    <label htmlFor="">
                        <span className="">
                            Image Size:
                            <span className="ml-1 font-semibold">{sizeSelected?.name}</span>
                        </span>
                    </label>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        // href=""
                        className="text-primary-6000 hover:text-primary-500"
                    >
                        See sizing chart
                    </a>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-3">
                    {sizes.map((size, index) => {
                        const isActive = size.id === sizeSelected?.id;
                        return (
                            <div
                                key={index}
                                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                                    text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 "cursor-pointer"
                                    ${
                                        isActive
                                            ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                                            : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                    }`}
                                onClick={() => onSizeSelect(size)}
                            >
                                {size?.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className={`flex flex-col relative ${className}`}>
            <div className="mt-6 space-y-7 lg:space-y-8">
                <div className="">{renderFrames()}</div>
            </div>
            {/* ---------- MAT OPTION ----------  */}
            <div className="mt-6 space-y-7 lg:space-y-8">
                <div className="">
                    <div
                        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none ${
                            isMatIncluded
                                ? "border-primary-500 bg-primary-50 text-primary-900"
                                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                        }`}
                        onClick={onMatToggle}
                    >
                        <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />

                        <span className="line-clamp-1 ml-2">{t("Include Mat")}</span>
                    </div>
                </div>
            </div>
            {/* ---------- SIZE LIST ----------  */}
            <div className="mt-6 space-y-7 lg:space-y-8">
                <div className="">{renderSizeList()}</div>
            </div>
        </div>
    );
};

export default Options;
