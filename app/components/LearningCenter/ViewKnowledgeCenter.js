import React, { useState } from 'react'
import { BoltIcon } from '@heroicons/react/24/outline'

const ViewKnowledgeCenter = ({ setViewCenter }) => {
    const [previewData, setPreviewData] = useState('preview');
    return (
        <div className="bg-white p-4">
            <div className="flex items-center justify-between">
                <p className="text-black-color text-xl font-semibold my-4">
                    Provider credientials - hims, inc.
                </p>
                <p className='cursor-pointer text-sm' onClick={(e) => setViewCenter(false)}>Back</p>
            </div>
            <div>
                <p className="text-xs mb-4 font-bold">DETAILS</p>
                <div className="flex gap-10 justify-start align-top items-center mb-3">
                    <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                        Source
                    </p>
                    <p className="text-sm bg-[#e8e8e8] text-[#777777] rounded-md cursor-pointer font-semibold p-1 px-2">
                        support.forhims.com/hc/en-us
                    </p>
                </div>
                <div className="flex gap-10 justify-start align-top items-center mb-3">
                    <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                        URL
                    </p>
                    <p className="text-sm text-primary cursor-pointer font-semibold p-1">
                        https://usetempo.ai/
                    </p>
                </div>
                <div className="flex gap-10 justify-start align-top items-center mb-3">
                    <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                        State
                    </p>
                    <p class="inline-block whitespace-nowrap rounded bg-[#d8efdc] text-[#107235] px-4 py-2 align-baseline text-xs font-bold leading-none">
                        {`Used by Fin`}
                    </p>
                </div>
                <div className="flex gap-10 justify-start align-top items-center mb-3">
                    <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                        Last synced
                    </p>
                    <p className="text-sm font-semibold p-1">7 hours ago/</p>
                </div>
                <div className="flex gap-10 justify-start align-top items-center mb-3">
                    <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                        Last edited
                    </p>
                    <p className="text-sm font-semibold p-1">7 hours ago/</p>
                </div>
            </div>
            <hr className='mt-6 text-border' />
            <div className="pt-4">
                <p className="text-xs mb-4 font-semibold">
                    CONTENT IMPORTED FOR FIN
                </p>
                <div className="flex justify-between items-center rounded-md p-1"
                    style={{ border: "2px solid #777777" }}>
                    <div className="w-[50%]" onClick={(e) => setPreviewData('preview')}>
                        <span
                            className={`flex justify-center text-xs sm:text-sm gap-2 cursor-pointer items-center p-2 sm:p-2 text-black font-bold rounded-md group ${previewData === 'preview' ? 'bg-[#f1f1f1]' : ''}`}
                        >
                            <BoltIcon className="h-6 w-6 text-gray-500" /> Preview
                        </span>
                    </div>
                    <div className="w-[50%]" onClick={(e) => setPreviewData('raw')}>
                        <span
                            className={`flex justify-center text-xs sm:text-sm gap-2 cursor-pointer items-center p-2 sm:p-2 text-black font-bold rounded-md group ${previewData === 'raw' ? 'bg-[#f1f1f1]' : ''}`}>
                            <BoltIcon className="h-6 w-6 text-gray-500" /> Raw
                        </span>
                    </div>

                </div>
                <div className='mt-2'>
                    <p className='text-xs text-black font-[500] leading-7'>
                        | Provider Name | License State | License Number | NPI | Specialty || Aaron Murfin, APRN |
                        California | 95019932 | 1821646092 | NP-Adult Gerontology || | Kentucky | 3016675| | || |
                        Louisiana | 224848| | || |Nevada | TEMP855565| | || |Ohio | 024678 | | || | Oregon |
                        202208496NP-PP| | || | Texas | 1074710| | || | Washington | N361314159| | || |
                        Wisconsin | 9795-33| | || Aarti Attreya Latuso, MD | Alabama | MD.43764 | 1538514799 | Family
                        Medicine, Emergency Medicine || | Idaho | MC-1217| | || | Kansas | 445732| | || | Kentucky |
                        C0561| | || | Louisiana | 311831| | || |Massachusetts | 292430| | || | Michigan |
                        EMC0001583| | || | Minnesota | 70722| | || | North Carolina | 2022-01824| | || | North
                        Dakota | 18013| | || |Oklahoma | 39084 | | || | Texas | T0707| | || | Utah | 12644878-
                        1205| | || | Wisconsin | 1713-320| | || Abby Brockelbank, APRN | Florida | APRN9330418 |
                        1043694656 | NP-Family Medicine || | Massachusetts | RN2276169| | || | New York | 341219 |
                        | || | Vermont | 101.0134875| | || Abdulkader Kasabji, MD | Connecticut | 65610 | 1427234897
                        | Internal Medicine || | Indiana | 01080758A| | || |New York | 284893 | | || | Ohio |
                        35.121691CTR| | || | South Carolina | 51559| | || Adam Dine, MD | Georgia | 81755 |
                        1710194030 | Emergency Medicine || | Michigan | 5101025764| | || |New York | 296606| | |
                        | | Ohio | 34.008989| | || | Tennessee | 3872| | || Adam Kozikowski, APRN | New York |
                        401733 | 1255748158 | NP-Psychiatry || Adam Murchie, APRN | Arizona | 274370 | 152806391
                        NP-Family Medicine || | Arkansas | 221583| | || | Colorado | C-RXN.0002195-C-NP| | ||
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ViewKnowledgeCenter