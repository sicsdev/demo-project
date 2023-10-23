'use client'
import React, { useEffect } from 'react'
import Intake from '../Form/Intake'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../store/slices/userSlice'
import { fetchRecommendation } from '../store/slices/recommendation'
import { fetchIntegrations } from '../store/slices/integrationSlice'
import { fetchWorkflows } from '../store/slices/workflowSlice'
import { fetchIntegrationsTemplates } from '../store/slices/integrationTemplatesSlice'
import NewSidebar from '../Dashboard/AuthLayout/NewSidebar'
import { fetchBot } from '../store/slices/botIdSlice'
import Cookies from 'js-cookie'
import { usePathname, useSearchParams } from 'next/navigation';
import TestingMiniBot from '../Chats/TestingMiniBot'
import { useState } from 'react'
import TestWidgetLayout from './TestWidgetLayout'
import { getAllActiveBots } from '@/app/API/pages/Bot'
import { getUserProfile } from '@/app/API/components/Sidebar'
import { getTestBot } from '@/app/API/components/Minibot'

const Dashboard = ({ children }) => {
    useEffect(() => {

            const inputs = document.querySelectorAll('input, select, textarea');
            if (inputs) {
                inputs.forEach(input => {
                    input.addEventListener('focus', function () {
                        const viewportMeta = document.querySelector('meta[name="viewport"]');
                        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=2.0';
                    });

                    input.addEventListener('blur', function () {
                        const viewportMeta = document.querySelector('meta[name="viewport"]');
                        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                    });
                });
            }
    }, [])
    const dispatch = useDispatch()
    const pathname = usePathname()
    const SideBarRoutes = [

        {
            href: "/dashboard/workflow/integrations",
            name: "Integrations",
            subheading: "Workflow Builder",
            icon: "ShareIcon",
        },
        {
            href: "/dashboard/workflow/workflow-builder",
            name: "Workflows",
            subheading: "Workflow Builder",
            icon: "BriefcaseIcon",
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Learning Center",
            subheading: "Learning Center",
            icon: "BookOpenIcon",
            isLink: false,
        },

        {
            href: "/dashboard/basic-knowledge/source",
            name: "Knowledge Base",
            subheading: "Learning Center",
            icon: "BookOpenIcon",
        },

        {
            href: "/dashboard/chat-settings",
            name: "Agents",
            subheading: "Tempo Chat",
            icon: "AdjustmentsHorizontalIcon",
        },
        {
            href: "/dashboard/email-settings",
            name: "Email Settings",
            icon: "InboxIcon",
            subheading: "Smart Inbox"
        },
        {
            href: "/dashboard/manage-phones",
            name: "Phone",
            icon: "DevicePhoneMobileIcon",
            subheading: "Smart IVR"
        },
        {
            href: "/dashboard/analytics",
            name: "Chat Logs",
            icon: "ChartBarIcon",
            subheading: "Logs"
        }, {
            href: "/dashboard/billing/usage",
            name: "Usage",
            icon: "CurrencyDollarIcon",
            subheading: "Billing"
        },
        {
            href: "/dashboard/billing/settings",
            name: "Billing",
            icon: "WrenchScrewdriverIcon",
            subheading: "Billing"
        },
        {
            href: "/dashboard/members",
            name: "Team",
            icon: "UserGroupIcon",
            subheading: "Organization Settings"
        },
        
    ];
    let state = useSelector((state) => state.botId.showModal)
    const userState = useSelector((state) => state.user);
    console.log("userState", userState)
    useEffect(() => {
        if (!state) {
            dispatch(fetchBot())
            dispatch(fetchProfile());
            dispatch(fetchRecommendation());
            dispatch(fetchIntegrations());
            dispatch(fetchWorkflows());
            dispatch(fetchIntegrationsTemplates())
        }

        getActiveBots()
        // localStorage.setItem(`inTempoPortal`, true);
        // return () => { localStorage.removeItem('inTempoPortal') }
    }, [state]);



    const [activeBots, setActiveBots] = useState([])

    const getActiveBots = async () => {
        await getAllActiveBots().then(async (res) => {
            setActiveBots(res.results)

            const profile = await getUserProfile()
            const testBot = await getTestBot()

            if (profile?.email) {
                const activeBotsInLocalStorage = JSON.stringify(res.results)
                localStorage.setItem(`tempoportallastlogin`, profile.email)
                localStorage.setItem(`activebots-${profile?.email}`, activeBotsInLocalStorage);
            }

            if (testBot?.id) {
                const userTestBot = JSON.stringify(testBot)
                localStorage.setItem(`testbot-${profile?.email}`, userTestBot);
            }
        })

    }

    if (!state) {
        if (pathname !== '/dashboard') {
            const findRoute = SideBarRoutes.find((x) => x.href === pathname)
            if (Cookies.get('visit') && findRoute) {
                const data = JSON.parse(Cookies.get("visit"))
                const findData = data.find((x) => x.route === pathname)
                if (!findData) {
                    let newdata = []
                    if (data.length === 3) {
                        newdata = [{ route: pathname, name: findRoute.name, icon: findRoute.icon, subheading: findRoute.subheading, email: state?.data?.email }, data[0]]
                    } else {
                        newdata = [{ route: pathname, name: findRoute.name, icon: findRoute.icon, subheading: findRoute.subheading, email: state?.data?.email }, ...data,]
                    }
                    Cookies.set("visit", JSON.stringify(newdata), { expires: 30 })
                }
            } else {
                if (findRoute) {
                    let data = [{ route: pathname, name: findRoute.name, icon: findRoute.icon, subheading: findRoute.subheading, email: state?.data?.email }]
                    Cookies.set('visit', JSON.stringify(data), { expires: 30 })
                }
            }
        }
    }


    return (
        <>
            <NewSidebar>
                {/* {showTestBot &&
                    <>

                        <div
                            className=" bg-transparent overflow-auto  flex flex-col z-50"
                            onClick={() => setShowTestBot(false)}
                        >
                            {" "}
                        </div>
                        <div
                            className={` z-50 w-full sm:w-[550px] fixed right-0 m-auto max-h-[100%] shadow-md rounded-xl testbotwidget `}
                        >
                            <TestingMiniBot></TestingMiniBot>

                        </div>

                    </>
                }

                <button
                    onClick={() => setShowTestBot(!showTestBot)}
                    className={`fixed bottom-3 right-3 m-auto rounded-xl pointer z-100`}
                >
                    <div class="p-3 bg-primary rounded-full">
                        {showTestBot ?
                            (

                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="25px" height="25px" viewBox="0 0 24 24" >
                                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"/>
                                </svg>

                            )
                            :
                            (
                                < svg xmlns="http://www.w3.org/2000/svg" width='25px' fill='white' viewBox="0 0 24 24" className="chat_trigger">
                                    <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                                </svg>
                            )
                        }
                    </div>
                </button> */}

                {/* <TestWidgetLayout></TestWidgetLayout> */}


                {children}
            </NewSidebar >

        </>
    )
}

export default Dashboard