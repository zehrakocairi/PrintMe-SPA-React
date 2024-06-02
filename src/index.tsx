import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/index.scss";

import "./fonts/line-awesome-1.3.0/css/line-awesome.min.css";
import "rc-slider/assets/index.css";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <MsalProvider instance={msalInstance}>
          <App></App>
        </MsalProvider>
  </React.StrictMode>
);
