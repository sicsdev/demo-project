import { ArrowUturnLeftIcon, ChevronRightIcon, ClipboardDocumentListIcon, Cog8ToothIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Automations from './Automations'
import { partialUpdateWorkflowTemplate, retrieveWorkflowTemplate } from '@/app/API/pages/Workflow'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { fetchIntegrations } from '@/app/components/store/slices/integrationSlice'
import { getAllIntegrationForTemplates } from '@/app/API/pages/Integration'

const IntegrationTab = () => {
    // Helpers
    const integrationState = useSelector(state => state.integration)
    const params = useSearchParams()
    const dispatch = useDispatch()

    // Local States
    const [integrations, setIntegrations] = useState([])
    const [showAutomations, setShowAutomations] = useState(false)
    const [expandedIntegration, setExpandedIntegration] = useState({})

    useEffect(() => {

        // if (integrationState?.data?.results) {
        //     // Filtering data, we dont want CUSTOM integrations or "QuickEmailVerification"
        //     console.log(integrationState?.data?.results, 'integration list')

        //     let filterQuickEmailVerification = integrationState?.data?.results.filter(integration => integration.name !== "QuickEmailVerification")
        //     let filterCustomTypesIntegrations = filterQuickEmailVerification.filter(integration => integration.type !== 'CUSTOM')


        //     setIntegrations(filterCustomTypesIntegrations)
        // }

        getAllIntegrations()
    }, [integrationState?.data?.results])


    const getAllIntegrations = async () => {
        let allIntegrations = await getAllIntegrationForTemplates()
        setIntegrations(allIntegrations)
    }
    
    const handleFindAutomations = async (element) => {
        setExpandedIntegration(element)
        setShowAutomations(true)
    }

    const getTemplateInformation = async () => {
        let templateId = params.get('templateId')
        let template_data = await retrieveWorkflowTemplate(templateId)
        if (template_data?.data) return template_data.data
    }

    const handleAddDeflection = async (automationObject) => {
        // Get Template Object and currents integrations.
        let currentTemplateObject = await getTemplateInformation()
        let currentIntegrationsArray = currentTemplateObject.automations?.map(integration => integration.automation.id) || []
        console.log(currentIntegrationsArray)
        let newDeflectionObject = {
            "question": "Deflection",
            "data": {},
            "output": {}
        }

        // Patch it with new elemnt.
        let newIntegrationsArray = [...currentIntegrationsArray, newDeflectionObject]
        let payload = { automations: newIntegrationsArray }
        let patchTemplate = await partialUpdateWorkflowTemplate(currentTemplateObject.id, payload)
        dispatch(fetchIntegrations())
    }


    return (
        <div className='px-1'>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input autoComplete="off" type="search" id="search" className="block w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-sm text-gray-900 border border-border !rounded-md" placeholder="Search" required />
                <button type="submit" className="text-white hidden absolute right-2.5 bottom-2.5 bg-blue-700   font-medium rounded-lg  px-4 py-2 ">Search</button>
            </div>


            <p className='text-xs text-heading  my-4 mx-2'>
                Steps are actions you can add to a workflow. Choose steps to tell Deflection AI how to handle your customer inquiries or outbound actions.
            </p>


            {/* AUTOMATIONS LIST */}

            {!showAutomations && <div>
                <ul className="relative m-0 list-none px-[0.2rem]  ">

                    {/* Integrations from API */}

                    {integrations?.map((ele, key) =>
                        <li className='my-4 cursor-pointer ' key={key} onClick={() => handleFindAutomations(ele)} >
                            <div className='flex justify-between items-center'>
                                <div className='flex justify-between items-center gap-2'>
                                    <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                        {ele.icon ?
                                            <Image
                                                fill={"true"}
                                                className={`bg-contain object-scale-down mx-auto w-full rounded-lg`}
                                                alt="logo.png"
                                                src={ele.icon}
                                            /> : <Cog8ToothIcon className="h-6 w-6 text-gray-500" />}

                                    </div>
                                    <p className='text-heading text-xs'>{ele.name}</p>
                                </div>
                                <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                            </div>
                        </li>
                    )}

                    {/* Hardcoded integrations (Deflection, Email, Rules) */}

                    <li className='my-4 cursor-pointer' key={'Rule Integration'}>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between items-center gap-2'>
                                <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                    <EnvelopeIcon className="h-6 w-6 text-gray-500" />
                                </div>
                                <p className='text-heading text-xs'>Rule</p>
                            </div>
                            <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                        </div>
                    </li>


                    <li className='my-4 cursor-pointer ' key={'Deflection Integration'} onClick={handleAddDeflection}>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between items-center gap-2'>
                                <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                    <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />
                                </div>
                                <p className='text-heading text-xs'>Deflection</p>
                            </div>
                            <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                        </div>
                    </li>


                    <li className='my-4 cursor-pointer ' key={'Email Integration2'} >
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between items-center gap-2'>
                                <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                    <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                                </div>
                                <p className='text-heading text-xs'>Email</p>
                            </div>
                            <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                        </div>
                    </li>
                </ul>
            </div>
            }


            {showAutomations &&
                <>
                    <Automations
                        expandedIntegration={expandedIntegration}
                        setShowAutomations={setShowAutomations}
                    >
                    </Automations>
                </>
            }


        </div>
    )
}

export default IntegrationTab