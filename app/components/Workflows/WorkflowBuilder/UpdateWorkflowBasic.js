import React, { useEffect, useRef, useState } from 'react'
import TextField from '../../Common/Input/TextField'
import FileField from '../../Common/Input/FileField'
import Image from 'next/image'
import Button from '../../Common/Button/Button'
import SelectOption from '../../Common/Input/SelectOption'
import TextArea from '../../Common/Input/TextArea'
import Multiselect from 'multiselect-react-dropdown'
import { business_company_size_data } from '../../Forms/data/FormData'
import SelectField from '../../Common/Input/SelectField'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import './customStyles.css'
import { v4 as uuidv4 } from 'uuid';
import Pusher from 'pusher-js';
import { expandDescriptionByStreaming } from '@/app/API/pages/Workflow'

// Local helpers
const pusher = new Pusher("1fc282a0eb5e42789c23", {
    cluster: "mt1",
});


const UpdateWorkflowBasic = ({ handleInputValue, workflowFormData, handleFileChange, publishLoader, saveWorkFlowHandler, setShow, botValue, onSelectData, setWorkFlowFormData }) => {

    const textareaRef = useRef(null);

    // Local states
    const [description, setDescription] = useState(workflowFormData?.description.join('\n') ?? '')
    const [newUUI, setNewUUI] = useState('')
    const [pusherStreaming, setPusherStreaming] = useState(false)


    // Loaders
    const [loadingStreaming, setLoadingStreaming] = useState(false)

    useEffect(() => {
        fitTextareaDescriptionHeight();
    }, [description]);

    useEffect(() => {
        const textarea = document.querySelector('.resizable-textarea');
        textarea?.setAttribute('rows', '3'); // Set the 'rows' attribute
        const rows = Math.min(
            Math.ceil(textarea?.scrollHeight / 20), // 20 is the approximate line height
            8// Limit to a maximum of 6 rows
        );

        textarea?.setAttribute('rows', (rows - 1)?.toString()); // Set the 'rows' attribute with the new value


        // Related code to streaming recommended description using GPT.
        let newUUID = uuidv4()
        setNewUUI(newUUID)
        let timeoutId;
        const channel = pusher.subscribe(`recommendation-${newUUID}`);
        channel.bind('messages', data => {
            clearTimeout(timeoutId);
            setPusherStreaming(true)
            setDescription(prev => prev + data.message);
            timeoutId = setTimeout(() => {
                setPusherStreaming(false)
            }, 2000);
        })

    }, [description]);



    // Handlers


    const fitTextareaDescriptionHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const DisablingButton = () => {
        const requiredKeys = ["name"];
        return requiredKeys.some(
            (key) => !workflowFormData[key] || workflowFormData[key].trim() === ""
        );
    };

    const handleInputValue1 = (e) => {
        setDescription(e.target.value)
        let splitConditions = /[.,\n]/;
        setWorkFlowFormData((prev) => {
            return {
                ...prev,
                description: e.target.value.split(splitConditions).map(s => s.trim()).filter(Boolean)
            }
        })
        console.log('e.target.value.split(splitConditions).map(s => s.trim()).filter(Boolean)', e.target.value.split(splitConditions).map(s => s.trim()).filter(Boolean))
    }

    const handleInputValue2 = (e) => {
        setWorkFlowFormData((prev) => {
            return {
                ...prev,
                workflow_types: e.target.value
            }
        })
    }

    const onSelectChannelData = (selectedList, selectedItem) => {
        setWorkFlowFormData((prev) => {
            return {
                ...prev,
                channels: selectedList

            }
        })
    }

    const handleExpandDescription = async () => {
        setDescription('')
        setPusherStreaming(true)

        const response = await expandDescriptionByStreaming({
            question: workflowFormData.name,
            answer: description,
            streaming: true,
            id: `recommendation-${newUUI}`,
            workflow: "d88685d3-3dfa-4a8a-b00a-aa2d5ffbd557"
        })

    }



    return (
        <div className='mb-8'>
            <div>
                <div className=''>
                    <TextField
                        name='name'
                        onChange={handleInputValue}
                        value={workflowFormData.name}
                        className="py-3 w-full mt-1"
                        title={<div className='flex items-center gap-2'><span>Name</span>  </div>}
                        placeholder={"Something short and descriptive"}
                        type={'text'}
                        id={"name"}
                    />
                </div>
                <div className='mt-5'>
                    {/* <TextArea name='description' className={'resizable-textarea'} placeholder={"What is this workflow for?"} id={"description"} onChange={handleInputValue1} title={"Description"} rows={'1'}>{description}</TextArea> */}
                    <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                        <div className='flex items-center gap-2'>
                            <span>Description</span>
                            <a data-tooltip-id="Description" data-tooltip-content="Write phrases that could trigger this workflow.">
                                <InformationCircleIcon className='w-4 h-4 mx-2'></InformationCircleIcon>
                            </a>

                            <Tooltip id='Description' place="top" type="dark" effect="solid" />
                        </div>

                        <small style={{ fontSize: '10px' }}>
                            <span>*Separe them with a line break.</span>
                        </small>

                    </label>

                    <textarea
                        onChange={handleInputValue1}
                        name="description"
                        type="text"
                        id='description'
                        className="resizable-textarea w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                        placeholder="What is this workflow for?"
                        rows={'3'}
                        value={description}
                        ref={textareaRef}
                    >
                        {/* {description} */}
                    </textarea>
                </div>
                <div className='flex justify-end'>
                    <button
                        onClick={handleExpandDescription}
                        type="button"
                        disabled={pusherStreaming}
                        className="flex items-center justify-center text-xs gap-1 text-primary font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 text-whitedisabled:bg-input_color disabled:shadow-none disabled:text-white">
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
                        ) : "Expand description"}
                    </button>
                </div>
            </div>
            <div className="pt-5 mt-3">
                <label className="my-2 block text-sm text-gray-700">
                    <div className="my-2 new_input_label block text-sm text-heading border-b border-gray flex items-center">
                        <span>Bot Selector</span>
                        <a data-tooltip-id="bot-selector" data-tooltip-content="Choose the bots in which this workflow will be active">
                            <InformationCircleIcon className='w-4 h-4 mx-2'></InformationCircleIcon>
                        </a>

                        <Tooltip id='bot-selector' place="top" type="dark" effect="solid" />
                    </div>
                </label>
                <Multiselect
                    className="searchWrapper-live rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    options={botValue}
                    selectedValues={workflowFormData?.bots ?? []}
                    onSelect={(selectedList, selectedItem) => {
                        onSelectData(selectedList, selectedItem);
                    }}
                    onRemove={(selectedList, selectedItem) => {
                        onSelectData(selectedList, selectedItem);
                    }}
                    placeholder={botValue.length === workflowFormData?.bots.length ? '' : "Select Bots"}
                    displayValue="name"
                    closeOnSelect={true}
                    showSearchFilter={false}
                    style={{
                        chips: {
                            maxWidth: 'fit-content',
                            minWidth: '75px'
                        },
                    }}
                />
            </div>
            <div className="my-2">
                <label className="my-2 block text-sm text-gray-700 font-medium">
                    <div className="my-2 new_input_label block text-sm text-heading font-medium border-b border-gray flex items-center">
                        <span>Channels</span>
                        <a data-tooltip-id="Channels-selector" data-tooltip-content="Choose the chanells in which this workflow will be active">
                            <InformationCircleIcon className='w-4 h-4 mx-2'></InformationCircleIcon>
                        </a>

                        <Tooltip id='Channels-selector' place="top" type="dark" effect="solid" />
                    </div>
                </label>
                <Multiselect
                    className="searchWrapper-live rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer pb-0 searchBox:hidden"
                    options={[{ name: "Phone", value: "phone" }, { name: "Email", value: "email" }, { name: "Chat", value: "chat" }]}
                    selectedValues={workflowFormData?.channels ?? []}
                    onSelect={(selectedList, selectedItem) => {
                        onSelectChannelData(selectedList, selectedItem);
                    }}
                    onRemove={(selectedList, selectedItem) => {
                        onSelectChannelData(selectedList, selectedItem);
                    }}
                    placeholder={workflowFormData?.channels.length === 2 ? '' : "Select Channel"}
                    displayValue="name"
                    closeOnSelect={true}
                    style={{
                        chips: {
                            maxWidth: 'fit-content',
                            minWidth: '75px'
                        },
                    }}
                    showSearchFilter={false}
                />
            </div>
            {/* <div className="my-2">
                <SelectField
                    labelClassName="w-full sm:w-1/2"
                    onChange={handleInputValue2}
                    selectdiv="mt-3 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex gap-5"
                    value={workflowFormData?.workflow_types}
                    name="workflow_types"
                    values={["Image", "Text"]}
                    title="Type"
                    id="workflow_types"
                    className="py-3"
                    error=""
                />
            </div> */}
            <div className="flex mt-3 space-x-4 rounded-b justify-end">
                <Button
                    type="button"
                    className="inline-block rounded bg-primary px-6 py-2 text-xs font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-700 transition duration-150 ease-in-out"
                    onClick={() => { saveWorkFlowHandler("EDIT") }}
                    disabled={DisablingButton()}
                >
                    {publishLoader === true ? 'Loading...' : 'Save'}
                </Button>
            </div>

        </div>
    )
}

export default UpdateWorkflowBasic