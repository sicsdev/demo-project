import React from 'react'
import Link from 'next/link'

const TopBar = ({ title, icon, isBackButton = false, backButtonUrl = '/' }) => {
    return (
        <h1 className='pl-2 text-xl font-semibold'>{title}</h1>
    )
}

export default TopBar