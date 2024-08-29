"use client"

import React from 'react';
import MPListCard from './MPListCard';
import { useMPFilter } from '@/context/MPFilterProvider';
import SortSelect from './SortSelect';

const MPList: React.FC = () => {
    const { filteredMPs, sortBy, setSortBy } = useMPFilter();

    return (
        <div className='w-full'>
            <div className='mb-4 flex justify-end'>
                <SortSelect onSortChange={setSortBy} currentSort={sortBy} />
            </div>
            <div className='flex flex-wrap gap-4'>
                {filteredMPs.map((mp, index) => (
                    <MPListCard key={mp.id || index} mp={mp} />
                ))}
            </div>
        </div>
    );
};

export default MPList;