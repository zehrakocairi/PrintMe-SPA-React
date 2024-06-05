import { fetchWithAuth } from "../fetch/fetchWrapper";
import { IPublicClientApplication } from "@azure/msal-browser";
import { tokenRequest } from "../authConfig";
import { getPutOptions , getPostOptions} from "../fetch/fetchWrapper";
import { CartItem } from "../models/CartItem";


export const getCart = async (instance: IPublicClientApplication, accounts: any[]) => {
  const url = `/basket`;
  try {
    const accessToken = await getAccessToken(instance, accounts);
    const response = await fetchWithAuth(url, accessToken);
    return response;
  } catch (error) {
    console.error(`Error fetching cart:`, error);
    throw error;
  }
};

export const updateCart = async (instance: IPublicClientApplication, accounts: any[], cartItems: CartItem[]) => {
  const url = `/basket`;
  try {
    const accessToken = await getAccessToken(instance, accounts);
    const response = await fetchWithAuth(url, accessToken, getPutOptions(cartItems));
    return response;
  } catch (error) {
    console.error(`Error updating cart:`, error);
    throw error;
  }
};

export const upsertCartItem = async (instance: IPublicClientApplication, accounts: any[], cartItem: CartItem) => {
  const url = `/basket/upsert-item`;
  try {
    const accessToken = await getAccessToken(instance, accounts);
    const response = await fetchWithAuth(url, accessToken, getPutOptions(cartItem));
    return response;
  } catch (error) {
    console.error(`Error updating cart:`, error);
    throw error;
  }
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
