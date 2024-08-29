import MPList from '@/components/others/MPList'
import SearchMP from '@/components/others/SearchMP'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-full gap-4 flex p-4'>
            <SearchMP />
            <MPList />
        </div>
    )
}

export default page