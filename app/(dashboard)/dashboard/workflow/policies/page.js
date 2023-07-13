"use client";
import Card from '@/app/components/Common/Card/Card';
import ManagePolicy from '@/app/components/Workflows/Policies/ManagePolicy';
import { ClipboardIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react';
import Modal from '@/app/components/Common/Modal/Modal';
import { useSearchParams } from 'next/navigation';

const page = () => {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState('create');
  const [edit, setIsEdit] = useState(false)
  const [singlePolicyData, setSinglePolicyData] = useState(null);
  const [policyModal, setPolicyModal] = useState(false);

  useEffect(() => {
    const policyID = searchParams?.get('policy_id');
    if (policyID) {
      setPolicyModal(true);
    }

  }, [searchParams]);

  return (
    <>
      {/* {edit == true && (
        <>
          <p
            className="float-right my-5 cursor-pointer"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            Back
          </p>
        </>
      )} */}
      <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a
              href="javascript:void(0)"
              className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <ClipboardIcon className="h-6 w-6 text-primary" /> Policies
            </a>
          </li>
        </ul>
      </div>
      <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
        {!edit && (
          <div>
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">Sample Policy Name</h3>
                <p className="text-sm my-2">
                  2 active policies</p>
              </div>
              <div className="grid">
                <>
                  <p className="cursor-pointer text-sm" onClick={() => { setPolicyModal(true) }}>Edit</p>
                  <p className="cursor-pointer text-sm mt-2" onClick={() => { setPolicyModal(true) }} >Add New Policy</p>
                </>
              </div>
            </div>
            <hr className="border-border" />
          </div>
        )}
      </Card>
      {policyModal ?
        <Modal title={'Manage Policy'} show={policyModal} setShow={setPolicyModal} className={'w-[80%] rounded-lg'} showCancel={true} >
          <ManagePolicy mode={mode} singlePolicyData={singlePolicyData} onClose={(e) => setIsEdit(!edit)} />
        </Modal>
        : ""
      }
    </>
  )
}

export default page