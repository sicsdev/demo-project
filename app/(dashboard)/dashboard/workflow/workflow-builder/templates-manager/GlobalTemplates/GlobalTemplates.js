import { createWorkflowTemplate, getWorkflowTemplates, listWorkflowTemplates } from '@/app/API/pages/Workflow'
import WorkflowCard from '@/app/components/Workflows/WorkflowBuilder/WorkflowCard'
import React, { useEffect, useState } from 'react'
import GlobalTemplateCard from './GlobalTemplateCard'
import Button from '@/app/components/Common/Button/Button'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const GlobalTemplates = () => {

    const [allGlobalTemplates, setAllGlobalTemplates] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const userState = useSelector(state => state.user.data)

    let isAuthorized = userState?.email?.endsWith('@deflection.ai') || userState?.email?.endsWith('@joinnextmed.com')

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

    const handleSearch = (e) => {
        let targetValue = e.target.value
        let value = targetValue ? targetValue.toLowerCase() : ''
        if (value == '') { getAllGlobalTemplates(); return }
        let filteredArray = allGlobalTemplates.filter(temp => temp.name.toLowerCase().startsWith(value))
        console.log(filteredArray)
        setAllGlobalTemplates(filteredArray)
    }

    return (
        <div>
            <div className='flex justify-end my-3 gap-3'>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search"
                        className="border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px] pl-10"
                        placeholder="Search"
                        onChange={(e) => { handleSearch(e) }} />
                </div>

                {userState?.email?.endsWith('@deflection.ai') || userState?.email?.endsWith('@joinnextmed.com') &&
                    <Button
                        type={"button"}
                        className="flex rounded border border-primary bg-primary px-6 pb-2 h-[1.9rem]  items-center sm:h-[1.9rem] w-[10rem] sm:w-[10rem] pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                        onClick={(e) => createNewTemplate()}
                    >
                        Create Template
                    </Button>}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-auto items-center my-2' >
                {allGlobalTemplates?.map((item, key) =>
                    <GlobalTemplateCard key={key} item={item} loading={loading}></GlobalTemplateCard>
                )}
            </div>
        </div >

    )
}

export default GlobalTemplates