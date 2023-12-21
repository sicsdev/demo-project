import { createWorkflowTemplate, getWorkflowTemplates, listWorkflowTemplates } from '@/app/API/pages/Workflow'
import WorkflowCard from '@/app/components/Workflows/WorkflowBuilder/WorkflowCard'
import React, { useEffect, useState } from 'react'
import GlobalTemplateCard from './GlobalTemplateCard'
import Button from '@/app/components/Common/Button/Button'
import { useRouter } from 'next/navigation'

const GlobalTemplates = () => {

    const [allGlobalTemplates, setAllGlobalTemplates] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
        getAllGlobalTemplates()
    }, [])


    const getAllGlobalTemplates = async () => {
        let allGlobal = await listWorkflowTemplates()
        if (allGlobal?.data) { setAllGlobalTemplates(allGlobal.data) }
    }

    const createNewTemplate = async () => {

        // If we have a unused default template, we want to use it.
        let defaultTemplateFinder = allGlobalTemplates.find((template) => template.name == 'Default_Template_Name')
        if (defaultTemplateFinder) {
            router.push('/dashboard/workflow/workflow-builder/templates-manager?templateId=' + defaultTemplateFinder.id)
            return;
        }


        // Else we create it.
        let formData = {
            name: "Default_Template_Name",
            description: [],
            policy_name: "",
            policy_description: "",
            policy_exceptions: ""
        }

        const response = await createWorkflowTemplate(formData)
        if (response?.data?.id) router.push('/dashboard/workflow/workflow-builder/templates-manager?templateId=' + response.data.id)
    }


    return (
        <div>
            <div className='flex justify-end my-3'>
                <Button
                    type={"button"}
                    className="inline-block rounded border border-primary bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                    onClick={(e) => createNewTemplate()}
                >
                    Create Template
                </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-auto items-center my-2' >
                {allGlobalTemplates?.map((item, key) =>
                    <GlobalTemplateCard key={key} item={item} loading={loading}></GlobalTemplateCard>
                )}
            </div>
        </div>

    )
}

export default GlobalTemplates