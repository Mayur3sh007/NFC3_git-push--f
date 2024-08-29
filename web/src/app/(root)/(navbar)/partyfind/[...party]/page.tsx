'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const party = useParams().party;
    return (
        <>
            <div>Party info</div>
            <div>{party}</div>
        </>
    )
}

export default page