'use client'
// Helpers
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

//Components
import TopBar from '@/app/components/Common/Card/TopBar'

// API Calls
import { getAllCustomerConversationsById, getCustomerDetailsById } from '@/app/API/pages/CustomerDetails'

// Icons
import { ArrowRightIcon, ChatBubbleLeftIcon, UserCircleIcon, IdentificationIcon, GlobeAltIcon, DeviceMobileIcon, PhoneArrowUpRightIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'


const page = () => {
    // Helpers
    const router = useRouter()
    const params = useSearchParams()

    const [userInformation, setUserInformation] = useState({})
    const [allCustomerConversations, setAllCustomerConversations] = useState([])

    // Effects 
    useEffect(() => {
        let customer_id = params.get('customerId')
        if (getCustomerInfo) getCustomerInfo(customer_id)
    }, [])


    // Main Functions
    const getCustomerInfo = async (customer_id) => {
        let details = await getCustomerDetailsById(customer_id)
        if (details?.data) setUserInformation(details.data)

        let conversations = await getAllCustomerConversationsById(customer_id)
        if (conversations?.data) { setAllCustomerConversations(conversations.data) }

    }

    function summarizeUserAgent(userAgent) {
        if (!userAgent) { return '' }
        const osMatch = userAgent.match(/\(([^)]+)\)/);
        const os = osMatch ? osMatch[1].split(';')[0].trim() : 'Unknown OS';

        const browserVersionMatch = userAgent.match(/(Version)\/(\d+\.\d+(\.\d+)?)/);
        const browserVersion = browserVersionMatch ? browserVersionMatch[2] : 'Unknown Version';

        const deviceMatch = userAgent.match(/(iPhone|iPad)/);
        const device = deviceMatch ? deviceMatch[0] : 'Unknown Device';

        const platformType = userAgent.includes('Mobile') ? 'Mobile' : 'Desktop';

        return `${device} - ${os} - ${platformType}`;
    }


    return (
        <div>
            <TopBar
                loading={false}
                title={` Customer details`}
                icon={<UserCircleIcon className="h-5 w-5 text-primary" />}
                isBackButton={false}
                backButtonUrl={`/dashboard`}
            />


            <div className=" mx-auto p-5">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-white rounded-lg">
                    {/* User Info Section */}
                    <div className="md:w-1/2 p-6 shadow">
                        <div className="flex items-center space-x-4 mb-2">
                            <UserCircleIcon className="h-10 w-10 text-primary" aria-hidden="true" />
                            <div className="space-y-1 font-medium">
                                <div className="text-sm text-gray-500">{userInformation?.email || 'hardcodedemail@deflection.ai'}</div>
                            </div>
                        </div>
                        <div className="p-6 shadow rounded-lg">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <IdentificationIcon className="h-4 w-4" />
                                    <span className="text-sm font-medium text-gray-700">IP:  {userInformation.ip || 'Unknown'}</span>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <DevicePhoneMobileIcon className="h-4 w-4" />
                                    <span className="text-sm font-medium text-gray-700">Device:  {summarizeUserAgent(userInformation?.user_agent) || 'Unknown'}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <EnvelopeIcon className="h-4 w-4" />
                                    <span className="text-sm font-medium text-gray-700">Email: {userInformation?.email || "Unknown"}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <PhoneArrowUpRightIcon className="h-4 w-4" />
                                    <span className="text-sm font-medium text-gray-700">Phone: {userInformation?.phone_complete || "Unknown"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chats Section */}
                    <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">User conversations ({allCustomerConversations.length})</h3>
                            <a href="#" className="text-primary hover:text-primary-dark flex gap-2 text-xs items-center">See all <ArrowRightIcon className='h-3 w-3'></ArrowRightIcon></a>
                        </div>
                        <div className="mt-4 space-y-4">
                            {allCustomerConversations.map(convo =>
                                <div className="flex space-x-4 border border-gray rounded p-2 items-center">
                                    <ChatBubbleLeftIcon className="h-4 w-4" aria-hidden="true" />
                                    <div className="flex-1 space-y-1">
                                        <div className="text-sm font-medium">{convo.type}</div>
                                        {/* <p className="text-sm text-gray-500">Message content here</p> */}
                                    </div>
                                </div>
                            )}
                            {/* Repeat for another chat */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page