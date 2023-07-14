
"use client";
import { BriefcaseIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import WorkFlowTemplates from '@/app/components/Workflows/WorkflowBuilder/WorkFlowTemplates';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Button from '@/app/components/Common/Button/Button';
import template_data from "@/app/data/workflow_tabs_data.json"
import Workflows from '@/app/components/Workflows/Workflows';
const page = () => {
    const [view, setView] = useState('workflow')

    const manageView = () => {
        switch (view) {
            case 'workflow':
                return <Workflows setView={setView}/>
            case 'template':
                return <WorkFlowTemplates />

            default:
                return <h1>Something wrong !</h1>
        }
    }
    return (
        <>
            <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {template_data.map((ele, key) =>
                        <li className="mr-2 cursor-pointer" key={key} onClick={(e) => { setView(ele.key) }}>
                            <span
                                className={`h-[50px]  flex justify-start gap-2 items-center p-4 font-bold  rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group ${ele.key === view && ("border-b-2 border-primary text-primary ")}`}

                            >
                                {key === 0 && (<BriefcaseIcon className={`h-6 w-6 ${ele.key === view && ("text-primary ")}`}/>)} {ele.value}
                            </span>
                            
                        </li>
                    )}
                </ul>
            </div>

            {manageView()}
        </>
    )
}

export default page