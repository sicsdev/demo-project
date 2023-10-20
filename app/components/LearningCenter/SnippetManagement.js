import { InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Modal from '../Common/Modal/Modal';
import { Input } from '../Common/Input/Input';
import Button from '../Common/Button/Button';
import { useSearchParams } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'
import { expandRecommendationRecord } from '@/app/API/pages/LearningCenter';
import TextField from '../Common/Input/TextField';
const TextEditor = dynamic(() => import('../URL/Richtext'), { ssr: false })

const SnippetManagement = ({ setCreateOptions, basicFormData, setBasicFormData, handleSubmit, loading, hideComponent, externalTitle, getQuestionsData,
    setCreateModal,
    setLoading,
    setCreatePdfModal }) => {

    const [newUUI, setNewUUI] = useState('')
    const [mode, setMode] = useState('normal')
    // Local states
    const [content, setContent] = useState(basicFormData?.content ?? '')
    const [tipContent, setTipContent] = useState(true);
    const [showError, setShowError] = useState(false)
    const [pusherStreaming, setPusherStreaming] = useState(false)

    // Modals for text editor.
    const [showHyperlinkModal, setShowHyperlinkModal] = useState(false)



    const searchParams = useSearchParams()

    const [debugMode, setDebugMode] = useState(false)

    useEffect(() => {

        let newUUID = uuidv4()
        setNewUUI(newUUID)
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                hideComponent();
            }
        };
        let wyg = searchParams.get('debugTextEditor')
        if (wyg) setDebugMode(true)


        if (externalTitle) {
            setBasicFormData((prev) => {
                return {
                    ...prev,
                    title: externalTitle,
                }
            })
        }

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
        if (formatedContent) {
            setMode("expand")
        } else {
            setMode("normal")
        }
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

    const handleMouseEnter = () => {
        if (DisablingButton()) {
            setShowError(true);
        }
    };

    const handleMouseLeave = () => {
        setShowError(false);
    };

    const getExpandedAnswer = async () => {
        setPusherStreaming(true)
        await expandRecommendationRecord({
            question: basicFormData?.title ?? '',
            answer: basicFormData?.content,
            streaming: true,
            id: `recommendation-${newUUI}`
        })
        setPusherStreaming(false)
        getQuestionsData()
        setCreateModal(false)
        setLoading(false)
        setCreateOptions(null)
        setCreatePdfModal(false)
    }

    return (
        <>
            <div onClick={() => hideComponent()} className='rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'></div >
            <div className='mt-[63px] sm:mt-0 md:mt-0 lg:mt-0  w-full sm:w-auto z-50 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                    <div className='flex gap-2 justify-end items-center py-4 border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                        <div className="flex flex-1">
                            <h2 className="text-black-color text-sm !font-semibold">Add Snippet</h2>
                        </div>
                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button
                                onClick={() => handleSubmit({ type: 'SNIPPET' })}
                                type="button"
                                className="flex items-center justify-center gap-1 focus:ring-4 focus:outline-none font-medium bg-primary rounded-md text-xs py-2 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                disabled={DisablingButton() || loading === true}

                            >
                                {loading ? "Loading..." : "Save and close"}
                            </button>
                        </div>
                        <div className="flex justify-end gap-2">
                            <div className="cursor-pointer" onClick={(e) => setCreateOptions(null)}>
                                <XMarkIcon className="h-8 w-8 rounded-lg text-black bg-[#f1f1f1] hover:bg-[#eef0fc] hover:text-[#334bfa]  p-2" />
                            </div>
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
                            <TextField
                                onChange={handleInputChange}
                                value={basicFormData.title}
                                className="py-3 mt-1 w-full"
                                placeholder='Enter a Title'
                                id='title'
                                name='title'
                                title={""}
                                type={"text"}
                                error={''}
                            />
                         


                            <TextEditor handleTextEditorChange={handleTextEditorChange} debugMode={debugMode}></TextEditor>
                            <div className='flex justify-end'>
                                {basicFormData && basicFormData?.content && basicFormData?.title && (
                                    <button
                                        // onClick={(e) => SubmitTheFormExpand()}
                                        onClick={getExpandedAnswer}
                                        type="button"
                                        className="my-6 flex items-center justify-center text-xs gap-1 text-primary font-bold rounded-md py-2 px-4 w-auto focus:ring-yellow-300 text-whitedisabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={pusherStreaming}>
                                        {pusherStreaming ? (
                                            <>
                                                <span className="text-black">Generating</span>
                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    width="20px" height="20px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" space="preserve">
                                                    <path opacity="0.4" fill="#00000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                                                    <path fill="#00000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
C22.32,8.481,24.301,9.057,26.013,10.047z">
                                                        <animateTransform attributeType="xml"
                                                            attributeName="transform"
                                                            type="rotate"
                                                            from="0 20 20"
                                                            to="360 20 20"
                                                            dur="0.5s"
                                                            repeatCount="indefinite" />
                                                    </path>
                                                </svg>
                                            </>
                                        ) : "Expand Answer"}
                                    </button>

                                )}
                            </div>
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




                            {showError && <div className='flex justify-center w-100'>
                                <small className='text-red'>Please fill content and title to save.</small>
                            </div>}

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SnippetManagement