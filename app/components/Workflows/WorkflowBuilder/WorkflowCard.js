import React from 'react'
import { Tooltip } from 'react-tooltip'
import { makeCapital } from '../../helper/capitalName'
import { updateWorkFlowStatus } from '@/app/API/pages/Workflow'
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from '../../helper/firstLetterCapital';
import { ArrowUturnLeftIcon, ClipboardDocumentListIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SkeletonLoader from '../../Skeleton/Skeleton';
import Image from 'next/image';
import { getPermissionHelper } from '../../helper/returnPermissions';
import { useSelector } from 'react-redux';

const WorkflowCard = ({ manageData, item, key, loading, data, isAuthorizedUser, setShowActive, setTab }) => {
    const router = useRouter()
    const [updateStatusLoader, setUpdateStatusLoader] = useState(false)
    const userState = useSelector((state) => state.user.data)
    const redirectToLogs = (e) => {
        router.push(`/dashboard/analytics?selectedWorkflow=${e?.id}`)
    }

    const toggleWorkflowStatus = async (workflowId, wfStatus) => {
        setUpdateStatusLoader(true)
        await updateWorkFlowStatus({ active: !wfStatus }, workflowId,)
        await manageData()

        if (wfStatus === true) {
            if (data.length === 1) {
                setShowActive(false)
                setTab(5)
            }
        } else {
            setShowActive(true)
        }
        setUpdateStatusLoader(false)
    }

    const getGradientStyle = (number, condition) => {
        let currentValue = number;

        let maxValueTriggered = data[0].workflow_usage_last_24_hours * 1;
        let maxValueUsed = data[0].successful_automation_usage_last_24_hours_count * 1;
        let maxValue = condition == 'used' ? maxValueUsed : maxValueTriggered

        if (currentValue == 0) { return { color: 'gray' } }
        if (currentValue != null && maxValue > 0) {
            let percentage = (currentValue / maxValue) * 100;
            percentage = Math.min(percentage, 100);

            let color;
            if (percentage >= 75) {
                color = '#48CD2B';
            } else if (percentage >= 40) {
                color = '#0A7204';
            } else if (percentage >= 15) {
                color = '#D93F06';
            } else {
                color = '#F14932';
            }

            return {
                color: color,
            };
        } else {
            return {
                color: '#808080',
            };
        }
    }

    const getIntegrationIcon = (automations, name = "") => {
        const getIcon = automations?.find((x) => x?.automation?.integration?.icon !== null && x?.automation?.integration?.icon !== "");

        if (getIcon !== undefined && getIcon?.automation?.integration?.icon !== undefined) {
            return getIcon?.automation?.integration?.icon;
        }
        return null;
    };

    return (
        <div
            onClick={(e) => {
                isAuthorizedUser &&
                    e.stopPropagation();
                router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${item?.id}`)
            }}
            // style={{
            //     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            // }}
            key={key}
            className={`relative border border-[#F0F0F1] p-3 rounded-md bg-white h-[200px] shadow-md hover:border-3 hover:border-primary ${isAuthorizedUser && 'cursor-pointer'}`}

        >

            <div className='relative h-full'>
                {/* <EmojiPicker /> */}
                {!loading && (
                    <div className='relative'>
                        <div className='absolute top-0 right-0 flex gap-2 cursor-pointer'>

                            <span
                                onClick={(e) => { e.stopPropagation(); redirectToLogs(item) }}
                                className='text-[#808080] font-semibold bg-lowgray rounded-md px-1'
                                data-tooltip-id="last24hs"
                                data-tooltip-content={`Triggered ${item.workflow_usage_last_24_hours} times last 24hrs.`}
                                style={getGradientStyle(item.workflow_usage_last_24_hours, 'triggered')}>

                                {item.workflow_usage_last_24_hours}
                            </span>


                            <span
                                onClick={(e) => { e.stopPropagation(); redirectToLogs(item) }}
                                className='text-[#808080] font-semibold bg-lowgray rounded-md px-1'
                                data-tooltip-id="last24hs_count"
                                data-tooltip-content={`Successfully used ${item.successful_automation_usage_last_24_hours_count} times last 24hrs.`}
                                style={getGradientStyle(item.successful_automation_usage_last_24_hours_count, 'used')}>

                                {item.successful_automation_usage_last_24_hours_count}
                            </span>

                            <Tooltip id='last24hs' place="top" type="dark" effect="solid" />

                        </div>
                        <Tooltip id='last24hs_count' place="top" type="dark" effect="solid" />

                    </div>
                )}

                <div className='flex items-center justify-start gap-2'>
                    {item.icon && (
                        loading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={40} /> :
                            <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" onClick={(e) => {

                                e.stopPropagation();
                                setSuggestModal(true)
                                setEmojiData(prev => {
                                    return {
                                        ...prev,
                                        id: item?.id
                                    }
                                })
                            }} x>
                                {item.icon}
                            </div>
                    )}
                    {getIntegrationIcon(item?.automations, item?.name) !== null && (
                        <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" >
                            {loading ?
                                <SkeletonLoader className="mr-2" count={1} height={30} width={40} />
                                :
                                <Image
                                    fill={"true"}
                                    className="bg-contain mx-auto object-scale-down w-full rounded-lg"
                                    alt="logo.png"
                                    src={getIntegrationIcon(item?.automations, item?.name)}
                                />
                            }
                        </div>
                    )}
                    {item?.automations?.length > 0 && item?.automations?.map((element, index) =>
                        (element?.automation === null) && (
                            <div key={index} className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                {element.condition && element.condition !== "" && (
                                    <>
                                        {loading ?
                                            <SkeletonLoader count={1} height={30} width={40} />
                                            :
                                            <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                                        }
                                    </>
                                )}

                                {element?.question && element?.question !== "" && (
                                    <>
                                        {loading ?
                                            <SkeletonLoader count={1} height={30} width={40} />
                                            :
                                            <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />
                                        }

                                    </>
                                )}

                                {element?.transformer && element?.transformer !== "" && (
                                    <>
                                        {loading ?
                                            <SkeletonLoader count={1} height={30} width={40} />
                                            :
                                            <PuzzlePieceIcon className="h-6 w-6 text-gray-500" />
                                        }
                                    </>
                                )}
                            </div>
                        )
                    )}

                </div>
                <div className=''
                >
                    <h2 className='text-[#151D23] !font-bold mt-2 text-base'>
                        {loading ?
                            <SkeletonLoader count={1} height={30} width="70%" />
                            :
                            <>
                                {item.name === 'Default_name' ? "New Workflow 1" : makeCapital(item.name)}
                            </>
                        }</h2>
                    <p className='text-xs text-black mt-1'>

                        {loading ?
                            <SkeletonLoader count={1} height={20} width="50%" />
                            :
                            <>
                                By Deflection AI
                            </>
                        }
                    </p>
                    <p className='text-xs text-[#151d23cc] mt-1'>
                        {loading ?
                            <SkeletonLoader count={1} height={20} width="50%" />
                            :
                            <>
                                {capitalizeFirstLetter(item.source)}
                            </>
                        }

                    </p>
                </div>
                {(item?.workflow_usage_last_24_hours == 0 || getPermissionHelper('DEACTIVATE WORKFLOW', userState?.role)) &&
                    <div className='absolute w-full bottom-0 flex items-center justify-end'>
                        <div className=' text-end'>
                            {/* <p className='text-xs text-[#151d23cc]'>
                                                    {loading ?
                                                        <SkeletonLoader count={1} height={30} width={50} />
                                                        : <>
                                                            {item.active ? 'Active' : 'Draft'}
                                                        </>
                                                    }
                                                </p> */}

                            {
                                updateStatusLoader ?
                                    <>
                                        <p className='text-xs text-gray'>
                                            Loading...
                                        </p>
                                    </>
                                    :
                                    <>
                                        <p className={`${item.active ? 'text-danger' : 'text-success'}  cursor-pointer hover:font-semibold text-xs`} onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWorkflowStatus(item.id, item.active)
                                            // deleteWorkflowHandler(e, item)
                                        }}>
                                            {loading ?
                                                <SkeletonLoader count={1} height={30} width={50} />
                                                : <>
                                                    {item.active ? 'Deactivate' : 'Activate'}
                                                </>
                                            }</p>
                                    </>
                            }

                        </div>
                    </div>}
            </div>

        </div>
    )
}

export default WorkflowCard