import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/index.scss";

import "./fonts/line-awesome-1.3.0/css/line-awesome.min.css";
import "rc-slider/assets/index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <GoogleOAuthProvider clientId="741623615558-4169tm5cjb4qgh100rmir92evrflt6ph.apps.googleusercontent.com">
      <App></App>
    </GoogleOAuthProvider>
);

// root.render(
//   <React.StrictMode>
//       <MsalProvider instance={msalInstance}>
//           <App></App>
//         </MsalProvider>
//   </React.StrictMode>
// );
