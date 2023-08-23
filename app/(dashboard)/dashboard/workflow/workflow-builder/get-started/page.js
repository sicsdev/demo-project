'use client'
import Button from '@/app/components/Common/Button/Button'
import RightSidebar from '@/app/components/Dashboard/AuthLayout/RightSidebar'
import { ChevronLeftIcon, EllipsisVerticalIcon, ChatBubbleOvalLeftIcon, FolderOpenIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
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
import { useDispatch, useSelector } from 'react-redux'
import { editAutomationValue } from '@/app/components/store/slices/workflowSlice'
import { fetchBot } from "@/app/components/store/slices/botIdSlice";
import TextField from '@/app/components/Common/Input/TextField'

const GetStarted = () => {
  const [shake, setShake] = useState(null)
  const automationState = useSelector(state => state.workflow.automation)
  const state = useSelector((state) => state.botId);
  const dispatch = useDispatch()
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
    policy_exceptions: null,
    bots: []
  })

  // modals 
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [stepModal, setStepModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [workflowModal, setWorkflowModal] = useState(false);
  const [deleteWorkflowModal, setDeleteWorkflowModal] = useState(false);
  const [mobileCss, setMobileCss] = useState('');
  const [botValue, setBotValue] = useState([]);
  const [automationStepsData, setAutomationStepsData] = useState([]);
  const [automationStepsField, setAutomationStepsField] = useState([]);
  const router = useRouter();
  const inputRef = useRef(null);
  const [addStepIndex, setAddStepIndex] = useState(null);
  const [ruleModal, setRuleModal] = useState(false);
  const handleButtonClick = (shake = true) => {
    setMobileCss(`!block`);
    setShake('w-full sm:w-80 transform translate-x-[-1] translate-y-0 scale-100 scale-x-[1.00018] scale-y-100')
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
    setTimeout(() => {
      setShake(null)
    }, 500);
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
          policy_exceptions: response?.policy_exceptions === "default" ? "" : response?.policy_exceptions,
          bots: response?.bots?.length > 0 ? response?.bots.map((ele) => {
            return {
              value: ele.id,
              name: ele.chat_title
            }
          }) : []
        }
      })
      if (response?.automations?.length > 0) {
        setAutomationStepsData(response.automations)
        const filterData = response.automations.map((ele) => {
          const isEmptyObject = Object.keys(ele.output).length === 0;
          const jsonString = isEmptyObject ? "" : JSON.stringify(ele.output);
          return {
            key: '',
            value: '',
            name: '',
            names_arr: objectValuesToArray(ele.data),
            output: jsonString,
            loading: false,
            icon: response.icon
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


  useEffect(() => {
    if (state.botData.data === null) {
      dispatch(fetchBot());
    }
    if (state.botData.data?.bots && state.botData.data?.widgets) {
      getAllBots();
    }
  }, [state.botData.data]);

  const getAllBots = () => {
    const getTitle = state.botData.data.bots.map(
      (element) => element.chat_title
    );
    const widgetCode = state.botData.data.widgets;
    if (widgetCode && Array.isArray(widgetCode) && widgetCode.length > 0) {
      const mergedArray = widgetCode.map((item, index) => {
        const title = getTitle[index];
        return {
          value: item.id,
          name: title,
        };
      });
      setBotValue(mergedArray);
    }
  };
  const onSelectData = (selectedList, selectedItem) => {
    setWorkFlowFormData((prev) => {
      return {
        ...prev,
        bots: selectedList

      }
    })
  }

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
        setWorkFlowFormData((prev) => {
          return {
            ...prev,
            name: singleData.name === "Default_name" ? "" : singleData.name,
            description: singleData.description == "Default_description" ? "" : singleData.description,
            logo: '',
            preview: singleData.logo ?? '/workflow/reactive-subscription.png',
            policy_name: singleData?.policy_name === "default" ? "" : singleData?.policy_name,
            policy_description: singleData?.policy_description === "default" ? "" : singleData?.policy_description,
            policy_exceptions: singleData?.policy_exceptions === "default" ? "" : singleData?.policy_exceptions,
            bots: singleData?.bots?.length > 0 ? singleData?.bots.map((ele) => {
              return {
                value: ele.id,
                name: ele.chat_title
              }
            }) : []
          }
        })
        // setDescriptionModal(true)
        setWorkflowModal(true)

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

  const convertArrayToObject = (arr) => {
    let result = {};
    for (let i = 0; i < arr.length; i++) {
      result[`name${i + 1}`] = arr[i];
    }
    return result;
  }
  const addAutomationFields = (value) => {
    let data_value = [...automationStepsField];
    const emptyObject = { key: '', value: '', name: '', names_arr: [], output: "", loading: false };
    const targetIndex = value.index;
    while (data_value.length <= targetIndex) {
      data_value.push(emptyObject);
    }
    const existingIndex = data_value.findIndex(item => item.key === value.addKey);
    if (existingIndex !== -1) {
      data_value[targetIndex] = { key: '', value: '', name: '', names_arr: data_value[targetIndex].names_arr, output: data_value[targetIndex].output, loading: false }
    } else {
      data_value[targetIndex] = { key: value.addKey, value: '', name: '', names_arr: data_value[targetIndex].names_arr, output: data_value[targetIndex].output, loading: false }
    }
    setAutomationStepsField(data_value);
  }

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
        if (automationState && automationState.length > 0) {
          const finalData = automationState.map((element) => {
            const findFilter = automationStepsField.find((x) => x.key === element.automation);
            const payload_automation = {
              automation: element.automation,
              output: {},
              data: {}
            };
            if (findFilter && findFilter.names_arr.length > 0) {
              payload_automation.data = convertArrayToObject(findFilter.names_arr);
            }
            return payload_automation;
          });

          payload = { active: true, automations: finalData };
        }
      } else if (type === "EDIT") {
        payload = {
          logo: workflowFormData.logo,
          description: workflowFormData.description,
          name: workflowFormData.name,
          policy_name: workflowFormData.policy_name,
          policy_description: workflowFormData.policy_description,
          policy_exceptions: workflowFormData.policy_exceptions,
          bots: workflowFormData?.bots ? workflowFormData?.bots.map((ele) => ele.value) : []
        }
      } else if (type === "DISABLE") {
        payload = { active: false }
      }

      !payload.logo && delete payload.logo;
      const updateWorkflow = await updateWorkFlowStatus(payload, singleData?.id);
      setPublishLoader(false);
      if (updateWorkflow?.status === 201 || updateWorkflow?.status === 200) {

        if (type === "PUBLISH") {
          dispatch(editAutomationValue(null))
          successMessage("WorkFlow Published Successfully!");
        } else if (type === "DISABLE") {
          successMessage("Workflow Disabled Successfully");
        } else if (type === "EDIT") {
          successMessage("WorkFlow Updated Successfully!");
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
      successMessage("Workflow deleted successfully")
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
    if (workflowFormData?.name === '' || workflowFormData?.name === 'Default_name' || workflowFormData?.description === "") {
      errorMessage("Could not publish workflow, please first update the workflow details by clicking edit on the first box.");
      return false;
    }



    if (!automationState) {
      if (singleData.active) {
        saveWorkFlowHandler("DISABLE")
      } else {
        setShowPublishModal(true)
      }
    } else {
      setShowPublishModal(true)
    }

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
        <RightSidebar stepIndex={addStepIndex} mobileCss={mobileCss} setMobileCss={setMobileCss} shake={shake} setStepIndex={setAddStepIndex} setIndexSelector={setIndexSelector} workflowId={params.get('flow')} inputRef={inputRef} setAutomationStepsData={setAutomationStepsData} automationStepsData={automationStepsData} handleButtonClick={handleButtonClick} getWorkflowData={getWorkflowData} singleData={singleData} setRuleModal={setRuleModal}>
          {singleData ? (
            <>
              <div className='flex md:flex lg:flex justify-between gap-2 items-center'>
                <div className='flex justify-start sm:justify-between gap-2 items-center'>
                  <div>
                    <Link href={"/dashboard/workflow/workflow-builder"}>
                      <div>
                        <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
                      </div>
                    </Link>
                  </div>
                  <div className="relative min-w-[35px] w-[35px] sm:w-[35px] h-[35px] gap-2 rounded-lg">
                    <Image
                      fill={"true"}
                      className="bg-contain mx-auto w-full rounded-lg"
                      alt="logo.png"
                      src={singleData?.logo ?? '/workflow/reactive-subscription.png'}
                    />
                  </div>
                  <div className='cursor-pointer w-auto sm:w-[90%] md:w-[90%] lg:w-[90%]' onClick={() => {
                    setWorkFlowFormData((prev) => {
                      return {
                        ...prev,
                        name: singleData.name === "Default_name" ? "" : singleData.name,
                        description: singleData.description == "Default_description" ? "" : singleData.description,
                        logo: '',
                        preview: singleData.logo ?? '/workflow/reactive-subscription.png',
                        policy_name: singleData?.policy_name === "default" ? "" : singleData?.policy_name,
                        policy_description: singleData?.policy_description === "default" ? "" : singleData?.policy_description,
                        policy_exceptions: singleData?.policy_exceptions === "default" ? "" : singleData?.policy_exceptions,
                        bots: singleData?.bots?.length > 0 ? singleData?.bots.map((ele) => {
                          return {
                            value: ele.id,
                            name: ele.chat_title
                          }
                        }) : []
                      }
                    })
                    setWorkflowModal(true)
                  }}>
                    <h3 className='text-heading font-bold text-sm sm:text-sm uppercase'>{singleData.name}</h3>
                    {/* <p className='text-border font-normal text-sm'>{singleData.description}</p> */}
                  </div>
                </div>
                <div className='flex justify-between gap-2 items-center'>
                  <div><small className='text-xs text-border'>{singleData?.active ? 'Active' : 'Draft'}</small></div>
                  <div>
                    <Button
                      type={"button"}
                      onClick={(e) => publishModelHandler(e)}
                      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                      disabled={automationStepsData.length === 0}
                    >
                      {automationState ? "Save" : singleData.active ? "Move To Draft" : "Publish"}
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

              <WorkFlowSelector openModal={openModal} workflowId={params.get('flow')} stepData={automationStepsData} setAutomationStepsData={setAutomationStepsData} indexSelector={indexSelector} setIndexSelector={setIndexSelector} setAddStepIndex={setAddStepIndex} automationStepsField={automationStepsField} setAutomationStepsField={setAutomationStepsField} getWorkflowData={getWorkflowData} singleData1={singleData} />
            </>) : <p>No Data Found !</p>}

          {/* Modals  */}

          {/* workflowname modal start  */}
          {
            workflowModal &&
            <Modal alignment={'items-start'} title={<h3 className='text-lg font-semibold'>Edit WorkFlow</h3>} hr={false} show={workflowModal} setShow={setWorkflowModal} showCancel={true} className={"w-[100%] sm:w-[540%] md:w-[40%] lg:w-[40%]"}>
              <UpdateWorkflowBasic botValue={botValue} alignment={'items-start'} handleInputValue={handleInputValue} workflowFormData={workflowFormData} handleFileChange={handleFileChange} saveWorkFlowHandler={saveWorkFlowHandler} publishLoader={publishLoader} setPublishLoader={setPublishLoader} setShow={setWorkflowModal} onSelectData={onSelectData} />
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
          {
            ruleModal &&
            <Modal title={'Rule Builder'} show={ruleModal} setShow={setRuleModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
              <>
                <div className=''>
                  <h3 className="!font-bold text-heading text-xl">Conditions</h3>
                  <p className='text-heading font-normal text-normal'>Segment your users and/or their sessions according to single or multi-session conditions.</p>
                </div>
                <div className=''>
                  <div className='mt-4 border p-4 rounded-md'>
                    <div className='flex justify-between'>
                      <div className='flex items-center justify-center gap-2 font-bold'>
                        <p>Filter</p>
                        <p>User</p>
                        <p>Include</p>
                      </div>
                      <XMarkIcon className='cursor-pointer p-1 font-bold text-white bg-[#bfbfbf] h-7 w-7 rounded-full' />
                    </div>

                    <div className='block sm:flex justify-between pt-4 sm:ml-10'>
                      <div className='flex items-center justify-center gap-2 font-bold'>
                        <SelectOption
                          disabled
                          value={`page`}
                          name="bot"
                          values={[{ name: 'page', value: 'Page' }]}
                          title={``}
                          id={"bots"}
                          className="py-3 !w-[70px]"
                        />
                        <SelectOption
                          disabled
                          value={`contain`}
                          name="contains"
                          values={[{ name: 'contain', value: 'Contains' }]}
                          title={``}
                          id={"contains"}
                          className="py-3 !w-[80px]"
                        />
                        <TextField
                          value={``}
                          name="billing_thresholds"
                          className="py-3"
                          title={""}
                          placeholder={""}
                          type={"number"}
                          id={"billing_thresholds"}
                          paddingleft={"pl-6"}
                        />
                      </div>
                      <div className='mt-4 sm:mt-0 flex text-sm'>
                        <button className='border-[1px] border-[#C7C6C7] rounded-tl-md rounded-bl-md font-bold bg-[#fafafa] px-2 !py-1'>-</button>
                        <button className='border-[1px] border-[#C7C6C7] font-bold  border-r-[1px] bg-[#fafafa] px-2 !py-1'>OR</button>
                        <button className='border-[1px] border-[#C7C6C7] rounded-tr-md rounded-br-md font-bold bg-[#fafafa] px-2 !py-1'>AND</button>
                      </div>
                    </div>

                  </div>

                  <div className='mt-4 border p-4 rounded-md'>
                    <div className='flex justify-between'>
                      <div className='flex items-center justify-center gap-2 font-bold'>
                        <p>Filter</p>
                        <p>User</p>
                        <p>Include</p>
                      </div>
                      <XMarkIcon className='cursor-pointer p-1 font-bold text-white bg-[#bfbfbf] h-7 w-7 rounded-full hover:text-[#334bfa]' />
                    </div>

                    <div className='block sm:flex justify-between pt-4 sm:ml-10'>
                      <div className='flex items-center justify-center gap-2 font-bold'>
                        <SelectOption
                          disabled
                          value={`page`}
                          name="bot"
                          values={[{ name: 'page', value: 'Page' }]}
                          title={``}
                          id={"bots"}
                          className="py-3 !w-[70px]"
                        />
                        <SelectOption
                          disabled
                          value={`contain`}
                          name="contains"
                          values={[{ name: 'contain', value: 'Contains' }]}
                          title={``}
                          id={"contains"}
                          className="py-3 !w-[80px]"
                        />
                        <TextField
                          value={``}
                          name="billing_thresholds"
                          className="py-3"
                          title={""}
                          placeholder={""}
                          type={"number"}
                          id={"billing_thresholds"}
                          paddingleft={"pl-6"}
                        />
                      </div>
                      <div className='mt-4 sm:mt-0 flex text-sm'>
                        <button className='border-[1px] border-[#C7C6C7] rounded-tl-md rounded-bl-md font-bold bg-[#fafafa] px-2 !py-1'>-</button>
                        <button className='border-[1px] border-[#C7C6C7] font-bold  border-r-[1px] bg-[#fafafa] px-2 !py-1'>OR</button>
                        <button className='border-[1px] border-[#C7C6C7] rounded-tr-md rounded-br-md font-bold bg-[#fafafa] px-2 !py-1'>AND</button>
                      </div>
                    </div>

                  </div>

                  <div className='mt-3'>
                    <Button
                    type={`button`}
                      className="flex gap-2 justify-center items-center rounded bg-[#fafafa] px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-heading border border-border "
                    >
                      <PlusIcon className='h-4 w-4' />
                      Add Filter
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div></div>
                    <div>
                      <Button
                        type={"submit"}
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                      >
                        Apply
                      </Button>
                      <Button
                        className="mr-2 inline-block float-left rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-heading border border-border "
                        onClick={() => { setRuleModal(false) }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            </Modal>
          }
        </RightSidebar>
      }
      <ToastContainer />
    </>
  )
}

export default GetStarted