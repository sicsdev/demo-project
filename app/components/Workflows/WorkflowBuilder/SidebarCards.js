import { getIntegrationAutomation } from '@/app/API/pages/Integration'
import { updateWorkFlowStatus } from '@/app/API/pages/Workflow'
import { tiles_icons } from '@/app/data/icon_data'
import { ChevronLeftIcon, ChevronRightIcon, ShareIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { errorMessage } from '../../Messages/Messages'
import Link from 'next/link'

const SidebarCards = ({ inputRef, state, setAutomationStepsData, automationStepsData, handleButtonClick, workflowId, stepIndex, setStepIndex, setIndexSelector, getWorkflowData, setMobileCss }) => {
    const [beatLoader, setBeatLoader] = useState(false)
    const [search, setSearch] = useState('')
    const [allData, setAllData] = useState(state?.data?.results ?? [])
    const [integrationAutomationData, setIntegrationAutomationData] = useState([]);
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
        setBeatLoader(false);
    }
    function addDataAtIndex1(stepIndex, get_ids, newData) {
        get_ids.splice(stepIndex, 0, newData);
        return get_ids;
    }
    const addStepHandler = async (ele) => {
        console.log("ele", ele)
        const get_ids = automationStepsData.map((element) => {
            return {
                automation: element?.automation?.id,
                data: element?.data,
                output: element?.output
            };
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
        const update = await updateWorkFlowStatus({ automations: newArray }, workflowId);
        getWorkflowData(workflowId)
        handleButtonClick(false)
        setStepIndex(null);
        setIndexSelector(null)
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
        const filteredResults = state?.data?.results.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setAllData(filteredResults)
    }
    return (
        <div>
            <div className='block sm:hidden text-right pb-4'>
                <p className="cursor text-sm font-semibold" onClick={(e) => setMobileCss('')}>
                    Back
                </p>
            </div>
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
                            <input autoComplete="off" type="search" ref={inputRef} value={search} onChange={handleSearch} id="search" className="block w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-sm text-gray-900 border border-border rounded-lg" placeholder="Search" required />
                            <button type="submit" className="text-white hidden absolute right-2.5 bottom-2.5 bg-blue-700   font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
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
                                <p className='text-sm text-heading font-[300] my-4'>Steps are actions you can add to a workflow. Choose steps to tell Tempo how to handle your customer inquiries or outbound actions. </p>

                                {allData.map((ele, key) =>
                                    <li className='my-4 cursor-pointer ' key={key} onClick={(e) => {
                                        findAutomations(ele)
                                    }} >
                                        <div className='flex justify-between items-center'>
                                            <div className='flex justify-between items-center gap-2'>
                                                <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                                    <Image
                                                        fill={"true"}
                                                        className={`bg-contain mx-auto w-full rounded-lg`}
                                                        alt="logo.png"
                                                        src={ele.icon || getLogo(ele.name.split(" ")[0])}
                                                    />
                                                </div>
                                                <p className='text-heading text-sm'>{ele.name}</p>
                                            </div>
                                            <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                                        </div>
                                    </li>
                                )}

                                <li className={`my-4 cursor-pointer`}>
                                    <Link href={"/dashboard/workflow/integrations"}>
                                        <div className='flex justify-between items-center '>
                                            <div className="flex justify-start items-center gap-2">
                                                <ShareIcon className="h-6 w-6 text-gray-500" />

                                                <p className='text-heading text-sm'>Add Integration</p>
                                                <p className='text-border text-[11px] font-light'></p>
                                            </div>
                                            <span><ChevronRightIcon className="h-5 w-5 text-gray-500" /></span>
                                        </div>
                                    </Link>
                                </li>
                            </> :
                            <>
                                <div className='flex justify-start items-center my-8 gap-2'>
                                    <span className='cursor-pointer' onClick={(e) => {
                                        setInnerSide(prev => {
                                            return {
                                                ...prev,
                                                id: null,
                                                value: null
                                            }
                                        })
                                    }}><ChevronLeftIcon className="h-4 w-4" /></span>
                                    <div className="relative w-[20px] h-[20px] rounded-lg">
                                        <Image
                                            fill={"true"}
                                            className={`bg-contain mx-auto w-full rounded-lg`}
                                            alt="logo.png"
                                            src={innerSide?.value.icon || getLogo(innerSide?.value.name)}
                                        />
                                    </div>
                                    <p className='text-heading font-bold text-[14px]'>{innerSide?.value.name}</p>
                                </div>
                                {integrationAutomationData?.map((ele, key) =>
                                    <li className={`my-4 cursor-pointer border border-border rounded-md p-2 bg-[#F8F8F8]`} key={key} onClick={(e) => addStepHandler(ele)}>
                                        <div className='flex justify-start items-center gap-4'>
                                            <div className="relative w-[25px] h-[20px] rounded-lg">
                                                <Image
                                                    fill={"true"}
                                                    className={`bg-contain mx-auto w-full rounded-lg`}
                                                    alt="logo.png"
                                                    src={ele?.integration?.icon || getLogo(innerSide?.value.name)}
                                                />
                                            </div>
                                            <div className='w-[200px]'>
                                                <h3 className='text-[13px] font-[4500]'>{ele?.name}</h3>
                                                <p className='text-border text-[11px] font-light'>{ele?.description}</p>
                                            </div>
                                        </div>
                                    </li>
                                )}

                            </>}
                    </>
                }
            </ul>
        </div>
    )
}

export default SidebarCards