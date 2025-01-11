import { fetchWithAuth } from "../fetch/fetchWrapper";
import { getPutOptions } from "../fetch/fetchWrapper";
import { CartItem, CustomerCart } from "../models/CartItem";

const baseUrl = "http://13.95.140.222:30003";
export const getCart = async (accessToken: string | undefined | null) => {
  const url = `${baseUrl}/basket/v1`;
  try {
    const response = await fetchWithAuth(url, accessToken);
    return response;
  } catch (error) {
    console.error(`Error fetching cart:`, error);
    throw error;
  }
};

export const updateCart = async (accessToken: string | null | undefined, cartItems: CartItem[]) => {
  const url = `${baseUrl}/basket/v1`;
  try {
    const response = await fetchWithAuth(url, accessToken, getPutOptions(cartItems));
    return response;
  } catch (error) {
    console.error(`Error updating cart:`, error);
    throw error;
  }
};

export const upsertCartItem = async (accessToken: string | null, cartItem: CartItem) => {
  const url = `${baseUrl}/basket/v1/upsert-item`;
  try {
    const response = await fetchWithAuth(url, accessToken, getPutOptions(cartItem));
    return response;
  } catch (error) {
    console.error(`Error updating cart:`, error);
    throw error;
  }
};
