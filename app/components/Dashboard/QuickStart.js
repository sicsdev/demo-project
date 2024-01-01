import React, { useState, useEffect , useRef} from 'react'
import { ArrowRightIcon, CalendarDaysIcon, ChatBubbleLeftIcon, CheckBadgeIcon, ChevronDownIcon, ChevronUpIcon, DocumentMagnifyingGlassIcon, EnvelopeIcon, EnvelopeOpenIcon, InformationCircleIcon, LockClosedIcon, ShoppingCartIcon, SignalIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ArrowSmallRightIcon, BoltIcon, EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import SkeletonLoader from '../Skeleton/Skeleton';
import Card from '../Common/Card/Card';
import { useDispatch } from 'react-redux';
import {
    BanknotesIcon,
    BriefcaseIcon,
    DevicePhoneMobileIcon,
    ShareIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    CodeBracketSquareIcon,
    BookOpenIcon,
    AcademicCapIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/outline";
import ChatBots from './ChatBots';
import { ManageExpand, getCustomerFiles, setDomainSlug, uploadImage } from '@/app/API/pages/EnterpriseService';
import { fetchMembers } from '../store/slices/memberSlice';
import Modal from '../Common/Modal/Modal';
import MetaDataInfo from './MetaDataInfo';
import Method from '../NewPaymentMethod/Method';
import ProgressBarComponent from '../ProgressBar/ProgressBarComponent';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProfile } from '../store/slices/userSlice';
import { fetchBot } from '../store/slices/botIdSlice';
import TopBar from '../Common/Card/TopBar';
import StripeWrapper from '../Stripe/Wrapper/StripeWrapper';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { elements } from 'chart.js';

const QuickStart = ({ loadingScrapper, setloadingScrapper, finishingScrapping, finishedScrapper }) => {
    const divRef = useRef();
    // Helpers
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useSearchParams()
    const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
    const [stripePromise, setStripePromise] = useState(null)
    // let stripePromise = loadStripe(STRIPE_KEY)


    // Local states
    const [recentlyView, setRecntlyView] = useState(null)
    const [hideQuicStart, setHideQuicStart] = useState(false);
    const integrations = useSelector(state => state.integration)
    const workflow = useSelector(state => state.workflow)
    const billingState = useSelector((state) => state.billing)
    const members = useSelector((state) => state.members);
    const user = useSelector(state => state.user.data)
    const userLoader = useSelector(state => state.user)
    const botData = useSelector(state => state.botId)
    const progressScrappingKnowledge = useSelector((state) => state.knowledgeScrapper.loader);
    const knowledgeScrapperState = useSelector((state) => state.knowledgeScrapper);

    const [showTicketHistory, setShowTicketHistory] = useState(false)
    const [metaDataInfoModal, setMetaDataInfoModal] = useState(false)
    const [openInputConfigDomain, setOpenInputConfigDomain] = useState(false)
    const [domainFromEmail, setDomainFromEmail] = useState('')
    const [loadingData, setLoadingData] = useState(true)
    const [profileComplete, setProfileComplete] = useState(false)

    const [isExpand, setIsExpand] = useState(true);
const [showWidget, setShowWidget] = useState(false);

    const SideBarRoutes = [
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
            icon: <AcademicCapIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/basic-knowledge/source",
            name: "Knowledge Base",
            icon: <BookOpenIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        , {
            href: "/dashboard/chat-settings",
            name: "Chat",
            icon: <ChatBubbleLeftIcon className="mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover " />,
            isLink: false,
        },
        {
            href: "/dashboard/email-settings",
            name: "Email",
            icon: <EnvelopeIcon className="mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover " />,
            isLink: false,
        },
        {
            href: "/dashboard/manage-phones",
            name: "Phone",
            icon: <DevicePhoneMobileIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/analytics",
            name: "Logs",
            icon: <BookOpenIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/billing/usage",
            name: "Billing",
            icon: <CurrencyDollarIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        }, {
            href: "/dashboard/billing/usage",
            name: "Usage",
            icon: <BanknotesIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/billing/usage",
            name: "Billing",
            icon: <BanknotesIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
        },
        {
            href: "/dashboard/scheduling-settings",
            name: "Scheduling",
            icon: <CalendarDaysIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />,
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

    //// Use effects
    // Params and local storages


    useEffect(() => {
        const triggerBotParam = params.get('triggerBot')
        if (triggerBotParam) {
            sessionStorage.setItem('triggerFirstTimeWorkflow', 'true')
        }

        if (Cookies.get('visit')) {
            setRecntlyView(JSON.parse(Cookies.get('visit')))
        }

    }, []);

    useEffect(() => {
        if (showWidget) {
           
          window.scrollTo({ top: 500, behavior: 'smooth' });
        }
      }, [showWidget]);


    // outside click event for bottom text  
      const handleClickOutside = (event) => {
        
        if (divRef.current && !divRef.current.contains(event.target)) {
          setShowWidget(false);
        console.log("outside");
        }
      };
    
      useEffect(() => {
        // Attach the click event listener to the document
        document.addEventListener('click', handleClickOutside);
    
        // Cleanup the event listener when the component is unmounted
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);



    // Control loader after load data from redux
    useEffect(() => {
        if (userLoader.isLoading == false && members.isLoading == false && workflow.isLoading == false && integrations.isLoading == false && billingState !== null && botData.botData.isLoading == false) {
            setLoadingData(false)
        }
        if (integrations?.data?.results?.length > 0 && workflow?.data?.results?.length > 0 && workflow?.data?.results[0]?.automations?.length > 0 && members?.data?.length > 1 && !showTicketHistory) {
            setProfileComplete(true)
        }


    }, [members.isLoading, userLoader.isLoading, integrations?.data?.results, workflow?.data?.results, workflow?.data?.results, members?.data, botData.botData, billingState]);


    useEffect(() => {
        loadStripe(STRIPE_KEY).then(res => setStripePromise(res))
    }, [])

    useEffect(() => {
        if (user?.show_quick_start) { setIsExpand(true) } else { setIsExpand(false) }
    }, [user])
    


    // Main functions

    const findIcon = (route) => {
        const findData = SideBarRoutes.find((x) => x?.href === route)
        if (findData) {
            return findData.icon
        }
        return <CheckBadgeIcon className='mt-2 p-2 w-10 h-10 text-white font-bold rounded-md  bg-sidebar-hover ' />
    }

    const ExpandChange = async () => {
        setIsExpand(!isExpand)
        const response = await ManageExpand({ show_quick_start: !isExpand })
    }

    const handleInputDomainValue = (e) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        const inputValue = e.target.value;

        if (emailRegex.test(inputValue)) {
            const parts = inputValue.split('@');
            const domainPart = parts[1];

            const domainParts = domainPart.split('.');
            const mainDomain = domainParts[domainParts.length - 2];

            setDomainFromEmail(mainDomain)
        } else {
            ''
        }
    }

    const handleDomainSlug = async () => {
        let fetch = await setDomainSlug({ domain_slug: domainFromEmail })
        dispatch(fetchProfile());
    }



    return (
        <Elements stripe={stripePromise}>
            <>
                <TopBar loader={loadingData} title={`Home`} icon={<UsersIcon className="h-5 w-5 text-primary" />} />
                {!loadingData ? (
                    <>


                        {
                            billingState == "demo" && !user?.enterprise?.information_filled && !knowledgeScrapperState?.data &&
                            <div className="bg-white w-full lg:w-[950px] m-auto border rounded-lg border-[#F0F0F1] mt-5">
                                <div className={`py-4 flex  justify-between  px-6  items-center gap-4 border-b bg-[#F8F8F8] border-[#F0F0F1]`}>
                                    <div className='w-full mx-5'>
                                        <span className="text-center text-sm flex justify-center">
                                            {loadingData ?
                                                <SkeletonLoader className="mr-2" count={1} height={30} width={120} />
                                                :
                                                <div>
                                                    Your automatic data retrieval attempt failed. Please set up manually at
                                                    <span className='text-primary mx-1 cursor-pointer' onClick={() => router.push('/dashboard/basic-knowledge/source')}>
                                                        Learning Center
                                                    </span>
                                                </div>
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }




                        {loadingScrapper && billingState == "demo" &&
                            <div className="bg-white w-full lg:w-[950px] m-auto border rounded-lg border-[#F0F0F1] mt-5">
                                <div className={`py-4 flex  justify-between  px-6  items-center gap-4 border-b bg-[#F8F8F8] border-[#F0F0F1]`}>
                                    <div className='w-full mx-5'>
                                        <span className="flex justify-center text-sm mb-2">
                                            Please wait while we configure your custom Deflection bot.
                                        </span>
                                        <ProgressBarComponent finishing={finishingScrapping} finished={finishedScrapper} />
                                        <div className='border-b border-lowgray pt-5'></div>
                                    </div>
                                </div>
                            </div>
                        }





                        {/* we will only show suggested actions for account if the profile is not completed */}
                        {(!loadingData && profileComplete) ? null :

                            <div className="bg-white w-full lg:w-[950px] m-auto border rounded-lg border-[#F0F0F1] mt-5">
                                <div className={`py-4 flex  justify-between  px-6  items-center gap-4 ${isExpand === true ? "border-b border-[#F0F0F1]" : ""}`}>
                                    <div className="flex items-center  gap-2">
                                        <BoltIcon className="text-[#FF822D] w-5" />
                                        <p className="text-base font-medium text-[#151D23]">
                                            Quick Start
                                        </p>
                                    </div>
                                    {billingState == "normal" && !profileComplete &&
                                    <div className="flex items-center gap-4 justify-end">
                                        <button
                                            className="flex items-center gap-2 justify-center font-semibold bg-white text-xs px-5 pb-2 pt-2 border-[#F0F0F1] leading-normal text-[#151D23] disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg"
                                            onClick={ExpandChange}>
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
                                }
                                </div>



                                {/* Only not-demo accounts can collapse and expand suggested actions. */}

                              









                                {/********* DEMO ACCOUNTS PANEL ************/}
                                {billingState == "demo" &&
                                    <div className={`${isExpand === true && 'mt-3'}`}>


                                        {stripePromise && <Method></Method>}

                                        <div className={`overflow-hidden ${isExpand === true ? "visible h-auto pt-6" : "invisible h-0"}`} style={{ transition: `all 0.2s ease-out 0s` }}>

                                            <div className="cursor-pointer border-b border-[#F0F0F1] py-3 " >

                                                <p className="px-6 text-[#151D23] text-sm pb-5">
                                                    A few essential steps to get you up and running with Deflection AI immediately.
                                                </p>

                                                {/* Complete your profile  */}
                                                <div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40  py-2 hover:bg-[#151d230a]">
                                                    <div className="flex gap-4 items-start items-center">
                                                        <span><ShareIcon className='w-5 h-5 ' /> </span>
                                                        <div className="">

                                                            <h3 className="text-[#151D23] text-xs !font-[500]">
                                                                Complete Your Profile
                                                            </h3>

                                                            <p className=" text-xs pt-1 text-[#151d23cc]">
                                                                Finalize your setup by filling out your business information in your Deflection AI profile
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <Link href="/dashboard/billing/usage" className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80">
                                                            Complete
                                                            <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                        </Link>
                                                    </div>
                                                </div>



                                                {/* Upload Email or Ticket History */}

                                                <div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40 py-2  hover:bg-[#151d230a]">
                                                    <div className="flex gap-4 items-start items-center">
                                                        <span><EnvelopeIcon className='w-5 h-5 ' /></span>
                                                        <div className="">
                                                            <h3 className="text-[#151D23] text-xs !font-[500]">
                                                                Upload Email or Ticket History
                                                            </h3>
                                                            <p className=" text-xs pt-1 text-[#151d23cc]">
                                                                Improve your bot's performance by uploading past email or ticket history for more accurate and contextual responses.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <LockClosedIcon className='w-3 h-3'></LockClosedIcon>
                                                    </div>
                                                </div>



                                                {/* Configure Email Settings  (Only of enterprise has no domain configured) */}
                                                {user && user?.enterprise?.domain === "" &&
                                                    <div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40 py-2  hover:bg-[#151d230a]">
                                                        <div className="flex gap-4 items-start items-center">
                                                            <span><EnvelopeOpenIcon className='h-5 w-5'></EnvelopeOpenIcon></span>
                                                            <div className="w-full">
                                                                {!openInputConfigDomain ?
                                                                    <>
                                                                        <h3 className="text-[#151D23] text-xs !font-[500]">

                                                                            Configure Email Settings
                                                                        </h3>
                                                                        <p className=" text-xs pt-1 text-[#151d23cc]">
                                                                            Enter a subdomain to fully begin using your Smart Inbox.
                                                                        </p>
                                                                    </>
                                                                    :
                                                                    <input onChange={handleInputDomainValue} type="" id="inputDomain" className="w-full border rounded-[4px] px-[7px] py-1 border-[#C7C6C7] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                                                        placeholder="Enter full Email"
                                                                    />
                                                                }
                                                            </div>

                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                            {openInputConfigDomain ?
                                                                <>
                                                                    <button
                                                                        onClick={() => handleDomainSlug()}
                                                                        className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80"
                                                                        disabled={!domainFromEmail}
                                                                    >
                                                                        Submit
                                                                        <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                                    </button>
                                                                </>
                                                                :
                                                                <button
                                                                    onClick={() => {router.push("/dashboard/email-settings")}}
                                                                    className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80"
                                                                >
                                                                    Configure
                                                                    <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                }













                                {/* *************** PAID ACCOUNTS PANEL **********************/}

                                {(billingState === "normal") &&

                                    <div className={`${isExpand === true && 'mt-3'}`}>

                                        <div className={`overflow-hidden ${isExpand === true ? "visible h-auto pt-6" : "invisible h-0"}`} style={{ transition: `all 0.2s ease-out 0s` }}>

                                            <div className="cursor-pointer border-b border-[#F0F0F1] py-3 " >

                                                <p className="px-6 text-[#151D23] text-sm pb-5">
                                                    A few essential steps to get you up and running with Deflection AI immediately.
                                                </p>


                                                {/* Upload FAQ to Knowledge Base (Only if user has no knowledge uploaded) */}

                                                {integrations?.data?.results?.length < 1 &&
                                                    <div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40 py-2  hover:bg-[#151d230a]">
                                                        <div className="flex w-full gap-4 items-start items-center">
                                                            <span><BookOpenIcon className='w-5 h-5' /></span>
                                                            <div className="w-full">
                                                                <h3 className="text-[#151D23] text-xs !font-[500]">
                                                                    Upload FAQ to Knowledge Base
                                                                </h3>
                                                                <p className="text-xs pt-1 text-[#151d23cc]">
                                                                    Enhance your customer service by uploading frequently asked questions to Deflection AI's Knowledge Base.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                            <Link href="/dashboard/basic-knowledge" className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80">
                                                                Upload
                                                                <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                }


                                                {/* Connect Your APIs for Automations  (Only if there is no workflows and no automations for them*/}

                                                {workflow?.data?.results?.length == 0 && !(workflow?.data?.results[0]?.automations) &&

                                                    < div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40 py-2 hover:bg-[#151d230a]">
                                                        <div className="flex w-full gap-4 items-start items-center">
                                                            <span><ShareIcon className='w-5 h-5' /></span>
                                                            <div className="w-full">
                                                                <h3 className="text-[#151D23] text-xs !font-[500]">
                                                                    Connect Your APIs for Automations
                                                                </h3>
                                                                <p className="text-xs pt-1 text-[#151d23cc]">
                                                                    Initiate the process by connecting your existing APIs to generate a library of automations.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                            <Link href='/dashboard/workflow/integrations' className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80">
                                                                Connect
                                                                <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                }



                                                {/* Create Your First Workflow (only if there is no workflows created, only for joinnextmed accounts*/}

                                                {!workflow?.data?.results && user && (user?.email?.split("@")[1] == 'joinnextmed.com') &&

                                                    < div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40 py-2 hover:bg-[#151d230a]">
                                                        <div className="flex w-full gap-4 items-start items-center">
                                                            <span><CodeBracketSquareIcon className='w-5 h-5' /></span>
                                                            <div className="w-full">
                                                                <h3 className="text-[#151D23] text-xs !font-[500]">
                                                                    Create Your First Workflow
                                                                </h3>
                                                                <p className="text-xs pt-1 text-[#151d23cc]">
                                                                    Combine automations to create your initial workflow, making your operations more efficient from day one.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                            <Link href='/dashboard/workflow/workflow-builder' className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80">
                                                                Create
                                                                <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                }



                                                {/* Invite Team Members to Deflection AI (Only if there is no members but you added) */}

                                                {members?.data?.length < 2 &&
                                                    < div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40 py-2 hover:bg-[#151d230a]">
                                                        <div className="flex w-full gap-4 items-start items-center">
                                                            <span><UserGroupIcon className='w-5 h-5' /></span>
                                                            <div className="w-full">
                                                                <h3 className="text-[#151D23] text-xs !font-[500]">
                                                                    Invite Team Members to Deflection AI
                                                                </h3>
                                                                <p className="text-xs pt-1 text-[#151d23cc]">
                                                                    Get your team onboard with Deflection AI to maximize the benefits of automated workflows.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                            <Link href='/dashboard/members' className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80">
                                                                Invite
                                                                <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                            </Link>
                                                        </div>
                                                    </div>}



                                                {/* Upload Email or Ticket History (Only if there is no upload info for any bot) */}

                                                {showTicketHistory &&
                                                    < div className="px-6 lg:flex md:flex sm:block justify-between items-center sm:gap-40 py-2 hover:bg-[#151d230a]">
                                                        <div className="flex w-full gap-4 items-start items-center">
                                                            <span><EnvelopeOpenIcon className='w-5 h-5 ' /></span>
                                                            <div className="w-full">
                                                                <h3 className="text-[#151D23] text-xs !font-[500]">
                                                                    Upload Email or Ticket History
                                                                </h3>
                                                                <p className="text-xs pt-1 text-[#151d23cc]">
                                                                    Improve your bot's performance by uploading past email or ticket history for more accurate and contextual responses.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end gap-2">
                                                            <Link href='/dashboard/basic-knowledge/source?tab=files' className="text-[#007c8f] flex items-center justify-between gap-1 font-semibold text-xs mt-[20px] sm:mt-0 hover:opacity-80">
                                                                Upload
                                                                <ArrowSmallRightIcon className="h-4 w-5 font-bold text-[#007c8f]" />
                                                            </Link>
                                                        </div>
                                                    </div>}


                                            </div>
                                        </div>
                                    </div>
                                }




                            </div>
                        }



                        {/* ***** EXTRA DATA FOR BOTH TYPE OF ACCOUNTS (PAID AND DEMO) *******/}

                        {recentlyView && (
                            <div className='bg-[#F8F8F8] w-full lg:w-[950px] m-auto border rounded-lg border-[#F0F0F1] mt-5 cursor-pointer'>
                                <div className='py-4 px-6'>
                                    <div className="flex items-center  gap-2">
                                        {loadingData ?
                                            <SkeletonLoader count={1} height={30} width={150} />
                                            :
                                            <>
                                                <EyeIcon className="text-[#FF822D] w-5" />

                                                <p className="leading-[0px] text-base font-medium text-[#151D23]">
                                                    Recently Viewed
                                                </p>
                                            </>
                                        }
                                    </div>
                                    <div className='flex gap-4'>
                                        {recentlyView.map((ele, key) =>
                                            <div className={`${key > 1 && 'hidden sm:flex'} sm:w-[200px] flex-col bg-white p-3 border hover:bg-[#151d230a]  shadow-sm hover:border-border  rounded-lg border-[#F0F0F1] mt-5`} key={key}>
                                                {ele?.subheading && (
                                                    <p className='text-border  font-semibold text-[12px]'>
                                                        {loadingData ?
                                                            <SkeletonLoader count={1} height={20} width="50%" />
                                                            :
                                                            <>
                                                                {ele.subheading}
                                                            </>
                                                        }
                                                    </p>
                                                )}
                                                <p className='mt-2 text-base font-medium text-[#151D23]'>
                                                    {loadingData ?
                                                        <SkeletonLoader count={1} height={25} width="70%" />
                                                        :
                                                        <>
                                                            {ele.name}
                                                        </>
                                                    }
                                                </p>
                                                {loadingData ?
                                                    <SkeletonLoader count={1} height={35} width={40} />
                                                    :
                                                    <>
                                                        {findIcon(ele.route)}
                                                    </>
                                                }
                                                <Link href={ele.route}>
                                                    <div className='mt-2'>
                                                        {loadingData ?
                                                            <SkeletonLoader count={1} height={30} width="50%" />
                                                            :
                                                            <button className={'flex items-center justify-center gap-2 border border-border rounded-md bg-sidebarroute text-white py-2 px-6 font-semibold text-xs'}>
                                                                Go To
                                                                <ArrowRightIcon className='h-4 w-5' />
                                                                </button>
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <ChatBots setSkeleton={setLoadingData} skeleton={loadingData} />


                        {/* <Modal title={`How to pass user's data to your widget`}
                            show={metaDataInfoModal}
                            setShow={setMetaDataInfoModal}
                            showCancel={true}
                            className={"pt-5 lg:w-1/2 m-auto"} >
                           
                        </Modal > */}
                        <div className='w-100 flex justify-center mt-5 align-middle'>
                            <button onClick={() => setShowWidget(!showWidget)} className={'rounded-md text-[#b1b1b1] py-2 px-6 font-semibold flex gap-1 items-center border-[0px]'} style={{ fontSize: '10px' }}>
                                <InformationCircleIcon className='text-[#b1b1b1] w-4 h-4 m-[auto] '></InformationCircleIcon>

                              <p className='mt-[3px]' ref={divRef}>  Learn how to pass user's data to your widget</p>
                            </button>
                        </div>
                      {showWidget === true && <div ><MetaDataInfo /></div>  }
                        
                    </>
                )


                    :

                    ///////////// SKELETON FOR QUICKSTART
                    <>
                        <div className='bg-[#F8F8F8] w-full lg:w-[950px] m-auto border rounded-lg border-[#F0F0F1] mt-5 cursor-pointer pb-5'>
                            <div className='px-5'>
                                <div className="bg-white'flex-column m-auto rounded-lg mt-5">
                                    <SkeletonLoader count={1} height={30} width="25%" />
                                    <div className='flex gap-4 my-3'>
                                        <SkeletonLoader count={1} height={190} width={220} />
                                        <SkeletonLoader count={1} height={190} width={220} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-[#F8F8F8] w-full lg:w-[950px] m-auto border rounded-lg border-[#F0F0F1] mt-5 cursor-pointer pb-5'>
                            <div className='px-5'>
                                <div className="bg-white'flex-column m-auto rounded-lg mt-5">
                                    <SkeletonLoader count={1} height={30} width="25%" />
                                    <SkeletonLoader count={1} height={30} width="25%" />
                                    <div className='flex gap-4 my-3'>
                                        <SkeletonLoader count={1} height={190} width={220} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                }


            </>

        </Elements>

    )
}

export default QuickStart