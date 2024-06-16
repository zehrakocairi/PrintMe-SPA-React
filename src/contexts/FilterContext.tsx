// src/contexts/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { FilterState } from "../models/FilterModels";
import { Category } from "../enums/Category";
import { PrintSize } from "../enums/PrintSize";

interface FilterContextProps {
    filter: FilterState;
    updateIsOnSale: (isOnSale: boolean) => void;
    updateRangePrices: (rangePrices: number[]) => void;
    updateCategoryState: (categoryState?: Category) => void;
    updateSizeState: (sizeState?: PrintSize) => void;
    updateSortOrderStates: (sortOrderStates: string) => void;
    updateSearchTextState: (searchTerm: string) => void;
    setFilterChanged:  React.Dispatch<React.SetStateAction<boolean>>;
    filterChanged: boolean;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    pageSize: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }): any => {
    const [filter, setFilter] = useState<FilterState>({
        isOnSale: undefined,
        rangePrices: [10, 500],
        categoryState: undefined,
        sizeState: undefined,
        sortOrderStates: "",
        searchTerm: "",
    });
    
    const [filterChanged, setFilterChanged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(12);
    const [pageIndex, setPageIndex] = useState<number>(0);

    const updateIsOnSale = (isOnSale: boolean) => {
        setFilter((prevState) => ({ ...prevState, isOnSale}));
        setFilterChanged((prev)=> !prev);
    };

    const updateRangePrices = (rangePrices: number[]) => {
        setFilter((prevState) => ({ ...prevState, rangePrices, searchTerm: "" }));
    };

    const updateCategoryState = (categoryState?: Category) => {
        setFilter((prevState) => ({ ...prevState, categoryState, searchTerm: ""}));
    };

    const updateSizeState = (sizeState?: PrintSize) => {
        setFilter((prevState) => ({ ...prevState, sizeState , searchTerm: ""}));
    };

    const updateSortOrderStates = (sortOrderStates: string) => {
        setFilter((prevState) => ({ ...prevState, sortOrderStates, searchTerm: "" }));
    };

    const updateSearchTextState = (searchTerm: string) => {
        setFilter((prevState) => ({ ...prevState, searchTerm }));
    };

    return (
        <FilterContext.Provider value={{ filter, updateIsOnSale, updateRangePrices, updateCategoryState, updateSizeState, updateSortOrderStates, updateSearchTextState, setFilterChanged , filterChanged, isLoading, setIsLoading, pageSize, setPageSize, pageIndex, setPageIndex}}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook to access the Filter context
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};
