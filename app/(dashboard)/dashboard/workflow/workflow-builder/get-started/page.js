'use client'
import Button from '@/app/components/Common/Button/Button'
import RightSidebar from '@/app/components/Dashboard/AuthLayout/RightSidebar'
import { ChevronLeftIcon, EllipsisVerticalIcon, ChatBubbleOvalLeftIcon, FolderOpenIcon, ClockIcon, ChevronDownIcon, TagIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Modal from '@/app/components/Common/Modal/Modal'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import { useParams, useSearchParams } from 'next/navigation'
import WorkFlowSelector from '@/app/components/Workflows/WorkFlowSelector/WorkFlowSelector'
import TextField from '@/app/components/Common/Input/TextField'
import FileField from '@/app/components/Common/Input/FileField'
import { getAllWorkflow, getSingleWorkflow, removeWorkFlow, updateWorkFlowStatus } from '@/app/API/pages/Workflow';
import Loading from "@/app/components/Loading/Loading";
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify'

const GetStarted = () => {
  const [shake, setShake] = useState(null)
  const inputRef = useRef(null);
  const router = useRouter();

  const handleButtonClick = (shake = true) => {
    if (shake) {
      setShake('animate-shake')
    }
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
  const [isLoading, setIsLoading] = useState(true);
  const [publishLoader, setPublishLoader] = useState(false);
  const [workflowData, setWorkflowData] = useState(null)
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

  const [automationStepsData, setAutomationStepsData] = useState([]);

  const getWorkflowData = async (id) => {
    const response = await getSingleWorkflow(id)
    if (response) {
      setSingleData(response)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }


  }

  useEffect(() => {
    const flow = params.get("flow");
    if (flow) {
      setIsLoading(true)
      getWorkflowData(flow)
    } else {
      router.push("/dashboard/workflow/workflow-builder")

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


  const saveWorkFlowHandler = async (e) => {
    try {
      setPublishLoader(true);
      let payload = { active: true };
      const updateWorkflow = await updateWorkFlowStatus(payload, singleData?.id);
      setPublishLoader(false);
      if (updateWorkflow?.status === 201 || updateWorkflow?.status === 200) {
        successMessage("Workflow Publish Successfully!");
        router.push(`/dashboard/workflow/workflow-builder`);
      } else {
        errorMessage("Unable to Proceed!");
      }
    } catch (error) {
      setPublishLoader(false);
      errorMessage("Unable to Proceed!");
    }
  };
  const deleteWorkFlow = async (element) => {
    const flow = params.get("flow");
    const deleteWorkFlow = await removeWorkFlow(flow)
    if (deleteWorkFlow.status === 204) {
      successMessage("Workflow deleted successfully !")
      router.push(`/dashboard/workflow/workflow-builder`);
    }
  }
  return (
    <>
      {isLoading === true ?
        <Loading />
        :
        <RightSidebar inputRef={inputRef} shake={shake} setAutomationStepsData={setAutomationStepsData} automationStepsData={automationStepsData} handleButtonClick={handleButtonClick}>
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
                      src={singleData?.logo ?? '/workflow/reactive-subscription.png'}
                    />
                  </div>
                  <div className='cursor-pointer' onClick={() => setWorkflowModal(true)}>
                    <h3 className='text-heading font-bold text-lg'>{singleData.name}</h3>
                    <p className='text-border font-normal text-sm'>{singleData.description}</p>
                  </div>
                </div>
                <div className='flex justify-between gap-2 items-center'>
                  <div><small className='text-xs text-border'>{singleData?.active ? 'Active' : 'Draft'}</small></div>
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

                          <li className='hover:bg-danger hover:text-white text-danger my-2' onClick={()=>{deleteWorkFlow()}}>
                            <a  className="block px-4 py-2 ">Delete</a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <WorkFlowSelector openModal={openModal} stepData={automationStepsData} setAutomationStepsData={setAutomationStepsData} />
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
                  onClick={() => {
                     setDescriptionModal(prev => !prev) 
                     setShowOptions(false) 
                    }}

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
            <Modal title={'Are you sure you want to publish?'} show={showPublishModal} setShow={setShowPublishModal} showCancel={true} className={"w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
              <div className=''>
                <p><b>{singleData.name}</b> will be pushed into production, allowing your Tempo agents to use it immediately. Please click confirm to continue.  </p>
                <div className='flex justify-between gap-2 items-center mt-5'>
                  <div></div>

                  <Button
                    type={"button"}
                    onClick={(e) => saveWorkFlowHandler(e)}
                    className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                  >
                    {publishLoader === true ? 'Loading...' : 'Open Workflow'}
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
        </RightSidebar>
      }
      <ToastContainer />
    </>
  )
}

export default GetStarted