import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Button from '../Common/Button/Button'
const UpdateFaqModal = ({ setShow, handlefaqdelete, text, icon, title, confirmButtonText, cancelButtonText }) => {
    return (
        <>
            <div
                className="rightSlideAnimations bg-[#222023A6] sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50"
            >
            </div>
            <div
                className={`mt-[63px] sm:mt-0 md:mt-0 lg:mt-0 z-50 sm:w-[25%] w-[100%] p-5 fixed sm:top-[150px] top-16 h-[auto] m-auto max-h-[100%] bg-white rounded-lg sm:right-[0] md:right-[200px] lg:right-[400px] right-0`}
            >
                <div className=''>
                    <div className="flex hover:cursor-pointer items-end justify-end gap-2">
                        <div className="flex justify-end gap-2">
                            <div className="cursor-pointer" onClick={(e) => setShow(false)}>
                                <XMarkIcon className="h-8 w-8 rounded-lg text-black p-2" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>{title}</p>
                    </div>
                    <div className='mt-4'>
                        <p className='text-sm '>{text}</p>
                    </div>
                    <div className='sm:mt-8 mt-3'>
                        <div className='flex justify-end gap-5'>
                            <Button className={'inline-block float-left rounded bg-white px-6 pb-2 pt-2 text-xs font-semibold leading-normal text-primary_hover border-2 border-primary_hover'} onClick={(e) => setShow(false)}>{cancelButtonText}</Button>
                            <Button className={'inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-semibold leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]'} onClick={() => handlefaqdelete()}>{confirmButtonText}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateFaqModal