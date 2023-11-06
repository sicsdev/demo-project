import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'
import TextField from '../Common/Input/TextField';
import FileField from '../Common/Input/FileField';
const TextEditor = dynamic(() => import('../URL/Richtext'), { ssr: false })

const EditProduct = ({ basicFormData, setBasicFormData, handleSubmit, loading,
    setCreateModal, creationMode }) => {
    const textareaRef = useRef(null);
    const [newUUI, setNewUUI] = useState('')
    const [mode, setMode] = useState('normal')
    // Local states
    const [content, setContent] = useState(basicFormData?.content ?? '')
    const [tipContent, setTipContent] = useState(true);
    const [showError, setShowError] = useState(false)
    const [pusherStreaming, setPusherStreaming] = useState(false)




    const searchParams = useSearchParams()

    const [debugMode, setDebugMode] = useState(false)
    const [base64, setBase64] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result
                setBase64(base64String)
                setBasicFormData({ ...basicFormData, product_file: base64String, product_file_title: file.name })
            };

            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {

        let newUUID = uuidv4()
        setNewUUI(newUUID)
        const handleEscapeKeyPress = (event) => {
            if (event.key === 'Escape') {
                setCreateModal(false)
                setBasicFormData({})
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
    console.log("basic", basicFormData)
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
    useEffect(() => {
        const textarea = document.querySelector('.resizable-textarea');
        textarea?.setAttribute('rows', '3'); // Set the 'rows' attribute
        const rows = Math.min(
            Math.ceil(textarea?.scrollHeight / 20), // 20 is the approximate line height
            8// Limit to a maximum of 6 rows
        );

        textarea?.setAttribute('rows', (rows - 1)?.toString()); // Set the 'rows' attribute with the new value


    }, [basicFormData?.content]);
    return (
        <>
            <div onClick={() => {
                setCreateModal(false)
                setBasicFormData({})
            }} className='rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'></div >
            <div className='mt-[63px] sm:mt-0 md:mt-0 lg:mt-0  w-full sm:w-auto z-50 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                    <div className='flex gap-2 justify-end items-center py-4 border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                        <div className="flex flex-1">
                            <h2 className="text-black-color text-sm !font-semibold">Edit Product</h2>
                        </div>
                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button
                                onClick={() => handleSubmit("PRODUCT")}
                                type="button"
                                className="flex items-center justify-center gap-1 focus:ring-4 focus:outline-none font-medium bg-primary rounded-md text-xs py-2 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                disabled={DisablingButton() || loading === true}

                            >
                                {loading ? "Loading..." : "Save and close"}
                            </button>
                        </div>
                        <div className="flex justify-end gap-2">
                            <div className="cursor-pointer" onClick={(e) => console.log("test")}>
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
                            <>
                                <TextField
                                    onChange={handleInputChange}
                                    value={basicFormData.price}
                                    className="py-3 mt-1 w-full"
                                    placeholder='Price'
                                    id='product_price'
                                    name='product_price'
                                    title={""}
                                    type={"number"}
                                    error={''}
                                />
                                <TextField
                                    onChange={handleInputChange}
                                    value={basicFormData.url}
                                    className="py-3 mt-1 w-full"
                                    placeholder='Url'
                                    id='product_url'
                                    name='product_url'
                                    title={""}
                                    type={"text"}
                                    error={''}
                                />
                                <FileField
                                    onChange={handleFileChange}
                                    value={basicFormData.product_file}
                                    className="py-3 mt-1 w-full"
                                    placeholder='Image'
                                    id='product_file'
                                    name='product_file'
                                    title={""}
                                    type={"file"}
                                    error={''}
                                />
                            </>


                            {/* <TextEditor handleTextEditorChange={handleTextEditorChange} debugMode={debugMode}></TextEditor> */}

                            <textarea
                                onChange={handleInputChange}
                                name="content"
                                type="text"
                                id='content'
                                className="resizable-textarea w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                                placeholder="What is this workflow for?"
                                rows={'3'}
                                value={basicFormData?.content}
                                ref={textareaRef}
                            >
                                {/* {description} */}
                            </textarea>

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

export default EditProduct