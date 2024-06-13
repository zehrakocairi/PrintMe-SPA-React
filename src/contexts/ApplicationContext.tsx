import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Frame, Size } from "../models/ProductModels";
import { fetchWithAuth } from "../fetch/fetchWrapper";
import { useMsal } from "@azure/msal-react";
import { tokenRequest } from "../authConfig";
import * as msal from "@azure/msal-browser"; // Import the 'msal' module

interface ApplicationContextProps {
    frames: Frame[];
    sizes: Size[];
    getToken: () => Promise<string | null>;
    handleGoogleSuccess: (credential: any) => void;
}

const ApplicationContext = createContext<ApplicationContextProps | undefined>(undefined);

interface ApplicationProviderProps {
    children: ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }): any => {

    const [frames, setFrames] = useState<Frame[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const { instance } = useMsal();
    const [initialized, setInitialized] = useState(false);

    const fetchFrames = async () => {
        const url = `/bootstrap/frames`;
        try {
            const response = await fetchWithAuth(url, '');
            setFrames(response);
        } catch (error) {
            console.error(`Error fetching frames:`, error);
            throw error;
        }
    };
    const fetchSizes = async () => {
        const url = `/bootstrap/sizes`;
        try {
            const response = await fetchWithAuth(url, '');
            setSizes(response);
        } catch (error) {
            console.error(`Error fetching frames:`, error);
            throw error;
        }
    };
    const initializeAuthentication = async () => {
        await instance.initialize();
        instance.setActiveAccount(instance.getAllAccounts()[0] ?? {});
        setInitialized(true);
        setAuthenticationMethod('microsoft');
    };

    useEffect(() => {
        fetchFrames();
        fetchSizes();
    }, []);

    const setAuthenticationMethod = (method: 'google' | 'microsoft') => {
        sessionStorage.setItem("authenticationMethod", 'google');
    };
    const isAuthenticatedWith = (method: 'google' | 'microsoft'):boolean => {
        return sessionStorage.getItem("authenticationMethod") === method;
    };

    const handleGoogleSuccess = ({credential}:any) => {
        console.log("Google login successful:", credential);
        sessionStorage.setItem("accessToken", credential);
        setAuthenticationMethod('google');
    };

    const getToken = async () => {
        const cachedToken = sessionStorage.getItem("accessToken");
        const tokenExpiry = sessionStorage.getItem("tokenExpiry");
        
        if ((cachedToken && isAuthenticatedWith('google')) || (cachedToken && tokenExpiry && new Date().getTime() < +tokenExpiry)) {
            return cachedToken;
        }

        if(!initialized)
            await initializeAuthentication();

        const accounts = instance.getAllAccounts();
        if (accounts.length === 0) {
            return null;
        }
    
        // Check for cached token
    
    
        try {
            const response = await instance.acquireTokenSilent(tokenRequest);
            // Cache the token and its expiry time
            sessionStorage.setItem("accessToken", response.accessToken);
            sessionStorage.setItem("tokenExpiry", (response.expiresOn ?? new Date().getTime() * 1000).toString());    
            return response.accessToken;
        } catch (error) {
            // If acquireTokenSilent fails, fallback to acquireTokenPopup
            if (error instanceof msal.InteractionRequiredAuthError) {
                const response = await instance.acquireTokenPopup(tokenRequest);
                // Cache the token and its expiry time
                sessionStorage.setItem("accessToken", response.accessToken);
                sessionStorage.setItem("tokenExpiry", (response.expiresOn ?? new Date().getTime() * 1000).toString());    
                return response.accessToken;
            } else {
                throw error;
            }
        }
    };
    

    return (
        <ApplicationContext.Provider value={{ frames, sizes, getToken, handleGoogleSuccess }}>
            {children}
        </ApplicationContext.Provider>
    );
};

// Custom hook to access the Application context
export const useApplication = () => {
    const context = useContext(ApplicationContext);
    if (!context) {
        throw new Error("useApplication must be used within a ApplicationProvider");
    }
    return context;
};
