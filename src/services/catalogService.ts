import { fetchWithAuth } from "../fetch/fetchWrapper";
import { IPublicClientApplication } from "@azure/msal-browser";
import { tokenRequest } from "../authConfig";
import { CatalogTags } from "../enums/CatalogTags";
import { CatalogType } from "../enums/CatalogType";

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

export const getPaginatedItems = async (instance: IPublicClientApplication, accounts: any[], pageSize: number = 12, pageIndex: number = 0) => {
  const url = `/catalog/search?pageSize=${pageSize}&pageIndex=${pageIndex}&catalogType=${CatalogType.Print}`;
  return fetchCatalogItems(url, instance, accounts);
};

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
