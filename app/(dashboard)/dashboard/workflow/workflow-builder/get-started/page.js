'use client'
import Button from '@/app/components/Common/Button/Button'
import RightSidebar from '@/app/components/Dashboard/AuthLayout/RightSidebar'
import { ChevronLeftIcon, EllipsisVerticalIcon, InboxArrowDownIcon, LinkIcon, PencilIcon, ChatBubbleOvalLeftIcon, FolderOpenIcon, ClockIcon, ChevronDownIcon, TagIcon, CheckIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Modal from '@/app/components/Common/Modal/Modal'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import { useParams, useSearchParams } from 'next/navigation'
import workflowOptions from "@/app/data/workflowtiles.json"
import WorkFlowSelector from '@/app/components/Workflows/WorkFlowSelector/WorkFlowSelector'
import TextField from '@/app/components/Common/Input/TextField'
import FileField from '@/app/components/Common/Input/FileField'
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "react-draft-wysiwyg";

const GetStarted = () => {
  const [shake, setShake] = useState(null)
  const inputRef = useRef(null);
  const handleButtonClick = () => {
    setShake('animate-shake')
  if (inputRef.current) {
    inputRef.current.focus();
    inputRef.current.setSelectionRange(
      inputRef.current.value.length,
      inputRef.current.value.length
    );
    setTimeout(() => {
      setShake(null)
    }, 500);
  }
};
  const params = useSearchParams()
  const [singleData, setSingleData] = useState(null)
  const [showHelp, setShowHelp] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [descrptionValue, setDescriptionValue] = useState({
    name: "From an outbound API call",
    icon: <TagIcon className="h-6 w-6" />,
    key: 2

  })
  const description_data = [{
    name: "From a written description of the workflow",
    icon: <TagIcon className="h-6 w-6" />,
    key: 0

  },
  {
    name: "From an outbound API call",
    icon: <TagIcon className="h-6 w-6" />,
    key: 1

  }
  ]
  // modals 
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [stepModal, setStepModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [workflowModal, setWorkflowModal] = useState(false);
  useEffect(() => {
    if (params.get("flow")) {
      const flow = params.get("flow")
      const findData = workflowOptions.find((x) => x.key === flow)
      if (findData) {
        setSingleData(findData)
      }
    }
  }, [])


  const openModal = (value) => {
    switch (value.key) {
      case "DESCRIPTION":
        setDescriptionModal(true)
        break;
      case "COLLECTINFOFORM":

        break;
      case "STEPS":
        handleButtonClick()
        break;

      default:
        break;
    }
  }
  return (
    <RightSidebar inputRef={inputRef} shake={shake}>
      {singleData ? (
        <>
          <div className='flex justify-between gap-2 items-center'>
            <div className='flex justify-between gap-2 items-center'>
              <Link href={"/dashboard/workflow/workflow-builder"}>
                <div>
                  <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
                </div>
              </Link>
              <div className="relative w-[35px] h-[35px] gap-2 rounded-lg">
                <Image
                  fill={"true"}
                  className="bg-contain mx-auto w-full rounded-lg"
                  alt="logo.png"
                  src={singleData.img}
                />
              </div>
              <div className='cursor-pointer' onClick={() => setWorkflowModal(true)}>
                <h3 className='text-heading font-bold text-lg'>{singleData.name}</h3>
                <p className='text-border font-normal text-sm'>{singleData.title}</p>
              </div>
            </div>
            <div className='flex justify-between gap-2 items-center'>
              <div><small className='text-xs text-border'>Never Published</small></div>
              <div>
                <Button
                  type={"button"}
                  onClick={() => setShowPublishModal(true)}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]">
                  Publish
                </Button>
              </div>
              <div className='cursor-pointer relative' onClick={() => { setShowHelp(prev => !prev) }}><EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
                {showHelp && (
                  <div className="absolute left-[-280px] top-[40px] z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44 ">
                    <ul className="py-2 text-sm text-gray-700 ">

                      <li className='hover:bg-danger hover:text-white text-danger my-2'>
                        <a href="#" className="block px-4 py-2 ">Delete</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <WorkFlowSelector openModal={openModal} />
        </>) : <p>No Data Found !</p>}

      {/* Modals  */}
      {/* description modal start  */}
      {
        descriptionModal &&
        <Modal title={<h3 className='text-lg font-semibold'>Change how this workflow starts</h3>} hr={false} show={descriptionModal} setShow={setDescriptionModal} showCancel={true} className={"w-[80%] sm:w-[540%] md:w-[40%] lg:w-[40%]"} >
          <div>
            <div className='relative'>
              <div className='border border-border rounded-md flex justify-between items-center gap-4 text-heading my-2 p-2 cursor-pointer' onClick={() => { setShowOptions(prev => !prev) }}>
                <div className='flex justify-between items-center gap-4'>
                  <div><ClockIcon className="h-6 w-6" /></div>
                  <div><span className='font-semibold text-base'>{descrptionValue.name}</span></div>
                </div>
                <div><ChevronDownIcon className="h-6 w-6" /></div>

              </div>
              {showOptions && (
                <div className=' absolute w-full z-[99999] top-[38px] border border-border rounded-[4px] bg-[#F8F8F8] '>
                  <div className='px-2'>
                    <h3 className='text-border text-base'>Options</h3>
                  </div>
                  {description_data.map((element, key) =>
                    <div className=' my-2 cursor-pointer hover:bg-primary_hover hover:text-white text-heading' key={key} onClick={() => {
                      setDescriptionValue({
                        icon: element.icon,
                        name: element.name,
                        key: element.key
                      })
                    }}>
                      <div className={`px-4 py-2 flex gap-4 hover:text-white ${element.key === descrptionValue.key && ("text-primary font-semibold")}`}>
                        {element.icon}<p >{element.name}</p>
                      </div>
                    </div>
                  )}


                </div >
              )}
            </div>

            <div className='my-2 p-2'>
              <TextField name='company_name' className='py-3 w-full mt-1' title={<div className='flex items-center gap-2'><span>Workflow Description</span>  </div>} placeholder={"Write a concise verbal description of the workflow for the AI to know when to trigger it. "} type={'text'} id={"work_flowdescription"} />
            </div>
            <div
              className={`flex  p-2 rounded-b mt-5 justify-end gap-4`}
            >
              <Button
                className="inline-block float-left rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-heading border border-border "
              // onClick={() => { setSuggestModal(prev => !prev) }}

              >
                Back
              </Button>
              <Button
                type={"button"}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              // onClick={() => { setSuggestModal(prev => !prev) }}
              >
                Submit
              </Button>
            </div >
          </div >

        </Modal >
      }

      {/* description modal end  */}
      {/* workflowname modal start  */}

      {
        workflowModal &&
        <Modal title={<h3 className='text-lg font-semibold'>Workflow Details</h3>} hr={false} show={workflowModal} setShow={setWorkflowModal} showCancel={true} className={"w-[80%] sm:w-[540%] md:w-[40%] lg:w-[40%]"} >
          <div className=''>
            <div className='mt-2 p-2'>
              <TextField name='company_name' value={"Untitled Workflow"} className='py-3 w-full mt-1' title={<div className='flex items-center gap-2'><span>Name</span>  </div>} placeholder={"Something short and descriptive"} type={'text'} id={"work_flowdescription"} />
            </div>
            <div className='mt-2 p-2'>
              <TextField name='company_name' className='py-3 w-full mt-1' value={"A brand new workflow"} title={<div className='flex items-center gap-2'><span>Description</span>  </div>} placeholder={"What is this workflow for ?"} type={'text'} id={"work_flowdescription"} />
            </div>
            <div className='mt-2 p-2'>
              <FileField title={<div className='flex items-center gap-2'><span>Image</span> </div>} type={'file'} placeholder="Upload" id="docs"
                // onChange={(event) => {
                //   const file = event.target.files[0];
                //   const allowedExtensions = ['json', 'xls', 'xlsx', 'csv', 'mbox', 'pst'];
                //   if (file) {
                //     const fileExtension = file.name.split('.').pop().toLowerCase();
                //     if (allowedExtensions.indexOf(fileExtension) === -1) {
                //       setErrors('Error: please upload a valid file type (json, xls, xlsx, csv, mbox, pst)');
                //       return;
                //     }
                //     setErrors(null);
                //     setSelectedFile(file);
                //   }

                // }} 
                error={""} />
            </div>
            <div
              className={`flex  p-2 rounded-b mt-5 justify-end gap-4`}
            >
              <Button
                className="inline-block float-left rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-heading border border-border "
              // onClick={() => { setSuggestModal(prev => !prev) }}

              >
                Back
              </Button>
              <Button
                type={"button"}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              // onClick={() => { setSuggestModal(prev => !prev) }}
              >
                Save
              </Button>
            </div >
          </div>
        </Modal>
      }
      {/* workflowname modal end  */}
      {
        showPublishModal &&
        <Modal title={'Your workflow is ready to use'} show={showPublishModal} setShow={setShowPublishModal} showCancel={true} className={"w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
          <div className=''>
            <p><b>Welcome Bot</b> is published and available to use in tempo. Test is out by leaving and then re-joining <b># ads.</b></p>
            <div className='flex justify-between gap-2 items-center mt-5'>
              <div></div>
              <Button
                type={"button"}
                className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              >
                Open Workflow
              </Button>
            </div>
          </div>
        </Modal>
      }

      {
        stepModal &&
        <Modal title={'Step Library'} show={stepModal} setShow={setStepModal} showCancel={true} className={"w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
          <div>
            <div className='flex justify-between gap-2 items-center mb-5'>
              <div className='flex justify-between gap-4 items-center'>
                <ChatBubbleOvalLeftIcon className="h-7 w-7 font-semibold" />
                <div>
                  <h4 className='font-bold'>Send a Message</h4>
                  <p>Tempo</p>
                </div>
              </div>
              <div className=''>
                <Button
                  type={"button"}
                  className="focus:outline-none font-normal rounded-md text-sm py-2 px-4 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black">
                  Add
                </Button>
              </div>
            </div>
            <div className='flex justify-between gap-2 items-center'>
              <div className='flex justify-between gap-4 items-center'>
                <FolderOpenIcon className="h-7 w-7 font-semibold" />
                <div>
                  <h4 className='font-bold'>Send a Form</h4>
                  <p>Tempo</p>
                </div>
              </div>
              <div className=''>
                <Button
                  type={"button"}
                  className="focus:outline-none font-normal rounded-md text-sm py-2 px-4 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      }


      {
        editModal &&
        <Modal title={'Send a Message'} show={editModal} setShow={setEditModal} showCancel={true} className={"w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
          <form>
            <div className="mb-4">
              <SelectOption
                name="role"
                values={[{ name: 'Admin', value: 'ADMINISTRATOR' }, { name: 'Collaborator', value: 'MEMBER' }]}
                title={"Send this message to"}
                id={"role"}
                className="py-3"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type={"submit"}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              >
                Edit
              </Button>
            </div>
          </form>
        </Modal>
      }
    </RightSidebar >
  )
}

export default GetStarted