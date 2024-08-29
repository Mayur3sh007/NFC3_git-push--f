'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMPs } from '@/context/MPContext';
import { MPProfile } from '@/lib/types';

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
            const matchesGender = !filters.gender || mp.mp_gender === filters.gender;

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
        <MPFilterContext.Provider value={{ filters, setFilters, filteredMPs, sortBy, setSortBy }}>
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