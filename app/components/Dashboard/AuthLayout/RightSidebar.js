import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { BriefcaseIcon, ChartBarIcon, ChatBubbleLeftRightIcon, ChevronRightIcon, ClipboardDocumentIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/solid'
import React, { useState, useRef } from 'react'
import { ColorRing, TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import Loading from '../../Loading/Loading'
import Image from 'next/image'
import { getIntegrationAutomation } from '@/app/API/pages/Integration'

const RightSidebar = ({ children, inputRef, shake }) => {
    const state = useSelector(state => state.integration)
    const [innerSide, setInnerSide] = useState({
        id: null,
        value: null
    })
    const [beatLoader, setBeatLoader] = useState(false)
    const list = [
        { "key": "Policy Description", "name": "Policy Description", icon: <ChartBarIcon className="h-4 w-4 text-gray-500" />, tiles: [{ icon: "", name: "", description: "" }] },
        { "key": "Policy Exceptions", "name": "Policy Exceptions", icon: <ClipboardDocumentIcon className="h-4 w-4 text-gray-500" />, tiles: [{ icon: "", name: "", description: "" }] },
        { "key": "Forms", "name": "Forms", icon: <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-500" />, tiles: [{ icon: "", name: "", description: "" }] },
    ]
    const getLogo = (name) => {
        const tiles_icons = [
            {
                "name": "Rest API",
                "logo": "/integrations/rest-api.svg",
                "grayscale": false
            },
            {
                "name": "Stripe",
                "logo": "/integrations/stripe.svg",
                "grayscale": false
            },
            {
                "name": "Shopify",
                "logo": "/integrations/shopify.svg",
                "grayscale": false
            },
            {
                "name": "Twilio",
                "logo": "/integrations/twilio.svg",
                "grayscale": true
            },
            {
                "name": "Slack",
                "logo": "/integrations/slack.svg",
                "grayscale": true
            },
            {
                "name": "ZenDesk",
                "logo": "/integrations/zendesk.svg",
                "grayscale": true
            },
            {
                "name": "Stripe",
                "logo": "/integrations/stripe.svg",
                "grayscale": false
            },
            {
                "name": "Shopify",
                "logo": "/integrations/shopify.svg",
                "grayscale": false
            },
            {
                "name": "PayPal",
                "logo": "/integrations/paypal.svg",
                "grayscale": false
            },
            {
                "name": "BrainTree",
                "logo": "/integrations/brain-tree.svg",
                "grayscale": false
            },
            {
                "name": "Square",
                "logo": "/integrations/square.svg",
                "grayscale": false
            },
            {
                "name": "NMI",
                "logo": "/integrations/nmi.svg",
                "grayscale": false
            },
            {
                "name": "Twilio",
                "logo": "/integrations/twilio.svg",
                "grayscale": true
            },
            {
                "name": "SendGrid",
                "logo": "/integrations/sendgrid.svg",
                "grayscale": true
            },
            {
                "name": "Slack",
                "logo": "/integrations/slack.svg",
                "grayscale": true
            },
            {
                "name": "Microsoft Teams",
                "logo": "/integrations/teams.svg",
                "grayscale": true
            },
            {
                "name": "SMTP",
                "logo": "/integrations/smtp.svg",
                "grayscale": true
            },
            {
                "name": "FreshDesk",
                "logo": "/integrations/freshdesk.svg",
                "grayscale": true
            },
            {
                "name": "ZenDesk",
                "logo": "/integrations/zendesk.svg",
                "grayscale": true
            },
            {
                "name": "Front",
                "logo": "/integrations/front.svg",
                "grayscale": true
            },
            {
                "name": "Gorgias",
                "logo": "/integrations/gorgias.svg",
                "grayscale": true
            },
            {
                "name": "Intercom",
                "logo": "/integrations/intercom.svg",
                "grayscale": true
            },
            {
                "name": "SalesForce",
                "logo": "/integrations/sales-force.svg",
                "grayscale": true
            },
            {
                "name": "HubSpot",
                "logo": "/integrations/hubspot.svg",
                "grayscale": true
            },
            {
                "name": "Asana",
                "logo": "/integrations/asana.svg",
                "grayscale": true
            },
            {
                "name": "Monday",
                "logo": "/integrations/monday.svg",
                "grayscale": true
            },
            {
                "name": "GitHub",
                "logo": "/integrations/github.svg",
                "grayscale": true
            },
            {
                "name": "Jira",
                "logo": "/integrations/jira.svg",
                "grayscale": true
            },
            {
                "name": "Linear",
                "logo": "/integrations/linear.svg",
                "grayscale": true
            },
            {
                "name": "CircleCI",
                "logo": "/integrations/circle-eye.svg",
                "grayscale": true
            },
            {
                "name": "Datadog",
                "logo": "/integrations/data-dog.svg",
                "grayscale": true
            },
            {
                "name": "Suggest a resource",
                "logo": "/integrations/plus.svg"
            }
        ]

        const findIcon = tiles_icons.find((x) => x.name.toLowerCase() === name.toLowerCase())
        if (findIcon) {
            return findIcon.logo
        }
        return ""
    }
    const findAutomations = async (element) => {
        setBeatLoader(true)
        setInnerSide(prev => {
            return {
                ...prev,
                id: element.id,
                value: element
            }
        })
        setTimeout(() => {
            setBeatLoader(false)
        }, 400);
        const automation = await getIntegrationAutomation(element.id)
        debugger
        console.log("automation",automation)
    }
    return (
        <>
            {state.isLoading === true ?
                <Loading />
                : <>
                    <nav
                        id="sidenav-7"
                        className={`${shake} overflow-y-scroll pt-[5rem] hidden sm:block md:block lg:block fixed right-0 top-0 h-screen w-72 translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:-translate-x-0 dark:bg-zinc-800 p-2`}
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
                                        <input type="search" ref={inputRef} id="search" className="block w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-sm text-gray-900 border border-border rounded-lg" placeholder="Search" required />
                                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700   font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                                    </div>
                                </form>
                            </li>
                            {beatLoader === true ?
                                <div className='text-center w-[20px] mx-auto my-28'>
                                    <ColorRing
                                        height="30"
                                        width="30"
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperClass="text-center"
                                        visible={true}
                                    />
                                </div> :
                                <>
                                    {innerSide.value === null ?
                                        <>
                                            <p className='text-sm text-heading font-[300] my-4'>Steps are actions you can add to a workflow. Choose steps to tell Tempo how to handle your customer inquiries or outbound actions. </p>

                                            {state?.data?.results.map((ele, key) =>
                                                <li className='my-4 cursor-pointer ' key={key} onClick={(e) => {
                                                    findAutomations(ele)
                                                }} >
                                                    <div className='flex justify-between items-center'>
                                                        <div className='flex justify-between items-center gap-2'>
                                                            <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                                                <Image
                                                                    fill={"true"}
                                                                    className={`bg-contain mx-auto w-full rounded-lg`}
                                                                    alt="logo.png"
                                                                    src={getLogo(ele.name)}
                                                                />
                                                            </div>
                                                            <p className='text-heading text-sm'>{ele.name}</p>
                                                        </div>
                                                        <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                                                    </div>
                                                </li>
                                            )}
                                        </> :
                                        <>
                                            <div className='flex justify-start items-center my-8 gap-2'>
                                                <span className='cursor-pointer' onClick={(e) => {
                                                    setInnerSide(prev => {
                                                        return {
                                                            ...prev,
                                                            id: null,
                                                            value: null
                                                        }
                                                    })
                                                }}><ChevronLeftIcon className="h-4 w-4" /></span>
                                                <div className="relative w-[20px] h-[20px] rounded-lg">
                                                    <Image
                                                        fill={"true"}
                                                        className={`bg-contain mx-auto w-full rounded-lg`}
                                                        alt="logo.png"
                                                        src={getLogo(innerSide?.value.name)}
                                                    />
                                                </div>
                                                <p className='text-heading font-bold text-[14px]'>{innerSide?.value.name}</p>
                                            </div>
                                            {list.slice(0, 2).map((ele, key) =>
                                                <li className='my-4 cursor-pointer border border-border rounded-md p-2 bg-[#F8F8F8]' key={key} >
                                                    <div className='flex justify-between items-center gap-4'>
                                                        <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                                            <Image
                                                                fill={"true"}
                                                                className={`bg-contain mx-auto w-full rounded-lg`}
                                                                alt="logo.png"
                                                                src={getLogo(ele.name)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className='text-[13px] font-[4500]'>Lorem ipsum dolor sit amet</h3>
                                                            <p className='text-border text-[11px] font-light'>consectetur adipiscing elit, sed do eiusmod.</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </>}

                                </>
                            }
                        </ul>
                    </nav>
                    <div className='w-[auto] sm:w-[75%] md:w-[75%] lg:w-[75%]'>
                        {children}
                    </div>
                </>}
        </>
    )
}

export default RightSidebar