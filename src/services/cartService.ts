import { fetchWithAuth } from "../fetch/fetchWrapper";
import { IPublicClientApplication } from "@azure/msal-browser";
import { tokenRequest } from "../authConfig";
import { getPutOptions , getPostOptions} from "../fetch/fetchWrapper";
import { CartItem } from "../models/CartItem";


export const getCart = async (accessToken: string|null) => {
  const url = `/basket`;
  try {
    if(accessToken!==null && accessToken !== ''){
      const res=await fetchWithAuth('/catalog/test', accessToken);
    }
    const response = await fetchWithAuth(url, accessToken);
    return response;
  } catch (error) {
    console.error(`Error fetching cart:`, error);
    throw error;
  }
};

export const updateCart = async (accessToken: string|null, cartItems: CartItem[]) => {
  const url = `/basket`;
  try {
    const response = await fetchWithAuth(url, accessToken, getPutOptions(cartItems));
    return response;
  } catch (error) {
    console.error(`Error updating cart:`, error);
    throw error;
  }
};

export const upsertCartItem = async (accessToken: string|null, cartItem: CartItem) => {
  const url = `/basket/upsert-item`;
  try {
    const response = await fetchWithAuth(url, accessToken, getPutOptions(cartItem));
    return response;
  } catch (error) {
    console.error(`Error updating cart:`, error);
    throw error;
  }
};
