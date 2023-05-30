'use client'
import React, { useState } from 'react'
import Desktop from '../../components/Checkout/Desktop'
import Mobile from '../../components/Checkout/Mobile'

const Page = () => {
    const [select, setSelect] = useState(1)
    let guru = ["15 projects", "1,500 keyywords to track", "300,000 pages to crawl ", "Content Marketing Platform", "Multitargeting", "Historical data"]
    let pro = ["5 projects", "500 keywords to track", "100,000 pages to crawl", "PDF export"]
    return (
        <>
          <Desktop pro={pro} guru={guru} setSelect={setSelect} select={select}/>
          <Mobile pro={pro} guru={guru} setSelect={setSelect} select={select}/>
        </>
    )
}

export default Page