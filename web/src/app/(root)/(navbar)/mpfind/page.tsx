import MPList from '@/components/others/MPList'
import SearchMP from '@/components/others/SearchMP'
import { MPFilterProvider } from '@/context/MPFilterProvider'
import React from 'react'

const Page = () => {
    return (
        <MPFilterProvider>
            <div className='w-full h-full gap-4 flex p-4'>
                <SearchMP />
                <MPList />
            </div>
        </MPFilterProvider>
    )
}

export default Page