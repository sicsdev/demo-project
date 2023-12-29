import { getAllTemplateAutomationsByIntegrationId, getIntegrationAutomation } from '@/app/API/pages/Integration'
import { partialUpdateWorkflowTemplate, retrieveWorkflowTemplate } from '@/app/API/pages/Workflow'
import { fetchIntegrations } from '@/app/components/store/slices/integrationSlice'
import { tiles_icons } from '@/app/data/icon_data'
import { ChevronLeftIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'


const Automations = ({ expandedIntegration, setShowAutomations, refreshWorkflowTemplate}) => {

    const dispatch = useDispatch()
    const params = useSearchParams()

    // Local states
    const [automationsList, setAutomationsList] = useState([])
    const [currentIntegration, setCurrentIntegration] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        initializer()
        return () => { setAutomationsList([]) }
    }, [expandedIntegration])


    // Main functions

    const initializer = () => {
        if (expandedIntegration?.id) {
            handleFindAutomations()
            setCurrentIntegration(expandedIntegration)
        } else {
            setLoading(false)
        }
    }

    const handleFindAutomations = async () => {
        setLoading(true)
        const automationData = await getAllTemplateAutomationsByIntegrationId(expandedIntegration?.id);
        if (automationData.length > 0) setAutomationsList(automationData)
        setLoading(false)
    }

    const getLogo = (name) => {
        const findIcon = tiles_icons?.find(
            (x) => x?.name.toLowerCase() === name?.toLowerCase()
        );
        if (findIcon) {
            return findIcon.logo;
        }
        return "";
    };

    const handleAddAutomationToTemplate = async (automationObject) => {

        // Get Template Object and currents integrations.
        let currentTemplateObject = await getTemplateInformation()
        let currentIntegrationsArray = currentTemplateObject.automations?.map(automation => automation.automation.id) || []
        // Patch it with new elemnt.
        let newIntegrationsArray = [...currentIntegrationsArray, automationObject.id]
        let payload = { automations: newIntegrationsArray }
        let patchTemplate = await partialUpdateWorkflowTemplate(currentTemplateObject.id, payload)
        dispatch(fetchIntegrations())
        refreshWorkflowTemplate()
    }


    const getTemplateInformation = async () => {
        let templateId = params.get('templateId')
        let template_data = await retrieveWorkflowTemplate(templateId)
        if (template_data?.data) return template_data.data
    }

    return (
        <div>
            {/* LOADER */}
            {loading &&
                <div className='flex justify-center'>
                    <ColorRing
                        height="30"
                        width="30"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperClass="text-center"
                        visible={true}
                    />
                </div>
            }



            {/* AUTOMATIONS LIST */}

            {automationsList?.length > 0 &&
                <>
                    <div className='flex justify-start items-center my-8 gap-2 cursor-pointer' onClick={(e) => setShowAutomations(false)}>
                        <span>
                            <ChevronLeftIcon className="h-4 w-4" />
                        </span>
                        {currentIntegration?.icon ?
                            <div className="relative w-[20px] h-[20px] rounded-lg">
                                <Image
                                    fill={"true"}
                                    className={`bg-contain mx-auto object-scale-down w-full rounded-lg`}
                                    alt="logo.png"
                                    src={currentIntegration?.icon || getLogo(currentIntegration?.name)}
                                />
                            </div> : <Cog8ToothIcon className="h-6 w-6 text-gray-500" />}

                        <p className='text-heading text-sm'>{currentIntegration?.name}</p>
                    </div>

                    <div className='mb-32'>
                        <ul className="relative m-0 list-none px-[0.2rem]  ">

                            {automationsList?.map((ele, key) =>
                                <li className={`my-4 cursor-pointer border border-border rounded-md p-2 bg-[#F8F8F8]`} key={key} onClick={() => handleAddAutomationToTemplate(ele)}>
                                    <div className='flex justify-start items-center gap-4'>

                                        {ele?.integration?.icon ?
                                            <div className="relative w-[25px] h-[20px] rounded-lg">
                                                <Image
                                                    fill={"true"}
                                                    className={`bg-contain object-scale-down mx-auto w-full rounded-lg`}
                                                    alt="logo.png"
                                                    src={ele?.integration?.icon || getLogo(currentIntegration?.name)}
                                                />
                                            </div> : <Cog8ToothIcon className="h-6 w-6 text-gray-500" />}

                                        <div className='w-[200px]'>
                                            <h3 className='text-xs'>{ele?.name}</h3>
                                            <p className='text-border text-[11px] font-light'>{ele?.description}</p>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>

                    </div>
                </>}



            {/* NO DATA COMPONENT */}
            {!loading && automationsList?.length === 0 && <div>No automations for this integration</div>}

        </div >
    )
}

export default Automations