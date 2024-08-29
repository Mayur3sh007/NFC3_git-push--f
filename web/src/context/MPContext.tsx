'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MPProfile } from "@/lib/types";

type MPContextType = {
    data: MPProfile[];
    fetchData: () => void;
};

const defaultMPContext: MPContextType = {
    data: [],
    fetchData: () => { },
};

export const MPContext = createContext<MPContextType>(defaultMPContext);

export const useMPs = () => {
    const context = useContext(MPContext);
    if (!context) {
        throw new Error("useMPs must be used within a MPProvider");
    }
    return context;
};

export const MPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<MPProfile[]>([]);

    const fetchData = async () => {
        try {
            const mpSnapshot = await getDocs(collection(db, "mps_data"));
            const mpData = mpSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MPProfile));
            setData(mpData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MPContext.Provider value={{ data, fetchData }}>
            {children}
        </MPContext.Provider>
    );
};