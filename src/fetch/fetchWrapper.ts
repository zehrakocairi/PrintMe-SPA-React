import { tokenRequest, msalInstance } from "../authConfig";

export const fetchWithAuth = async (url: string, token: string|null, options: any = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (url.startsWith("/")) {
    url = "http://localhost:5187/api" + url;
  }

  const fetchResponse = await fetch(url, {
    ...options,
    headers,
    credentials: "include"
  });

  if (fetchResponse.status >= 300) {
    throw new Error("Network response was not ok");
  }

  return await fetchResponse.json();
};

export const getPostOptions = (body: any):any => {
  return {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
}

export const getPutOptions = (body: any):any => {
  return {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
}