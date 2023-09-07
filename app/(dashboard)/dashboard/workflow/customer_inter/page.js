"use client";
import Card from '@/app/components/Common/Card/Card';
import ManageCustomerInter from '@/app/components/Workflows/CustomerInter/ManageCustomerInter';
import { ClipboardIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react';
import Modal from '@/app/components/Common/Modal/Modal';
import { useSearchParams } from 'next/navigation';

const page = () => {
    const searchParams = useSearchParams();
    const [mode, setMode] = useState('create');
    const [edit, setIsEdit] = useState(false)
    const [singleCustomerData, setSingleCustomerData] = useState(null);
    const [customerInterModal, setCustomerInterModal] = useState(false);

    useEffect(() => {
        const customerInterId = searchParams?.get('customer_inter_id');
        if (customerInterId) {
            setCustomerInterModal(true);
        }

    }, [searchParams]);

    return (
        <>
            <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a
                            href="javascript:void(0)"
                            className=" flex justify-start gap-2 items-center  py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                            aria-current="page"
                        >
                            <ClipboardIcon className="h-5 w-5 text-primary" /> Customer Inter
                        </a>
                    </li>
                </ul>
            </div>
            <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
                {!edit && (
                    <div>
                        <div className="flex justify-between items-center mt-3">
                            <div className="">
                                <h3 className="font-semibold text-md text-heading">Sample Customer Inter Name</h3>
                                <p className="text-sm my-2">
                                    1 active customer inter</p>
                            </div>
                            <div className="grid">
                                <>
                                    <p className="cursor-pointer text-sm" onClick={() => { setCustomerInterModal(true) }}>Edit</p>
                                    <p className="cursor-pointer text-sm mt-2" onClick={() => { setCustomerInterModal(true) }} >Add New</p>
                                </>
                            </div>
                        </div>
                        <hr className="border-border" />
                    </div>
                )}
            </Card>
            {customerInterModal ?
                <Modal title={'Manage Customer Inter'} show={customerInterModal} setShow={setCustomerInterModal} className={'w-[80%] rounded-lg'} showCancel={true} >
                    <ManageCustomerInter mode={mode} singleCustomerData={singleCustomerData} onClose={(e) => setIsEdit(!edit)} />
                </Modal>
                : ""
            }
        </>
    )
}

export default page