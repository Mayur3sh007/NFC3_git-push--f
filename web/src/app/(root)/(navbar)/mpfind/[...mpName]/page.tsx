'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const mpName = useParams().mpName;
    return (
        <>
            <div>MP profile</div>
            <div>{mpName}</div>
        </>
    )
}

export default page