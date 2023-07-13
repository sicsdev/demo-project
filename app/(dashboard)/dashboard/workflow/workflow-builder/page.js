
"use client";
import Card from '@/app/components/Common/Card/Card';
import { BriefcaseIcon, ClipboardIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import ManageWorkflowBuilder from '@/app/components/Workflows/WorkflowBuilder/ManageWorkflowBuilder';
import WorkFlowTemplates from '@/app/components/Workflows/WorkflowBuilder/WorkFlowTemplates';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Button from '@/app/components/Common/Button/Button';
const page = () => {
    const [mode, setMode] = useState('create');
    const [edit, setIsEdit] = useState(false)
    const [singleWorkflowData, setSingleWorkflowData] = useState(null)
    return (
        <>  <div className='flex justify-between my-4'>
        <div className='flex justify-between gap-4 items-center'>
            <Button
                type={"submit"}
                className="inline-block rounded bg-white border border-border px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 focus:bg-success-600 focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"

            >
                Import
            </Button>
            <Button
                type={"submit"}
                className="inline-block rounded border border-primary bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"

            >
                Create
            </Button>
            <div>
                <QuestionMarkCircleIcon className="cursor-pointer h-6 w-6 text-gray-500" />

            </div>
        </div>

    </div>
            <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a
                            href="javascript:void(0)"
                            className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                            aria-current="page"
                        >
                            <BriefcaseIcon className="h-6 w-6 text-primary" /> Your Workflows
                        </a>
                    </li>
                    <li className="mr-2">
                        <a
                            href="javascript:void(0)"
                            className=" flex justify-start gap-2 items-center p-4 text-primary font-bold  rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                            aria-current="page"
                        >Templates
                        </a>
                    </li>
                </ul>
            </div>
            <WorkFlowTemplates />
        </>
    )
}

export default page