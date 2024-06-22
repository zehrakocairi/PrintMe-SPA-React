import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Frame, Size } from "../models/ProductModels";
import { fetchWithAuth, getPostOptions } from "../fetch/fetchWrapper";

interface ApplicationContextProps {
    frames: Frame[];
    sizes: Size[];
    getToken: () => Promise<string | undefined>;
    handleGoogleSuccess: (credential: any) => void;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
    currentUser:any;
}

const ApplicationContext = createContext<ApplicationContextProps | undefined>(undefined);

interface ApplicationProviderProps {
    children: ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }): any => {

    const [frames, setFrames] = useState<Frame[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [currentUser, setcCurrentUser] = useState<any>({});

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
    const fetchCurrentUser = async () => {
        const url = `/bootstrap/currentUser`;
        try {
            const response = await fetchWithAuth(url, await getToken());
            setcCurrentUser(response);
        } catch (error) {
            console.error(`Error fetching current user:`, error);
        }
    };
    const tryCreateUser = async () => {
        const url = `/customer`;
        try {
            const response = await fetchWithAuth(url, await getToken(), getPostOptions({}));
        } catch (error) {
            console.error(`Error fetching frames:`, error);
            throw error;
        }
    };

    useEffect(() => {
        fetchFrames();
        fetchSizes();
        if(isAuthenticatedWith('google')){
            fetchCurrentUser();
        }
    }, []);

    const setAuthenticationMethod = (method: 'google') => {
        localStorage.setItem("authenticationMethod", 'google');
    };

    const isAuthenticatedWith = (method: 'google'):boolean => {
        return localStorage.getItem("authenticationMethod") === method && localStorage.getItem("accessToken") !== null;
    };

    const isAuthenticated = ():boolean => {
        return localStorage.getItem("accessToken") !== null;
    }

    const isAdmin = ():boolean => {
        return currentUser.isAdmin ?? false;
    }

    const handleGoogleSuccess = ({credential}:any) => {
        console.log("Google login successful:", credential);
        localStorage.setItem("accessToken", credential);
        setAuthenticationMethod('google');
        fetchCurrentUser();
        tryCreateUser();
        window.location.href = "/";
    };

    const getToken = async () => {
        const cachedToken = localStorage.getItem("accessToken");
        const tokenExpiry = localStorage.getItem("tokenExpiry");
        
        if ((cachedToken && isAuthenticatedWith('google')) || (cachedToken && tokenExpiry && new Date().getTime() < +tokenExpiry)) {
            return cachedToken;
        }
    };
    

    return (
        <ApplicationContext.Provider value={{ frames, sizes, getToken, handleGoogleSuccess, currentUser, isAuthenticated, isAdmin }}>
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
