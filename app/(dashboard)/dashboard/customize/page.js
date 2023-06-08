'use client'
import React, { useEffect, useState } from 'react'
import { QrCodeIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter } from 'next/navigation';
import './widgetStyle.css'
import Button from '@/app/components/Common/Button/Button';

const Page = () => {
    const [botDetails, setBotDetails] = useState({ id: 'null', name: '' });
    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        const bot_id = searchParams.get("id")
        const bot_name = searchParams.get("name")
        bot_id && setBotDetails({ ...botDetails, id: bot_id })
        bot_name && setPreferences({ ...preferences, chat_title: bot_name })

        if (!bot_id) { router.push('/dashboard') }
    }, []);


    const [preferences, setPreferences] = useState({
        primary_color: "#0057ff",
        secondary_color: "#e0e0e0",
        widget_location: "bottom-right",
        automation_tolerance: 0,
        category: "all",
        message_after_hours: "We are currently offline. Please leave a message and we will get back to you as soon as possible.",
        message_business_hours: "We are currently online. Please leave a message and we will get back to you as soon as possible.",
        chat_title: botDetails.name,
        description: "Chat with us",
        language: "en",
        refund_tolerance: 0,
        thumbnail: 'https://media-server-dev.usetempo.ai/bots/logos/334-3341544_black-square-logo-square-point-of-sale-logo.jpeg',
    });

    const handlePrimaryColorChange = (event) => {
        const color = event.target.value;
        setPreferences({ ...preferences, primary_color: color });
        console.log(color)
    };

    const handleSecondaryColorChange = (event) => {
        const color = event.target.value;
        setPreferences({ ...preferences, secondary_color: color });
        console.log(color)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPreferences({ ...preferences, [name]: value });
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPreferences({ ...preferences, thumbnail: file });
        console.log(file)
    };


    return (
        <div>
            <div className="">
                <small className="flex justify-start gap-2 items-center text-heading border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">
                    <b>ID: </b>{botDetails.id}</small>
                <div className="flex flex-col lg:flex-row lg:justify-around mt-3">
                    <div className="">
                        <div className='mb-4'>
                            <a className="flex justify-start gap-2 items-center px-4 pt-4 text-heading font-bold border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="customize">
                                <QrCodeIcon className="h-6 w-6 text-gray-500" /> Customize Widget "{preferences.chat_title || ''}"
                            </a>
                        </div>

                        <hr className='opacity-10'></hr>
                        <div className='mt-5' style={{ minWidth: '420px' }} >

                            <div className="flex items-center w-full mt-2 gap-2">
                                <div className="flex justify-end w-1/2 items-center">
                                    <span className="text-gray-700">Chat title</span>
                                </div>
                                <div className="flex justify-start w-1/2">
                                    <input onChange={handleInputChange} maxLength={20} name='chat_title' value={preferences.chat_title} type="text" className="block border-gray-300 rounded-md p-2 items-center" placeholder="Enter chat title" />
                                </div>
                            </div>


                            <div className="flex items-center w-full gap-2">
                                <div className="flex justify-end w-1/2">
                                    <span className="text-gray-700">Primary Color</span>
                                </div>
                                <div className="flex justify-start w-1/2">
                                    <input
                                        type="color"
                                        value={preferences.primary_color}
                                        className="mt-3 my-2 border px-1 cursor-pointer"
                                        placeholder="Enter primary color"
                                        onChange={handlePrimaryColorChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center w-full gap-2">
                                <div className="flex justify-end w-1/2">
                                    <span className="text-gray-700">Secondary Color</span>
                                </div>
                                <div className="flex justify-start w-1/2">
                                    <input
                                        type="color"
                                        value={preferences.secondary_color}
                                        className="mt-3 my-2 border cursor-pointer"
                                        placeholder="Enter secondary color"
                                        onChange={handleSecondaryColorChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center w-full mt-1 gap-2">
                                <div className="flex justify-end w-1/2 items-center">
                                    <span className="text-gray-700">Widget Location</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">
                                    <select className="block border-gray-300 rounded-md p-2 items-center cursor-pointer">
                                        <option value="bottom-right">Bottom Right</option>
                                        <option value="bottom-left">Bottom Left</option>
                                        <option value="top-left">Top Left</option>
                                        <option value="top-right">Top Right</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center w-full mt-2 gap-2">
                                <div className="flex justify-end w-1/2 items-center">
                                    <span className="text-gray-700">Language</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">
                                    <select className="block border-gray-300 rounded-md p-2 items-center cursor-pointer">
                                        <option value="bottom-right">English</option>
                                        <option value="bottom-left">Spanish</option>
                                    </select>
                                </div>
                            </div>


                            <div className="flex items-center w-full mt-2 gap-2">
                                <div className="flex justify-end w-1/2 items-center">
                                    <span className="text-gray-700">Thumbnail</span>
                                </div>
                                <div className="relative inline-flex justify-start w-1/2 items-center">
                                    <label className="cursor-pointer bg-white rounded">
                                        <span className="bg-gray-200 py-2 p-2 rounded-md shadow-sm flex items-center">
                                            {preferences.thumbnail.name ?
                                                (preferences.thumbnail.name)
                                                :
                                                (<>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="w-4 h-4 mr-2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                    Select file
                                                </>)
                                            }
                                        </span>
                                        <input type="file"
                                            accept="image/jpeg, image/jpg, image/png"
                                            className="hidden"
                                            placeholder="Select thumbnail image"
                                            onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            {/* <div className="flex items-center w-full mt-2">
                            <div className="flex justify-end w-1/2 items-center">
                                <span className="text-gray-700">Category</span>
                            </div>
                            <div className="flex justify-start w-1/2 mx-2 items-center">
                                <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter category" />
                            </div>
                        </div> */}
                            {/* 
                        
                        <div className="flex items-center w-full mt-2">
                            <div className="flex justify-end w-1/2 items-center">
                                <span className="text-gray-700">Automation Tolerance</span>
                            </div>
                            <div className="flex justify-start w-1/2 mx-2 items-center">
                                <input onChange={handleInputChange} name='automation_tolerance' type="number" className="w-12 h-8 mt-3 text-center border-gray-300 rounded-md" value={preferences.automation_tolerance} placeholder="" min="0" max="10" />
                            </div>
                        </div>
                        
                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Description</span>
                            <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter description" />
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Refund Tolerance</span>
                            <input type="number" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter refund tolerance" />
                        </label>

                        <div className="flex items-center w-full mt-2">
                            <div className="flex justify-end w-1/2 items-center">
                                <span className="text-gray-700">Chat Message After Hours</span>
                            </div>
                            <div className="flex justify-start w-1/2 mx-2 items-center">
                                <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter chat message after hours" />
                            </div>
                        </div>

                        <div className="flex items-center w-full mt-2">
                            <div className="flex justify-end w-1/2 items-center">
                                <span className="text-gray-700">Chat Message Business Hours</span>
                            </div>
                            <div className="flex justify-start w-1/2 mx-2 items-center">
                                <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter chat message business hours" />
                            </div>
                        </div>

                        <label className="flex justify-between items-center">
                            <span className="text-gray-700">Widget Offset Horizontal</span>
                            <input type="number" className="mt-3 block border-gray-300 rounded-md" placeholder="Enter widget offset horizontal" />
                        </label>

                        <label className="flex justify-between items-center">
                            <span className="text-gray-700">Widget Offset Vertical</span>
                            <input type="number" className="mt-3 block border-gray-300 rounded-md" placeholder="Enter widget offset vertical" />
                        </label> */}


                        </div>

                        <div className='flex justify-center mt-5 pt-5'>
                            <Button type={"button"}
                                className="inline-block justify-end font-bold rounded bg-voilet px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                            >
                                Save
                            </Button>
                        </div>
                    </div>


                    <div id='chatbot_widget'>
                        <div className='mb-4'>
                            <a className="flex justify-start gap-2 items-center p-4 text-heading font-bold border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="preview">
                                <EyeIcon className="h-6 w-6 text-gray-500" /> Preview
                            </a>
                            <hr className='opacity-10'></hr>

                        </div>

                        <div className="containerChatBot_entire justify-center flex">
                            <div className="widget_container active">
                                <div className="header_ChatBotWidget">
                                    <div className="left_arrow_container" onclick="handleShowChat()"><img width="20px" src="https://widget-dev.usetempo.ai/v1/assets/img/left-arrow.png" /></div>
                                    <div className="profile_photo_container"><img width="45px" src={preferences.thumbnail} /></div>
                                    <div>
                                        <div>
                                            <b>{preferences.chat_title}</b>
                                        </div>
                                        <div className="subtitle_div">
                                            <span className="subtitle_ChatBotWidget">
                                                <span className="ai_icon">AI</span> Answer instantly
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr className="custom_hr" />
                                <div className="chat_content">
                                    <div className="first_answer">
                                        <img className='profile-photo_ChatBot' src={preferences.thumbnail} alt='Profile Photo' width='35px' />
                                        <div className="answer_text" style={{ backgroundColor: preferences.secondary_color }}>How can I help you today?</div>
                                    </div>
                                    <div className="question" style={{ backgroundColor: preferences.primary_color }}>What is the price of the product?</div>
                                </div>



                                <hr className="custom_hr" />
                                <div className="reply_container">
                                    <textarea className="input_question" type="text" maxlength="1000" placeholder="Write a reply..."></textarea>
                                    <div className="send_button" onclick="handleSubmitQuestion()" id="sendButton">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" fill="currentColor" class="">
                                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Page