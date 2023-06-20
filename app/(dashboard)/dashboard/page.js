    'use client'
    import React, { useState } from 'react'
    import { QrCodeIcon } from '@heroicons/react/24/outline';
    import Embed from '@/app/components/Embed/Embed';
    import Button from '@/app/components/Common/Button/Button';
    import Modal from '@/app/components/Common/Modal/Modal';
    import CustomerServiceSetupForm from '@/app/components/Forms/CustomerServiceSetupForm';
    import { ChatBubbleOvalLeftIcon  } from '@heroicons/react/24/outline'

    const Page = () => {
        const [showModal, setShowModal] = useState(false)
        return (
            <div>
                <div className="border-b border-border dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <a href="#" className=" flex justify-start gap-2 items-center p-4 text-heading font-bold border-b-2 border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                                <QrCodeIcon className="h-6 w-6 text-gray-500" /> Install Widget
                            </a>
                        </li>

                    </ul>
                </div>
                <div className='block sm:flex md:flex lg:flex justify-end items-center mt-4'>
                    <div>
                        <Button type={"button"} onClick={(e) => { setShowModal(true) }}
                            className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                        >
                            Create New Widget
                        </Button>
                    </div>
                </div>
                <Embed form={false} />

                <Modal className={"w-[90%]  sm:w-[90%] md:w-[60%] lg:w-[60%]"} show={showModal} setShow={setShowModal}
                    title={<><ChatBubbleOvalLeftIcon className="w-10 h-10 mr-2" />Create New Widget</>} 
                    showCancel={true}>
                    <CustomerServiceSetupForm form={false} setShowModal={setShowModal} />
                </Modal>


            </div>
        );
    }

    export default Page