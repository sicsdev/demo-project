import React, { useState } from 'react'
import IntegrationTab from './Tabs/IntegrationTab/IntegrationTab'

const WorkflowTemplatesSidebar = () => {
    const [tab, setTab] = useState(0)

    const handleChangeTab = (tabNumber) => {
        setTab(tabNumber)
    }

    return (
        <div>

            <nav
                id="sidenav-7"
                className={`mt-[60px]  z-50 sm:mt-[9px] md:mt-[9px] lg:mt-[9px] transition-all duration-150 ease-in-out overflow-y-scroll w-full sm:w-72 pt-[1rem]  hidden sm:block md:block lg:block fixed right-0 top-0 h-screen  translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:-translate-x-0 dark:bg-zinc-800 p-2`} style={{ minWidth: '350px' }}

                data-te-sidenav-init
                data-te-sidenav-hidden="false"
                data-te-sidenav-right="true">
                <div className={`w-full sm:w-72 sm:pr-4 md:pr-4 lg:pr-4`} style={{ minWidth: '350px' }}>


                    {/* TAB SELECTOR */}
                    <div className={`w-full  border-b-2 border-border dark:border-gray-700 flex items-center justify-between mt-2 mb-5`}>
                        <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-xs font-[500] text-center  text-[#5b5e69]">

                            < li className={`${tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => handleChangeTab(0)}>
                                <span
                                    className={`flex justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-2  items-center py-2  
                  rounded-lg active  group`}
                                    aria-current="page"
                                >
                                    Integrations
                                </span>
                            </li>

                            <li className={`${tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => handleChangeTab(1)}>
                                <span
                                    className={`flex  justify-start gap-2  
                   cursor-pointer items-center py-2 px-2 rounded-lg active pl-2 group hover:bg-[#038ff408]`}
                                    aria-current="page"
                                >
                                    Settings
                                </span>
                            </li>

                            <li className={`hover:text-black  ${tab === 2 ? "boredractive" : 'boredrinactive '}`} onClick={() => handleChangeTab(2)}>
                                <span
                                    className={`flex justify-start gap-2    hover:bg-[#038ff408] cursor-pointer items-center py-2 px-2  
                  rounded-lg active pl-2 group`}
                                    aria-current="page"
                                >
                                    Negatives
                                </span>
                            </li>

                        </ul>
                    </div>



                    {/* TABS */}

                    {tab == 0 &&
                        <>
                            <IntegrationTab></IntegrationTab>
                        </>
                    }

                    {tab == 1 &&
                        <>
                            Settings
                        </>
                    }

                    {tab == 2 &&
                        <>
                            Negatives
                        </>
                    }
                    {/* TABS CONTENTS */}

                </div>
            </nav>

        </div>
    )
}

export default WorkflowTemplatesSidebar