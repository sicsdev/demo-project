
"use client";
import { BriefcaseIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import WorkFlowTemplates from '@/app/components/Workflows/WorkflowBuilder/WorkFlowTemplates';
import Workflows from '@/app/components/Workflows/Workflows';
import { useSelector } from 'react-redux';
import Loading from '@/app/components/Loading/Loading';
import { getAllWorkflow } from '@/app/API/pages/Workflow';
import { useEffect } from 'react';
import Motioncards from '@/app/components/Motioncards/page';
import { ToastContainer } from 'react-toastify';

const Page = () => {
    const state = useSelector(state => state.user)
    const [workflowData, setWorkflowData] = useState({});
    const getAllWorkflowData = async () => {
        try {
            const response = await getAllWorkflow();
            setWorkflowData(response);
        } catch (error) {
        }
    }
    useEffect(() => {
        getAllWorkflowData()
    }, [])

    return (
        <>
            {state.isLoading === true ? <Loading /> :

                <>
                    {state?.data?.enterprise && (
                        <>
                            <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                    <li className="mr-2">
                                        <span
                                            className={`h-[50px]  flex justify-start gap-2 items-center p-4 font-bold  rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group border-b-2 border-primary text-primary`}
                                        >
                                            <BriefcaseIcon className={`h-6 w-6 text-primary`} /> Your Workflows
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <Workflows state={state} />
                            <WorkFlowTemplates workflowData={workflowData} />
                        </>
                    )}
                    <Motioncards />
                </>
            }
            <ToastContainer />
        </>
    )
}

export default Page