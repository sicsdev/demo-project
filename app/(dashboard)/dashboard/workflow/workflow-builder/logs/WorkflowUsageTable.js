import React, { useState } from 'react'
import WorkflowUsageCard from './WorkflowUsageCard';
import { ArrowDownIcon, ArrowRightIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';

const WorkflowUsageTable = ({ loading, data }) => {
    const [currentExpanded, setCurrentExpanded] = useState('')
    const expandRecord = (row) => {
        if (currentExpanded == row.id) {
            setCurrentExpanded('')
            return
        }
        setCurrentExpanded(row.id)
    }

    return (
        <>
            <div className='w-full'>
                {loading === true ?
                    <div className="mt-6">
                        <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                            <SkeletonLoader height={20} width={"20%"} />
                            <div className="p-2">
                                <div className="mt-3">
                                    <SkeletonLoader height={18} width={"60%"} />
                                </div>
                                <div className="mt-1">
                                    <SkeletonLoader height={15} width={"70%"} />
                                    <SkeletonLoader height={15} width={"50%"} />
                                    <SkeletonLoader height={15} width={"80%"} />
                                </div>
                                <div className="flex justify-end">
                                    <SkeletonLoader height={25} width={100} />
                                </div>
                            </div>
                        </div>

                    </div> :
                    <>
                        {data.results.length > 0 && data.results.map((item, key) =>
                            <div className='p-4 text-justify bg-[#96b2ed2e] text-heading my-2 cursor-pointer mx-2 rounded-lg' key={key} onClick={() => { expandRecord(item) }}>
                                <div className='flex'>
                                    <div className='flex items-start mt-4 w-[4%] px-[16px]'>
                                        <div className="w-full text-xl flex items-start justify-center">
                                            <h1 className="border border-gray rounded-md p-1">{item?.workflow?.icon}</h1>
                                        </div>
                                    </div>

                                    <div className='flex items-center w-[100%] pr-[5px] pl-[8px] sm:pl-[16px] sm:pr-[16px]'>
                                        <div className='w-full text-[#000] break-all' >
                                            <WorkflowUsageCard currentExpanded={currentExpanded} log={item}></WorkflowUsageCard>
                                        </div>
                                    </div>

                                    <div className='flex items-center px-[0px] sm:px-[16px]'>
                                        <div className='w-full text-sm flex gap-2 items-center justify-center text-[#000]'>
                                            <ChartBarIcon className='w-4 h-4 opacity-60'></ChartBarIcon>
                                            <b>{item.workflow.successful_automation_usage_last_24_hours_count}</b>
                                        </div>
                                    </div>
                                    <div className='hidden sm:flex items-center px-[16px]'>
                                        <div className="cursor-pointer relative">
                                            {currentExpanded === item.id ?
                                                <ArrowDownIcon className="h-4 w-4 font-bold text-heading cursor-pointer"></ArrowDownIcon>
                                                :
                                                <ArrowRightIcon className="h-4 w-4 font-bold text-heading cursor-pointer" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
        </>
    )
}

export default WorkflowUsageTable