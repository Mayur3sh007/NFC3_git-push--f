'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const con = useParams().con;
    return (
        <>
            <div>constituency info</div>
            <div>{con}</div>
        </>
    )
}

export default page