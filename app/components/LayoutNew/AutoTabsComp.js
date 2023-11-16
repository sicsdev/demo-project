import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const AutoTabsComp = ({ handleClickScroll }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabData = [
        {
            id: 1,
            name: "Stefan Teubner",
            content: "Save More with Every Resolution",
            title: "Cost-Efficient",
            description: "Deflection AI's straightforward pricing means you only pay for the resolutions you need, allowing for complete scalability aligned with your customer service demand.",
            side_heading: "Pay Per Resolution",
            side_heading_m: <p>  Pay Per  <br/>Resolution</p>,

            "points": ["Transparent, per-resolution pricing", "Significant cost savings", <Link href="/pricing">Learn more about pricing</Link>]

        },
        {
            id: 2,
            name: "Niki Papazoglakis",
            content: "Tailored Onboarding Experience",
            title: "Personalized Setup",
            description: "Our dedicated sales and implementation teams ensure your setup is seamless, efficient, and tailored to your business needs.",
            side_heading: "White-Glove Onboarding",
            side_heading_m: <p> White-Glove   <br/>Onboarding</p>,

            "points": ['Expert implementation support', 'Customized setup and integration', 'Dedicated team for seamless transition']
        },
        {
            id: 3,
            name: "Oliver Jägle",
            content: "Speak To Your Customers, Anywhere",
            title: "Universal Communication",
            description: "Our platform offers support in all languages across every channel, ensuring your business is always connected and responsive.",
            side_heading: "Multi-Channel Synergy",
            side_heading_m: <p>Multi-Channel <br/>Synergy</p>,

            "points": ['Multilingual support', '24/7 availability across all channels', 'Global reach for seamless communication']
        },
        {
            id: 4,
            title: "Trustworthy and Secure",
            name: "Niki Papazoglakis",
            content: "Upholding the Highest Standards",
            description: "With robust compliance measures and advanced security protocols, we provide a safe and secure environment for all your interactions.",
            side_heading: "Compliance and Security",
            side_heading_m: <p>Compliance and <br/>Security</p>,

            "points": ['Adherence to strict compliance standards', 'Advanced security measures', 'Safe and secure data handling',]
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
        <div className='relative mb-6'>
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
                            <div className='w-full max-w-[550px] h-[352px] sm:h-auto'>
                                <div className='text-white'>
                                    <div className=''>
                                        <h4 className='hidden sm:block text-[34px] sm:text-[45px] font-semibold mb-[16px]'>{tabData[activeTab]?.side_heading}</h4>
                                        <h4 className='text-[34px] sm:hidden block sm:text-[45px] font-semibold mb-[16px]'>{tabData[activeTab]?.side_heading_m}</h4>

                                        <p className='text-lg sm:text-xl'>{tabData[activeTab]?.description}</p>
                                        <ul>
                                            {tabData[activeTab].points.map((ele,key) =>
                                                <li key={key}><p className='text-sm sm:text-lg mt-3 text-[#6C727A]'>{ele}</p></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start items-center cursor-pointer pt-[20px]">
                        <button
                            onClick={handleClickScroll}
                            className="inline-block font-semibold   px-6 pb-2 pt-2 border-2 border-primary  leading-normal text-white hover:text-white bg-primary hover:bg-primary  disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a] text-[16px]"
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