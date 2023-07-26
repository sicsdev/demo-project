
"use client";
import { BriefcaseIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import WorkFlowTemplates from '@/app/components/Workflows/WorkflowBuilder/WorkFlowTemplates';
import Workflows from '@/app/components/Workflows/Workflows';
import { useSelector } from 'react-redux';
import Loading from '@/app/components/Loading/Loading';
import { createWorkflow, getAllWorkflow } from '@/app/API/pages/Workflow';
import { useEffect } from 'react';
import Motioncards from '@/app/components/Motioncards/page';
import { ToastContainer } from 'react-toastify';
import CreateWorkflow from '@/app/components/Workflows/WorkflowBuilder/CreateWorkflow';
import Modal from '@/app/components/Common/Modal/Modal';
import { errorMessage, successMessage } from '@/app/components/Messages/Messages';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter()
    const state = useSelector(state => state.user)
    const [workflowData, setWorkflowData] = useState({});
    const [form, setForm] = useState({});
    const [createWorkflowModal, setCreateWorkflowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [workflowLoading, setWorkLoading] = useState(false)
    const getAllWorkflowData = async () => {
        setLoading(true)
        try {
            const response = await getAllWorkflow();
            setWorkflowData(response);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllWorkflowData()
    }, [])
    const createNewWorkFlow = async () => {
        setWorkLoading(true)
        let formData = {
            name: "Default_name",
            description: "Default_description",
            policy_name: "default",
            policy_description: "default",
            policy_exceptions: "default"
        }
        const findDuplicate = workflowData.results.find((x) => x.name === "Default_name")
        if (findDuplicate) {
            errorMessage("Workflow already exists with name “Default_name”")
            setWorkLoading(false)
        } else {
            const response = await createWorkflow(formData)
            if (response.status === 201) {
                setWorkLoading(false)
                router.push('/dashboard/workflow/workflow-builder/get-started?flow=' + response.data.id)
                successMessage("Workflow create successfully !")
            }
        }

    }
    return (
        <>
            {state.isLoading === true || loading === true ? <Loading /> :

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
                            <Workflows state={state} setCreateWorkflowModal={setCreateWorkflowModal} loading={workflowLoading} createNewWorkFlow={createNewWorkFlow} />
                            <WorkFlowTemplates workflowData={workflowData} />
                        </>
                    )}
                </>
            }
            {createWorkflowModal ?
                <Modal title={'Create Workflow'} show={createWorkflowModal} setShow={setCreateWorkflowModal} className={'w-[80%] rounded-lg'} showCancel={true} >
                    <CreateWorkflow form={form} setForm={setForm} getAllWorkflowData={getAllWorkflowData} setCreateWorkflowModal={setCreateWorkflowModal} />
                </Modal>
                : ""
            }
            <ToastContainer />
        </>
    )
}

export default Page