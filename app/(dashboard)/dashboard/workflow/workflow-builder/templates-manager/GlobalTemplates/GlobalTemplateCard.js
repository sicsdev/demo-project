import { createWorkflowUsingTemplate } from '@/app/API/pages/Workflow';
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import { makeCapital } from '@/app/components/helper/capitalName';
import { capitalizeFirstLetter } from '@/app/components/helper/firstLetterCapital';
import { ArrowRightIcon, ArrowUturnLeftIcon, ClipboardDocumentListIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import ConfigureIntegrations from '../ConfigureIntegrationSidebar/ConfigureIntegrations';
import Swal from 'sweetalert2';
import Modal from '@/app/components/Common/Modal/Modal';
import Button from '@/app/components/Common/Button/Button';
import { useSelector } from 'react-redux';
import { getPermissionHelper } from '@/app/components/helper/returnPermissions';

const GlobalTemplateCard = ({ item, loading, key }) => {
    const router = useRouter()
    const [neededIntegrationsToAddAsWorkflow, setNeededIntegrationsToAddAsWorkflow] = useState([])
    const [showConfigureIntegrations, setShowConfigureIntegrations] = useState(false)
    const userState = useSelector(state => state.user.data)

    const getIntegrationIcon = (automations, name = "") => {
        const getIcon = automations?.find((x) => x?.automation?.integration?.icon !== null && x?.automation?.integration?.icon !== "");

        if (getIcon !== undefined && getIcon?.automation?.integration?.icon !== undefined) {
            return getIcon?.automation?.integration?.icon;
        }
        return null;
    };

    const handleRedirect = () => {
        let isAllowedToEditTemplates = userState.email.endsWith('deflection.ai') || userState.email.endsWith('joinnextmed.com')
        if (isAllowedToEditTemplates) router.push(`/dashboard/workflow/workflow-builder/templates-manager?templateId=${item.id}`)
    }

    const handleCreateWorkflowBasedInTemplate = async () => {
        let nonAddedAutomations = item.automations.filter(automation => automation.automation.integration.added == false)

        if (nonAddedAutomations) {
            setNeededIntegrationsToAddAsWorkflow(nonAddedAutomations)
            setShowConfigureIntegrations(true)
        } else {
            createWorkflowUsingTemplate(item.id)
        }

    }

    const redirectToIntegrations = () => {
        router.push('/dashboard/workflow/integrations')
    }

    return (
        <>

            {/* Configure integrations sidebar */}
            {/* {showConfigureIntegrations &&
                <ConfigureIntegrations
                    setShowConfigureIntegrations={setShowConfigureIntegrations}
                    neededIntegrationsToAddAsWorkflow={neededIntegrationsToAddAsWorkflow}
                > </ConfigureIntegrations>
            } */}

            {showConfigureIntegrations &&
                <div className='absolute'>
                    <Modal title={'Configure integrations'} show={showConfigureIntegrations} setShow={setShowConfigureIntegrations} className={'w-[40%] rounded-lg'} showCancel={true} >
                        <div className='mb-4'>
                            <small>To create a workflow based on this template, you need to configure the following integrations.</small>
                        </div>
                        {neededIntegrationsToAddAsWorkflow?.map(integration =>
                            <div className='flex my-1 items-center gap-1 bg-[#ECF6FE] border-primary_hover border border-border p-3 rounded-md hover:bg-[#ECF6FE] hover:border-primary_hover'>
                                <img src={integration.automation.integration.icon} alt={integration.automation.integration.name} className='w-5 h-5' />
                                <small>  {integration.automation.integration.name}</small>
                            </div>
                        )}
                        <div className='flex justify-end mt-3'>
                            <Button onClick={redirectToIntegrations} className="flex items-center gap-2 mt-2 rounded bg-primary px-2 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                            >Configure <ArrowRightIcon className='w-3 h-3'></ArrowRightIcon></Button>
                        </div>
                    </Modal>
                </div>
            }


            <div
                onClick={handleRedirect}
                key={key}
                className={`relative border border-[#F0F0F1] p-3 rounded-md bg-white h-[200px] shadow-md hover:border-3 hover:!border-primary cursor-pointer`}
            >

                <div className='relative h-full'>

                    <div className='flex items-center justify-start gap-2'>

                        {item.icon && (
                            loading ?
                                <SkeletonLoader className="mr-2" count={1} height={30} width={40} /> :
                                <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" onClick={(e) => { e.stopPropagation() }}>
                                    {item.icon}
                                </div>
                        )}

                        {getIntegrationIcon(item?.automations, item?.name) !== null && (
                            <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" >
                                {loading ?
                                    <SkeletonLoader className="mr-2" count={1} height={30} width={40} />
                                    :
                                    <Image
                                        fill={"true"}
                                        className="bg-contain mx-auto object-scale-down w-full rounded-lg"
                                        alt="logo.png"
                                        src={getIntegrationIcon(item?.automations, item?.name)}
                                    />
                                }
                            </div>
                        )}
                        {item?.automations?.length > 0 && item?.automations?.map((element, index) =>
                            (element?.automation === null) && (
                                <div key={index} className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                    {element.condition && element.condition !== "" && (
                                        <>
                                            {loading ?
                                                <SkeletonLoader count={1} height={30} width={40} />
                                                :
                                                <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                                            }
                                        </>
                                    )}

                                    {element?.question && element?.question !== "" && (
                                        <>
                                            {loading ?
                                                <SkeletonLoader count={1} height={30} width={40} />
                                                :
                                                <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />
                                            }

                                        </>
                                    )}

                                    {element?.transformer && element?.transformer !== "" && (
                                        <>
                                            {loading ?
                                                <SkeletonLoader count={1} height={30} width={40} />
                                                :
                                                <PuzzlePieceIcon className="h-6 w-6 text-gray-500" />
                                            }
                                        </>
                                    )}
                                </div>
                            )
                        )}

                    </div>
                    <div className=''
                    >
                        <h2 className='text-[#151D23] !font-bold mt-2 text-base'>
                            {loading ?
                                <SkeletonLoader count={1} height={30} width="70%" />
                                :
                                <>
                                    {item.name === 'Default_name' ? "New Workflow 1" : makeCapital(item.name)}
                                </>
                            }</h2>
                        <p className='text-xs text-black mt-1'>

                            {loading ?
                                <SkeletonLoader count={1} height={20} width="50%" />
                                :
                                <>
                                    By Deflection AI
                                </>
                            }
                        </p>
                        <p className='text-xs text-[#151d23cc] mt-1'>
                            Template
                        </p>
                    </div>


                    {/* Only administrators can create workflows based in templates. */}
                    {getPermissionHelper('CREATE WORKFLOW BASED IN TEMPLATE', userState?.role) &&
                        <div className='absolute w-full bottom-0 flex items-center justify-end'>
                            <div className=' text-end'>

                                <>
                                    <p className={`${item.active ? 'text-danger' : 'text-success'}  cursor-pointer hover:font-semibold text-xs`} onClick={(e) => {
                                        e.stopPropagation();
                                        handleCreateWorkflowBasedInTemplate()
                                    }}>
                                        {loading ?
                                            <SkeletonLoader count={1} height={30} width={50} />
                                            : <>
                                                Create workflow based in this template
                                            </>
                                        }</p>
                                </>


                            </div>
                        </div>
                    }
                </div>

            </div >
        </>

    )
}

export default GlobalTemplateCard