'use client'
import Button from '@/app/components/Common/Button/Button'
import RightSidebar from '@/app/components/Dashboard/AuthLayout/RightSidebar'
import { ChevronLeftIcon, EllipsisVerticalIcon, ChatBubbleOvalLeftIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Modal from '@/app/components/Common/Modal/Modal'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import { useSearchParams } from 'next/navigation'
import WorkFlowSelector from '@/app/components/Workflows/WorkFlowSelector/WorkFlowSelector'
import { getSingleWorkflow, removeWorkFlow, updateWorkFlowStatus } from '@/app/API/pages/Workflow';
import Loading from "@/app/components/Loading/Loading";
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify'
import UpdateWorkflowBasic from '@/app/components/Workflows/WorkflowBuilder/UpdateWorkflowBasic'
import PublishWorkflow from '@/app/components/Workflows/WorkflowBuilder/PublishWorkflow'
import DeleteWorkflow from '@/app/components/Workflows/WorkflowBuilder/DeleteWorkflow'

const GetStarted = () => {
  const [shake, setShake] = useState(null)
  const [indexSelector, setIndexSelector] = useState(null)
  const [singleData, setSingleData] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [publishLoader, setPublishLoader] = useState(false);
  const [showHelp, setShowHelp] = useState(false)

  const [workflowFormData, setWorkFlowFormData] = useState({
    name: null,
    description: null,
    logo: null,
    policy_name: null,
    policy_description: null,
    policy_exceptions: null
  })

  // modals 
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [stepModal, setStepModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [workflowModal, setWorkflowModal] = useState(false);
  const [deleteWorkflowModal, setDeleteWorkflowModal] = useState(false);

  const [automationStepsData, setAutomationStepsData] = useState([]);
  const [automationStepsField, setAutomationStepsField] = useState([]);
  const router = useRouter();
  const inputRef = useRef(null);
  const [addStepIndex, setAddStepIndex] = useState(null);

  const handleButtonClick = (shake = true) => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  };

  const params = useSearchParams()

  function objectValuesToArray(obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      const values = Object.values(obj);
      return values.filter(value => value !== '');
    } else {
      return [];
    }
  }
  const getWorkflowData = async (id) => {
    const response = await getSingleWorkflow(id)
    if (response) {
      setSingleData(response)
      setWorkFlowFormData((prev) => {
        return {
          ...prev,
          name: response.name === "Default_name" ? "" : response.name,
          description: response.description == "Default_description" ? "" : response.description,
          logo: '',
          preview: response.logo ?? '/workflow/reactive-subscription.png',
          policy_name: response?.policy_name === "default" ? "" : response?.policy_name,
          policy_description: response?.policy_description === "default" ? "" : response?.policy_description,
          policy_exceptions: response?.policy_exceptions === "default" ? "" : response?.policy_exceptions
        }
      })
      if (response?.automations?.length > 0) {
        setAutomationStepsData(response.automations)
        const filterData = response.automations.map((ele) => {
          const isEmptyObject = Object.keys(ele.output).length === 0;
          const jsonString = isEmptyObject ? "" : JSON.stringify(ele.output);
          return {
            key: Object.keys(ele.data).length === 0  && isEmptyObject? '':ele.automation.id,
            value: '',
            name: '',
            names_arr: objectValuesToArray(ele.data),
            output: jsonString,
            loading:false
          }
        })
        setAutomationStepsField(filterData)
      }
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


  const divRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowHelp(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const openModal = (value) => {
    switch (value.key) {
      case "DESCRIPTION":
        setDescriptionModal(true)
        break;
      case "COLLECTINFOFORM":
        break;
      case "STEPS":
        setAddStepIndex(null)
        setIndexSelector(null)
        handleButtonClick()
        break;
      case "PLUS":
        setIndexSelector(value?.addKey)
        handleButtonClick()
        setAddStepIndex(value?.addKey)
        break;
      case "EDIT":
        addAutomationFields(value)
        break;

      default:
        break;
    }
  }


  const addAutomationFields = (value) => {
    let data_value = [...automationStepsField];
    const emptyObject = { key: '', value: '', name: '', names_arr: [], output: "" , loading:false};
    const targetIndex = value.index;
    while (data_value.length <= targetIndex) {
      data_value.push(emptyObject);
    }
    const existingIndex = data_value.findIndex(item => item.key === value.addKey);
    if (existingIndex !== -1) {
      data_value[targetIndex] = { key: '', value: '', name: '', names_arr: data_value[targetIndex].names_arr, output: data_value[targetIndex].output, loading:false }
    } else {
      data_value[targetIndex] = { key: value.addKey, value: '', name: '', names_arr: data_value[targetIndex].names_arr, output:  data_value[targetIndex].output, loading:false }
    }
    setAutomationStepsField(data_value);
  }
  console.log("automationStepsField", automationStepsField)
  const saveWorkFlowHandler = async (type) => {
    try {
      let payload = {}
      setPublishLoader(true);
      if (type === "PUBLISH") {
        if (singleData.policy_name === 'default' || singleData.policy_description === 'default') {
          setPublishLoader(false);
          setShowPublishModal(false);
          errorMessage("Please update your workflow name, description, and policy information before publishing.");
          return false;
        }
        payload = { active: true };
      } else if (type === "EDIT") {
        payload = {
          logo: workflowFormData.logo,
          description: workflowFormData.description,
          name: workflowFormData.name,
          policy_name: workflowFormData.policy_name,
          policy_description: workflowFormData.policy_description,
          policy_exceptions: workflowFormData.policy_exceptions
        }
      } else if (type === "DISABLE") {
        payload = { active: false }
      }

      !payload.logo && delete payload.logo;
      const updateWorkflow = await updateWorkFlowStatus(payload, singleData?.id);
      setPublishLoader(false);
      if (updateWorkflow?.status === 201 || updateWorkflow?.status === 200) {
        if (type === "EDIT" || type === "PUBLISH") {
          successMessage("Workflow Publish Successfully!");
        } else if (type === "DISABLE") {
          successMessage("Workflow Disabled Successfully!");

        }

        setPublishLoader(false);
        setDeleteWorkflowModal(false)
        setWorkflowModal(false)
        setShowPublishModal(false);
        getWorkflowData(singleData?.id)
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        convertToBase64(file);
      } else {
        console.log('Invalid file type. Please select an image.');
      }
    }
  };

  const publishModelHandler = (e) => {
    if (singleData.policy_name === 'default' || singleData.policy_description === 'default') {
      // setPublishLoader(false);
      // setShowPublishModal(false);
      errorMessage("Could not create workflow, please first update the workflow policy by clicking edit on the first box.");
      return false;
    }
    setShowPublishModal(true)
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setWorkFlowFormData(prev => {
        return {
          ...prev,
          logo: reader.result
        }
      });
    };
  };
  const handleInputValue = (e) => {
    const { name, value } = e.target
    setWorkFlowFormData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }
  return (
    <>
      {isLoading === true ?
        <Loading />
        :
        <RightSidebar stepIndex={addStepIndex} setStepIndex={setAddStepIndex} setIndexSelector={setIndexSelector} workflowId={params.get('flow')} inputRef={inputRef} shake={shake} setAutomationStepsData={setAutomationStepsData} automationStepsData={automationStepsData} handleButtonClick={handleButtonClick} getWorkflowData={getWorkflowData}>
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
                      onClick={(e) => publishModelHandler(e)}
                      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                      disabled={automationStepsData.length === 0 || singleData?.active === true}
                    >
                      Publish
                    </Button>
                  </div>
                  <div className='cursor-pointer relative' ref={divRef} onClick={() => { setShowHelp(prev => !prev) }}><EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
                    {showHelp && (
                      <div className="absolute left-[-280px] top-[40px] z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44 ">
                        <ul className="py-2 text-sm text-gray-700 ">
                          {singleData?.active && (
                            <li className='hover:bg-primary hover:text-white text-heading my-2' onClick={(e) => saveWorkFlowHandler('DISABLE')}>
                              <button type='button' className="block px-4 py-2 ">Disable</button>
                            </li>
                          )}
                          <li className='hover:bg-danger hover:text-white text-danger my-2' onClick={() => { setDeleteWorkflowModal(true) }}>
                            <a className="block px-4 py-2 ">Delete</a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <WorkFlowSelector openModal={openModal} workflowId={params.get('flow')} stepData={automationStepsData} setAutomationStepsData={setAutomationStepsData} indexSelector={indexSelector} setIndexSelector={setIndexSelector} setAddStepIndex={setAddStepIndex} automationStepsField={automationStepsField} setAutomationStepsField={setAutomationStepsField} />
            </>) : <p>No Data Found !</p>}

          {/* Modals  */}
          {/* description modal start  */}
          {
            descriptionModal &&
            <Modal title={<h3 className='text-lg font-semibold'>Edit WorkFlow</h3>} hr={false} show={descriptionModal} setShow={setDescriptionModal} showCancel={true} className={"w-[100%] sm:w-[540%] md:w-[40%] lg:w-[40%]"} >
              <UpdateWorkflowBasic handleInputValue={handleInputValue} workflowFormData={workflowFormData} handleFileChange={handleFileChange} saveWorkFlowHandler={saveWorkFlowHandler} publishLoader={publishLoader} setPublishLoader={setPublishLoader} setShow={setDescriptionModal} />
            </Modal >
          }

          {/* workflowname modal start  */}

          {
            workflowModal &&
            <Modal title={<h3 className='text-lg font-semibold'>Edit WorkFlow</h3>} hr={false} show={workflowModal} setShow={setWorkflowModal} showCancel={true} className={"w-[100%] sm:w-[540%] md:w-[40%] lg:w-[40%]"} >
              <UpdateWorkflowBasic handleInputValue={handleInputValue} workflowFormData={workflowFormData} handleFileChange={handleFileChange} saveWorkFlowHandler={saveWorkFlowHandler} publishLoader={publishLoader} setPublishLoader={setPublishLoader} setShow={setWorkflowModal} />
            </Modal>
          }
          {/* workflowname modal end  */}
          {
            showPublishModal &&
            <Modal title={'Are you sure you want to publish?'} show={showPublishModal} setShow={setShowPublishModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
              <PublishWorkflow publishLoader={publishLoader} saveWorkFlowHandler={saveWorkFlowHandler} name={singleData?.name} />
            </Modal>
          }
          {
            deleteWorkflowModal &&
            <Modal title={`Are you sure you want to delete ${workflowFormData.name}?`} show={deleteWorkflowModal} setShow={setDeleteWorkflowModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
              <DeleteWorkflow publishLoader={publishLoader} active={singleData?.active} deleteWorkFlow={deleteWorkFlow} saveWorkFlowHandler={saveWorkFlowHandler} name={singleData?.name} />
            </Modal>
          }

          {
            stepModal &&
            <Modal title={'Step Library'} show={stepModal} setShow={setStepModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
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
            <Modal title={'Send a Message'} show={editModal} setShow={setEditModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
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