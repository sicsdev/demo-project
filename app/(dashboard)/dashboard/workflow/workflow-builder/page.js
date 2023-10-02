
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
import TestingMiniBot from '@/app/components/Chats/TestingMiniBot';

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
            description: [],
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
                // successMessage("Workflow create successfully")
            } else {
                setWorkLoading(false)
                errorMessage(response.message)
            }
        }

    }

    return (
        <>

            {
                state.isLoading === true || loading === true || workflowState?.isLoading === true ?
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
                                <div className='mt-3'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 mx-auto items-center my-2'>
                                        {[...Array(8)].map((ele) =>
                                            <div
                                                style={{
                                                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                                }}
                                                className='relative border border-[#F0F0F1] p-3 rounded-md cursor-pointer bg-white h-[200px]'
                                            >
                                                <div className='relative h-full'>
                                                    <div className='flex items-center justify-start gap-4'>
                                                        <SkeletonLoader height={30} width={30} />
                                                        <SkeletonLoader height={30} width={30} />
                                                    </div>
                                                    <div className=''>
                                                        <SkeletonLoader height={20} width={100} />
                                                    </div>
                                                    <div className='absolute bottom-0 w-full'>
                                                        <div className='flex items-center justify-between '>
                                                            <SkeletonLoader height={20} width={100} />
                                                            <SkeletonLoader height={20} width={100} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                                {/* <div className="mt-3">
                                    <SkeletonLoader count={10} height={30} className={"mt-2"} />
                                </div> */}
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {state?.data?.enterprise && (
                            <>
                                <div style={{ whiteSpace: "normal" }}>
                                    <TopBar title={`Your Workflows`} icon={<BriefcaseIcon className="h-5 w-5 text-primary" />} />
                                </div>
                                <Workflows state={state} loading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />
                                <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                                    <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-xs font-medium text-center text-gray-500">
                                        <li className="mr-2" onClick={() => { setTab(0) }}>
                                            <span
                                                className={`flex justify-start text-xs gap-2 cursor-pointer items-center py-2  ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                                                aria-current="page"
                                            >
                                                <BoltIcon className="h-5 w-5 text-gray-500" /> Active
                                            </span>
                                        </li>
                                        <li className="mr-2" onClick={() => { setTab(1) }}>
                                            <span
                                                className={`flex justify-start gap-2 text-xs  cursor-pointer items-center py-2   ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active pl-2 group`}
                                                aria-current="page"
                                            >
                                                <BoltSlashIcon className="h-5 w-5 text-gray-500" /> Draft
                                            </span>
                                        </li>
                                        {
                                            template?.length > 0 &&
                                            <li className="mr-2" onClick={() => { setTab(2) }}>
                                                <span
                                                    className={`flex justify-start gap-2 text-xs  cursor-pointer items-center py-2   ${tab === 2 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  pl-2  group`}
                                                    aria-current="page"
                                                >
                                                    <ClipboardDocumentIcon className="h-5 w-5 text-gray-500" /> Templates
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
                                {tab === 2 && (
                                    <ManageTemplates setTemplate={setTemplate} template={template} fetchData={getAllWorkflowData} fetchTemplates={allWorkflowTemplates} />
                                )}
                            </>
                        )}
                    </>
            }
            < ToastContainer />
        </>
    )
}

export default Page