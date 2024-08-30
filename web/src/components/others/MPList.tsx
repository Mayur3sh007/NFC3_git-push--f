"use client"

import React from 'react'
import MPListCard from './MPListCard'
import { useMPFilter } from '@/context/MPFilterProvider'
import SortSelect from './SortSelect'
import { ScrollArea } from "@/components/ui/scroll-area"

const MPList: React.FC = () => {
    const { filteredMPs, sortBy, setSortBy } = useMPFilter()

    return (
        <div className='w-full'>
            <div className='mb-4 flex justify-between items-center'>
                <h2 className="text-2xl font-semibold">MPs ({filteredMPs.length + 1})</h2>
                <SortSelect onSortChange={setSortBy} currentSort={sortBy} />
            </div>
            <ScrollArea className="h-[calc(100vh-150px)]">
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {filteredMPs.map((mp, index) => (
                        <MPListCard key={mp.id || index} mp={mp} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default MPList