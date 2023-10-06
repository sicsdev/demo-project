import { InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Modal from '../Common/Modal/Modal';
import { Input } from '../Common/Input/Input';
import Button from '../Common/Button/Button';
import { useSearchParams } from 'next/navigation';

import dynamic from 'next/dynamic'
const TextEditor = dynamic(() => import('../URL/Richtext'), { ssr: false })

const SnippetManagement = ({ setCreateOptions, basicFormData, setBasicFormData, handleSubmit, loading, hideComponent }) => {

    // Local states
    const [content, setContent] = useState(basicFormData?.content ?? '')
    const [tipContent, setTipContent] = useState(true);


    // Modals for text editor.
    const [showHyperlinkModal, setShowHyperlinkModal] = useState(false)



    const searchParams = useSearchParams()

    const [debugMode, setDebugMode] = useState(false)

    useEffect(() => {
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                hideComponent();
            }
        };
        let wyg = searchParams.get('debugTextEditor')
        if (wyg) setDebugMode(true)

        // Add the event listener when the component mounts
        document.addEventListener('keydown', handleEscapeKeyPress);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []);



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


    const handleTextEditorChange = (formatedContent) => {
        setBasicFormData((prev) => {
            return {
                ...prev,
                content: formatedContent,
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


                            <TextEditor handleTextEditorChange={handleTextEditorChange} debugMode={debugMode}></TextEditor>


                            {/* TEXT EDITOR */}

                            {/* <Modal title={'Add hyperlink'} show={showHyperlinkModal} setShow={setShowHyperlinkModal} className={'w-[30%] rounded-lg'} showCancel={true} >

                                <div className='gap-2 w-100 mb-3'>
                                    <small>Text to display:</small>
                                    <Input
                                        type={"text"}
                                        placeholder={"Enter text..."}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                        name="texttodisplayhyperlink"
                                        id={"texttodisplayhyperlink"}
                                    // onChange={handleHyperlinkLabel}
                                    />
                                </div>
                                <div>
                                    <small>Link to:</small>
                                    <Input
                                        type={"text"}
                                        placeholder={"Enter text..."}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight`}
                                        name="linkurlhyperlink"
                                        id={"linkurlhyperlink"}
                                    />
                                </div>
                                <div className='flex justify-end mt-3 mb-2'>
                                    <Button
                                        type={"button"}
                                        className="my-3 sm:my-0 md:my-0 lg:my-0 inline-block font-bold rounded bg-primary px-8 pb-2 pt-2 text-xs   leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </Modal> */}


                            {/* <div>

                                <img onClick={() => setShowHyperlinkModal(true)} className="h-4 w-4 cursor-pointer" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEzLjk2Ny45NUEzLjIyNiAzLjIyNiAwIDAgMCAxMS42Ny4wMDJjLS44NyAwLTEuNjg2LjMzNy0yLjI5Ny45NDhMNy4xMDUgMy4yMThBMy4yNDcgMy4yNDcgMCAwIDAgNi4yNCA2LjI0YTMuMjI1IDMuMjI1IDAgMCAwLTMuMDIyLjg2NUwuOTUgOS4zNzNhMy4yNTMgMy4yNTMgMCAwIDAgMCA0LjU5NCAzLjIyNiAzLjIyNiAwIDAgMCAyLjI5Ny45NDhjLjg3IDAgMS42ODYtLjMzNiAyLjI5OC0uOTQ4TDcuODEyIDExLjdhMy4yNDcgMy4yNDcgMCAwIDAgLjg2NS0zLjAyMyAzLjIyNSAzLjIyNSAwIDAgMCAzLjAyMi0uODY1bDIuMjY4LTIuMjY3YTMuMjUyIDMuMjUyIDAgMCAwIDAtNC41OTV6TTcuMTA1IDEwLjk5M0w0LjgzNyAxMy4yNmEyLjIzMyAyLjIzMyAwIDAgMS0xLjU5LjY1NSAyLjIzMyAyLjIzMyAwIDAgMS0xLjU5LS42NTUgMi4yNTIgMi4yNTIgMCAwIDEgMC0zLjE4bDIuMjY4LTIuMjY4YTIuMjMyIDIuMjMyIDAgMCAxIDEuNTktLjY1NWMuNDMgMCAuODQxLjEyIDEuMTk1LjM0M0w0Ljc3MiA5LjQzOGEuNS41IDAgMSAwIC43MDcuNzA3bDEuOTM5LTEuOTM4Yy41NDUuODY4LjQ0MiAyLjAzLS4zMTMgMi43ODV6bTYuMTU1LTYuMTU1bC0yLjI2OCAyLjI2N2EyLjIzMyAyLjIzMyAwIDAgMS0xLjU5LjY1NWMtLjQzMSAwLS44NDEtLjEyLTEuMTk1LS4zNDNsMS45MzgtMS45MzhhLjUuNSAwIDEgMC0uNzA3LS43MDdMNy40OTkgNi43MWEyLjI1MiAyLjI1MiAwIDAgMSAuMzEzLTIuNzg1bDIuMjY3LTIuMjY4YTIuMjMzIDIuMjMzIDAgMCAxIDEuNTktLjY1NSAyLjIzMyAyLjIzMyAwIDAgMSAyLjI0NiAyLjI0NWMwIC42MDMtLjIzMiAxLjE2OC0uNjU1IDEuNTl6IiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" alt="" />

                            </div> */}

                            {/* <div className='relative pb-6'>
                                <textarea rows="10" cols="30" className='border border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Start writing your content...' content={content} name='content' id='content' onChange={handleTextEditorChange}></textarea>
                            </div> */}






                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SnippetManagement