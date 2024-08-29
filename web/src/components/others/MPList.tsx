import React from 'react'
import MPListCard from './MPListCard'

const MPList = () => {
    return (
        <div className='w-full flex flex-wrap gap-4'>
            <MPListCard />
            <MPListCard />
            <MPListCard />
            <MPListCard />
            <MPListCard />
            <MPListCard />
            <MPListCard />
        </div>
    )
}

export default MPList