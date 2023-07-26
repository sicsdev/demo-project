import { ClipboardIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Button from '../../Common/Button/Button'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { tiles_icons } from '@/app/data/icon_data';
import { updateIntegrationAutomation } from '@/app/API/pages/Integration';
import { updateWorkFlowStatus } from '@/app/API/pages/Workflow';

const WorkFlowSelector = ({ openModal, stepData, setAutomationStepsData, workflowId }) => {
    const [showButtonStates, setShowButtonStates] = useState(null);

    const updateShowButtonState = (id, type) => {
        if (type === 'show') {
            setShowButtonStates(id);
        } else {
            setShowButtonStates(null);
        }
    };
    const getLogo = (name) => {

        const findIcon = tiles_icons?.find((x) => x?.name.toLowerCase() === name?.toLowerCase())
        if (findIcon) {
            return findIcon.logo
        }
        return ""
    }

    const deleteTheEntry = async (key) => {
        const filterData = stepData.filter((_, index) => index !== key)
        const ids = filterData.map((x) => x.id)
        const update = await updateWorkFlowStatus({ automations: [...ids] }, workflowId)
        setAutomationStepsData(filterData)
    }
    return (
        <div className='w-[auto] sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto'>

            <div className='mt-6 border bg-[#F8F8F8] border-border rounded-lg shadow p-5 cursor-pointer group' >
                <div className='flex justify-between gap-2 items-center'>
                    <div className='flex justify-between gap-4 items-center'>
                        <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                        <p className='text-sm font-semibold '>Starts with a Description to trigger it. </p></div>
                    <Button
                        type={"button"}
                        onClick={(e) => openModal({ key: "DESCRIPTION", open: true })}
                        className="inline-block  cursor-pointer group-hover:border p-2 border-border rounded-lg h-[38px] group-hover:shadow]">
                        <PencilIcon className="h-5 w-5 font-semibold" />
                    </Button>
                </div>
            </div>
            {stepData?.map((ele, key) =>
                <div key={key}
                    onMouseEnter={() => updateShowButtonState(key, 'show')}
                    onMouseLeave={() => updateShowButtonState(key, 'hide')}
                >
                    <div className='section-workflow-wrapper cursor-pointer' onClick={(e) => openModal({ key: "STEPS", open: true, addKey: key })}>
                        <div className='section-workflow'></div>
                        <div className='iconplus'>
                            <PlusIcon className="h-5 w-5 text-gray-500 font-semibold" />
                        </div>
                        <div className='section-workflow3 hover:bg-primary'></div>
                        <div className='section-workflow2'></div>
                    </div>
                    <div className='border  border-border rounded-lg shadow'>
                        <div className=' bg-[#F8F8F8] p-5 cursor-pointer group  rounded-lg' >
                            <div className='flex justify-between gap-2 items-center'>
                                <div className='flex justify-between gap-4 items-center'>
                                    <div className="relative w-[35px] h-[35px] gap-2 rounded-lg">
                                        <Image
                                            fill={"true"}
                                            className="bg-contain mx-auto w-full rounded-lg"
                                            alt="logo.png"
                                            src={getLogo(ele?.name.split(" ")[0]) ?? '/workflow/reactive-subscription.png'}
                                        />
                                    </div>
                                    <p className='text-sm font-semibold '>{ele?.name}</p>
                                </div>
                                <div>
                                    <div className='rounded-lg group-hover:border border-border  h-[38px] group-hover:shadow]'>
                                        {showButtonStates === key &&
                                            <Button
                                                type={"button"}
                                                onClick={(e) => deleteTheEntry(key)}
                                                className="inline-block  cursor-pointer p-2  h-[38px]">
                                                <TrashIcon className="h-5 w-5 font-semibold cursor-pointer" />
                                            </Button>
                                        }
                                        <Button
                                            type={"button"}
                                            onClick={(e) => openModal({ key: "COLLECTINFOFORM", open: true })}
                                            className="inline-block cursor-pointer p-2 h-[38px]">
                                            <PencilIcon className="h-5 w-5 font-semibold" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {/* <div className='section-workflow-wrapper cursor-pointer' onClick={(e) => openModal({ key: "STEPS", open: true, addKey: null })}>
                <div className='section-workflow'></div>
                <div className='iconplus'>
                    <PlusIcon className="h-5 w-5 text-gray-500 font-semibold" />
                </div>
                <div className='section-workflow3 hover:bg-primary'></div>
                <div className='section-workflow2'></div>
            </div> */}

            <div className='mt-4 border-2 border-dashed  bg-[#F8F8F8] border-primary rounded-lg shadow p-5 cursor-pointer group'
                onClick={(e) => openModal({ key: "STEPS", open: true, addKey: null })} >
                <div className='flex justify-between gap-2 items-center'>
                    <div className='flex justify-between gap-4 items-center'>
                        <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                        <p className='text-sm font-semibold'>Your next step goes here</p></div>

                </div>
            </div>

        </div >
    )
}

export default WorkFlowSelector