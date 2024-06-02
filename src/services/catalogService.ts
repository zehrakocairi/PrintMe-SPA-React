import { fetchWithAuth } from '../fetch/fetchWrapper';

export const getFeaturedItems= async () => {
  try {
    const response = await fetchWithAuth(`/catalog/search?pageSize=4&catalogType=1&tags=2`);
    return response;
  } catch (error) {
    console.error(`Error fetching featured catalog items:`, error);
    throw error;
  }
};