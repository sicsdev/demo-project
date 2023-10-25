import { getIntegrationAutomation } from '@/app/API/pages/Integration'
import { updateWorkFlowStatus } from '@/app/API/pages/Workflow'
import { tiles_icons } from '@/app/data/icon_data'
import { ArrowUturnLeftIcon, BookmarkIcon, BriefcaseIcon, ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentListIcon, Cog8ToothIcon, DocumentTextIcon, EnvelopeIcon, PencilSquareIcon, PuzzlePieceIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { errorMessage } from '../../Messages/Messages'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { editAutomationValue } from '../../store/slices/workflowSlice'
import UpdateWorkflowBasic from './UpdateWorkflowBasic'

const SidebarCards = ({ addConditionalStepHandler, inputRef, state, setAutomationStepsData, automationStepsData, handleButtonClick, workflowId, stepIndex, setStepIndex, setIndexSelector, getWorkflowData, setMobileCss, singleData, openRulesHandler, setTab, tab,
    botValue, alignment = 'items-start', handleInputValue, workflowFormData, handleFileChange, saveWorkFlowHandler, publishLoader, setPublishLoader, setShow, onSelectData, setWorkFlowFormData, setSelected, selected, negativeQuestions, addNewNagetiveFaq, isEdit, setIsEdit, setShowAdd, deleteNegativeFaq, showAdd, nLoading }) => {
    const dispatch = useDispatch()
    const [beatLoader, setBeatLoader] = useState(false)
    const [search, setSearch] = useState('')
    const [allData, setAllData] = useState([...state?.data?.results, {
        name: "Rule",
        functionName: "RULE",
        icon:
            <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
    },
    {
        name: "Deflection",

        functionName: "DEFLECTION",
        icon:
            <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />,
    },
    {
        name: "Email",

        functionName: "EMAIL",
        icon: <EnvelopeIcon className="h-6 w-6 text-gray-500" />

    }
    ] ?? [])
    const [allFinalData, setAllFinalData] = useState([...state?.data?.results, {
        name: "Rule",
        functionName: "RULE",
        icon:
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
    },
    {
        name: "Deflection",

        functionName: "DEFLECTION",
        icon:
            <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />,
    },
    {
        name: "Email",

        functionName: "EMAIL",
        icon:
            <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
    }
    ] ?? [])
    const [integrationAutomationData, setIntegrationAutomationData] = useState([]);
    const [integrationAutomationFinalData, setIntegrationAutomationFinalData] = useState([]);
    const [innerSide, setInnerSide] = useState({
        id: null,
        value: null
    })

    const getLogo = (name) => {
        const findIcon = tiles_icons?.find((x) => x?.name.toLowerCase() === name?.toLowerCase())
        if (findIcon) {
            return findIcon.logo
        }
        return ""
    }

    const findAutomations = async (element) => {
        setBeatLoader(true)
        setInnerSide(prev => {
            return {
                ...prev,
                id: element.id,
                value: element
            }
        })
        const automationData = await getIntegrationAutomation(element.id);
        setIntegrationAutomationData(automationData);
        setIntegrationAutomationFinalData(automationData)
        setBeatLoader(false);
    }
    function addDataAtIndex1(stepIndex, get_ids, newData) {
        get_ids.splice(stepIndex, 0, newData);
        return get_ids;
    }

    const addStepHandler = async (ele) => {
        console.log(ele, "ele")
        debugger
        const get_ids = automationStepsData.map((element) => {
            let payload_automation = {}
            if (element?.automation) {
                payload_automation = {
                    automation: element.automation.id,
                    output: {},
                    data: {}
                };
            } else {
                payload_automation = { condition: element.condition, question: element.question, question: element.transformer, notification: element.notification }
            }
            return payload_automation
        })
        const isElementExists = get_ids.find((x) => x.automation === ele.id);
        if (isElementExists) {
            errorMessage('Automation already added!');
            return false;
        }
        let newArray = null
        if (stepIndex === null) {
            newArray = [...get_ids, { automation: ele.id, data: {}, output: {} }];
        } else {
            newArray = addDataAtIndex1(stepIndex, get_ids, { automation: ele.id, data: {}, output: {} })
        }
        if (!singleData.active) {
            const update = await updateWorkFlowStatus({ automations: newArray }, workflowId);
            getWorkflowData(workflowId)
        } else {
            let data = [...automationStepsData, { automation: ele, output: {}, data: {}, id: "automation_temp" }]
            setAutomationStepsData(data)
            dispatch(editAutomationValue(newArray))
        }
        handleButtonClick(false)
        setStepIndex(null);
        setIndexSelector(null)
        setMobileCss('')
        setInnerSide(prev => {
            return {
                ...prev,
                id: null,
                value: null
            }
        })
    };

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)
        const filteredResults = allFinalData.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setAllData(filteredResults)
    }
    const handleSearchAutomation = (e) => {
        const { value } = e.target
        setSearch(value)
        const filteredResults = integrationAutomationFinalData.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setIntegrationAutomationData(filteredResults)
    }
    const findNameCustom = (name) => {
        const findName = ['Rule', 'Deflection', 'Email'].find((x) => x === name)
        if (findName) {
            return true
        }
        return false
    }
    return (
        <div>
            <div className='block sm:hidden text-right pb-4'>
                <p className="cursor text-sm font-semibold" onClick={(e) => setMobileCss('')}>
                    Back
                </p>
            </div>
            <div className={`w-full   border-b-2 border-border dark:border-gray-700 flex items-center justify-between mt-2 mb-5`}>
                <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-xs font-[500] text-center  text-[#5b5e69]">
                    <li className={` ${tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(0) }}>
                        <span
                            className={`flex justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-2  items-center py-2  
                  rounded-lg active  group`}
                            aria-current="page"
                        >
                            Integrations
                        </span>
                    </li>
                    <li className={`  ${tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(1) }}>
                        <span
                            className={`flex  justify-start gap-2  
                   cursor-pointer items-center py-2 px-2 rounded-lg active pl-2 group hover:bg-[#038ff408]`}
                            aria-current="page"
                        >
                            Settings
                        </span>
                    </li>
                    <li className={`hover:text-black  ${tab === 2 ? "boredractive" : 'boredrinactive '}`} onClick={() => { setTab(2) }}>
                        <span
                            className={`flex justify-start gap-2    hover:bg-[#038ff408] cursor-pointer items-center py-2 px-2  
                  rounded-lg active pl-2 group`}
                            aria-current="page"
                        >
                            Negatives
                        </span>
                    </li>
                </ul>
            </div>
            {tab === 1 && (
                <div className='flex md:flex lg:flex justify-between gap-2 items-center my-4'>
                    <div className="bg-white  border w-full  rounded-lg border-[#F0F0F1] mx-auto sm:w-[750px] p-4">
                        <UpdateWorkflowBasic botValue={botValue} alignment={'items-start'} handleInputValue={handleInputValue} workflowFormData={workflowFormData} handleFileChange={handleFileChange} saveWorkFlowHandler={saveWorkFlowHandler} publishLoader={publishLoader} setPublishLoader={setPublishLoader} setShow={setShow} onSelectData={onSelectData} setWorkFlowFormData={setWorkFlowFormData} />
                    </div>
                </div>
            )}
            {tab === 2 && (

                <div className='flex md:flex lg:flex justify-between gap-2 items-center my-4'>
                    <div className="bg-white  border w-full  rounded-lg border-[#F0F0F1] mx-auto sm:w-[750px] p-4">
                        <span className="text-[12px] text-[#555555b5]  block  text-heading font-[600]">Description</span>

                        <>
                            {showAdd && (
                                <div className='my-8'>

                                    <textarea
                                        name="negative_answer"
                                        type="text"
                                        id='negative_answer'
                                        className="resizable-textarea w-full block py-3 px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                                        placeholder={negativeQuestions.length === 0 ? "You don't have any negative search terms yet" : "Enter negative search term"}
                                        onChange={(e) => setSelected((prev) => {
                                            return {
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }
                                        })}
                                        rows={'3'}
                                        value={selected?.negative_answer}
                                    >

                                        {/* {selected?.negative_answer} */}
                                    </textarea> <div
                                        className={`flex   rounded-b mt-5 justify-end gap-4`}
                                    >
                                        <button
                                            onClick={(e) => addNewNagetiveFaq()}
                                            type="button"
                                            disabled={selected?.negative_answer === "" || !selected?.negative_answer || nLoading}
                                            className="my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                                            {nLoading ? 'Loading...' : isEdit ? "Edit" : "Add"}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {negativeQuestions.length > 0 && (
                                <>
                                    <h1 className='text-xs font-semibold'>Active Negative Search Terms</h1>
                                    <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                        <ul className="text-start py-2 text-sm text-gray-700 ">
                                            {negativeQuestions.map((element, key) =>
                                                <li className='p-2 text-justify text-heading my-2 cursor-pointer flex justify-between items-center gap-4' key={key}>
                                                    <p className="text-xs">{element.search}</p>
                                                    <div className='flex justify-start gap-4 items-center'>
                                                        <PencilSquareIcon className="h-5 w-5" onClick={() => {
                                                            setIsEdit(true)
                                                            setShowAdd(true)
                                                            setSelected((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    negative_answer: element.search,
                                                                    negative_id: element.id,
                                                                    index: key
                                                                }
                                                            })
                                                        }} />
                                                        <TrashIcon className="h-5 w-5" onClick={() => { deleteNegativeFaq(element.id) }} />

                                                    </div>
                                                </li>
                                            )}

                                        </ul>


                                    </div>
                                </>
                            )}
                        </>
                    </div>
                </div>
            )}
            {tab === 0 && (
                <ul className="relative m-0 list-none px-[0.2rem]  ">
                    <li className='cursor-pointer'>
                        <form>
                            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input autoComplete="off" type="search" ref={inputRef} value={search} onChange={(e) => {
                                    if (innerSide.value) {
                                        handleSearchAutomation(e)
                                    } else {
                                        handleSearch(e)
                                    }


                                }} id="search" className="block w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-sm text-gray-900 border border-border !rounded-md" placeholder="Search" required />
                                <button type="submit" className="text-white hidden absolute right-2.5 bottom-2.5 bg-blue-700   font-medium rounded-lg  px-4 py-2 ">Search</button>
                            </div>
                        </form>
                    </li>
                    {beatLoader === true ?
                        <div className='text-center w-[20px] mx-auto my-28'>
                            <ColorRing
                                height="30"
                                width="30"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperClass="text-center"
                                visible={true}
                            />
                        </div> :
                        <>
                            {innerSide.value === null ?
                                <>
                                    <p className='text-xs text-heading  my-4'>Steps are actions you can add to a workflow. Choose steps to tell Tempo how to handle your customer inquiries or outbound actions. </p>

                                    {allData.filter(ele => ele.name !== "QuickEmailVerification").map((ele, key) =>
                                        findNameCustom(ele.name) === true ?
                                            <li className={`my-4 cursor-pointer`} onClick={() => {
                                                if (ele.functionName === 'RULE') {
                                                    openRulesHandler({ value: "RULE" })
                                                } else if (ele.functionName === 'DEFLECTION') {
                                                    addConditionalStepHandler({ value: "DEFLECTION" })
                                                } else {
                                                    openRulesHandler({ value: "EMAIL" })
                                                }

                                            }}>
                                                <div>
                                                    <div className='flex justify-between items-center '>
                                                        <div className="flex justify-start items-center gap-2">
                                                            {ele.icon}

                                                            <p className='text-heading text-xs'>{ele.name}</p>
                                                            <p className='text-border text-[11px] font-light'></p>
                                                        </div>
                                                        <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                                                    </div>
                                                </div>
                                            </li> :
                                            <li className='my-4 cursor-pointer ' key={key} onClick={(e) => {
                                                findAutomations(ele)
                                                setAllData(allFinalData)
                                                setSearch('')
                                            }} >
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex justify-between items-center gap-2'>
                                                        <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                                            {ele.icon ? <Image
                                                                fill={"true"}
                                                                className={`bg-contain object-scale-down mx-auto w-full rounded-lg`}
                                                                alt="logo.png"
                                                                src={ele.icon}
                                                            /> : <Cog8ToothIcon className="h-6 w-6 text-gray-500" />}

                                                        </div>
                                                        <p className='text-heading text-xs'>{ele.name}</p>
                                                    </div>
                                                    <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                                                </div>
                                            </li>
                                    )}

                                </> :
                                <>
                                    <div className='flex justify-start items-center my-8 gap-2'>
                                        <span className='cursor-pointer' onClick={(e) => {

                                            setSearch('')
                                            setIntegrationAutomationData(integrationAutomationFinalData)
                                            setInnerSide(prev => {
                                                return {
                                                    ...prev,
                                                    id: null,
                                                    value: null
                                                }
                                            })
                                        }}><ChevronLeftIcon className="h-4 w-4" /></span>
                                        {innerSide?.value.icon ?
                                            <div className="relative w-[20px] h-[20px] rounded-lg">
                                                <Image
                                                    fill={"true"}
                                                    className={`bg-contain mx-auto object-scale-down w-full rounded-lg`}
                                                    alt="logo.png"
                                                    src={innerSide?.value.icon || getLogo(innerSide?.value.name)}
                                                />
                                            </div> : <Cog8ToothIcon className="h-6 w-6 text-gray-500" />}

                                        <p className='text-heading text-sm'>{innerSide?.value.name}</p>
                                    </div>
                                    <div className='mb-32'>
                                        {integrationAutomationData?.map((ele, key) =>
                                            <li className={`my-4 cursor-pointer border border-border rounded-md p-2 bg-[#F8F8F8]`} key={key} onClick={(e) => addStepHandler(ele)}>
                                                <div className='flex justify-start items-center gap-4'>

                                                    {ele?.integration?.icon ?
                                                        <div className="relative w-[25px] h-[20px] rounded-lg">
                                                            <Image
                                                                fill={"true"}
                                                                className={`bg-contain object-scale-down mx-auto w-full rounded-lg`}
                                                                alt="logo.png"
                                                                src={ele?.integration?.icon || getLogo(innerSide?.value.name)}
                                                            />
                                                        </div> : <Cog8ToothIcon className="h-6 w-6 text-gray-500" />}

                                                    <div className='w-[200px]'>
                                                        <h3 className='text-xs'>{ele?.name}</h3>
                                                        <p className='text-border text-[11px] font-light'>{ele?.description}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </div>
                                </>}
                        </>
                    }
                </ul>
            )}
        </div>
    )
}

export default SidebarCards