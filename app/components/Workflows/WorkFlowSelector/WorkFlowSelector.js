import { ClipboardIcon, InboxArrowDownIcon, PencilIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Button from '../../Common/Button/Button'

const WorkFlowSelector = ({ openModal }) => {
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
            <div className='section-workflow-wrapper'>
                <div className='section-workflow'></div>
                <div className='iconplus  cursor-pointer'> <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" /></div>

                <div className='section-workflow3'></div>
                <div className='section-workflow2'></div>
            </div>
            <div className='border  border-border rounded-lg shadow'>
                <div className=' bg-[#F8F8F8] p-5 cursor-pointer group  rounded-lg' >
                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex justify-between gap-4 items-center'>
                            <InboxArrowDownIcon className="h-5 w-5 text-gray-500 font-semibold" />
                            <p className='text-sm font-semibold '>Collect info in a form</p></div>
                        <Button
                            type={"button"}
                            onClick={(e) => openModal({ key: "COLLECTINFOFORM", open: true })}
                            className="inline-block  cursor-pointer group-hover:border p-2 border-border  h-[38px] group-hover:shadow]">
                            <PencilIcon className="h-5 w-5 font-semibold" />
                        </Button>
                    </div>
                </div>
                <div className='p-5'>

                    <h2 className="mb-2 text-sm font-semibold">Top students:</h2>
                    <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                        <li>
                            <span className="font-normal text-sm ">Bonnie Green 70</span>
                        </li>
                        <li>
                            <span className="font-normal text-sm ">Jese Leos 63</span>
                        </li>
                        <li>
                            <span className="font-normal text-sm ">Leslie Livingston7</span>
                        </li>
                    </ol>

                </div>
            </div>
            <div className='section-workflow-wrapper'>
                <div className='section-workflow'></div>
                <div className='iconplus cursor-pointer'> <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" /></div>
                <div className='section-workflow3'></div>
                <div className='section-workflow2'></div>
            </div>
            <div className='border-2 border-dashed  bg-[#F8F8F8] border-primary rounded-lg shadow p-5 cursor-pointer group' 
                        onClick={(e) => openModal({ key: "STEPS", open: true })} >
                <div className='flex justify-between gap-2 items-center'>
                    <div className='flex justify-between gap-4 items-center'>
                        <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                        <p className='text-sm font-semibold'>Your next step goes here</p></div>
                    
                </div>
            </div>

        </div>
    )
}

export default WorkFlowSelector