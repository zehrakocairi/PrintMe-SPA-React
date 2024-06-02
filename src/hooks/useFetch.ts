import { useState } from "react";
import { useMsal } from '@azure/msal-react';
import {tokenRequest} from '../authConfig';

const useFetch = (route:string, onReceived:any) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => {
    controller.abort();
  };

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { instance, accounts } = useMsal();

  const performFetch = (options:any, newUrl:string|null) => {
    route = newUrl || route;
    setError("");
    setIsLoading(true);

    const baseOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization" : ""
      },
      credentials: "include"
    };


    const fetchData = async () => {
      

      if (accounts.length > 0) {
        const response = await instance.acquireTokenSilent(tokenRequest);

        if (response.accessToken) {
          baseOptions.headers["Authorization"] = `Bearer ${response.accessToken}`;
        }
      }
      let url = route;
      if (route.startsWith("/")) {
        url = "https://localhost:7183/api" + route;
      }

      const res = await fetch(url, { ...baseOptions, ...options, signal });

      if (res.status >= 300) {
        setError(
          `Fetch for ${url} returned an invalid status (${res.status}). Received: ${JSON.stringify(res)}`
        );
      }

      const jsonResult = await res.json();

      if (jsonResult.success === true) {
        onReceived(jsonResult);
      } else {
        setError(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(
              jsonResult
            )}`
        );
      }

      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  };

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;
