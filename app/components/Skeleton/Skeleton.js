import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SkeletonLoader = ({ ...rest }) => {
    return (
        <Skeleton {...rest} />
    )
}

export default SkeletonLoader