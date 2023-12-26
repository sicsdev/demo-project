import { ArrowDownCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'
import TextField from '../Common/Input/TextField';
import { Tooltip } from 'react-tooltip'

const TextEditor = dynamic(() => import('../URL/Richtext'), { ssr: false })

const SnippetManagement = ({ setCreateOptions, basicFormData, setBasicFormData, handleSubmit, loading, hideComponent, externalTitle, getQuestionsData,
    setCreateModal,
    setLoading,
    setCreatePdfModal, creationMode, currentOpenedProduct, handleDeleteFaq }) => {

    const [newUUI, setNewUUI] = useState('')
    const [mode, setMode] = useState('normal')
    // Local states
    const [content, setContent] = useState(basicFormData?.content ?? '')
    const [tipContent, setTipContent] = useState(true);
    const [showError, setShowError] = useState(false)
    const [pusherStreaming, setPusherStreaming] = useState(false)
    const [externalContentForTextEditor, setExternalContentForTextEditor] = useState('')

    // Modals for text editor.
    const [showHyperlinkModal, setShowHyperlinkModal] = useState(false)



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


        if (currentOpenedProduct?.id) {
            setBasicFormData({
                ...currentOpenedProduct,
                title: currentOpenedProduct.question,
                content: currentOpenedProduct.description,
                snippet_active: currentOpenedProduct.active,
                product_price: currentOpenedProduct.price,
                product_url: currentOpenedProduct.url
            })

            setExternalContentForTextEditor(currentOpenedProduct.description)
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
    console.log("basicFormData1", basicFormData)

    useEffect(() => {
        console.log("basicFormData2", basicFormData)
        const textarea = document.querySelector(".resizable-textarea");
        textarea?.setAttribute("rows", "1"); // Set the 'rows' attribute
        const rows = Math.min(
            Math.ceil(textarea?.scrollHeight / 20), // 20 is the approximate line height
            20 // Limit to a maximum of 6 rows
        );

        textarea?.setAttribute("rows", (rows - 1)?.toString()); // Set the 'rows' attribute with the new value
    }, [basicFormData.title]);

    return (
        <>
            <div onClick={() => hideComponent()} className='rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'></div >
            <div className='mt-[63px] sm:mt-0 md:mt-0 lg:mt-0  w-full sm:w-auto z-50 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                    <div className='flex gap-2 justify-end items-center py-4 border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                        <div className="flex flex-1">
                            <h2 className="text-black-color text-sm !font-semibold">Add {creationMode === "snippet" ? "Snippet" : "Product"}</h2>
                        </div>
                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='flex gap-2'>

                            {basicFormData?.id && <button onClick={handleDeleteFaq} className='flex items-center justify-center gap-2 focus:outline-none font-bold bg-red rounded-md text-xs py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none'>Delete</button>}

                            <button
                                onClick={() => handleSubmit({ type: creationMode === 'snippet' ? 'SNIPPET' : "PRODUCT" })}
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
                                            <input type="checkbox" name="snippet_active" onChange={handleToggleChange} checked={basicFormData?.snippet_active === true} />
                                            <span className="slider round h-[21px] w-[40px]"></span>
                                        </label>
                                    </div>
                                    <p className={`inline-block whitespace-nowrap rounded ${basicFormData?.snippet_active === true ? `bg-[#d8efdc] text-[#107235]` : 'text-black bg-[#ececf1]'} px-4 py-2 align-baseline text-xs font-medium  leading-none`}>
                                        {basicFormData?.snippet_active === true ? `Active` : `Disabled`}
                                    </p>
                                    <InformationCircleIcon
                                        data-tooltip-id="active_information"
                                        data-tooltip-content="Activating or deactivating this product will make it sensitive to being sent via chat if the user asks about it."
                                        className='w-4 h-4'>
                                    </InformationCircleIcon>

                                    <Tooltip id='active_information' place="top" type="dark" effect="solid" />
                                </div>
                            </div>


                            <div className='flex gap-5 w-100'>
                                <div className='w-1/2 mt-2'>
                                    {/* <TextField
                                        onChange={handleInputChange}
                                        value={basicFormData.title}
                                        className="py-3 mt-1 w-full"
                                        placeholder='Enter a Title'
                                        id='title'
                                        name='title'
                                        title={"Title"}
                                        type={"text"}
                                        error={''}
                                        tooltipInfo={"The name of the product"}
                                    /> */}

                                    <textarea
                                        onChange={handleInputChange}
                                        name="title"
                                        type="text"
                                        className="resizable-textarea w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                                        placeholder="Enter a Title"
                                        rows={"1"}
                                        error={''}
                                    >
                                        {basicFormData.title}
                                    </textarea>

                                    {creationMode === 'product' && (
                                        <>



                                            <div className='mt-5'>
                                                <TextField
                                                    onChange={handleInputChange}
                                                    value={basicFormData.product_url}
                                                    className="w-full"
                                                    placeholder='Url'
                                                    id='product_url'
                                                    name='product_url'
                                                    title={"Link to product"}
                                                    type={"text"}
                                                    error={''}
                                                    tooltipInfo={"Link of the product where more details are given about it or allow its purchase."}
                                                />
                                            </div>




                                            <div className='mt-5 flex items-center'>
                                                <label className={`new_input_label block text-sm text-heading font-medium`}>
                                                    Price
                                                </label>
                                                {/* <InformationCircleIcon
                                                    data-tooltip-id="price_information"
                                                    data-tooltip-content="Unit price of your product."
                                                    className='w-4 h-4 mx-2'>
                                                </InformationCircleIcon>

                                                <Tooltip id='price_information' place="top" type="dark" effect="solid" /> */}
                                            </div>
                                            <div className="relative flex items-center mt-1">
                                                <small className="z-50 m-auto opacity-80 absolute inset-y-0 left-0 flex items-center pointer-events-none mx-2">
                                                    $
                                                </small>
                                                <input
                                                    style={{ paddingLeft: '25px' }}
                                                    onChange={handleInputChange}
                                                    value={basicFormData.product_price}
                                                    className="w-1/2 new_input block border-[0.2px] bg-white  rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color focus:bg-white border-danger invalid:border-danger invalid:text-danger focus:invalid:border-danger focus:invalid:ring-danger focus:ring-danger z-10"
                                                    placeholder='Price'
                                                    id='product_price'
                                                    name='product_price'
                                                    title={"Price"}
                                                    type={"number"}
                                                >
                                                </input>
                                            </div>

                                        </>
                                    )}

                                </div>

                                {creationMode === 'product' && (

                                    <div className='lg:mx-5 mt-2 m-auto'>
                                        <div className='flex items-center'>
                                            <label className={`new_input_label block text-sm text-heading font-medium`}>
                                                Image
                                            </label>
                                            <InformationCircleIcon
                                                data-tooltip-id="image_information"
                                                data-tooltip-content="Upload a image of your product."
                                                className='w-4 h-4 mx-2'>
                                            </InformationCircleIcon>
                                            <Tooltip id='image_information' place="top" type="dark" effect="solid" />
                                        </div>

                                        {basicFormData.image || basicFormData.product_file ?

                                            <div className='flex justify-center my-4 m-auto'>
                                                <div>
                                                    <img className='rounded-md' src={basicFormData.image || basicFormData.product_file} width='200px'></img>
                                                    <small className='flex justify-end'>
                                                        <button className='rounded-md opacity-70' onClick={() => setBasicFormData({ ...basicFormData, image: null, product_file: null })}>Remove</button>
                                                    </small>
                                                </div>
                                            </div>
                                            :
                                            <div className='flex items-center m-auto my-4'>
                                                <div className='border rounded-md flex items-center cursor-pointer'
                                                    style={{ padding: '35px', paddingTop: '50px', paddingBottom: '50px', borderStyle: 'dashed' }}
                                                    onClick={() => document.getElementById('file-image-input-tempo-id').click()}>
                                                    <input id="file-image-input-tempo-id" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                                                    <div className='pt-0 mt-0 text-grey flex items-center justify-center gap-2 text-xs opacity-70'>
                                                        <ArrowDownCircleIcon className='w-4 h-4'></ArrowDownCircleIcon>
                                                        Upload
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                    </div>)
                                }



                            </div>






                            <div>
                                <div className='mt-3 flex items-center mb-1'>
                                    <label className={`new_input_label block text-sm text-heading font-medium`}>
                                        Description
                                    </label>
                                    <InformationCircleIcon
                                        data-tooltip-id="description_information"
                                        data-tooltip-content="Make a brief and clear description of the product, based on it the bot will determine if it is what the user is looking for."
                                        className='w-4 h-4 mx-2'>
                                    </InformationCircleIcon>

                                    <Tooltip id='description_information' place="top" type="dark" effect="solid" />
                                </div>

                                <TextEditor handleTextEditorChange={handleTextEditorChange} debugMode={debugMode} externalContent={externalContentForTextEditor}></TextEditor>
                            </div>


                            {showError && <div className='flex justify-center w-100'>
                                <small className='text-red'>Please fill content and title to save.</small>
                            </div>}

                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default SnippetManagement