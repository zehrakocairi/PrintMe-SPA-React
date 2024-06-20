export const fetchWithAuth = async (url: string, token: string|null|undefined, options: any = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (url.startsWith("/")) {
    url = process.env.REACT_APP_BACKEND_URL + "/api" + url;
  }

  const fetchResponse = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (fetchResponse.status >= 300) {
    throw new Error("Network response was not ok");
  }

  const responseText = await fetchResponse.text();

  if (!responseText) return;

  return JSON.parse(responseText);
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