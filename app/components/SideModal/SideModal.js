import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

const SideModal = ({ setShow, children, heading, width = "600px" }) => {
    return (
        <>
            <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50' onClick={() => setShow(false)}>  </div >
            <div className={` z-50 overflow-y-scroll w-full sm:w-[${width}] p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}>
                <div className='flex flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800'>
                    <div className='flex flex-1'>
                        <h1 className='text-heading text-sm font-semibold'>{heading}</h1>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <div className='cursor-pointer' onClick={(e) => setShow(false)}>
                            <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2' />
                        </div>
                    </div>
                </div>

                {children}
            </div>
        </>
    )
}

export default SideModal