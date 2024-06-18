import { fetchWithAuth } from "../fetch/fetchWrapper";
import { getPutOptions } from "../fetch/fetchWrapper";
import { CartItem } from "../models/CartItem";


export const getCart = async (accessToken: string|undefined|null) => {
  const url = `/basket`;
  try {
    const response = await fetchWithAuth(url, accessToken);
    return response;
  } catch (error) {
    console.error(`Error fetching cart:`, error);
    throw error;
  }
};

export const updateCart = async (accessToken: string|null|undefined, cartItems: CartItem[]) => {
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
