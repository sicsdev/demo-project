import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { BriefcaseIcon, ChartBarIcon, ChatBubbleLeftRightIcon, ChevronRightIcon, ClipboardDocumentIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

const RightSidebar = ({ children }) => {
    const [innerSide, setInnerSide] = useState({
        id: null,
        value: null
    })
    const list = [
        { "key": "Channels", "name": "Channels", icon: <ChartBarIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Forms", "name": "Forms", icon: <ClipboardDocumentIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Messages", "name": "Messages", icon: <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Users", "name": "Users", icon: <UsersIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Workflow controls", "name": "Workflow controls", icon: <BriefcaseIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Calendly", "name": "Calendly", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Giphy", "name": "Giphy", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "GitHub", "name": "GitHub", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "GitLab", "name": "GitLab", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Google Sheets", "name": "Google Sheets", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "JIRA Cloud", "name": "JIRA Cloud", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "PagerDuty", "name": "PagerDuty", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> },
        { "key": "Salesforce", "name": "Salesforce", icon: <ShieldCheckIcon className="h-5 w-5 text-gray-500" /> }
    ]

    return (
        <>
            <nav
                id="sidenav-7"
                className=" overflow-y-scroll pt-[5rem] hidden sm:block md:block lg:block fixed right-0 top-0 h-screen w-72 translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:-translate-x-0 dark:bg-zinc-800 p-2"
                data-te-sidenav-init
                data-te-sidenav-hidden="false"
                data-te-sidenav-right="true">
                <ul className="relative m-0 list-none px-[0.2rem]  ">
                    <li className='cursor-pointer'>
                        <form>
                            <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="search" className="block w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-sm text-gray-900 border border-border rounded-lg" placeholder="Search" required />
                                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700   font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                            </div>
                        </form>
                    </li>
                    {innerSide.value === null ?
                        <>
                            <p className='text-sm text-border my-4'>Steps are actions you can add to a workflow. Choose steps that work in Slack, third-party apps, or custom apps.</p>

                            {list.map((ele, key) =>
                                <li className='my-4 cursor-pointer ' onClick={(e) => {
                                    setInnerSide(prev => {
                                        return {
                                            ...prev,
                                            id: key,
                                            value: ele
                                        }
                                    })
                                }} key={key} >
                                    <div className='flex justify-between items-center'>
                                        <div className='flex justify-between items-center gap-2'>
                                            {ele.icon}
                                            <p className='text-heading text-sm'>{ele.name}</p>
                                        </div>
                                        <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                                    </div>
                                </li>
                            )}
                        </> :
                        <>
                            <div className='flex justify-start items-center my-2 gap-2'>
                                <span className='cursor-pointer' onClick={(e) => {
                                    setInnerSide(prev => {
                                        return {
                                            ...prev,
                                            id: null,
                                            value: null
                                        }
                                    })
                                }}><ChevronLeftIcon className="h-5 w-5 text-gray-500" /></span> {innerSide?.value.icon}
                                <p className='text-heading font-semibold text-md'>{innerSide?.value.name}</p>
                            </div>
                            {list.slice(0, 5).map((ele, key) =>
                                <li className='my-4 cursor-pointer border border-border rounded-md p-2 bg-[#F8F8F8]' key={key} >
                                    <div className='flex justify-between items-center gap-4'>
                                        <div>  {ele.icon}</div>
                                        <div>
                                            <h3 className='text-[14px] font-normal'>Lorem ipsum dolor sit amet</h3>
                                            <p className='text-border text-[12px]'>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </>}
                </ul>
            </nav>
            <div className='w-[auto] sm:w-[75%] md:w-[75%] lg:w-[75%]'>
                {children}
            </div>
        </>
    )
}

export default RightSidebar