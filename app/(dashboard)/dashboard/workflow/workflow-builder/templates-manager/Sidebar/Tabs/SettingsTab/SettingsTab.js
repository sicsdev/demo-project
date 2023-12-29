import React, { useEffect, useRef, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { v4 as uuidv4 } from 'uuid';
import Pusher from 'pusher-js';
import { expandDescriptionByStreaming, partialUpdateWorkflowTemplate } from '@/app/API/pages/Workflow'
import TextField from '@/app/components/Common/Input/TextField'
import Button from '@/app/components/Common/Button/Button'
import { useDispatch } from 'react-redux'
import { fetchIntegrations } from '@/app/components/store/slices/integrationSlice'
import { successMessage } from '@/app/components/Messages/Messages'

// Local helpers
const pusher = new Pusher("1fc282a0eb5e42789c23", {
    cluster: "mt1",
});

const UpdateWorkflowBasic = ({ templateData, getTemplateInformation }) => {

    const textareaRef = useRef(null);
    const dispatch = useDispatch()

    // Local states
    const [description, setDescription] = useState(templateData?.description?.join('\n') ?? '')
    const [newUUI, setNewUUI] = useState('')
    const [pusherStreaming, setPusherStreaming] = useState(false)
    const [formValues, setFormValues] = useState({ name: '', description: '' })

    // Loaders
    const [loadingStreaming, setLoadingStreaming] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setFormValues(templateData)
    }, [])

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
    }

    const handleInputValue = (e) => {
        setFormValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSelectChannelData = (selectedList, selectedItem) => {
        setFormValues((prev) => {
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
            question: formValues.name,
            answer: description,
            streaming: true,
            id: `recommendation-${newUUI}`,
            workflow: "d88685d3-3dfa-4a8a-b00a-aa2d5ffbd557"
        })

    }


    const handlePatchWorkflowTemplate = async () => {
        setLoading(true)
        let descriptionArray = description.split('\n');

        let payload = {
            name: formValues.name,
            description: descriptionArray,
            bots: formValues.bots,
            channels: ["chat"],
        }
        let patchTemplate = await partialUpdateWorkflowTemplate(templateData.id, payload)
        console.log(patchTemplate.status)
        if (patchTemplate.status == 200) { successMessage('Successfully updated!') }
        dispatch(fetchIntegrations())
        setLoading(false)

    }

    const onSelectData = (selectedList, selectedItem) => {
        setFormValues((prev) => {
            return {
                ...prev,
                bots: selectedList
            }
        })
    }

    return (
        <div className='mb-8'>
            <div>

                <div className=''>
                    <TextField
                        name='name'
                        onChange={handleInputValue}
                        value={formValues?.name}
                        className="py-3 w-full mt-1"
                        title={<div className='flex items-center gap-2'><span>Name</span>  </div>}
                        placeholder={"Something short and descriptive"}
                        type={'text'}
                        id={"name"}
                    />
                </div>

                <div className='mt-5'>
                    <label className={`my-2 new_input_label block text-sm text-heading font-medium`}>
                        <div className='flex items-center gap-2'>
                            <span>Description</span>
                            <a data-tooltip-id="Description" data-tooltip-content="Write phrases that could trigger this workflow.">
                                <InformationCircleIcon className='w-4 h-4 mx-2'></InformationCircleIcon>
                            </a>
                            <Tooltip id='Description' place="top" type="dark" effect="solid" />
                        </div>

                        <small style={{ fontSize: '10px' }}>
                            <span>*Separate them with a line break.</span>
                        </small>

                    </label>

                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        type="text"
                        id='description'
                        className="resizable-textarea w-full block px-3 new_input bg-white focus:bg-white focus:text-[12px] border rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 border-input_color"
                        placeholder="What is this workflow for?"
                        rows={'3'}
                        value={description}
                        ref={textareaRef}
                    >
                    </textarea>
                </div>


                {description?.length > 0 && <div className='flex justify-end'>
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
                </div>}
            </div>



            {/* <div className="my-2">
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
                    selectedValues={formValues?.channels ?? []}
                    onSelect={(selectedList, selectedItem) => {
                        onSelectChannelData(selectedList, selectedItem);
                    }}
                    onRemove={(selectedList, selectedItem) => {
                        onSelectChannelData(selectedList, selectedItem);
                    }}
                    placeholder={"Select Channel"}
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
            </div> */}


            <div className="flex mt-3 space-x-4 rounded-b justify-end">
                <Button
                    type="button"
                    className="inline-block rounded bg-primary px-6 py-2 text-xs font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-700 transition duration-150 ease-in-out"
                    onClick={() => { handlePatchWorkflowTemplate() }}
                    disabled={!description || !formValues.name}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>

        </div>
    )
}

export default UpdateWorkflowBasic