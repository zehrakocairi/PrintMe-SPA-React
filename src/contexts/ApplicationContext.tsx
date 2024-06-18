import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Frame, Size } from "../models/ProductModels";
import { fetchWithAuth } from "../fetch/fetchWrapper";

interface ApplicationContextProps {
    frames: Frame[];
    sizes: Size[];
    getToken: () => Promise<string | undefined>;
    handleGoogleSuccess: (credential: any) => void;
}

const ApplicationContext = createContext<ApplicationContextProps | undefined>(undefined);

interface ApplicationProviderProps {
    children: ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }): any => {

    const [frames, setFrames] = useState<Frame[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
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

    useEffect(() => {
        fetchFrames();
        fetchSizes();
    }, []);

    const setAuthenticationMethod = (method: 'google') => {
        sessionStorage.setItem("authenticationMethod", 'google');
    };
    const isAuthenticatedWith = (method: 'google'):boolean => {
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
