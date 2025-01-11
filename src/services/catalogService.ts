import { fetchWithAuth, getPostOptions } from "../fetch/fetchWrapper";
import { CatalogType } from "../enums/CatalogType";
import { Category } from "../enums/Category";
import { CatalogTags } from "../enums/CatalogTags";
import { FilterState } from "../models/FilterModels";
import { Product } from "../models/ProductModels";

const baseUrl = "http://13.95.140.222:30001";
const fetchCatalogItems = async (url: string, body: object) => {
  try {
    const response = await fetchWithAuth(url, localStorage.getItem("accessToken"), getPostOptions(body));

    return { data: response.data.map((item: Product) => new Product(item)), totalPages: response.totalPage };
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};

export const getCatalogItem = async (id: number) => {
  try {
    const data = await fetchWithAuth(`/catalog/${id}`, localStorage.getItem("accessToken"));
    return new Product(data);
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};
export const getCustomCatalogItem = async () => {
  try {
    const data = await fetchWithAuth(`/catalog/custom-product`, localStorage.getItem("accessToken"));
    return new Product(data);
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};

export const getFeaturedItems = async () => {
  let url = `${baseUrl}/catalog/v1/product/search`;

  var body = new SearchProductQuery();
  debugger;
  body.tags = CatalogTags.Featured;
  return fetchCatalogItems(url, body);
};

export const getTrendingItems = async () => {
  let url = `${baseUrl}/catalog/v1/product/search`;

  var body = new SearchProductQuery();
  body.tags = CatalogTags.TopSellers;
  return fetchCatalogItems(url, body);
};

export const getOnSaleItems = async (accessToken: string) => {
  let url = `${baseUrl}/catalog/v1/product/search`;

  var body = new SearchProductQuery();
  body.tags = CatalogTags.OnSale;
  return fetchCatalogItems(url, body);
};

export const getOurPickItems = async () => {
  let url = `${baseUrl}/catalog/v1/product/search`;

  var body = new SearchProductQuery();
  body.tags = CatalogTags.OurPick;
  return fetchCatalogItems(url, body);
};

export const getPaginatedItems = async (pageSize: number = 12, pageIndex: number = 0, category?: Category) => {
  let url = `${baseUrl}/catalog/v1/product/search`;

  var body = new SearchProductQuery("", pageSize, pageIndex);
  return fetchCatalogItems(url, body);
};

export const getFilteredPaginatedItems = async (filter: FilterState, pageSize: number = 12, pageIndex: number = 0, searchText = "") => {
  let url = `${baseUrl}/catalog/v1/product/search`;
  var body = new SearchProductQuery(searchText, pageSize, pageIndex);
  fillBody(filter, body);

  return fetchCatalogItems(url, body);
};

export class PaginationQuery {
  constructor(public pageSize: number = 10, public pageIndex: number = 1) {}
}

// SearchProductQuery.ts
export class SearchProductQuery extends PaginationQuery {
  constructor(public searchTerm?: string, pageSize: number = 10, pageIndex: number = 1, public categoryId?: number, public priceFrom?: number, public priceTo?: number, public tags?: CatalogTags, public isOnlyAvailableItems: boolean = false) {
    super(pageSize, pageIndex);
  }
}

// TODO : Complete here
export const uploadCustomerImage = async (file: File): Promise<string> => {
  try {
    const dto = new FormData();
    dto.append("image", file);

    let url = `${baseUrl}/catalog/v1/image/upload}`;

    const response = await fetchWithAuth(url, localStorage.getItem("accessToken"), {
      method: "POST",
      body: dto,
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error fetching catalog items:`, error);
    throw error;
  }
};

function fillBody(filter: FilterState, body: SearchProductQuery) {
  let query = "";
  if (filter.isOnSale === true) {
    body.tags = CatalogTags.OnSale;
  } else if (filter.tag) {
    body.tags = filter.tag;
  }
  if (filter.rangePrices.length > 0 && filter.rangePrices[0] > 0) {
    body.priceFrom = filter.rangePrices[0];
  }
  if (filter.rangePrices.length > 1 && filter.rangePrices[1] > 0) {
    body.priceTo = filter.rangePrices[1];
  }
  if (filter.categoryState) {
    body.categoryId = filter.categoryState;
  }
  // if (filter.sizeState) {
  //   query += `&size=${filter.sizeState}`;
  // }
  // if (filter.sortOrderStates) {
  //   query += `&sortOrderStates=${filter.sortOrderStates}`;
  // }
  return query;
}
