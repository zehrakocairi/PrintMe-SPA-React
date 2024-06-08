import { fetchWithAuth } from "../fetch/fetchWrapper";
import { IPublicClientApplication } from "@azure/msal-browser";
import { tokenRequest } from "../authConfig";
import { CatalogType } from "../enums/CatalogType";
import { Category } from "../enums/Category";
import { CatalogTags } from "../enums/CatalogTags";
import { FilterState } from "../models/FilterModels";


const fetchCatalogItems = async (url: string, instance: IPublicClientApplication, accounts: any[]) => {
  try {
    const accessToken = await getAccessToken(instance, accounts);
    const response = await fetchWithAuth(url, accessToken);
    return response;
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};

export const getCatalogItem = async (id: number, instance: IPublicClientApplication, accounts: any[]) => {
  try {
    const accessToken = await getAccessToken(instance, accounts);
    const response = await fetchWithAuth(`/catalog/${id}`, accessToken);
    return response;
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};

export const getFeaturedItems = async (instance: IPublicClientApplication, accounts: any[]) => {
  const url = `/catalog/search?pageSize=4&catalogType=1&tags=2`;
  return fetchCatalogItems(url, instance, accounts);
};

export const getTrendingItems = async (instance: IPublicClientApplication, accounts: any[]) => {
  const url = `/catalog/search?pageSize=4&catalogType=${CatalogType.Print}&tags=${CatalogTags.TopSellers}`;
  return fetchCatalogItems(url, instance, accounts);
};

export const getOnSaleItems = async (instance: IPublicClientApplication, accounts: any[]) => {
  const url = `/catalog/search?pageSize=4&catalogType=${CatalogType.Print}&tags=${CatalogTags.OnSale}`;
  return fetchCatalogItems(url, instance, accounts);
};

export const getOurPickItems = async (instance: IPublicClientApplication, accounts: any[]) => {
  const url = `/catalog/search?pageSize=4&catalogType=${CatalogType.Print}&tags=${CatalogTags.OurPick}`;
  return fetchCatalogItems(url, instance, accounts);
};

export const getPaginatedItems = async (instance: IPublicClientApplication, accounts: any[], pageSize: number = 12, pageIndex: number = 0, category?: Category,) => {
  const url = `/catalog/search?pageSize=${pageSize}&pageIndex=${pageIndex}&catalogType=${CatalogType.Print}`;
  return fetchCatalogItems(url, instance, accounts);
};

export const getFilteredPaginatedItems = async (instance: IPublicClientApplication, accounts: any[], filter: FilterState, pageSize: number = 12, pageIndex: number = 0, searchText = "") => {
  let url = `/catalog/search?pageSize=${pageSize}&pageIndex=${pageIndex}${toQueryString(filter)}`;
  if(searchText != ""){
    url += `&searchTerm=${searchText}`;
  }
  return fetchCatalogItems(url, instance, accounts);
};


function toQueryString(filter: FilterState) {
  let query = "";
  if (filter.isOnSale === true) {
    query += `&tags=${CatalogTags.OnSale}`;
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

async function getAccessToken(instance: IPublicClientApplication, accounts: any[]) {
  return null;
  let token: string | null = null;
  if (accounts.length > 0) {
    const response = await instance.acquireTokenSilent(tokenRequest);
    if (response.accessToken) {
      token = response.accessToken;
    }
  }
  return token;
}
