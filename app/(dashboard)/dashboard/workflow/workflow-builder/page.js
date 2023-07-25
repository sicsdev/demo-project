
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
import CreateWorkflow from '@/app/components/Workflows/WorkflowBuilder/CreateWorkflow';
import Modal from '@/app/components/Common/Modal/Modal';

const Page = () => {
    const state = useSelector(state => state.user)
    const [workflowData, setWorkflowData] = useState({});
    const [form, setForm] = useState({});
    const [createWorkflowModal, setCreateWorkflowModal] = useState(false)
    const [loading, setLoading] = useState(false)
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
                            <Workflows state={state} setCreateWorkflowModal={setCreateWorkflowModal} />
                            <WorkFlowTemplates workflowData={workflowData} />
                        </>
                    )}
                </>
            }
            {createWorkflowModal ?
                <Modal title={'Manage Policy'} show={createWorkflowModal} setShow={setCreateWorkflowModal} className={'w-[80%] rounded-lg'} showCancel={true} >
                    <CreateWorkflow form={form} setForm={setForm} getAllWorkflowData={getAllWorkflowData} setCreateWorkflowModal={setCreateWorkflowModal} />
                </Modal>
                : ""
            }
            <ToastContainer />
        </>
    )
}

export default Page