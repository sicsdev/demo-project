import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";

const TopBar = ({ title, icon, isBackButton = false, backButtonUrl = '/' }) => {
    const [skeletonloading, setSkeletonLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setSkeletonLoading(false);
        }, 1200);
    }, [])
    return (
        <h1 className='pl-2 text-xl font-semibold'>
            {skeletonloading ?
                <SkeletonLoader count={1} height={30} width={120} />
                :
                <>

                    {title}</>
            }
        </h1>
    )
}

export default TopBar