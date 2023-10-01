import React, { useState, useEffect } from 'react'
import { CheckBadgeIcon, ChevronDownIcon, ChevronUpIcon, EnvelopeOpenIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ArrowSmallRightIcon, BoltIcon, EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import SkeletonLoader from '../Skeleton/Skeleton';
import Card from '../Common/Card/Card';

import { ArrowSmallLeftIcon, ChartBarIcon, ChevronDoubleDownIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import {
    ArrowDownOnSquareIcon,
    BanknotesIcon,
    BriefcaseIcon,
    DevicePhoneMobileIcon,
    ShareIcon,
    DocumentTextIcon,
    WrenchScrewdriverIcon,
    UserGroupIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ClipboardIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    CodeBracketSquareIcon,
    BookOpenIcon,
    AcademicCapIcon,
    ChatBubbleBottomCenterIcon,
    InboxIcon,
    UsersIcon,
    CodeBracketIcon,
    BuildingOffice2Icon,
    AdjustmentsHorizontalIcon,
    PhoneIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import ChatBots from './ChatBots';
import { ManageExpand } from '@/app/API/pages/EnterpriseService';
const QuickStart = () => {
    const [recentlyView, setRecntlyView] = useState(null)
    const [hideQuicStart, setHideQuicStart] = useState(false);
    const integrations = useSelector(state => state.integration)
    const workflow = useSelector(state => state.workflow)
    const members = useSelector((state) => state.members);
    const user = useSelector(state => state.user.data)

    const [isExpand, setIsExpand] = useState(true);
    const quickStartData1 = [
        {
            title: 'Complete Your Profile',
            content: "Finalize your setup by filling out your business information in your Tempo profile.",
            buttonName: "Complete",
            icon: <ShareIcon className='w-5 h-5 ' />,
            link: '/dashboard/billing/settings',
        },
        {
            title: 'Customize Your New Bot',
            content: "After creating your new bot, set its display settings and where you want it to show on your website.",
            buttonName: "Customize",
            icon: <BookOpenIcon className='w-5 h-5 ' />,
            link: "/dashboard/chat-settings",
        },
        {
            title: 'Configure Email Settings',
            content: "Enter a subdomain to fully begin using your Smart Inbox.",
            buttonName: "Configure",
            icon: <EnvelopeOpenIcon className='w-5 h-5 ' />,
            link: "/dashboard/email-settings",
        },
        {
            title: 'Configure Phone Settings',
            content: "Select a Tempo phone number to get started with Smart IVR.",
            buttonName: "Configure",
            icon: <CodeBracketSquareIcon className='w-5 h-5 ' />,
            link: '/dashboard/workflow/manage-phones',
        },
    ];
    const quickStartData = [
        {
            title: 'Connect Your APIs for Automations',
            content: "Initiate the process by connecting your existing APIs to generate a library of automations.",
            buttonName: "Connect",
            icon: <ShareIcon className='w-5 h-5 ' />,
            link: '/dashboard/workflow/integrations',
        },
        {
            title: 'Upload FAQ to Knowledge Base',
            content: "Enhance your customer service by uploading frequently asked questions to Tempo's Knowledge Base.",
            buttonName: "Upload",
            icon: <BookOpenIcon className='w-5 h-5 ' />,
            link: "/dashboard/basic-knowledge",
        },
        {
            title: 'Upload Email or Ticket History',
            content: "Improve your bot's performance by uploading past email or ticket history for more accurate and contextual responses.",
            buttonName: "Upload",
            icon: <EnvelopeOpenIcon className='w-5 h-5 ' />,
            link: "/dashboard/basic-knowledge",
        },
        {
            title: 'Create Your First Workflow',
            content: "Combine automations to create your initial workflow, making your operations more efficient from day one.",
            buttonName: "Create",
            icon: <CodeBracketSquareIcon className='w-5 h-5 ' />,
            link: '/dashboard/workflow/workflow-builder',
        },
        {
            title: 'Invite Team Members to Tempo',
            content: "Get your team onboard with Tempo to maximize the benefits of automated workflows.",
            buttonName: "Invite",
            icon: <UserGroupIcon className='w-5 h-5 ' />,
            link: '/dashboard/members',
        }
    ];


    const SideBarRoutes = [
        {
            href: '/dashboard/workflow/integrations',
            name: "Workflow Builder",
            icon: <CodeBracketSquareIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/workflow/integrations",
            name: "Integrations",
            icon: <ShareIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/workflow/workflow-builder",
            name: "Workflows",
            icon: <BriefcaseIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Learning Center",
            icon: <BookOpenIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Learning Center",
            icon: <AcademicCapIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/basic-knowledge",
            name: "Knowledge Base",
            icon: <BookOpenIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        }, {
            href: "/dashboard/chat-bots",
            name: "Agents",
            icon: <AdjustmentsHorizontalIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/manage-phones",
            name: "Phone",
            icon: <DevicePhoneMobileIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/",
            name: "Logs",
            icon: <BookOpenIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        }, {
            href: "/dashboard/analytics",
            name: "Chat Logs",
            icon: <ChartBarIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/billing/usage",
            name: "Billing",
            icon: <BanknotesIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        }, {
            href: "/dashboard/billing/usage",
            name: "Usage",
            icon: <CurrencyDollarIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/billing/settings",
            name: "Billing",
            icon: <WrenchScrewdriverIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Organization Settings",
            icon: <BookOpenIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/members",
            name: "Team",
            icon: <UserGroupIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "https://docs.usetempo.ai/reference",
            name: "API References",
            icon: <CodeBracketIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        }
    ];
    const [skeltonLoading, setSkeltonLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setSkeltonLoading(false);
        }, 2500);
    }, []);
    useState(() => {
        if (Cookies.get('visit')) {
            setRecntlyView(JSON.parse(Cookies.get('visit')))
        }
    })
    const setHideShow = (value) => {
        console.log(value)
        if (value === 0) {
            if (integrations?.data?.results?.length > 0) {
                return false
            }

        }
        if (value === 3) {
            if (workflow?.data?.results?.length > 0) {
                return false
            }
        }
        // if (value === 4) {
        //     if (members?.data.length > 0) {
        //         return false
        //     }
        // }
        return true
    }
    const findIcon = (route) => {
        const findData = SideBarRoutes.find((x) => x.href === route)
        if (findData) {
            return findData.icon
        }
        return <CheckBadgeIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />
    }

    const ExpandChange = async () => {
        setIsExpand(!isExpand)
        const response = await ManageExpand({ show_quick_start: !isExpand })

    }

    useEffect(() => {
        if (user) {
            setIsExpand(user?.show_quick_start)
        }
    }, [user])
    return (
        <>

            {skeltonLoading ?
                <>
                    <div className="bg-white w-full sm:w-2/3 m-auto border rounded-lg border-[#F0F0F1] mt-5">
                        <div className={`py-4 px-6 flex justify-between items-center gap-4 ${isExpand === true ? 'border-b border-[#F0F0F1]' : ''}`}>
                            <div className='flex items-center justify-center gap-2'>
                                <SkeletonLoader count={1} height={40} width={100} />
                            </div>
                            <div className='flex items-center gap-4'>
                                <SkeletonLoader count={1} height={40} width={100} />
                            </div>
                        </div>
                        <div className={`overflow-hidden ${isExpand === true ? 'visible h-auto pt-6' : 'invisible h-0'}`} style={{ transition: `all 0.2s ease-out 0s` }}>
                            <p className='px-6 text-[#151D23] text-sm pb-5'>
                                <SkeletonLoader count={1} height={20} width="80%" />
                            </p>
                            <div>
                                <div className='px-6 cursor-pointer hover:bg-[#151d230a] border-b border-[#F0F0F1] py-3 grid grid-cols-[80%,20%] justify-between'>
                                    <SkeletonLoader count={3} height={40} width="80%" />
                                    <SkeletonLoader count={3} height={40} width="100%" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-[#F8F8F8]  w-full sm:w-2/3 m-auto border rounded-lg border-[#F0F0F1] mt-5">
                        <div className={`py-4 px-6  items-center gap-4 `}>
                            <div className=''>
                                <SkeletonLoader count={1} height={30} width={"30%"} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 mt-2'>
                            <div className='bg-[#FFF] w-full m-auto border rounded-lg border-[#F0F0F1]  cursor-pointer p-2'>
                                <SkeletonLoader count={1} height={15} width={"50%"} />
                                <div className='my-3'>
                                    <SkeletonLoader count={1} height={20} width={"60%"} />
                                </div>
                                <SkeletonLoader count={1} height={40} width={"20%"} />
                                <SkeletonLoader count={1} height={30} width={"50%"} />
                            </div>
                            <div className='bg-[#FFF] w-full m-auto border rounded-lg border-[#F0F0F1] cursor-pointer p-2'>
                                <SkeletonLoader count={1} height={15} width={"50%"} />
                                <div className='my-3'>
                                    <SkeletonLoader count={1} height={20} width={"60%"} />
                                </div>
                                <SkeletonLoader count={1} height={40} width={"20%"} />
                                <SkeletonLoader count={1} height={30} width={"50%"} />
                            </div>
                            <div className='bg-[#FFF] w-full m-auto border rounded-lg border-[#F0F0F1] cursor-pointer p-2'>
                                <SkeletonLoader count={1} height={15} width={"50%"} />
                                <div className='my-3'>
                                    <SkeletonLoader count={1} height={20} width={"60%"} />
                                </div>
                                <SkeletonLoader count={1} height={40} width={"20%"} />
                                <SkeletonLoader count={1} height={30} width={"50%"} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#F8F8F8]  w-full sm:w-2/3 m-auto border rounded-lg border-[#F0F0F1] mt-5">
                        <div className={`py-4 px-6 flex justify-between items-center gap-4 ${isExpand === true ? 'border-b border-[#F0F0F1]' : ''}`}>
                            <div className='flex items-center justify-center gap-2'>
                                <SkeletonLoader count={1} height={40} width={100} />
                            </div>
                            <div className='flex items-center gap-4'>
                                <SkeletonLoader count={1} height={40} width={100} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 p-4  bg-white gap-4">
                            <div className=' border rounded-md border-border '>
                                <div className="bg-border rounded-t-md   py-2 cursor-pointer  w-full border border-border text-xs text-white gap-1 items-center">
                                    <div className={` px-2 flex justify-between items-center gap-2`}>
                                        <div className='flex items-center justify-center gap-2'>
                                            <SkeletonLoader count={1} height={18} width={100} />
                                        </div>
                                        <div className='flex items-center gap-4'>


                                            <SkeletonLoader count={1} height={18} width={100} />
                                            <SkeletonLoader count={1} height={18} width={100} />
                                        </div>
                                    </div>
                                </div>
                                <div className='py-2 px-4'>
                                    <SkeletonLoader count={1} height={10} width={200} />
                                </div>
                                <div className='py-2 px-4'>
                                    <SkeletonLoader count={1} height={10} width={"90%"} />
                                    <SkeletonLoader count={1} height={10} width={"70%"} />
                                    <SkeletonLoader count={1} height={10} width={"50%"} />
                                    <SkeletonLoader count={1} height={10} width={"80%"} />
                                </div>
                            </div>
                            <div className=' border rounded-md border-border '>
                                <div className="bg-border rounded-t-md   py-2 cursor-pointer  w-full border border-border text-xs text-white gap-1 items-center">
                                    <div className={` px-2 flex justify-between items-center gap-2`}>
                                        <div className='flex items-center justify-center gap-2'>
                                            <SkeletonLoader count={1} height={18} width={100} />
                                        </div>
                                        <div className='flex items-center gap-4'>




                                            <SkeletonLoader count={1} height={18} width={100} />
                                            <SkeletonLoader count={1} height={18} width={100} />
                                        </div>
                                    </div>
                                </div>
                                <div className='py-2 px-4'>
                                    <SkeletonLoader count={1} height={10} width={200} />
                                </div>
                                <div className='py-2 px-4'>
                                    <SkeletonLoader count={1} height={10} width={"90%"} />
                                    <SkeletonLoader count={1} height={10} width={"70%"} />
                                    <SkeletonLoader count={1} height={10} width={"50%"} />
                                    <SkeletonLoader count={1} height={10} width={"80%"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :

                <>
                    <div className="bg-white w-full lg:w-[760px] m-auto border rounded-lg border-[#F0F0F1] mt-5">
                        <div
                            className={`py-4 flex  justify-between  px-6  items-center gap-4 ${isExpand === true ? "border-b border-[#F0F0F1]" : ""

                                }`}

                        >

                            <div className="flex items-center  gap-2">

                                <BoltIcon className="text-[#FF822D] w-5" />

                                <p className="text-base font-medium text-[#151D23]">

                                    Quick Start

                                </p>

                            </div>

                            <div className="flex items-center gap-4 ">

                                <button

                                    className="flex items-center gap-2 justify-center font-semibold bg-white text-xs px-5 pb-2 pt-2 border-[#F0F0F1] leading-normal text-[#151D23] disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg  hover:opacity-60"

                                    onClick={(e) => ExpandChange()}

                                >

                                    {isExpand === true ? (

                                        <>

                                            <p className="hidden sm:block "> Collapse</p>

                                            <ChevronUpIcon className="w-5 h-5" />

                                        </>

                                    ) : (

                                        <>

                                            <p className="hidden sm:block"> Expand</p>



                                            <ChevronDownIcon className="w-5 h-5" />

                                        </>

                                    )}

                                </button>

                            </div>

                        </div>
                        {user && user?.enterprise?.slug_domain === "" ?
                            <div

                                className={`overflow-hidden ${isExpand === true ? "visible h-auto pt-6" : "invisible h-0"

                                    }`}

                                style={{ transition: `all 0.2s ease-out 0s` }}

                            >
                                {user?.enterprise?.country === '' && (
                                    <p className="px-6 text-[#151D23] text-sm pb-5">

                                        Please enter your address first in business profile.

                                    </p>
                                )}

                                {quickStartData1?.map((ele, key) => (

                                    <div key={key}>
                                        {user?.enterprise?.country === '' && key === 3 ? null :
                                            <div>

                                                {setHideShow(key) === true && (

                                                    ele.title === "Create Your First Workflow" && user && user?.email?.split("@")[1] !== 'joinnextmed.com' ? "" : (
                                                        <div

                                                            className="cursor-pointer hover:bg-[#151d230a] border-b border-[#F0F0F1] py-3"

                                                            key={key}

                                                        >

                                                            <div className="px-6 sm:grid grid-cols-[70%,30%] items-center sm:gap-40">

                                                                <div className="flex gap-2  items-start">

                                                                    <span>{ele?.icon}</span>

                                                                    <div className="">

                                                                        <h3 className="text-[#151D23] text-xs !font-[500]">

                                                                            {ele?.title}

                                                                        </h3>

                                                                        <p className=" text-xs pt-1 text-[#151d23cc]">

                                                                            {ele?.content}

                                                                        </p>

                                                                    </div>

                                                                </div>

                                                                <div className="w-[26%] sm:w-[36%] sm:ml-0 ml-[28px] ">

                                                                    <Link

                                                                        href={ele?.link}

                                                                        className="text-[#007c8f] flex items-center justify-between   gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80"

                                                                    >
                                                                        {ele?.buttonName}

                                                                        <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />

                                                                    </Link>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    )


                                                )}

                                            </div>
                                        }
                                    </div>))}

                            </div>
                            :

                            <div

                                className={`overflow-hidden ${isExpand === true ? "visible h-auto pt-6" : "invisible h-0"

                                    }`}

                                style={{ transition: `all 0.2s ease-out 0s` }}

                            >

                                <p className="px-6 text-[#151D23] text-sm pb-5">

                                    A few essential steps to get you up and running with Tempo

                                    immediately.

                                </p>

                                {quickStartData?.map((ele, key) => (

                                    <div>

                                        {setHideShow(key) === true && (
                                            ele.title === "Create Your First Workflow" && user && user?.email?.split("@")[1] !== 'joinnextmed.com' ? "" : (
                                                <div

                                                    className="cursor-pointer hover:bg-[#151d230a] border-b border-[#F0F0F1] py-3"

                                                    key={key}

                                                >

                                                    <div className="px-6 sm:flex justify-between items-center sm:gap-0">

                                                        <div className="sm:w-[70%] flex gap-2  items-start">

                                                            <span>{ele?.icon}</span>

                                                            <div className="">

                                                                <h3 className="text-[#151D23] text-xs !font-[500]">

                                                                    {ele?.title}

                                                                </h3>

                                                                <p className=" text-xs pt-1 text-[#151d23cc]">

                                                                    {ele?.content}

                                                                </p>

                                                            </div>

                                                        </div>

                                                        <div className="sm:w-[10%] sm:ml-0 ml-[28px] ">

                                                            <Link

                                                                href={ele?.link}

                                                                className="text-[#007c8f] flex items-center justify-start sm:justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80"

                                                            >
                                                                {ele?.buttonName}

                                                                <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />

                                                            </Link>

                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        )}

                                    </div>

                                ))}

                            </div>
                        }
                    </div>
                    {recentlyView && (
                        <div className='bg-[#F8F8F8] w-full lg:w-[760px] m-auto border rounded-lg border-[#F0F0F1] mt-5 cursor-pointer'>
                            <div className='py-4 px-6'>
                                <div className="flex items-center  gap-2">
                                    <EyeIcon className="text-[#FF822D] w-5" />
                                    <p className="leading-[0px] text-base font-medium text-[#151D23]">Recently Viewed</p>
                                </div>
                                <div className='flex gap-4'>
                                    {recentlyView.map((ele, key) =>
                                        <div className={`${key > 1 && 'hidden sm:flex'} sm:w-[200px] flex-col bg-white p-3 border hover:bg-[#151d230a]  shadow-sm hover:border-border  rounded-lg border-[#F0F0F1] mt-5`} key={key}>
                                            {ele?.subheading && (<p className='text-border  font-semibold text-[12px]'>{ele.subheading}</p>)}
                                            <p className='mt-2 text-base font-medium text-[#151D23]'>{ele.name}</p>
                                            {findIcon(ele.route)}
                                            <Link href={ele.route}>
                                                <div className='mt-2'>
                                                    <button className={' border border-border rounded-md bg-sidebarroute text-white py-2 px-6 font-semibold text-xs'}>Manage</button>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <ChatBots />
                </>
            }
        </>
    )
}

export default QuickStart