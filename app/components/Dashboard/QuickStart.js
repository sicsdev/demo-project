import React, { useState } from 'react'
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CodeBracketSquareIcon, EnvelopeOpenIcon, ShareIcon, ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { ArrowSmallRightIcon, BoltIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Cookies from "js-cookie";

const QuickStart = () => {
    const quickStartNotShow = Cookies.get('quick-start-dont-show');
    console.log("quickStartNotShow", quickStartNotShow)
    const [isExpand, setIsExpand] = useState(true);
    const [hideQuicStart, setHideQuicStart] = useState(quickStartNotShow || false);
    console.log("hideQuicStart", hideQuicStart)
    const quickStartData = [
        {
            title: 'Connect Your APIs for Automations',
            content: "Initiate the process by connecting your existing APIs to generate a library of automations.",
            buttonName: "Connect",
            icon: <ShareIcon className='w-6 h-6 text-[#0000EE]' />,
            link: '/dashboard/workflow/integrations',
        },
        {
            title: 'Upload FAQ to Knowledge Base',
            content: "Enhance your customer service by uploading frequently asked questions to Tempo's Knowledge Base.",
            buttonName: "Upload",
            icon: <BookOpenIcon className='w-6 h-6 text-[#0000EE]' />,
            link: '/dashboard/knowledge-center',
        },
        {
            title: 'Upload Email or Ticket History',
            content: "Improve your bot's performance by uploading past email or ticket history for more accurate and contextual responses.",
            buttonName: "Upload",
            icon: <EnvelopeOpenIcon className='w-6 h-6 text-[#0000EE]' />,
            link: '/dashboard',
        },
        {
            title: 'Create Your First Workflow',
            content: "Combine automations to create your initial workflow, making your operations more efficient from day one.",
            buttonName: "Create",
            icon: <CodeBracketSquareIcon className='w-6 h-6 text-[#0000EE]' />,
            link: '/dashboard/workflow/workflow-builder',
        },
        {
            title: 'Invite Team Members to Tempo',
            content: "Get your team onboard with Tempo to maximize the benefits of automated workflows.",
            buttonName: "Invite",
            icon: <UserGroupIcon className='w-6 h-6 text-[#0000EE]' />,
            link: '/dashboard/members',
        }
    ];

    return (
        <>
            {hideQuicStart === false && (
                <div className="bg-white w-full sm:w-2/3 m-auto border-2 rounded-lg border-[#F0F0F1] mt-5">
                    <div className={`py-4 px-6 block sm:flex justify-between items-center gap-4 ${isExpand === true ? 'border-b border-[#F0F0F1]' : ''}`}>
                        <div className='flex items-center justify-center gap-2 mb-2 sm:mb-0'>
                            <BoltIcon className='text-[#FF822D] w-5' />
                            <p className='text-base font-medium text-[#151D23]'>Quick Start</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <button
                                className='inline-block font-semibold bg-white text-sm px-5 pb-2 pt-3 leading-normal text-[#151D23] disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg border-[#F0F0F1] hover:opacity-80'
                                onClick={(e) => {
                                    setHideQuicStart(true)
                                    Cookies.set('quick-start-dont-show', true)
                                }
                                }
                            >
                                Don't Show Again
                            </button>
                            <button
                                className='flex items-center gap-2 justify-center font-semibold bg-white text-sm px-5 pb-2 pt-3 leading-normal text-[#151D23] disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg border-[#F0F0F1] hover:opacity-60'
                                onClick={(e) => setIsExpand(!isExpand)}
                            >
                                {isExpand === true ? (
                                    <>
                                        Collapse
                                        <ChevronUpIcon className='w-5 h-5' />
                                    </>
                                ) : (
                                    <>
                                        Expand
                                        <ChevronDownIcon className='w-5 h-5' />
                                    </>
                                )}

                            </button>
                        </div>
                    </div>
                    <div className={`overflow-hidden ${isExpand === true ? 'visible h-auto pt-6' : 'invisible h-0'}`} style={{ transition: `all 0.2s ease-out 0s` }}>
                        <p className='px-6 text-[#151D23] text-sm pb-5'>A few essential steps to get you up and running with Tempo immediately.</p>
                        {quickStartData?.map((ele, key) =>
                            <div className='cursor-pointer hover:bg-[#151d230a] border-b border-[#F0F0F1] py-3' key={key}>
                                <div className='px-6 flex items-center gap-4 justify-between'>
                                    <div className='flex items-start gap-1'>
                                        {ele?.icon}
                                        <div className='px-3'>
                                            <h3 className='text-[#151D23] text-sm !font-semibold'>{ele?.title}</h3>
                                            <p className='font-medium text-sm pt-1 text-[#151d23cc]'>
                                                {ele?.content}
                                            </p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <Link href={ele?.link} className='text-[#007c8f] flex items-center justify-center gap-1 font-semibold text-sm hover:opacity-80'>
                                            {ele?.buttonName}
                                            <ArrowSmallRightIcon className='h-5 w-5 font-bold text-[#007c8f]' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default QuickStart