'use client'
import React, { useEffect, useState } from 'react'
import { QrCodeIcon, EyeIcon, ArrowDownCircleIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter } from 'next/navigation';
import '../../(dashboard)/dashboard/customize/widgetStyle.css'
import Button from '@/app/components/Common/Button/Button';
import { getAllBotData, modifyBot } from '@/app/API/pages/Bot';
import { getBotAllData } from '@/app/API/pages/Bot';
import Swal from 'sweetalert2';
import { email_ticketing_system_data, payments_platform_data } from '@/app/components/Forms/data/FormData';
import LoaderButton from '../Common/Button/Loaderbutton';
import { useSelector } from 'react-redux';

const Customize = ({ form = false, intakeStep, setIntakeStep, setIntakeCompleteStep, basicFormData }) => {
    const [botDetails, setBotDetails] = useState({});
    const [allBots, setAllBots] = useState([]);
    const [loading, setLoading] = useState(false)
    const id = useSelector(state => state.botId.id)
    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        if (form === false) {
            const bot_id = searchParams.get("id")
            const bot_name = searchParams.get("name")
            getAllBots()
            if (bot_id) { getBotInfo(bot_id) }
        } else {
            getBotInfo(id)
        }
    }, []);

    const [preferences, setPreferences] = useState({
        id: '',
        enterprise: {},
        category: "",
        description: "",
        refund_tolerance: 0,
        automation_tolerance: 0,
        primary_text_color: "#ffffff",
        secondary_text_color: "#000000",
        primary_color: "#0057ff",
        secondary_color: "#f5f5f5",
        logo: "",
        thumbnail: "",
        chat_title: basicFormData?.business_name ?? "Tempo AI Chatbot",
        chat_message_business_hours: "How can we help?",
        chat_message_after_hours: "We'll be back tomorrow at 9 am EST",
        widget_location: "bottom_right",
        widget_offset_horizontal: 0,
        widget_offset_vertical: 0,
        language: "en",
        cancellation_tolerance: "0",
        payment_platform: "Other",
        ticketing_platform: "Other",
        logo_file_name: "",
        active: true
    })


    // Primary functions
    const getBotInfo = (id) => {
        getAllBotData([id]).then((res) => {
            debugger
            setBotDetails(res[0].data)
            setPreferences(res[0].data)
        })
    }
    useEffect(() => {
        if (preferences.secondary_text_color === '') {
            setPreferences({ ...preferences, secondary_text_color: "#000000" });
            setPreferences({ ...preferences, primary_text_color: "#ffffff" });
        }
    }, [preferences])
    const getAllBots = () => {
        getBotAllData().then((res) => {
            setAllBots(res.results)
        })
    }

    const handleSetBot = (e) => {
        getBotInfo(e.target.value)
    }


    // Form handlers

    const handlePrimaryColorChange = (event) => {
        const color = event.target.value;
        setPreferences({ ...preferences, primary_color: color });
    };

    const handleSecondaryColorChange = (event) => {
        const color = event.target.value;
        setPreferences({ ...preferences, secondary_color: color });
    };
    const handlePrimaryTextColorChange = (event) => {
        const color = event.target.value;
        setPreferences({ ...preferences, primary_text_color: color });
    };

    const handleSecondaryTextColorChange = (event) => {
        const color = event.target.value;
        setPreferences({ ...preferences, secondary_text_color: color });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        debugger
        setPreferences({ ...preferences, [name]: value });
    }
    const handleCheckBoxChange = (e) => {
        const { name } = e.target;
        setPreferences({ ...preferences, [name]: preferences.active === false ? true : false });
    }

    // Logo & thumbnail upload + base64 conversion 



    const getBase64 = (file) => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const handleFileChange = (event) => {
        const name = event.target.name
        const file = event.target.files[0];

        getBase64(file)
            .then(result => {
                setPreferences({ ...preferences, logo: result, logo_file_name: file.name })
            })
            .catch(err => {
                console.log(err);
            });
    };

    const savePreferences = () => {
        setLoading(true)

        let payload = { ...preferences, logo: preferences.logo_file_name ? preferences.logo : '' }
        !payload.logo && delete payload.logo
        delete payload.primary_text_color
        delete payload.secondary_text_color
        modifyBot(botDetails.id, payload).then((res) => {
            setLoading(false)
            getBotInfo(botDetails.id)
            if (form === false) {
                getAllBots()
                router.push("/dashboard")
            } else {
                setIntakeStep(3)
                setIntakeCompleteStep(3)
            }
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    const handleBack = () => {
        setIntakeStep(intakeStep - 1)
    }

    return (
        <div className="w-full">
            {form === false && (
                <>
                    <div className='mb-4'>
                        <a className="flex justify-start gap-2 items-center text-primary font-bold border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="customize">
                            <CpuChipIcon className="h-7 w-7 text-gray-500" /> Customize widget
                        </a>
                        <small className='text-[#7e7e7e]'>You have full control over the look and feel of your Tempo widget. You can customize the colors, position, and preferences of your widget.</small>
                    </div>
                    <hr className='opacity-10'></hr>
                    <div>


                    </div>
                </>
            )}

            {botDetails.id &&
                <>
                    <br></br>
                    <div className="block sm:flex md:flex lg:flex justify-center items-start gap-4">
                        <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%]">

                            <div className='mb-4'>
                                <a className="flex justify-start gap-2 items-center py-4 text-heading font-bold border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="preview">
                                    <QrCodeIcon className="h-6 w-6 text-gray-500" /> Customize Agent
                                </a>
                                <hr className='opacity-10'></hr>

                            </div>
                            <div className="flex items-center w-full mt-2 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Bot Title</span>
                                </div>
                                <div className="flex justify-start w-1/2">
                                    <input onChange={handleInputChange} maxLength={20} name='chat_title' value={preferences.chat_title} type="text" className="block border-gray border w-full rounded-md p-2 items-center" placeholder="Enter chat title" />
                                </div>
                            </div>

                            <div className="flex items-center w-full mt-2 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Description</span>
                                </div>
                                <div className="flex justify-start w-1/2">
                                    <input onChange={handleInputChange} maxLength={20} name='description' value={preferences.description} type="text" className="block border-gray border rounded-md p-2 items-center w-full" placeholder="Enter description" />
                                </div>
                            </div>

                            <div className="flex items-center w-full gap-2">
                                <div className="flex justify-start w-1/2">
                                    <span className="text-gray-700">Primary Color</span>
                                </div>
                                <div className="flex justify-start rounded-md w-1/2 border mt-2 border-gray p-2">
                                    <input
                                        type="color"
                                        value={preferences.primary_color}
                                        className=" border-none bg-white px-1 cursor-pointer w-full block   rounded-md items-center "
                                        placeholder="Enter primary color"
                                        onChange={handlePrimaryColorChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center w-full gap-2">
                                <div className="flex justify-start w-1/2">
                                    <span className="text-gray-700">Secondary Color</span>
                                </div>
                                <div className="flex justify-start rounded-md w-1/2 border mt-2 border-gray p-2">
                                    <input
                                        type="color"
                                        value={preferences.secondary_color}
                                        className=" border-none bg-white px-1 cursor-pointer w-full block   rounded-md items-center "
                                        placeholder="Enter secondary color"
                                        onChange={handleSecondaryColorChange}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center w-full gap-2">
                                <div className="flex justify-start w-1/2">
                                    <span className="text-gray-700">Primary Text Color</span>
                                </div>
                                <div className="flex justify-start rounded-md w-1/2 border mt-2 border-gray p-2">
                                    <input
                                        type="color"
                                        value={preferences.primary_text_color}
                                        className=" border-none bg-white px-1 cursor-pointer w-full block   rounded-md items-center "
                                        placeholder="Enter primary color"
                                        onChange={handlePrimaryTextColorChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center w-full gap-2">
                                <div className="flex justify-start w-1/2">
                                    <span className="text-gray-700">Secondary Text Color</span>
                                </div>
                                <div className="flex justify-start rounded-md w-1/2 border mt-2 border-gray p-2">
                                    <input
                                        type="color"
                                        value={preferences.secondary_text_color}
                                        className=" border-none bg-white px-1 cursor-pointer w-full block   rounded-md items-center "
                                        placeholder="Enter secondary color"
                                        onChange={handleSecondaryTextColorChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center w-full mt-1 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Widget Location</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">
                                    <select value={preferences.widget_location} name='widget_location' onChange={handleInputChange} className="block border-gray border rounded-md p-2 items-center cursor-pointer w-full">
                                        <option value="bottom_right">Bottom Right</option>
                                        <option value="bottom_left">Bottom Left</option>
                                        <option value="top_left">Top Left</option>
                                        <option value="top_right">Top Right</option>
                                    </select>
                                </div>
                            </div>


                            {/* <div className="flex items-center w-full mt-1 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Refund tolerance</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">
                                    <select value={preferences.refund_tolerance} name='refund_tolerance' onChange={handleInputChange} className="block border-gray border rounded-md p-2 items-center cursor-pointer w-full">
                                        <option value="0">No</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>


                            <div className="flex items-center w-full mt-1 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Cancellation tolerance</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">
                                    <select value={preferences.cancellation_tolerance} name='cancellation_tolerance' onChange={handleInputChange} className="block border-gray border rounded-md p-2 items-center cursor-pointer w-full">
                                        <option value="0">No</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>


                            <div className="flex items-center w-full mt-1 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Payment platform</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">
                                    <select value={preferences.payment_platform} name='payment_platform' onChange={handleInputChange} className="block border-gray border rounded-md p-2 items-center w-full cursor-pointer">
                                        {payments_platform_data.map((platform, index) => (
                                            <option key={index} value={platform}>{platform}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center w-full mt-1 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Ticketing platform</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">
                                    <select value={preferences.ticketing_platform} name='ticketing_platform' onChange={handleInputChange} className="block border-gray border rounded-md p-2 w-full items-center cursor-pointer">
                                        {email_ticketing_system_data.map((platform, index) => (
                                            <option key={index} value={platform}>{platform}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}


                            <div className="flex items-center w-full mt-2 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">
                                        {preferences.logo && !preferences.logo_file_name ? <a className='text-heading' target='_blank' href={preferences.logo}>Logo</a> : 'Logo'}

                                    </span>
                                </div>
                                <div className="relative inline-flex justify-start w-1/2 items-center">
                                    <label className="cursor-pointer bg-white rounded w-full">
                                        <span className="border-gray  border py-2 p-2 rounded-md shadow-sm flex items-center break-all hover:bg-gray w-full">
                                            {preferences.logo_file_name ?
                                                (preferences.logo_file_name)
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
                                                    {'...' + preferences.thumbnail?.slice(preferences.thumbnail.length - 10, preferences.thumbnail.length) || "Select file"}
                                                </>)
                                            }
                                        </span>
                                        <input type="file"
                                            accept="image/jpeg, image/jpg, image/png"
                                            className="hidden w-full"
                                            placeholder="Select logo"
                                            name='logo'
                                            onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center w-full mt-2 gap-2">
                                <div className="flex justify-start w-1/2 items-center">
                                    <span className="text-gray-700">Hide Chat Bot</span>
                                </div>
                                <div className="flex justify-start w-1/2 items-center">

                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" id="active" name="active" onChange={handleCheckBoxChange} className="sr-only peer" checked={preferences.active === true} />
                                        <div className={`w-11 h-6 ${preferences.active === false ? 'bg-border' : 'bg-primary'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600`}></div>
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div id='chatbot_preview' className='w-full sm:w-[48%] md:w-[48%] lg:w-[48%]'>
                            <div className='mb-4'>
                                <a className="flex justify-start gap-2 items-center p-4 text-heading font-bold border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="preview">
                                    <EyeIcon className="h-6 w-6 text-gray-500" /> Preview
                                </a>
                                <hr className='opacity-10'></hr>

                            </div>

                            <div className="containerChatBot_entire justify-center flex">
                                <div className="widget_container active w-[90%]">
                                    <div className="header_ChatBotWidget">
                                        <div className="profile_photo_container"><img width="45px" src={preferences.logo || 'https://usetempo.ai/teams.png'} /></div>
                                        <div>
                                            <div>
                                                <b>{preferences.chat_title}</b>
                                            </div>
                                            <div className="subtitle_div">
                                                <span className="subtitle_ChatBotWidget">
                                                    <span className="ai_icon">AI</span> {preferences.description || 'Powered by Tempo'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="custom_hr" />
                                    <div className="chat_content">
                                        <div className="first_answer">
                                            <img className='profile-photo_ChatBot' src={preferences.logo || 'https://usetempo.ai/teams.png'} alt='Profile Photo' width='35px' />
                                            <div className="answer_text" style={{ backgroundColor: preferences.secondary_color, color: preferences.secondary_text_color }}>How can I help you today?</div>
                                        </div>
                                        <div className="question" style={{ backgroundColor: preferences.primary_color, color: preferences.primary_text_color }}>What is the price of the product?</div>
                                    </div>



                                    <hr className="custom_hr" />
                                    <div className="reply_container">
                                        <textarea className="input_question" disabled type="text" maxLength="1000" placeholder="Write a reply..."></textarea>
                                        <div className="send_button" id="sendButton" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" fill={preferences.primary_color} className="">
                                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {form === false && (
                        <div className='m-auto justify-center flex mt-4'>
                            <div className='m-auto align-center'>
                                {loading ? <LoaderButton /> :
                                    <Button type={"button"} onClick={savePreferences} disabled={loading} className="align-center inline-block font-bold rounded bg-primary   px-8 pb-2 pt-3 text-xs uppercase text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
                                        Save
                                    </Button>}
                            </div>

                        </div>
                    )}
                    {form === true && (
                        <div className={`flex p-2 rounded-b mt-5 justify-between`}>

                            <button
                                onClick={handleBack}
                                className="inline-block float-left rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                disabled={loading ? true : false}
                            >
                                Back
                            </button>
                            {botDetails.id && <div className='align-center'>
                                {loading ? <LoaderButton /> :
                                    <Button type={"button"} onClick={savePreferences} disabled={loading} className="align-center inline-block font-bold rounded bg-primary   px-8 pb-2 pt-3 text-xs uppercase text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
                                        Next
                                    </Button>}
                            </div>}
                        </div>
                    )}
                </>}
        </div>
    )
}

export default Customize