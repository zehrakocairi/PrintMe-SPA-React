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
    url = "https://localhost:7183/api" + url;
  }

  const fetchResponse = await fetch(url, {
    ...options,
    headers
  });

  if (fetchResponse.status >= 300) {
    throw new Error("Network response was not ok");
  }

  return await fetchResponse.json();
};
