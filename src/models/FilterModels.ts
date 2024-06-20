import { PrintSize } from "../enums/PrintSize";
import { Category } from "../enums/Category";
import { CatalogTags } from "../enums/CatalogTags";

export interface FilterState {
    isOnSale?: boolean;
    rangePrices: number[];
    categoryState?: Category;
    sizeState?: PrintSize;
    sortOrderStates: string;
    searchTerm: string;
    tag?: CatalogTags;
  }