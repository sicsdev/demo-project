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

const Dashboard = ({ children }) => {

    const dispatch = useDispatch()
    const pathname = usePathname()
    const SideBarRoutes = [

        {
            href: "/dashboard/workflow/integrations",
            name: "Integrations",
            icon: "ShareIcon",
        },
        {
            href: "/dashboard/workflow/workflow-builder",
            name: "Workflows",
            icon: "BriefcaseIcon",
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Learning Center",
            icon: "BookOpenIcon",
            isLink: false,
        },

        {
            href: "/dashboard/basic-knowledge",
            name: "Knowledge Base",
            icon: "BookOpenIcon",
        },

        {
            href: "/dashboard/chat-bots",
            name: "Agents",
            icon: "AdjustmentsHorizontalIcon",
        },

        {
            href: "/dashboard/manage-phones",
            name: "Phone",
            icon: "DevicePhoneMobileIcon",
        },
        {
            href: "/",
            name: "Reports",
            icon: "BookOpenIcon",
        },
        {
            href: "/dashboard/analytics",
            name: "Chat Logs",
            icon: "ChartBarIcon",
        },
        {
            href: "/dashboard/billing/usage",
            name: "Billing",
            icon: "BanknotesIcon",
        }, {
            href: "/dashboard/billing/usage",
            name: "Usage",
            icon: "CurrencyDollarIcon",
        },
        {
            href: "/dashboard/billing/settings",
            name: "Billing Settings",
            icon: "WrenchScrewdriverIcon",
        },
        {
            href: "/dashboard/knowledge-center",
            name: "Organization Settings",
            icon: "BookOpenIcon",
        },
        {
            href: "/dashboard/members",
            name: "Team",
            icon: "UserGroupIcon",
        },
    ];
    let state = useSelector((state) => state.botId.showModal)
    useEffect(() => {
        if (!state) {
            dispatch(fetchBot())
            dispatch(fetchProfile());
            dispatch(fetchRecommendation());
            dispatch(fetchIntegrations());
            dispatch(fetchWorkflows());
            dispatch(fetchIntegrationsTemplates())
        }



    }, [state]);
    if (!state) {
        if (pathname !== '/dashboard') {
            const findRoute = SideBarRoutes.find((x) => x.href === pathname)
            if (Cookies.get('visit') && findRoute) {
                const data = JSON.parse(Cookies.get("visit"))
                const findData = data.find((x) => x.route === pathname)
                if (!findData) {
                    let newdata = []
                    if (data.length === 2) {
                        newdata = [{ route: pathname, name: findRoute.name, icon: findRoute.icon }, data[0]]
                    } else {
                        newdata = [{ route: pathname, name: findRoute.name, icon: findRoute.icon }, ...data,]
                    }
                    Cookies.set("visit", JSON.stringify(newdata))
                }
            } else {
                if (findRoute) {
                    let data = [{ route: pathname, name: findRoute.name, icon: findRoute.icon }]
                    Cookies.set('visit', JSON.stringify(data))
                }
            }
        }
    }
    return (
        <>
            {state ?
                <Intake />
                :
                <NewSidebar>
                    {children}
                </NewSidebar>
            }
        </>
    )
}

export default Dashboard