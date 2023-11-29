"use client"
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
const CustomersWords = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabData = [
        {
            id: 1,
            name: "Stefan Teubner",
            content: "IT Project Leader, Audi Business Innovation GmbH",
            title: "Stefan Teubner",
            description: "For data privacy concerns, we needed something that we could host ourselves. Rocket.Chat really speeds up the process of collaborating with our external partners, as well as internally. It allows us to share information really fast, very effectively, and in different ways.",
            side_heading: "Slack wasn’t a real alternative for us at that time, because it was SaaS.",
            side_heading_m: <p>  Pay Per  <br />Resolution</p>,

            "points": ["Stefan Teubner , IT Project Leader, Audi Business Innovation GmbH"]

        },
        {
            id: 2,
            name: "Niki Papazoglakis",
            content: "CEO & Founder at Gluu",
            title: "Mike Schwartz",
            description: "Thanks to Rocket.Chat, we figured out how to deliver and win customers without sending engineers on site. The Omnichannel Feature enables us to provide enterprise-level support, a huge differentiator to win more business.",
            side_heading: "A huge differentiator to win more business…",
            side_heading_m: <p> White-Glove   <br />Onboarding</p>,

            "points": ['Mike Schwartz', 'CEO & Founder at Gluu']
        },
    ];


    const changeTabHandler = (key) => {
        setActiveTab(key);
    };

    const changeTab = () => {
        setActiveTab((prevTab) => (prevTab + 1) % tabData.length);
    };

    useEffect(() => {
        const interval = setInterval(changeTab, 3000); // Change tab every 2 seconds
        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };
    }, []);

    return (
        <>
            <div className='relative mb-6'>
                <div className='bg-[#f7f8fa] w-full mx-auto py-[40px] lg:py-[96px] px-[16px]'>
                    <div className='max-w-[1090px] mx-auto'>
                        <div className='py-0 relative'>
                            {/* <div className='hidden lg:block absolute top-1/2 transform -translate-y-1/2 inset-x-[-60px] text-black'>
                                <div>0{activeTab + 1}</div>
                                <img src="/icons/dash-icon.svg" loading="lazy" alt="icon" className="my-[16px]" />
                                <div>0{tabData?.length}</div>
                            </div> */}
                            <div className='flex px-0 justify-between flex-col lg:flex-row '>
                                <div className='flex itemscenter w-full max-w-[465px]'>
                                    <div>
                                        {tabData.map((ele, key) =>
                                            <div className={`${activeTab === key ? '' : 'opacity-30'} mb-[30px] cursor-pointer transition-all duration-200 flex`} key={key} onClick={(e) => changeTabHandler(key)}>
                                                <div className=''>
                                                    <div className='text-black text-lg font-bold mb-[3px]'>{ele.title}</div>
                                                    <p className='text-xs text-black'>{ele.content}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='w-full max-w-[550px] h-[352px] sm:h-auto'>
                                    <div className='text-black'>
                                        <div className=''>
                                            <h4 className='hidden sm:block text-[20px] sm:text-[20px] font-semibold mb-[16px]'>{tabData[activeTab]?.side_heading}</h4>
                                            <h4 className='text-[12px] sm:hidden block sm:text-[12px] font-semibold mb-[16px]'>{tabData[activeTab]?.side_heading_m}</h4>

                                            <p className='text-lg sm:text-xl'>{tabData[activeTab]?.description}</p>
                                            <ul className='flex gap-10 text-xs'>
                                                {tabData[activeTab].points.map((ele, key) =>
                                                    <li key={key}><p className='text-sm sm:text-sm mt-3 text-black'>{ele}</p></li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomersWords