import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const AutoTabsComp = ({ handleClickScroll }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabData = [
        {
            id: 1,
            name: "Stefan Teubner",
            content: "Streamlined pricing for every use case",
            title: "Pay Per Resolution, Not Per Seat or Per Hour",
            description: "Tempo's straightforward pricing means you only pay for the resolutions you need, allowing for complete scalability aligned with your customer service demand."
        },
        {
            id: 2,
            name: "Niki Papazoglakis",
            content: "Pay-as-you-go billing and comprehensive support",
            title: "Tailored Plans with White-Glove Onboarding",
            description: "Choose the flexibility of pay-as-you-go pricing or the dedicated support of our enterprise plans, each including white-glove onboarding to ensure seamless integration into your operations."
        },
        {
            id: 3,
            name: "Oliver Jägle",
            content: "AI-driven savings for your business",
            title: "Efficiency-Driven Cost Savings",
            description: "Embrace the power of AI with Tempo to streamline your support needs. Businesses can reduce the number of agents and save significantly, thanks to the efficiencies gained from our advanced platform."
        },
        {
            id: 4,
            title: "Zero Hidden Fees",
            name: "Niki Papazoglakis",
            content: "Straightforward and predictable pricing",
            description: "Transparent pricing is at the core of Tempo's philosophy. Enjoy a clear, predictable billing cycle with zero hidden costs, giving you the financial clarity your business deserves."
        }
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
        <div className='relative'>
            <div className='bg-black w-full mx-auto py-[40px] lg:py-[96px] px-[16px]'>
                <div className='max-w-[1090px] mx-auto'>
                    <div className='py-0 relative'>
                        <div className='hidden lg:block absolute top-1/2 transform -translate-y-1/2 inset-x-[-60px] text-[#cbced1]'>
                            <div>0{activeTab + 1}</div>
                            <img src="/icons/dash-icon.svg" loading="lazy" alt="icon" className="my-[16px]" />
                            <div>0{tabData?.length}</div>
                        </div>
                        <div className='flex px-0 justify-between flex-col lg:flex-row items-center'>
                            <div className='flex items-center w-full max-w-[465px]'>
                                <div>
                                    {tabData.map((ele, key) =>
                                        <div className={`${activeTab === key ? '' : 'opacity-30'} mb-[30px] cursor-pointer transition-all duration-200 flex`} key={key} onClick={(e) => changeTabHandler(key)}>
                                            <div className=''>
                                                <div className='text-white text-lg font-bold mb-[3px]'>{ele.title}</div>
                                                <p className='text-xs text-[#9ea2a8]'>{ele.content}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='w-full max-w-[550px]'>
                                <div className='text-white'>
                                    <div className=''>
                                        <h4 className='text-[24px] mb-[16px]'>{tabData[activeTab]?.title}</h4>
                                        <p className='text-sm'>{tabData[activeTab]?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start items-center cursor-pointer pt-[20px]">
                        <button
                            onClick={handleClickScroll}
                            className="inline-block font-semibold  rounded-lg px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-white hover:text-white bg-primary hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
                        >
                            Get a Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutoTabsComp