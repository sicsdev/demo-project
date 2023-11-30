import React from 'react'
import ZenBannner from '@/app/components/Alternative/ZenBannner'
import Homeinte from '@/app/components/LayoutNew/Homeinte'
import NewExceptions from '@/app/components/LayoutNew/NewExceptions'
import Reasons from '@/app/components/Alternative/Reasons'
import NewPannel from '@/app/components/Alternative/NewPannel'
import Comparison from '@/app/components/Alternative/Comparison'
import CustomersWords from '@/app/components/Alternative/CustomersWords'
import Contact from '@/app/components/Ip/Chatbot/Bot/Contact'
import HomeComponent from '@/app/components/Home/HomeComponent'
import AllComparisons from '@/app/components/Alternative/AllComparisons'
const page = () => {
    return (
        <>
            <ZenBannner />
            <Homeinte />
            <NewExceptions />
            <Reasons />
            <NewPannel />
            <Comparison />
            <CustomersWords />
            <AllComparisons />
            <Contact />
            <HomeComponent />
        </>
    )
}

export default page