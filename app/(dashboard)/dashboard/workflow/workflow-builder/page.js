
"use client";
import { BriefcaseIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import WorkFlowTemplates from '@/app/components/Workflows/WorkflowBuilder/WorkFlowTemplates';
import Workflows from '@/app/components/Workflows/Workflows';
import { useSelector } from 'react-redux';
import Loading from '@/app/components/Loading/Loading';
import { createWorkflow, getAllWorkflowTemplates, createWorkflowTemplate } from '@/app/API/pages/Workflow';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { errorMessage, successMessage } from '@/app/components/Messages/Messages';
import { useRouter } from 'next/navigation';
import { BoltIcon, BoltSlashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { fetchWorkflows } from '@/app/components/store/slices/workflowSlice';
import { useDispatch } from 'react-redux';
import ManageTemplates from '@/app/components/Workflows/WorkflowBuilder/ManageTemplates';

const Page = () => {
    const workflowState = useSelector(state => state.workflow);
    // const workflowState = useSelector(state => state.workflow);

    const router = useRouter()
    const dispatch = useDispatch()
    const [tab, setTab] = useState(0)
    const state = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [workflowLoading, setWorkLoading] = useState(false)
    const [template, setTemplate] = useState([])

    const getAllWorkflowData = async () => {
        dispatch(fetchWorkflows());
    }
    useEffect(() => {
        if (!workflowState?.data?.results?.some(e => e.active === true)) { setTab(1) } else { setTab(0) } // If there is no active workflows, setTab to draft section.
    }, [workflowState?.data])

    useEffect(() => {
        getAllWorkflowData();
    }, [])

    const allWorkflowTemplates = async () => {
        const allData = await getAllWorkflowTemplates()
        let filterData = allData?.filter((x) => x.added === false);
        setTemplate(filterData)
    };

    useEffect(() => {
        allWorkflowTemplates();
    }, [])

    const createNewWorkFlow = async () => {
        setWorkLoading(true)
        let formData = {
            name: "Default_name",
            description: "",
            policy_name: "",
            policy_description: "",
            policy_exceptions: ""
        }
        const findDuplicate = workflowState?.data?.results?.find((x) => x.name === "Default_name")
        if (findDuplicate) {
            errorMessage("Workflow already exists with name “Default_name”")
            setWorkLoading(false)
        } else {
            const response = await createWorkflow(formData)
            if (response.status === 201) {
                getAllWorkflowData();
                setWorkLoading(false)
                router.push('/dashboard/workflow/workflow-builder/get-started?flow=' + response.data.id)
                successMessage("Workflow create successfully")
            } else {
                setWorkLoading(false)
                errorMessage(response.message)
            }
        }

    }

    return (
        <>
            {state.isLoading === true || loading === true || workflowState?.isLoading === true ? <Loading /> :

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
                            <Workflows state={state} loading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />
                            <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                                <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                                    <li className="mr-2" onClick={() => { setTab(0) }}>
                                        <span
                                            className={`flex justify-start text-xs sm:text-sm gap-2 cursor-pointer items-center p-2 sm:p-4  ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                                            aria-current="page"
                                        >
                                            <BoltIcon className="h-6 w-6 text-gray-500" /> Active
                                        </span>
                                    </li>
                                    <li className="mr-2" onClick={() => { setTab(1) }}>
                                        <span
                                            className={`flex justify-start gap-2 text-xs sm:text-sm cursor-pointer items-center p-2 sm:p-4   ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active  group`}
                                            aria-current="page"
                                        >
                                            <BoltSlashIcon className="h-6 w-6 text-gray-500" /> Draft
                                        </span>
                                    </li>
                                    {template?.length > 0 &&
                                        <li className="mr-2" onClick={() => { setTab(2) }}>
                                            <span
                                                className={`flex justify-start gap-2 text-xs sm:text-sm cursor-pointer items-center p-2 sm:p-4   ${tab === 2 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                                                aria-current="page"
                                            >
                                                <ClipboardDocumentIcon className="h-6 w-6 text-gray-500" /> Templates
                                            </span>
                                        </li>
                                    }
                                </ul>
                            </div>
                            {tab === 0 && (
                                <WorkFlowTemplates status={true} workflowData={workflowState?.data} fetchData={getAllWorkflowData} />
                            )}
                            {tab === 1 && (
                                <WorkFlowTemplates status={false} workflowData={workflowState?.data} fetchData={getAllWorkflowData} />
                            )}
                            {tab === 2 && template?.length > 0 && (
                                <ManageTemplates template={template} fetchData={getAllWorkflowData} fetchTemplates={allWorkflowTemplates} />
                            )}
                        </>
                    )}
                </>
            }
            <ToastContainer />
        </>
    )
}

export default Page