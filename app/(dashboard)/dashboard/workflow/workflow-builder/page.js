
"use client";
import { BriefcaseIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import WorkFlowTemplates from '@/app/components/Workflows/WorkflowBuilder/WorkFlowTemplates';
import Workflows from '@/app/components/Workflows/Workflows';
import { useSelector } from 'react-redux';
import Loading from '@/app/components/Loading/Loading';
import { createWorkflow, getAllWorkflowTemplates, createWorkflowTemplate, getWorkflowUsageLogs } from '@/app/API/pages/Workflow';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { errorMessage, successMessage } from '@/app/components/Messages/Messages';
import { useRouter } from 'next/navigation';
import { BoltIcon, BoltSlashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { fetchWorkflows } from '@/app/components/store/slices/workflowSlice';
import { useDispatch } from 'react-redux';

import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import TopBar from '@/app/components/Common/Card/TopBar';
import WorkflowUsageLogs from './logs/WorkflowUsageLogs';
import AutomationTemplates from './automations/AutomationTemplates';
import GlobalTemplates from './templates-manager/GlobalTemplates/GlobalTemplates';


const Page = () => {

    const workflowState = useSelector(state => state.workflow);
    // const workflowState = useSelector(state => state.workflow);

    // show hide tabs 
    const [showActive, setShowActive] = useState(false)
    const [showLogs, setShowLogs] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const [tab, setTab] = useState(0)
    const state = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [workflowLoading, setWorkLoading] = useState(false)
    const [template, setTemplate] = useState([])
    const [skeletonloading, setSkeetonLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setSkeetonLoading(false);
        }, 300);
    }, [])
    // logs function check logs has data or not

    const getAllLogs = async () => {
        let queryParams = ``;
        let logs = await getWorkflowUsageLogs(1, 10, queryParams.trim())
        if (logs?.count > 0) {
            setShowLogs(true)
        }
    }

    useEffect(() => {
        getAllLogs()
        if (!workflowState?.data?.results?.some(e => e.active === true)) {
            setTab(5)
        } else {
            setShowActive(true)
            setTab(0)
        } // If there is no active workflows, setTab to draft section.

    }, [workflowState?.data])

    useEffect(() => {
        getAllWorkflowData();
    }, [])

    useEffect(() => {
        allWorkflowTemplates();
    }, [])


    const allWorkflowTemplates = async () => {
        const allData = await getAllWorkflowTemplates()
        let filterData = allData?.filter((x) => x.added === false);
        setTemplate(filterData)
    };

    const getAllWorkflowData = async () => {
        dispatch(fetchWorkflows());

    }

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

    const createNewTemplate = async () => {
        setWorkLoading(true)
        let formData = {
            name: "Default_Template_Name",
            description: [],
            policy_name: "",
            policy_description: "",
            policy_exceptions: ""
        }

        const response = await createWorkflowTemplate(formData)
        setWorkLoading(false)
        if (response?.data?.id) router.push('/dashboard/workflow/workflow-builder/templates-manager?templateId=' + response.data.id)
    }


    return (
        <>
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
                                {showActive && (
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
                                )}
                                <li className={` ${skeletonloading ? "" : tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(1) }}>
                                    {skeletonloading ?
                                        <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                        :
                                        <span
                                            className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                            aria-current="page"
                                        >
                                            Draft
                                        </span>
                                    }
                                </li>

                                <li className={` ${skeletonloading ? "" : tab === 2 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(2) }}>
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


                                {showLogs === true && (
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
                                    </li>)}
                                {/* 
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
                                    </li>} */}

                            </ul>
                        </div>




                        {/* <Workflows state={state} loading={workflowLoading} createNewWorkFlow={createNewWorkFlow} /> */}
                        {tab === 0 && (
                            <WorkFlowTemplates createNewTemplate={createNewTemplate} setTab={setTab} status={true} workflowData={workflowState?.data} fetchData={getAllWorkflowData} state={state} workflowLoading={workflowLoading} createNewWorkFlow={createNewWorkFlow} setShowActive={setShowActive} />
                        )}
                        {tab === 1 && (
                            <WorkFlowTemplates createNewTemplate={createNewTemplate} setTab={setTab} status={false} workflowData={workflowState?.data} fetchData={getAllWorkflowData} state={state} workflowLoading={workflowLoading} createNewWorkFlow={createNewWorkFlow} setShowActive={setShowActive} />
                        )}
                        {/* {tab === 1 && (
                            // <AutomationTemplates></AutomationTemplates>
                            <WorkFlowTemplates source={'template'} status={false} workflowData={workflowState?.data} fetchData={getAllWorkflowData} state={state} workflowLoading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />

                        )} */}

                        {tab === 2 && (
                            <GlobalTemplates></GlobalTemplates>
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