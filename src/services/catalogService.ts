import { fetchWithAuth } from "../fetch/fetchWrapper";
import { CatalogType } from "../enums/CatalogType";
import { Category } from "../enums/Category";
import { CatalogTags } from "../enums/CatalogTags";
import { FilterState } from "../models/FilterModels";
import { Product } from "../models/ProductModels";


const fetchCatalogItems = async (url: string) => {
  try {
    const response = await fetchWithAuth(url, localStorage.getItem("accessToken"));
    
    return {data : response.data.map((item:Product)=> new Product(item)), totalPages: response.totalPage};
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};

export const getCatalogItem = async (id: number) => {
  try {
    const data = await fetchWithAuth(`/catalog/${id}`, localStorage.getItem("accessToken"));
    return new Product(data)
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};

export const getFeaturedItems = async () => {
  const url = `/catalog/search?pageSize=6&catalogType=1&tags=2`;
  return fetchCatalogItems(url);
};

export const getTrendingItems = async () => {
  const url = `/catalog/search?pageSize=6&catalogType=${CatalogType.Print}&tags=${CatalogTags.TopSellers}`;
  return fetchCatalogItems(url);
};

export const getOnSaleItems = async (accessToken:string) => {
  const url = `/catalog/search?pageSize=6&catalogType=${CatalogType.Print}&tags=${CatalogTags.OnSale}`;
  return fetchCatalogItems(url);
};

export const getOurPickItems = async () => {
  const url = `/catalog/search?pageSize=6&catalogType=${CatalogType.Print}&tags=${CatalogTags.OurPick}`;
  return fetchCatalogItems(url);
};

export const getPaginatedItems = async (pageSize: number = 12, pageIndex: number = 0, category?: Category,) => {
  const url = `/catalog/search?pageSize=${pageSize}&pageIndex=${pageIndex}&catalogType=${CatalogType.Print}`;
  return fetchCatalogItems(url);
};

export const getFilteredPaginatedItems = async (filter: FilterState, pageSize: number = 12, pageIndex: number = 0, searchText = "") => {
  let url = `/catalog/search?pageSize=${pageSize}&pageIndex=${pageIndex}${toQueryString(filter)}`;
  if(searchText !== ""){
    url += `&searchTerm=${searchText}`;
  }
  return fetchCatalogItems(url);
};


function toQueryString(filter: FilterState) {
  let query = "";
  if (filter.isOnSale === true) {
    query += `&tags=${CatalogTags.OnSale}`;
  } else if (filter.tag) {
    query += `&tags=${filter.tag}`;
  }
  if (filter.rangePrices.length > 0 && filter.rangePrices[0] > 0) {
    query += `&priceFrom=${filter.rangePrices[0]}`;
  }
  if (filter.rangePrices.length > 1 && filter.rangePrices[1] > 0) {
    query += `&priceTo=${filter.rangePrices[1]}`;
  }
  if (filter.categoryState) {
    query += `&category=${filter.categoryState}`;
  }
  if (filter.sizeState) {
    query += `&size=${filter.sizeState}`;
  }
  if (filter.sortOrderStates) {
    query += `&sortOrderStates=${filter.sortOrderStates}`;
  }
  return query;
}
