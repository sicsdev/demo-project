import { ClipboardIcon, PlusIcon, PencilIcon, TrashIcon, PencilSquareIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Button from '../../Common/Button/Button'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { tiles_icons } from '@/app/data/icon_data';
import { updateWorkFlowStatus } from '@/app/API/pages/Workflow';
import Card from '../../Common/Card/Card';
import { errorMessage, successMessage } from '../../Messages/Messages';
import LoaderButton from '../../Common/Button/Loaderbutton';

const WorkFlowSelector = ({ openModal, stepData, setAutomationStepsData, workflowId, indexSelector, setIndexSelector, setAddStepIndex, automationStepsField, setAutomationStepsField }) => {
    const [showButtonStates, setShowButtonStates] = useState(null);
    const updateShowButtonState = (id, type) => {
        if (type === 'show') {
            setShowButtonStates(id);
        } else {
            setShowButtonStates(null);
        }
    };
    const [loading, setLoading] = useState(null)
    console.log(loading)
    const DisableButton = (index) => {
        const jsonPattern = /^\{(?:\s*".*?"\s*:\s*(?:"(?:\\.|[^"\\])*"\s*,\s*)*"(?:\\.|[^"\\])*"\s*)*\}$/;

        if (!jsonPattern.test(automationStepsField[index].output)) {
            return true
        }
        if (automationStepsField[index].names_arr.length === 0) {
            // debugger
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
            return {
                automation: element?.automation?.id,
                data: element?.data,
                output: element?.output
            }
        })
        const update = await updateWorkFlowStatus({ "automations": get_ids }, workflowId)
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
        const outputObject = JSON.parse(findUpdateValue.output);
        const payload = { "automations": [...get_ids, { "automation": findUpdateValue.key, "data": convertArrayToObject(findUpdateValue.names_arr), "output": outputObject }] }
        const updateValue = await updateWorkFlowStatus(payload, workflowId)
        if (updateValue.status === 200) {
            setLoading(null)
            successMessage("Automation updated successfully !")
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
    return (
        <div className='w-[auto] sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto'>

            <div className='mt-6 border bg-[#F8F8F8] border-border rounded-lg shadow p-5 cursor-pointer group' >
                <div className='flex justify-between gap-2 items-center'>
                    <div className='flex justify-between gap-4 items-center'>
                        <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                        <p className='text-sm font-semibold '>Starts with a Description to trigger it. </p></div>
                    <Button
                        type={"button"}
                        onClick={(e) => openModal({ key: "DESCRIPTION", open: true })}
                        className="inline-block  cursor-pointer group-hover:border p-2 border-border rounded-lg h-[38px] group-hover:shadow]">
                        <PencilIcon className="h-5 w-5 font-semibold" />
                    </Button>
                </div>
            </div>
            {stepData?.map((ele, key) =>
                <div key={key}>
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
                        <div className='section-workflow-wrapper cursor-pointer' onClick={(e) => openModal({ key: "PLUS", open: true, addKey: key })}>
                            <div className='section-workflow'></div>
                            {indexSelector !== key && (
                                <>
                                    <div className='iconplus'>
                                        <PlusIcon className="h-5 w-5 text-gray-500 font-semibold" />
                                    </div>
                                    <div className='section-workflow3 hover:bg-primary'></div>
                                </>
                            )}

                            <div className='section-workflow2'></div>
                        </div>



                        <div className='border  border-border rounded-lg shadow bg-[#f8f8f8] '>
                            <div className='  p-5 cursor-pointer group  rounded-lg' >

                                <div className='flex justify-between gap-2 items-center'>
                                    <div className='flex justify-between gap-4 items-center'>
                                        <div className="relative w-[35px] h-[35px] gap-2 rounded-lg">
                                            <Image
                                                fill={"true"}
                                                className="bg-contain mx-auto w-full rounded-lg"
                                                alt="logo.png"
                                                src={getLogo(ele?.automation?.name.split(" ")[0]) ?? '/workflow/reactive-subscription.png'}
                                            />
                                        </div>
                                        <p className='text-sm font-semibold '>{ele?.automation?.name}</p>
                                    </div>
                                    <div className=''>
                                        <div className={`${showButtonStates == key ? 'bg-white' : ''} rounded-lg group-hover:border border-border  h-[44px] group-hover:shadow] p-[2px]`}>
                                            {
                                                showButtonStates == key &&
                                                <>
                                                    <Button
                                                        type={"button"}
                                                        onClick={(e) => openModal({ key: "EDIT", open: true, addKey: ele?.automation?.id, index: key })}
                                                        className="inline-block  cursor-pointer p-[8px]  h-[38px] hover:bg-[#efefef]">
                                                        <PencilSquareIcon className="h-5 w-5 font-semibold cursor-pointer" />
                                                    </Button>
                                                    <Button
                                                        type={"button"}
                                                        onClick={(e) => deleteTheEntry(key)}
                                                        className="inline-block  cursor-pointer p-2  h-[38px] hover:bg-[#efefef]">
                                                        <TrashIcon className="h-5 w-5 font-semibold cursor-pointer" />
                                                    </Button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {automationStepsField.some((x) => x.key === ele?.automation?.id) && (
                                <div className="mb-2 px-5 ">
                                    <div className={`inline`}>
                                        <div className='flex items-center gap-1'><span className='text-sm font-semibold'>Mandatory Input(s)</span><div className='group w-[2px] relative'><InformationCircleIcon className=" h-4 w-4 cursor-pointer " /><Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'> <span className='text-xs font-light'>Enter fields you need the bot to ask the customer for before calling this automation. For example "Name," "Email" or any other data point that the customer must enter. </span></Card></div></div>
                                        <div className="flex flex-wrap justify-start items-center border h-auto w-auto border-border p-1 rounded-md mt-2">
                                            <div className="flex flex-wrap items-center justify-start gap-1">
                                                {automationStepsField[key]?.names_arr && automationStepsField[key]?.names_arr.length > 0 &&
                                                    automationStepsField[key].names_arr.map((element, index) => (
                                                        <div
                                                            className="[word-wrap: break-word]   flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] key  px-[10px] py-0 text-[13px] font-normal normal-case leading-loose text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-border"
                                                            key={index}
                                                        >
                                                            {makeCapital(element.trim())}
                                                            <XMarkIcon
                                                                className=" h-4 w-4 cursor-pointer "
                                                                onClick={(e) => {
                                                                    RemoveFromAgentNameArr(element, key);
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                            <input
                                                value={automationStepsField[key]?.name}
                                                onKeyDown={(e) => handleKeyDown(e, key)}
                                                required
                                                onChange={(e) => handleAgentNameValue(e, key)}
                                                type={"text"}
                                                placeholder={"Enter names separate by comma"}
                                                className={` block  px-3 py-2 bg-[#F8F8F8]  w-full rounded-md  text-sm placeholder-slate-400   placeholder-slate-400  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500   border-none ring-0 focus:border-none focus-visible:border-none`}
                                                id={ele?.automation?.id}
                                                name={ele?.automation?.id}
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <div className={`inline`}>
                                                <div className='flex items-center gap-1'>
                                                    <span className='text-sm font-semibold'>Output Format</span>
                                                    <div className='group w-[2px] relative'>
                                                        <InformationCircleIcon className=" h-4 w-4 cursor-pointer " />
                                                        <Card className='animate-fadeIn bg-white hidden absolute w-[500px] z-50 group-hover:block'>
                                                            <span className='text-xs font-light'>Output Entries(s) </span>
                                                        </Card>
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={automationStepsField[key]?.output}
                                                    onChange={(e) => handleOutputjson(e, key)}
                                                    className={`new_input bg-[#F8F8F8] block border-[0.2px]  px-3  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-50 w-full`}
                                                    placeholder="Output Entries(s)"
                                                    id="integration_description"
                                                    name="description"
                                                />
                                            </div>
                                        </div>
                                        <div className='my-2'>
                                            {loading === key ? <LoaderButton /> :
                                                <Button
                                                    type={"button"}
                                                    className="inline-block my-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                                                    disabled={DisableButton(key)}
                                                    onClick={(e) => SubmitFormValue(key)}
                                                >Save
                                                </Button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                </div>

            )
            }

            <div className={`mt-4 border-2 border-dashed  bg-[white] ${indexSelector === null ? ("border-primary") : "border-border"} rounded-lg shadow p-5 cursor-pointer group`}
                onClick={(e) => openModal({ key: "STEPS", open: true, addKey: null })} >
                <div className='flex justify-between gap-2 items-center'>
                    <div className='flex justify-between gap-4 items-center'>
                        <ClipboardIcon className="h-5 w-5 text-gray-500 font-semibold" />
                        <p className='text-sm font-semibold'>Your next step goes here</p></div>

                </div>
            </div>

        </div >
    )
}

export default WorkFlowSelector