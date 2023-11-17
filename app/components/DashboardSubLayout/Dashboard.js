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
import { editBillingType } from '../store/slices/billingTypeSlice'
import Method from '../NewPaymentMethod/Method'
import { useRouter } from 'next/navigation'
import DemoAccountsBanner from '../Layout/DemoAccountsBanner'

const Dashboard = ({ children }) => {
    const router = useRouter()
    const routes = ["/dashboard/workflow/workflow-builder", "/dashboard/knowledge-center", "/dashboard/email-settings", "/dashboard/manage-phones", "/dashboard/analytics", "/dashboard/members", "/dashboard/scheduling-settings", "/dashboard/billing/usage"]
    const dispatch = useDispatch()
    const pathname = usePathname()

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


    let state = useSelector((state) => state.botId.showModal)
    const userState = useSelector((state) => state.user);
    const billingState = useSelector((state) => state.billing);
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
            subheading: "Deflection AI Chat",
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

    const findValuesForRoute = (value) => {

        const findValue = routes.find((x) => x === pathname)
        if (findValue && value === "demo") {
            if (pathname !== "/dashboard") {
                router.push("/dashboard")
            }
        }
        return
    }

    useEffect(() => {
        if (!billingState && userState) {
            findValuesForRoute(userState?.data?.enterprise?.billing_type)
            dispatch(editBillingType(userState?.data?.enterprise?.billing_type))
        }
    }, [userState])
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

    const handleRedirect = () => {
        router.push('/dashboard')
    }

    return (
        <>

            <NewSidebar>
  
                {(
                    billingState && billingState === "demo" &&

                    // AUTHORIZED PATHS IN DEMO ACCOUNTS
                    pathname !== "/dashboard" &&
                    pathname !== "/dashboard/workflow/integrations" &&
                    pathname !== "/dashboard/basic-knowledge/source" &&
                    pathname !== "/dashboard/chat-settings" &&
                    pathname !== "/reference"
                    // --------------------------------

                ) ? (
                    handleRedirect()
                ) : (
                    children
                )}


            </NewSidebar >

        </>
    )
}

export default Dashboard