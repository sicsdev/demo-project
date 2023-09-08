import { ClipboardIcon, PlusIcon, PencilIcon, TrashIcon, PencilSquareIcon, XMarkIcon, InformationCircleIcon, ClipboardDocumentListIcon, BookmarkIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Button from '../../Common/Button/Button'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { tiles_icons } from '@/app/data/icon_data';
import { updateWorkFlowStatus } from '@/app/API/pages/Workflow';
import Card from '../../Common/Card/Card';
import { errorMessage, successMessage } from '../../Messages/Messages';
import LoaderButton from '../../Common/Button/Loaderbutton';
import { useDispatch } from 'react-redux';
import { editAutomationValue } from '../../store/slices/workflowSlice';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from '../../Common/Modal/Modal';
const WorkFlowSelector = ({ openModal, stepData, setAutomationStepsData, workflowId, indexSelector, setIndexSelector, setAddStepIndex, automationStepsField, setAutomationStepsField, getWorkflowData, singleData1 }) => {
    const [showButtonStates, setShowButtonStates] = useState(null);
    const [modal, setModal] = useState(false);
    const [automationDragHandle, setAutomationDragHandle] = useState({
        automation: null,
        arr: [],
        deflection: null
    });
    const dispatch = useDispatch()
    const updateShowButtonState = (id, type) => {
        if (type === 'show') {
            setShowButtonStates(id);
        } else {
            setShowButtonStates(null);
        }
    };
    const [loading, setLoading] = useState(null)
    const DisableButton = (index) => {
        const jsonPattern = /^\{(?:\s*".*?"\s*:\s*(?:"(?:\\.|[^"\\])*"\s*,\s*)*"(?:\\.|[^"\\])*"\s*)*\}$/;

        if (automationStepsField[index].names_arr.length === 0 && automationStepsField[index].output === "") {
            // debugger
            return true
        }
        if (!jsonPattern.test(automationStepsField[index].output) && automationStepsField[index].output !== "") {
            return true
        }
        return false
    }

    const getLogo = (name) => {

        const findIcon = tiles_icons?.find((x) => x?.name.toLowerCase() === name?.toLowerCase())
        if (findIcon) {
            return findIcon.logo
        }
        return ""
    }

    const deleteTheEntry = async (key) => {
        const filterData = stepData.filter((_, index) => index !== key)
        const get_ids = filterData.map((element) => {
            let payload_automation = {}
            if (element?.automation) {
                payload_automation = {
                    automation: element.automation.id,
                    output: {},
                    data: {}
                };
            } else {
                payload_automation = { condition: element.condition, question: element.question }
            }
            return payload_automation
        })


        if (singleData1?.active) {
            dispatch(editAutomationValue(get_ids))
        } else {
            const update = await updateWorkFlowStatus({ active: false, "automations": get_ids }, workflowId)
            getWorkflowData(workflowId)
        }
        setAutomationStepsData(filterData)

    }
    const handleAgentNameValue = (e, index) => {
        let singleData = [...automationStepsField]
        let old_names = [...singleData[index].names_arr]
        const { value } = e.target;
        if (value.includes(",")) {
            singleData[index].name = ''
            const agentNames = value.split(",");
            let newNames = []
            agentNames.forEach((name) => {
                const trimmedName = name.trim();
                if (old_names && !old_names.includes(makeCapital(trimmedName)) && trimmedName) {
                    newNames.push(makeCapital(trimmedName))
                }
            });
            singleData[index].names_arr = [...old_names, ...newNames]
            setAutomationStepsField(singleData)
        } else {
            singleData[index].name = value
            setAutomationStepsField(singleData)
        }
    };
    const handleOutputjson = (e, index) => {
        const { value } = e.target;
        let singleData = [...automationStepsField]
        singleData[index].output = value
        setAutomationStepsField(singleData)
    }
    const RemoveFromAgentNameArr = (element, index) => {
        let singleData = [...automationStepsField]
        let old_names = [...singleData[index].names_arr]
        const updatedChips = old_names.filter((x) => x !== element);
        singleData[index].names_arr = updatedChips
        setAutomationStepsField(singleData)
    };
    const convertArrayToObject = (arr) => {
        let result = {};
        for (let i = 0; i < arr.length; i++) {
            result[`name${i + 1}`] = arr[i];
        }
        return result;
    }

    const SubmitFormValue = async (index) => {
        setLoading(index)
        const findUpdateValue = automationStepsField.find((_, key) => key === index)
        console.log("findUpdateValue", findUpdateValue)
        const filterData = stepData.filter((_, key) => key !== index)
        const get_ids = filterData.map((element) => {
            return {
                automation: element?.automation?.id,
                data: element?.data,
                output: element?.output
            }
        })
        const outputObject = {}
        if (findUpdateValue.output !== "") {
            JSON.parse(findUpdateValue.output);
        }
        const payload = { "automations": [...get_ids, { "automation": findUpdateValue.key, "data": convertArrayToObject(findUpdateValue.names_arr), "output": outputObject }] }
        const updateValue = await updateWorkFlowStatus(payload, workflowId)
        if (updateValue.status === 200) {
            setLoading(null)
            successMessage("Automation updated successfully")
        } else {
            errorMessage("something is wrong !")
            setLoading(null)
        }
    }
    const makeCapital = (str) => {
        if (str.includes(" ")) {
            return str
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        } else {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };

    const handleKeyDown = (e, index) => {
        let singleData = [...automationStepsField]
        let old_names = [...singleData[index].names_arr]
        if (e.key === "Enter") {
            const { value } = e.target;
            singleData[index].name = ''
            const agentNames = value.split(",");
            let newNames = []
            agentNames.forEach((name) => {
                const trimmedName = name.trim();
                if (old_names && !old_names.includes(makeCapital(trimmedName)) && trimmedName) {
                    newNames.push(makeCapital(trimmedName))
                }
            });
            singleData[index].names_arr = [...old_names, ...newNames]
            setAutomationStepsField(singleData)
        }
    };
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        ...draggableStyle
    });
    // drag and drop functions 
    function hasNullAutomationAtIndex(index, data) {
        if (index >= 0 && index < data.length - 1) {
            if (data[index + 1].automation === null) {
                return true;
            }
        }
        return false;
    }
    const removeIndexAndUpdateAutomation = async () => {
        let filterRules = null
        filterRules = automationDragHandle.arr.filter((x) => x.id !== automationDragHandle.automation)
        if (automationDragHandle.deflection !== null) {
            filterRules = filterRules.filter((x) => x.id !== automationDragHandle.deflection)
        }
        const get_ids = filterRules.map((element) => {
            let payload_automation = {}
            if (element?.automation) {
                payload_automation = {
                    automation: element.automation.id,
                    output: {},
                    data: {}
                };
            } else {
                payload_automation = { condition: element.condition, question: element.question }
            }
            return payload_automation
        })
        setAutomationStepsData(filterRules)
        await updateWorkFlowStatus({ active: false, "automations": get_ids }, workflowId)
        setModal(false)
    }
    const reorder = async (list, startIndex, endIndex) => {
        if (list[startIndex].automation === null) {
            errorMessage("You can't move rules")
            return
        } else {
            let automationCurrentIndex = hasNullAutomationAtIndex(startIndex, list)
            if (automationCurrentIndex) {
                setModal(true)
                const result = Array.from(list);
                const [removed] = result.splice(startIndex, 1);
                result.splice(endIndex, 0, removed);
                let automationCurrentDeflectionIndex = hasNullAutomationAtIndex(startIndex + 1, list)

                setAutomationDragHandle({
                    arr: result,
                    automation: result[startIndex + 1].id,
                    deflection: automationCurrentDeflectionIndex ? result[startIndex + 2].id : null
                })
            } else {
                const result = Array.from(list);
                const [removed] = result.splice(startIndex, 1);
                result.splice(endIndex, 0, removed);
                let automationNewIndex = hasNullAutomationAtIndex(endIndex + 1, result)
                if (automationNewIndex) {
                    setModal(true)
                    let automationCurrentDeflectionIndex = hasNullAutomationAtIndex(startIndex + 1, list)
                    setAutomationDragHandle({
                        arr: result,
                        automation: result[endIndex + 1].id,
                        deflection: automationCurrentDeflectionIndex ? result[endIndex + 2].id : null
                    })
                } else {
                    const get_ids = result.map((element) => {
                        let payload_automation = {}
                        if (element?.automation) {
                            payload_automation = {
                                automation: element.automation.id,
                                output: {},
                                data: {}
                            };
                        } else {
                            payload_automation = { condition: element.condition, question: element.question }
                        }
                        return payload_automation
                    })
                    setAutomationStepsData(result)
                    await updateWorkFlowStatus({ active: false, "automations": get_ids }, workflowId)

                }
            }
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        reorder(
            stepData,
            result.source.index,
            result.destination.index
        );

    }
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction={'vertical'}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided?.draggableProps?.style || {}
                            )}
                        // style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <div className='w-[auto] sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto'>

                                {/* {stepData?.length !== 0 &&
                                    <div className='mt-6 border bg-[#F8F8F8] border-border rounded-lg shadow p-5 cursor-pointer group' >
                                        <div className='flex justify-between gap-2 items-center'>
                                            <div className='flex justify-between gap-4 items-center'>
                                                <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                                <p className='text-sm font-semibold '>Starts with a description to trigger it. </p></div>
                                            <Button
                                                type={"button"}
                                                onClick={(e) => openModal({ key: "DESCRIPTION", open: true })}
                                                className="inline-block  cursor-pointer group-hover:border p-2 border-border rounded-lg h-[38px] group-hover:shadow]">
                                                <PencilIcon className="h-5 w-5 font-semibold" />
                                            </Button>
                                        </div>
                                    </div>
                                } */}
                                {stepData?.length === 0 &&
                                    <div className={`mt-4 border-2 border-dashed  bg-[white] ${indexSelector === null ? ("border-primary") : "border-border"} rounded-lg shadow p-5 cursor-pointer group`}
                                        onClick={(e) => openModal({ key: "STEPS", open: true, addKey: 0 })} >
                                        <div className='flex justify-between gap-2 items-center'>
                                            <div className='flex justify-between gap-4 items-center'>
                                                <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                                <p className='text-sm font-semibold'>Your first step goes here</p></div>

                                        </div>
                                    </div>
                                }
                                <>

                                    {stepData?.map((ele, key) =>
                                        <Draggable key={ele.id} draggableId={ele.id} index={key}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <>
                                                        {indexSelector === key && (

                                                            <div className='relative mt-4 border-2 border-dashed  bg-[white] border-primary rounded-lg shadow p-5 cursor-pointer group'
                                                                onClick={(e) => openModal({ key: "STEPS", open: true, addKey: key })} >
                                                                <div className='flex justify-between gap-2 items-center'>
                                                                    <div className='flex justify-between gap-4 items-center'>
                                                                        <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                                                        <p className='text-sm font-semibold'>Your next step goes here</p></div>
                                                                    <div className='hidden group-hover:block rounded-lg group-hover:border border-border absolute right-[20px] h-[38px] group-hover:shadow]'>
                                                                        <Button
                                                                            type={"button"}
                                                                            onClick={(e) => {
                                                                                setIndexSelector(null)
                                                                                setAddStepIndex(null)

                                                                            }}
                                                                            className="inline-block  cursor-pointer p-2  h-[38px]">
                                                                            <TrashIcon className="h-5 w-5 font-semibold cursor-pointer" />
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        )}
                                                        <div
                                                            onMouseEnter={() => updateShowButtonState(key, 'show')}
                                                            onMouseLeave={() => updateShowButtonState(key, 'hide')}
                                                        >
                                                            {key !== 0 && (
                                                                <div class="stepper-main-wrapper w-full">
                                                                    <div class="stepper-container relative flex items-center justify-center w-full min-h-[24px]">
                                                                        {indexSelector !== key && (
                                                                            <>
                                                                                <div class="stepper-dots rounded-full absolute z-10 bg-[#d9d9d9] h-[10px] w-[10px] border-2 border-[#d9d9d9]"></div>
                                                                                <button class="stepper-plus-icon rounded-full absolute z-10" aria-label="Add Step" type="button" onClick={(e) => openModal({ key: "PLUS", open: true, addKey: key })}>
                                                                                    <PlusIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                                                                </button>
                                                                                <div class="stpper-lines">
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        <div class="stepper-spacer">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}


                                                            <div className='border  border-border rounded-lg shadow bg-[#f8f8f8] '>
                                                                <div className='  p-5 cursor-pointer group  rounded-lg' >

                                                                    <div className='flex justify-between gap-2 items-center'>
                                                                        <div className='flex justify-between gap-4 items-center'>
                                                                            {ele.automation?.integration?.icon && (
                                                                                <div className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                                                                    <Image
                                                                                        fill={"true"}
                                                                                        className="bg-contain mx-auto object-scale-down w-full rounded-lg"
                                                                                        alt="logo.png"
                                                                                        src={ele.automation?.integration?.icon || getLogo(ele?.automation?.name.split(" ")[0])}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                            {ele.condition && (
                                                                                <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                                                                            )}
                                                                            {ele.question && (
                                                                                <BriefcaseIcon className="h-6 w-6 text-gray-500" />
                                                                            )}
                                                                            {ele?.automation && (
                                                                                <p className='text-sm font-semibold '>{ele?.automation?.name}</p>
                                                                            )}
                                                                            {ele?.condition && (
                                                                                <>
                                                                                    <p className='text-sm font-semibold '>Rule: {ele?.condition}</p>
                                                                                </>
                                                                            )}
                                                                            {ele?.question && (
                                                                                <>
                                                                                    <p className='text-sm font-semibold '>Deflection: {ele?.question}</p>
                                                                                </>
                                                                            )}

                                                                        </div>
                                                                        <div className=''>
                                                                            <div className='h-[44px] '>
                                                                                {showButtonStates == key && (
                                                                                    <div className={`${showButtonStates == key ? 'bg-white' : ''} rounded-lg group-hover:border border-border  group-hover:shadow] p-[2px]`}>
                                                                                        {
                                                                                            showButtonStates == key &&
                                                                                            <>
                                                                                                <Button
                                                                                                    type={"button"}
                                                                                                    onClick={(e) => deleteTheEntry(key)}
                                                                                                    className="inline-block  cursor-pointer p-2  h-[38px] hover:bg-[#efefef]">
                                                                                                    <TrashIcon className="h-5 w-5 font-semibold cursor-pointer" />
                                                                                                </Button>
                                                                                            </>
                                                                                        }

                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </>
                                                </div>
                                            )}
                                        </Draggable>
                                    )}





                                    {stepData?.length !== 0 &&
                                        <div className={`mt-4 border-2 border-dashed  bg-[white] ${indexSelector === null ? ("border-primary") : "border-border"} rounded-lg shadow p-5 cursor-pointer group`}
                                            onClick={(e) => openModal({ key: "STEPS", open: true, addKey: null })} >
                                            <div className='flex justify-between gap-2 items-center'>
                                                <div className='flex justify-between gap-4 items-center'>
                                                    <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                                    <p className='text-sm font-semibold'>Your next step goes here</p></div>

                                            </div>
                                        </div>
                                    }
                                </>
                            </div>
                        </div >
                    )}
                </Droppable>
            </DragDropContext>

            {
                modal === true &&
                <Modal title={'Are you sure you want to move this automation? '} show={modal} setShow={setModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                    <>
                        <div className=''>
                            <p className='text-heading font-normal text-normal'> Your rules will be deleted and you'll have to reenter them after moving this.</p>
                        </div>
                        <div className=''>



                            <div className="flex items-center justify-between mt-4">
                                <div></div>
                                <div>
                                    <Button
                                        type={"button"}
                                        // disabled={areValuesEmpty()}
                                        onClick={() => removeIndexAndUpdateAutomation()}
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        className="mr-2 inline-block float-left rounded bg-white px-6 pb-2 pt-2 text-xs font-medium leading-normal text-heading border border-border "
                                        onClick={() => {
                                            setModal(false)
                                            setAutomationStepsData(stepData)
                                        }}
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </>
                </Modal>
            }

        </>
    )
}

export default WorkFlowSelector