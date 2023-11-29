
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
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import TopBar from '@/app/components/Common/Card/TopBar';
import WorkflowUsageLogs from './logs/WorkflowUsageLogs';
import AutomationTemplates from './automations/AutomationTemplates';


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
        if (tab === 0) {
            if (!workflowState?.data?.results?.some(e => e.active === true)) {
                setTab(1)
            } else {
                setTab(0)
            } // If there is no active workflows, setTab to draft section.
        }
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
            description: [],
            policy_name: "",
            policy_description: "",
            policy_exceptions: ""
        }
        const findDuplicate = workflowState?.data?.results?.find((x) => x.name === "Default_name")
        if (findDuplicate) {
            router.push('/dashboard/workflow/workflow-builder/get-started?flow=' + findDuplicate.id)
            setWorkLoading(false)
        } else {
            const response = await createWorkflow(formData)
            if (response.status === 201) {
                getAllWorkflowData();
                setWorkLoading(false)
                router.push('/dashboard/workflow/workflow-builder/get-started?flow=' + response.data.id)
                // successMessage("Workflow create successfully")
            } else {
                setWorkLoading(false)
                errorMessage(response.message)
            }
        }
    }

    const [skeletonloading, setSkeetonLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setSkeetonLoading(false);
        }, 300);
    }, [])

    return (
        <>
            {/*
            {state.isLoading === true || loading === true || workflowState?.isLoading === true ?
                <>
                    <div style={{ whiteSpace: "normal" }}>
                        <TopBar title={`Workflows`} icon={<BriefcaseIcon className="h-5 w-5 text-primary" />} />
                    </div>

                    <div className='my-4'>
                        <div className='flex justify-between gap-4 items-center'>
                            <div className='flex justify-between gap-2'>
                                <div className="relative w-[40px] h-[40px] gap-1 rounded-lg">
                                    <SkeletonLoader count={1} height={40} />
                                </div>
                                <div>
                                    <SkeletonLoader count={1} height={20} width={80} />
                                    <SkeletonLoader count={1} height={20} width={80} />
                                </div>
                            </div>
                            <div>
                                <SkeletonLoader count={1} height={40} width={100} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='my-3  text-heading text-center font-semibold text-sm'>
                            <SkeletonLoader count={1} height={30} width="30%" className={"text-center"} />
                        </h3>
                        <div className="">
                            <div className="mt-3">
                                <SkeletonLoader count={10} height={30} className={"mt-2"} />
                            </div>
                        </div>
                    </div>
                </>
                : */}
            <>
                {state?.data?.enterprise && (
                    <>
                        <h1 className='pl-2 text-xl font-semibold'>
                            {skeletonloading ?
                                <SkeletonLoader count={1} height={30} width={150} />
                                :
                                "Your Workflows"
                            }
                        </h1>
                        <div className={skeletonloading ? " " : "border-b-2 border-border dark:border-gray-700 flex items-center justify-between"}>
                            <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                                <li className={` ${skeletonloading ? "" : tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(0) }}>
                                    {skeletonloading ?
                                        <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                        :
                                        <span
                                            className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                            aria-current="page"
                                        >
                                            Active
                                        </span>
                                    }
                                </li>
                                <li className={` ${skeletonloading ? "" : tab === 5 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(5) }}>
                                    {skeletonloading ?
                                        <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                        :
                                        <span
                                            className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                            aria-current="page"
                                        >
                                            Templates
                                        </span>
                                    }
                                </li>
{/* 
                                <li className={` ${skeletonloading ? "" : tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(1) }}>
                                    {skeletonloading ?
                                        <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                        :
                                        <span
                                            className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                            aria-current="page"
                                        >
                                            Templates
                                        </span>
                                    }
                                </li> */}

                                <li className={` ${skeletonloading ? "" : tab === 3 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(3) }}>
                                    {skeletonloading ?
                                        <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                        :
                                        <span
                                            className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                            aria-current="page"
                                        >
                                            Logs
                                        </span>
                                    }
                                </li>

                                {
                                    template?.length > 0 &&
                                    <li className={`hover:text-black  ${tab === 2 ? "boredractive" : 'boredrinactive '}`} onClick={() => { setTab(2) }}>
                                        {skeletonloading ?
                                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                            :
                                            <span
                                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                                aria-current="page"
                                            >
                                                Templates
                                            </span>
                                        }
                                    </li>}

                            </ul>
                        </div>

                        {/* <Workflows state={state} loading={workflowLoading} createNewWorkFlow={createNewWorkFlow} /> */}
                        {tab === 0 && (
                            <WorkFlowTemplates setTab={setTab} status={true} workflowData={workflowState?.data} fetchData={getAllWorkflowData} state={state} workflowLoading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />
                        )}
                        {tab === 5 && (
                            <WorkFlowTemplates setTab={setTab} status={false} workflowData={workflowState?.data} fetchData={getAllWorkflowData} state={state} workflowLoading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />
                        )}
                        {/* {tab === 1 && (
                            // <AutomationTemplates></AutomationTemplates>
                            <WorkFlowTemplates source={'template'} status={false} workflowData={workflowState?.data} fetchData={getAllWorkflowData} state={state} workflowLoading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />

                        )} */}

                        {tab === 2 && (
                            <ManageTemplates setTab={setTab} setTemplate={setTemplate} template={template} fetchData={getAllWorkflowData} fetchTemplates={allWorkflowTemplates} state={state} workflowLoading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />
                        )}
                        {tab === 3 && (
                            <WorkflowUsageLogs></WorkflowUsageLogs>
                        )}
                    </>
                )}
            </>

            <ToastContainer />
        </>
    )
}

export default Page