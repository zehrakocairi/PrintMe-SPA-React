import { useMsal } from '@azure/msal-react';
import {tokenRequest} from '../authConfig';

export const fetchWithAuth = async (url:string, options:any = {}) => {
    
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  
  
//   const { instance, accounts } = useMsal(); 

//   if (accounts.length > 0) {
//     const response = await instance.acquireTokenSilent(tokenRequest);

//     if (response.accessToken) {
//         headers['Authorization'] = `Bearer ${response.accessToken}`;
//       }
//   }

  if(url.startsWith("/")){
    url = "https://localhost:7183/api" + url; 
  }

  const fetchResponse = await fetch(url, {
    ...options,
    headers,
  });

  if (fetchResponse.status >= 300) {
    throw new Error('Network response was not ok');
  }

  return await fetchResponse.json();
};