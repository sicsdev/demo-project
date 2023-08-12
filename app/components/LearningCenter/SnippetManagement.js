import { XCircleIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

const SnippetManagement = ({ setCreateOptions, basicFormData, setBasicFormData, handleSubmit, loading }) => {
    const [content, setContent] = useState(basicFormData?.content ?? '')
    const handleInputChange = (e) => {
        const { value, name } = e.target
        setContent(value)
        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const DisablingButton = () => {
        return ["content"].some(
            (key) => !basicFormData[key] || basicFormData[key].trim() === ""
        );
    }
    return (
        <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'>
            <div className='w-full sm:w-auto fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                    <div className='flex flex-col sm:flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                        <div className='flex flex-row flex-1'>
                            <input type='text' className='border-0 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Enter a Title' />
                        </div>
                        <div className='flex flex-row justify-end gap-2'>
                            <button onClick={(e) => setCreateOptions(null)} type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black disabled:bg-input_color disabled:text-white">
                                <XCircleIcon className='h-4 w-4' />
                                Delete
                            </button>
                            <button onClick={(e) => handleSubmit('SNIPPET')} type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] disabled:bg-input_color disabled:text-white" disabled={DisablingButton() || loading === true}>
                                {loading ? "Loading..." : "Save and close"}
                            </button>
                        </div>
                    </div>

                    <div className='my-8'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-row items-center'>
                                <span className='pr-5 text-xs'>State</span>
                                <div className='flex flex-row items-center gap-2 col-span-4'>
                                    <div>
                                        <label className="switch" style={{ height: "unset" }}>
                                            <input type="checkbox" name="billingEnabled" />
                                            <span className="slider round h-[27px] w-[55px]"></span>
                                        </label>
                                    </div>
                                    <p className="inline-block whitespace-nowrap rounded bg-[#d8efdc] text-[#107235] px-4 py-2 align-baseline text-xs font-bold leading-none">
                                        {`Active`}
                                    </p>
                                </div>
                            </div>
                            <div className='relative pb-6'>
                                <textarea rows="10" cols="30" className='border border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Start writing your content...' content={content} name='content' id='content' onChange={handleInputChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className='bg-[#E8E8E8] flex items-start gap-3 py-[10px] px-[15px] rounded-lg absolute bottom-4 left-3 right-3'>
                        <div className="flex gap-3 items-start justify-start">
                            <svg className="mt-1" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.10039 4.90449C9.10039 4.29698 8.6079 3.80449 8.00039 3.80449C7.39288 3.80449 6.90039 4.29698 6.90039 4.90449C6.90039 5.51201 7.39288 6.00449 8.00039 6.00449C8.6079 6.00449 9.10039 5.51201 9.10039 4.90449Z"></path><path d="M7.25 7.00449V12.0045H8.75V7.00449H7.25Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00039 15.3226C3.9411 15.3226 0.650391 12.0319 0.650391 7.97256C0.650391 3.91327 3.9411 0.622559 8.00039 0.622559C12.0597 0.622559 15.3504 3.91327 15.3504 7.97256C15.3504 12.0319 12.0597 15.3226 8.00039 15.3226ZM2.35039 7.97256C2.35039 11.093 4.87998 13.6226 8.00039 13.6226C11.1208 13.6226 13.6504 11.093 13.6504 7.97256C13.6504 4.85215 11.1208 2.32256 8.00039 2.32256C4.87998 2.32256 2.35039 4.85215 2.35039 7.97256Z"></path></svg>
                            <p className='font-sm'><span className='font-bold'>Tip:</span> Snippets are exclusive to Tempo and not publicly available to your customers. <a href=''>Learn more.</a></p>
                        </div>
                        <div className="cursor-pointer banner__hide-link">
                            <a data-test-banner-hide-link="" data-ember-action="" data-ember-action-2188="2188"><svg className="interface-icon o__standard o__standard__close" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5097 3.5097C3.84165 3.17776 4.37984 3.17776 4.71178 3.5097L7.99983 6.79775L11.2879 3.5097C11.6198 3.17776 12.158 3.17776 12.49 3.5097C12.8219 3.84165 12.8219 4.37984 12.49 4.71178L9.20191 7.99983L12.49 11.2879C12.8219 11.6198 12.8219 12.158 12.49 12.49C12.158 12.8219 11.6198 12.8219 11.2879 12.49L7.99983 9.20191L4.71178 12.49C4.37984 12.8219 3.84165 12.8219 3.5097 12.49C3.17776 12.158 3.17776 11.6198 3.5097 11.2879L6.79775 7.99983L3.5097 4.71178C3.17776 4.37984 3.17776 3.84165 3.5097 3.5097Z"></path></svg></a>
                        </div>
                    </div>



                </div>
            </div>
        </div >
    )
}

export default SnippetManagement