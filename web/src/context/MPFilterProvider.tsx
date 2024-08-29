'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMPs } from '@/context/MPContext';
import { MPProfile } from '@/lib/types';

// Add the enums
const stateOptions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Jammu and Kashmir", "Uttar Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh",
    "Maharashtra", "Odisha", "Rajasthan", "Tamil Nadu", "Telangana",
    "Uttarakhand", "West Bengal", "Chandigarh", "Delhi", "Himachal Pradesh",
    "Jammu And Kashmir", "Manipur", "Punjab", "Sikkim", "Tripura",
    "Andaman & Nicobar Islands", "Dadra and Nagar Haveli", "Puducherry",
    "Meghalaya", "Mizoram", "Nagaland", "Lakshadweep"
];

const educationOptions = [
    "Post Graduate and above", "Graduate", "Upto Higher Secondary",
    "Post graduate and above", "Other"
];

const partyOptions = [
    "Bharatiya Janata Party", "Telugu Desam Party", "Yuvajana Sramika Rythu Congress Party",
    "Janata Dal (United)", "Lok Janshakti Party (Ram Vilas)", "Hindustani Awam Morcha (Secular)",
    "Janata Dal (Secular)", "Indian National Congress", "Revolutionary Socialist Party",
    "Independent", "Rashtriya Janata Dal", "Shiv Sena", "Dravida Munnetra Kazhagam",
    "Indian Union Muslim League", "Apna Dal (Soneylal)", "Aazad Samaj Party (Kanshi Ram)",
    "Jana Sena Party", "Asom Gana Parishad", "All India Trinamool Congress",
    "Communist Party of India (Marxist-Leninist) (Liberation)",
    "Jammu and Kashmir National Conference", "AJSU Party", "Jharkhand Mukti Morcha",
    "Kerala Congress", "Communist Party Of India (Marxist)",
    "Nationalist Congress Party Sharadchandra Pawar", "Shiv Sena (Uddhav Balasaheb Thackeray)",
    "Nationalist Congress Party", "Aam Aadmi Party", "Shiromani Akali Dal",
    "Communist Party of India (Marxist)", "Rashtriya Loktantrik Party", "Bharat Adivasi Party",
    "Sikkim Krantikari Morcha", "Viduthalai Chiruthaigal Katchi", "Communist Party of India",
    "All India Majlis-E-Ittehadul Muslimeen", "Samajwadi Party", "Rashtriya Lok Dal",
    "Marumalarchi Dravida Munnetra Kazhagam", "United Peoples Party, Liberal",
    "Voice of the People Party", "Zoram People's Movement"
];

type FilterState = {
    searchTerm: string;
    state: string;
    party: string;
    education: string;
    gender: string;
};

type MPFilterContextType = {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    filteredMPs: MPProfile[];
    sortBy: keyof MPProfile | null;
    setSortBy: React.Dispatch<React.SetStateAction<keyof MPProfile | null>>;
    stateOptions: string[];
    educationOptions: string[];
    partyOptions: string[];
};

const MPFilterContext = createContext<MPFilterContextType | undefined>(undefined);

export const MPFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data } = useMPs();
    const [filters, setFilters] = useState<FilterState>({
        searchTerm: '',
        state: '',
        party: '',
        education: '',
        gender: '',
    });
    const [sortBy, setSortBy] = useState<keyof MPProfile | null>(null);
    const [filteredMPs, setFilteredMPs] = useState<MPProfile[]>(data);

    useEffect(() => {
        const filtered = data.filter((mp) => {
            const matchesSearch = mp.mp_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                mp.pc_name.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchesState = !filters.state || mp.state === filters.state;
            const matchesParty = !filters.party || mp.mp_political_party === filters.party;
            const matchesEducation = !filters.education || mp.educational_qualification === filters.education;
            const matchesGender = !filters.gender || mp.mp_gender.toLowerCase() === filters.gender.toLowerCase();

            return matchesSearch && matchesState && matchesParty && matchesEducation && matchesGender;
        });

        let sorted = [...filtered];
        if (sortBy) {
            sorted.sort((a, b) => {
                if (a[sortBy] === null) return 1;
                if (b[sortBy] === null) return -1;
                if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
                    return (b[sortBy] as number) - (a[sortBy] as number);
                }
                return 0;
            });
        }

        setFilteredMPs(sorted);
    }, [data, filters, sortBy]);

    return (
        <MPFilterContext.Provider value={{
            filters,
            setFilters,
            filteredMPs,
            sortBy,
            setSortBy,
            stateOptions,
            educationOptions,
            partyOptions
        }}>
            {children}
        </MPFilterContext.Provider>
    );
};

export const useMPFilter = () => {
    const context = useContext(MPFilterContext);
    if (context === undefined) {
        throw new Error('useMPFilter must be used within a MPFilterProvider');
    }
    return context;
};