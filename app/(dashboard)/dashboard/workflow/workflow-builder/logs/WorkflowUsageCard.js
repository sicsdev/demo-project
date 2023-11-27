import { getWorkflowUsageByUsageId } from '@/app/API/pages/Workflow';
import { ArrowRightCircleIcon, ArrowRightIcon, XCircleIcon, ChatBubbleOvalLeftEllipsisIcon, CheckCircleIcon, ClockIcon, LinkIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const WorkflowUsageCard = ({ log, currentExpanded }) => {

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

                <div className="rounded py-3 my-1 w-full">

                    {/* <div className="flex items-center justify-end">
                        <ClockIcon className="w-4 h-4 mx-2 text-primary" />
                        <span className="text-xs text-black" style={{ opacity: '0.6' }}>
                            {formatDateTime(log.created)}
                        </span>
                    </div> */}

                    <div className="">
                        <h1 className={`text-md font-bold text-gray-700 flex items-center mb-2 ${log.automation_usages.length > 0 && currentExpanded == log.id && 'text-primary'}`}>
                            {log.workflow.name}
                        </h1>
                        <div className='md:flex'>
                            <div className='flex items-center'>
                                {log.automation_usages[0].response_log.response_status == '400' || log.automation_usages[0].response_log.response_status == '404' ?
                                    <>
                                        <XCircleIcon className='w-4 h-4'></XCircleIcon>
                                        <span className='mx-2 text-danger'><b>{log.automation_usages[0].response_log.response_status}</b></span>
                                    </>
                                    :
                                    <>
                                        <CheckCircleIcon className='w-4 h-4 text-success '></CheckCircleIcon>
                                        <span className='mx-2 text-success'><b>{log.automation_usages[0].response_log.response_status}</b></span>

                                    </>
                                }
                            </div>

                            {/* <small className='text-black opacity-50'>{log.workflow?.automations[0]?.automation?.description}</small> */}
                            <ClockIcon className="w-4 h-4 mx-2 opacity-60 hidden md:block" />
                            <span className="text-xs text-black" style={{ opacity: '0.6' }}>
                                {formatDateTime(log.created)}
                            </span>
                        </div>
                    </div>

                    {log.automation_usages.length > 0 && currentExpanded == log.id &&
                        (<div className='py-3'>
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

                        </div>
                        )
                    }

                </div>

            }
        </>)
    )
}

export default WorkflowUsageCard