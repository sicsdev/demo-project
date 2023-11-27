import React from 'react'

const AutomationCard = ({ item }) => {

    return (
        <>

            {item && <>

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${item?.id}`)
                    }}
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                    key={item.id}
                    className='relative border border-[#F0F0F1] p-3 rounded-md cursor-pointer bg-white h-[200px]'

                >
                    <div className='relative h-full'>
                        {/* <EmojiPicker /> */}
                        <div className='relative'>
                            <div className='absolute top-0 right-0 flex gap-2'>
                                {/* 
                            <span
                                onClick={(e) => { e.stopPropagation(); redirectToLogs(item) }}
                                className='text-[#808080] font-semibold bg-lowgray rounded-md px-2'
                                data-tooltip-id="last24hs"
                                data-tooltip-content={`Triggered ${item.workflow_usage_last_24_hours} times last 24hrs.`}
                                style={getGradientStyle(item.workflow_usage_last_24_hours, 'triggered')}>

                                {item.workflow_usage_last_24_hours}
                            </span> */}

                                {/* 
                            <span 
                                onClick={(e) => { e.stopPropagation(); redirectToLogs(item) }}
                                className='text-[#808080] font-semibold bg-lowgray rounded-md px-2'
                                data-tooltip-id="last24hs_count"
                                data-tooltip-content={`Successfully used ${item.successful_automation_usage_last_24_hours_count} times last 24hrs.`}
                                style={getGradientStyle(item.successful_automation_usage_last_24_hours_count, 'used')}>

                                {item.successful_automation_usage_last_24_hours_count}
                            </span> */}


                            </div>

                        </div>

                        <div className=''>
                            <h2 className='text-[#151D23] !font-bold mt-2 text-base opacity-90'>{item.name}</h2>
                        </div>

                        <p className='text-xs text-[#151d23cc] mt-1'>
                            <small>By Deflection AI</small>
                        </p>

                        <div className='absolute bottom-0 w-full cursor-pointer '>
                            <div className='flex items-center justify-end '>
                                <p className=' text-end text-xs bg-sidebar-hover text-white p-1 rounded-full shadow-md px-2'>
                                    Activate
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default AutomationCard