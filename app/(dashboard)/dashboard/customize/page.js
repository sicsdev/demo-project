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



    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPreferences({ ...preferences, thumbnail: file });

    };


    return (
        <div>
            <div className="border-b border-border dark:border-gray-700">

            </div>

            <div className="mt-4">

                <div className="flex space-x-20">
                    <div className="">

                        <div className='mb-4'>
                            <a className="flex justify-start gap-2 items-center px-4 pt-4 text-heading font-bold border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="customize">
                                <QrCodeIcon className="h-6 w-6 text-gray-500" /> Customize Widget "{preferences.chat_title || ''}"
                            </a>
                            <small className="flex justify-start gap-2 items-center px-4 text-heading border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group">ID: {botDetails.id}</small>
                        </div>

                        <label className="flex justify-between items-center">
                            <span className="text-gray-700">Primary Color</span>
                            <input type="color" value={preferences.primary_color} className="mt-3 rounded-lg " placeholder="Enter primary color" onChange={handlePrimaryColorChange} />
                        </label>

                        <label className="flex justify-between items-center">
                            <span className="text-gray-700">Secondary Color</span>
                            <input type="color" value={preferences.secondary_color} c className="mt-3 rounded-lg " placeholder="Enter secondary color" onChange={handleSecondaryColorChange} />
                        </label>

                        <label className="flex justify-between items-center">
                            <span className="text-gray-700">Widget Location</span>
                            <select className="mt-3 block border-gray-300 rounded-md px-2">
                                <option value="bottom-right">Bottom Right</option>
                                <option value="bottom-left">Bottom Left</option>
                                <option value="top-left">Top Left</option>
                                <option value="top-right">Top Right</option>
                            </select>
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Language</span>
                            <select className="mt-3 block border-gray-300 rounded-md  px-2">
                                <option value="bottom-right">English</option>
                                <option value="bottom-left">Spanish</option>
                            </select>
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Automation Tolerance</span>
                            <input onChange={handleInputChange} name='automation_tolerance' type="number" className="w-12 h-8 mt-3 text-center border-gray-300 rounded-md" value={preferences.automation_tolerance} placeholder="" min="0" max="10" />
                        </label>
                        <label className="flex justify-between items-center space-x-20 mt-2">
                            <span className="text-gray-700">Thumbnail</span>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/jpeg, image/jpg, image/png"
                                    className="opacity-0 absolute inset-0 w-full h-full z-50 cursor-pointer"
                                    placeholder="Select thumbnail image"
                                    onChange={handleFileChange}
                                />
                                <div className="bg-white border border-gray-300 rounded-md px-2 flex items-center justify-between">
                                    <span className="truncate">
                                        {/* {preferences.thumbnail ? preferences.thumbnail.name : 'No file'} */}
                                        Select a image
                                    </span>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                                        Browse
                                    </button>
                                </div>
                            </div>
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Category</span>
                            <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter category" />
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Chat Message After Hours</span>
                            <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter chat message after hours" />
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Chat Message Business Hours</span>
                            <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter chat message business hours" />
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Chat Title</span>
                            <input onChange={handleInputChange} name='chat_title' value={preferences.chat_title} type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter chat title" />
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Description</span>
                            <input type="text" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter description" />
                        </label>

                        <label className="flex justify-between items-center space-x-20">
                            <span className="text-gray-700">Refund Tolerance</span>
                            <input type="number" className="mt-3 block border-gray-300 rounded-md px-2" placeholder="Enter refund tolerance" />
                        </label>


                        {/* <label className="flex justify-between items-center">
                                <span className="text-gray-700">Widget Offset Horizontal</span>
                                <input type="number" className="mt-3 block border-gray-300 rounded-md" placeholder="Enter widget offset horizontal"/>
                            </label>

                            <label className="flex justify-between items-center">
                                <span className="text-gray-700">Widget Offset Vertical</span>
                                <input type="number" className="mt-3 block border-gray-300 rounded-md" placeholder="Enter widget offset vertical"/>
                            </label> */}




                        <div className='mt-5 float-right'>
                            <Button type={"button"}
                                className="inline-block justify-end font-bold rounded bg-voilet px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                            >
                                Save
                            </Button>
                        </div>
                    </div>


                    <div id='chatbot_widget'>

                        <a className="flex justify-start gap-2 items-center p-4 text-heading font-bold border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="preview">
                            <EyeIcon className="h-6 w-6 text-gray-500" /> Preview
                        </a>

                        <div className="containerChatBot_entire">
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