import { getWorkflowUsageByUsageId } from '@/app/API/pages/Workflow';
import { ArrowRightCircleIcon, ArrowRightIcon, ChatBubbleOvalLeftEllipsisIcon, CheckCircleIcon, ClockIcon, LinkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const WorkflowUsageCard = ({ log }) => {

    const [logDetails, setLogDetails] = useState({})

    useEffect(() => {
        // getUsageDetails()
    }, [])

    const getUsageDetails = async () => {
        let details = await getWorkflowUsageByUsageId(log.id)
        setLogDetails(details)
    }

    const formatDateTime = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        (<>
            {log &&

                <div className="bg-white shadow-md rounded px-5 pt-6 pb-8 mb-4 flex flex-col my-2">

                    <div className="flex items-center justify-end">
                        <ClockIcon className="w-4 h-4 mx-2 text-primary" />
                        <span className="text-xs text-black" style={{ opacity: '0.6' }}>
                            {formatDateTime(log.created)}
                        </span>
                    </div>

                    <div className="mb-4">
                        <h1 className="text-lg font-bold text-gray-700 flex items-center">
                            {log.workflow.icon} {log.workflow.name}
                        </h1>
                        <small className='text-black opacity-50'>{log.workflow?.automations[0]?.automation?.description}</small>
                    </div>

                    {log.automation_usages.length > 0 &&
                        (<>
                            <small className="">
                                <small className='flex items-center text-primary'>
                                    <LinkIcon className='w-4 h-4 mx-1'></LinkIcon><b>Request URL:</b>
                                </small>
                                <span className='mx-2'>{log.automation_usages[0].response_log.request_url}</span>
                            </small>

                            <small className="mt-2">
                                <small className='flex items-center text-primary'>
                                    <ArrowRightCircleIcon className='w-4 h-4 mx-1'></ArrowRightCircleIcon><b>Method:</b>
                                </small>
                                <span className='mx-2'>{log.automation_usages[0].response_log.request_method}</span>
                            </small>

                            <small className="mt-2">
                                <small className='flex items-center  text-primary'>
                                    <CheckCircleIcon className='w-4 h-4 mx-1'></CheckCircleIcon><b> Status:</b>
                                </small>
                                <span className='mx-2'>{log.automation_usages[0].response_log.response_status}</span>
                            </small>

                            <small className="mt-2">
                                <small className='flex items-center  text-primary'>
                                    <PaperAirplaneIcon className='w-4 h-4 mx-1'></PaperAirplaneIcon ><b> Payload:</b>
                                </small>
                                <span className='mx-2 whitespace-nowrap overflow-auto'>
                                    {JSON.stringify(log.automation_usages[0].response_log.request_data)}
                                </span>
                            </small>

                            <small className="mt-2">
                                <small className='flex items-center  text-primary'>
                                    <ChatBubbleOvalLeftEllipsisIcon className='w-4 h-4 mx-1'></ChatBubbleOvalLeftEllipsisIcon><b> Response:</b>
                                </small>
                                <span className='mx-2'> {log.automation_usages[0].response_log.response_text}</span>
                            </small>

                        </>
                        )
                    }

                </div>

            }
        </>)
    )
}

export default WorkflowUsageCard