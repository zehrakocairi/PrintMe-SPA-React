import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Frame, Size } from "../models/ProductModels";
import { fetchWithAuth } from "../fetch/fetchWrapper";
import { useMsal } from "@azure/msal-react";

interface ApplicationContextProps {
    frames: Frame[];
    sizes: Size[];
}

const ApplicationContext = createContext<ApplicationContextProps | undefined>(undefined);

interface ApplicationProviderProps {
    children: ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }): any => {

    const [frames, setFrames] = useState<Frame[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

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

    return (
        <ApplicationContext.Provider value={{ frames, sizes }}>
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
