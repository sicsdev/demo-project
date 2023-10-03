import { InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const SnippetManagement = ({ setCreateOptions, basicFormData, setBasicFormData, handleSubmit, loading, hideComponent }) => {
    const [content, setContent] = useState(basicFormData?.content ?? '')
    const [tipContent, setTipContent] = useState(true);
    const handleInputChange = (e) => {
        const { value, name } = e.target
        if (name === "content") {
            setContent(value)
        }

        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const handleToggleChange = (e) => {
        const { checked, name } = e.target; // Use checked instead of value for checkbox
        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: checked,
            };
        });
    };

    const DisablingButton = () => {
        return ["content", 'title'].some(
            (key) => !basicFormData[key] || basicFormData[key].trim() === ""
        );
    }

    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                hideComponent();
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('keydown', handleEscapeKeyPress);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []);

    return (
        <>
            <div onClick={() => hideComponent()} className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'></div >
            <div className='w-full sm:w-auto z-50 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                    <div className='flex gap-2 items-center py-4 border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                        <div className='flex flex-row flex-1'>
                            <input type='text' className='border-0 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Enter a Title' id='title' name='title' onChange={handleInputChange} />
                        </div>
                        <div className='flex flex-row justify-end gap-2'>
                            <button onClick={(e) => setCreateOptions(null)} type="button" className="flex items-center justify-center gap-1 focus:ring-4 focus:outline-none font-medium rounded-md text-xs py-2 px-4 w-auto focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black disabled:bg-input_color disabled:text-white">
                                <XCircleIcon className='h-4 w-4' />
                                Close
                            </button>
                            <button onClick={(e) => handleSubmit({ type: 'SNIPPET' })} type="button" className="flex items-center justify-center gap-1 focus:ring-4 focus:outline-none font-medium bg-primary rounded-md text-xs py-2 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none" disabled={DisablingButton() || loading === true}>
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
                                            <input type="checkbox" name="snippet_active" onChange={handleToggleChange} />
                                            <span className="slider round h-[21px] w-[40px]"></span>
                                        </label>
                                    </div>
                                    <p className={`inline-block whitespace-nowrap rounded ${basicFormData?.snippet_active === true ? `bg-[#d8efdc] text-[#107235]` : 'text-black bg-[#ececf1]'} px-4 py-2 align-baseline text-xs font-medium  leading-none`}>
                                        {basicFormData?.snippet_active === true ? `Active` : `Disabled`}
                                    </p>
                                </div>
                            </div>
                            <div className='relative pb-6'>
                                <textarea rows="10" cols="30" className='border border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Start writing your content...' content={content} name='content' id='content' onChange={handleInputChange}></textarea>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SnippetManagement