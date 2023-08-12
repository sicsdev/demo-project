import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

const UrlManagement = ({ setCreateOptions, currentStatusSteps, currentIndex, basicFormData, setBasicFormData, handleSubmit, loading }) => {
    const [url, setUrl] = useState(basicFormData?.url ?? '')
    const handleInputChange = (e) => {
        const { value, name } = e.target
        setUrl(value)
        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const DisablingButton = () => {
        return ["url"].some(
            (key) => !basicFormData[key] || basicFormData[key].trim() === ""
        );
    }
    return (
        <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'>
            <div className='w-full sm:w-auto fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                    <div className='flex flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800'>
                        <div className='flex flex-row flex-1'>
                            <h2 className='font-bold text-lg'>Manage sources</h2>
                        </div>
                        <div className='flex flex-row justify-end gap-2'>
                            <div className='cursor-pointer' onClick={(e) => setCreateOptions(null)}>
                                <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] p-2' />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col flex-1 p-0'>
                        <div className='flex flex-col gap-16 border-gray-lightest p-8 -mx-8'>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-bold text-black'>Enter the URL of your external support content</h3>
                                <p class="text font-normal text-xs">
                                    We will fetch all of the pages from the website URL you provide. Please provide a <strong>top-level domain</strong>. We will read from all the sub domain pages.
                                </p>
                                <input type='text' placeholder='https://support.mywebsite.com/' className='new_input block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[12px] text-[12px] disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full focus:bg-white focus:text-[12px]' onChange={handleInputChange} name="url" id='url' />
                                <div className='flex flex-col gap-2 pt-2'>
                                    <ul class="text mt-0 px-6 list-disc text-sm">
                                        <li class="mb-2">
                                            Provide your <strong>external help center homepage link</strong> for best results
                                        </li>
                                        <li class="mb-2">
                                            <strong>Top-level domains will give the best results</strong> (e.g. https://myhelpcenter.com rather than https://myhelpcenter.com/home)
                                        </li>
                                    </ul>
                                    <div class="flex flex-row">
                                        <button type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] disabled:bg-input_color disabled:text-white" disabled={DisablingButton() || loading === true} onClick={() => handleSubmit("URL")} value={url}>
                                            {loading ? "Loading..." : "Sync external support content"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-bold text-black'>Synced external sources</h3>
                                <p class="text font-normal text-xs">
                                    Tempo will automatically generate responses using the following external sources:
                                </p>
                                <div class="flex flex-col gap-4 mt-4">
                                    <div className='border-gray-300 cursor-pointer	 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg'>
                                        <div class="flex flex-wrap sm:flex-auto justify-between rounded bg-white p-4">
                                            <div className='flex items-center justify-center'>
                                                <div>
                                                    <label className="switch" style={{ height: "unset" }}>
                                                        <input type="checkbox" checked name="billingEnabled" />
                                                        <span className="slider round h-[27px] w-[55px]"></span>
                                                    </label>
                                                </div>
                                                <h3 className='font-semibold'>https://support.gmail.com</h3>
                                            </div>
                                            <div className='pt-4 sm:pt-0 flex justify-center gap-1 items-center'>
                                                <p className="inline-block whitespace-nowrap rounded bg-[#d8efdc] text-[#107235] px-4 py-2 align-baseline text-xs font-bold leading-none">
                                                    {`Active`}
                                                </p>
                                                <EllipsisHorizontalIcon className="h-6 w-6 font-bold text-heading cursor-pointer" />
                                            </div>
                                        </div>
                                        <div class="flex flex-col justify-between rounded bg-white p-4">
                                            <p className='text-xs pb-4'>We are indexing your website and collecting your support content</p>
                                            <div class="grid grid-rows-`4` grid-flow-col gap-1 h-[5px]">
                                                {currentStatusSteps.map((item, index) => (
                                                    <div key={index} className={`rounded-[10px] ${index === currentIndex ? 'blink-in-progress-animation' : ''} ${index < currentIndex ? 'flex-none bg-[#222]' : ''} ${index > currentIndex ? 'flex-auto bg-[#e8e8e8]' : ''} `}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UrlManagement