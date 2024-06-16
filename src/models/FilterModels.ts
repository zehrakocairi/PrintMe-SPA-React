import { PrintSize } from "../enums/PrintSize";
import { Category } from "../enums/Category";

export interface FilterState {
    isOnSale?: boolean;
    rangePrices: number[];
    categoryState?: Category;
    sizeState?: PrintSize;
    sortOrderStates: string;
    searchTerm: string;
  }