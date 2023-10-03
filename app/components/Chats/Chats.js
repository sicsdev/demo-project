
import { addBotConversationMessagesReaction } from '@/app/API/pages/Bot';
import { getKnowledgeData } from '@/app/API/pages/Knowledge';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import EditKnowledge from './EditKnowledge';
import EditWorkflow from './EditWorkflow';
import { getConversationDetails, setForReview } from '@/app/API/pages/Logs';
import { ChatBubbleOvalLeftEllipsisIcon, AtSymbolIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const Chat = ({ messages, selectedBot, idOfOpenConversation }) => {
    const CDN_URL = "https://widget-dev.usetempo.ai";


    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const [botUnique, setBotUnique] = useState({})
    const [allKnowledge, setAllKnowledge] = useState([])
    const [conversationDetails, setConversationDetails] = useState({})

    const bot = useSelector(state => state.botId.botData.data)


    useEffect(() => {
        getKnowledge()

        if (bot) {
            const filterBot = bot.bots.find((x) => x.id === selectedBot)
            if (filterBot) { setBotUnique(filterBot) }
        }

        getDetails()

        // responsive
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };


    }, [bot, idOfOpenConversation])


    // Handlers 

    async function getDetails() {
        if (idOfOpenConversation) {
            let convoDetails = await getConversationDetails(idOfOpenConversation)
            setConversationDetails(convoDetails.data)
        }
    }

    function handleResize() {
        window && setIsSmallScreen(window.innerWidth < 600);
    }

    const createFlag = async (value) => {
        const response = await addBotConversationMessagesReaction(value.id, { reaction: "DISLIKE" })
    }

    const getKnowledge = async () => {
        const response = await getKnowledgeData()
        setAllKnowledge(response?.data?.results)
    }

    const copyMessageText = (text) => {
        navigator?.clipboard?.writeText(text)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZoneName: 'short',
        };

        return date.toLocaleDateString('en-US', options);
    }


    async function handleForReview(e) {
        setConversationDetails({ ...conversationDetails, for_review: e.target.checked })
        await setForReview(idOfOpenConversation, { for_review: e.target.checked })
    }

    return (
        <>
            <div className='flex justify-content-center'>
                <small className='m-auto' >{conversationDetails?.created && formatDateTime(conversationDetails.created)}</small>
            </div>


            <div className='mt-5'>
                {/* <div className='flex justify-center'>
                    <small>Channel</small>
                </div> */}
                <div className='flex justify-start rounded-md' style={{ fontSize: '12px' }}>

                    {conversationDetails.type == 'chat' &&
                        <div className=''>
                            <div className={`flex justify-center bg-gray items-center p-1 text-primary rounded-md gap-2`}>
                                <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
                                Chat
                            </div>
                        </div>

                    }
                    {conversationDetails.type == 'email' &&
                        <div className=''>
                            <div className={`flex justify-center bg-gray items-center p-1 text-primary rounded-md gap-2`}>
                                <AtSymbolIcon className="w-4 h-4" />
                                Email
                            </div>
                        </div>
                    }

                    {conversationDetails.type == 'phone' &&

                        <div className=''>
                            <div className={`flex justify-center bg-gray items-center p-1 text-primary rounded-md gap-2`}>
                                <DevicePhoneMobileIcon className="w-4 h-4" /> Phone
                            </div>
                        </div>
                    }

                </div>

            </div>
            <div className='z-[50] mt-4 shadow-lg border border-gray rounded-lg'>

                <div className="chatbot_widget" id="chatbot_widget">
                    <div className="containerChatBot_entire !block">
                        <div className={``}>
                            <div className="" id="widget_headerContainer">
                                <div className="header_ChatBotWidget">
                                    <div className="profile_photo_container">
                                        <img width="45px" src={`${botUnique?.enterprise?.logo ||
                                            `${CDN_URL}/v1/assets/img/profileDefault.png`} `} />
                                    </div>
                                    <div className="header_ChatBotWidget-middlebox">
                                        <div>
                                            <div>
                                                <b>{botUnique?.enterprise?.name}</b>
                                            </div>
                                            <div className="subtitle_div">
                                                <span className="subtitle_ChatBotWidget">
                                                    <span className="ai_icon">AI</span>{" "}
                                                    {botUnique?.enterprise?.description || "Powered by Tempo"}
                                                </span>
                                            </div>

                                        </div>
                                        <div className="widgetchatbot_betatag">Beta </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat_content" style={{ maxHeight: isSmallScreen ? '80vh' : '60vh' }}>
                                {messages.map((element, key) =>
                                    <>
                                        {element.sender === 'bot' &&
                                            (
                                                <div className="answer_with_thumbs" style={{ opacity: (key === messages?.length - 1 || key === messages?.length - 2) ? "1" : "0.8" }}>
                                                    <img className="profile-photo_ChatBot_back"
                                                        src={`${botUnique?.enterprise?.logo ||
                                                            `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                    <div className="answer_text_div">
                                                        {/* <div className="answer_text_with_thumbs pointer" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} title="Copy answer to clipboard" onClick={(e) => copyMessageText(element.content)}> */}
                                                        <div className="title-element-right" style={{ display: "none" }}>14:11</div>

                                                        {
                                                            element.content === 'HUMAN-HANDOFF' &&
                                                            <>
                                                                <div className="answer_text_with_thumbs pointer" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} title="Copy answer to clipboard" onClick={(e) => copyMessageText(element.content)}>
                                                                    I'm sorry but this question may require a supervisor to take a look. Would you like to speak to a human agent?
                                                                </div>
                                                            </>
                                                        }

                                                        {
                                                            element.content === 'OPTIONS' &&
                                                            <>
                                                                <div className="answer_text_with_thumbs pointer" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} title="Copy answer to clipboard" onClick={(e) => copyMessageText(element.content)}>
                                                                    Could you please clarify how I can best help you?
                                                                </div>
                                                            </>
                                                        }


                                                        {
                                                            element.content === 'FORM' &&
                                                            <>
                                                                <div className="answer_text_with_thumbs pointer" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} title="Copy answer to clipboard" onClick={(e) => copyMessageText(element.content)}>
                                                                    No problem, I can help you with that! Could you please provide the following information:
                                                                </div>
                                                            </>
                                                        }

                                                        {
                                                            element.content !== 'OPTIONS' && element.content !== 'HUMAN-HANDOFF' && element.content !== 'FORM' && element.type !== 'action' &&
                                                            <>
                                                                <div className='flex items-center justify-between gap-1'>
                                                                    <div className="answer_text_with_thumbs pointer" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} title="Copy answer to clipboard" onClick={(e) => copyMessageText(element.content)}>
                                                                        {element.content}
                                                                    </div>
                                                                    <div className="chatBotWidgetThumbs">
                                                                        <button className='cursor-pointer' onClick={(e) => { createFlag(element) }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[13px] h-[13px] opacity-80">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className='mx-2 my-1' style={{ color: '#828282' }}>
                                                                    <small><b>Sources</b></small><br />
                                                                    {
                                                                        element?.knowledge?.length ? element?.knowledge?.map(item => (

                                                                            <EditKnowledge allMessages={messages} indexOfMessage={key} item={item} allKnowledge={allKnowledge}></EditKnowledge>
                                                                        ))

                                                                            :
                                                                            <small>LLM</small>
                                                                    }
                                                                </div>
                                                            </>
                                                        }




                                                        {/* </div> */}



                                                        {/* BUTTONS AND HELPERS FOR WORKFLOWS BELOW TEXT */}

                                                        {
                                                            element.content === 'HUMAN-HANDOFF' &&
                                                            <><div className="attention_required_answer">
                                                                <button id="tempoWidget-acceptButton" onclick="acceptContact()">Yes</button>
                                                                <button id="tempoWidget-rejectButton" onclick="rejectContact()">No</button>
                                                            </div>
                                                                <div className='mx-2 my-1' style={{ color: '#828282' }}>
                                                                    <small>
                                                                        <b>Sources</b>
                                                                        <br />
                                                                        Custom
                                                                    </small>
                                                                </div>
                                                            </>
                                                        }

                                                        {
                                                            element.content === 'OPTIONS' && element?.actions?.options &&
                                                            <>
                                                                <div className="tempo-widget-options-container">
                                                                    {Object.keys(element.actions.options).map((key, index) =>
                                                                        <button className="tempo-widget-options-button" data-options-id="${optionsId}" name="${key}">
                                                                            ({index + 1}) {element.actions.options[key]}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <div className='mx-2 my-1' style={{ color: '#828282' }}>

                                                                    <small><b>Sources</b><br /></small>
                                                                    {/* {element?.workflows[0]?.information?.name} */}

                                                                    {element?.workflows?.map(workflow => (
                                                                        <EditWorkflow allMessages={messages} indexOfMessage={key} item={workflow}></EditWorkflow>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        }


                                                        {
                                                            element.type == "action" && !element.actions.options && element?.actions && (!element.content === 'HUMAN-HANDOFF') && (!element.content === 'OPTIONS') &&

                                                            <>
                                                                <div className="component_answer" style={{ width: '300px' }}></div>
                                                                <div className="tempo-widget-custom-form">
                                                                    {Object.keys(element.actions).map(key => {
                                                                        console.log(key, 'elem')
                                                                        const elementData = element.actions[key];
                                                                        const elementId = `tempo-widget-custom-form-${key}`;

                                                                        return (
                                                                            <div key={key}>
                                                                                <label className="tempo-widget-custom-form-label">
                                                                                    {capitalizeFirstLetter(elementData.name)}
                                                                                </label>

                                                                                {elementData.type === "select" && (
                                                                                    <div id={elementId} className="tempo-widget-custom-form-buttons">
                                                                                        <button
                                                                                            className={`tempo-widget-custom-form-button tempo-widget-custom-form-button-${key}`}
                                                                                            data-value="Yes"
                                                                                            id={`custom-form-yes-button-${key}`}
                                                                                        >
                                                                                            Yes
                                                                                        </button>
                                                                                        <button
                                                                                            className={`tempo-widget-custom-form-button tempo-widget-custom-form-button-${key}`}
                                                                                            data-value="No"
                                                                                            id={`custom-form-no-button-${key}`}
                                                                                        >
                                                                                            No
                                                                                        </button>
                                                                                    </div>
                                                                                )}

                                                                                {elementData.type === "multiselect" && (
                                                                                    <div id={elementId} className="tempo-widget-custom-form-buttons">
                                                                                        {elementData.options.map(option => (
                                                                                            <button
                                                                                                key={`${key}_${elementData.name}_${option}`}
                                                                                                className={`tempo-widget-custom-form-button tempo-widget-custom-form-button-${key}`}
                                                                                                data-value={option}
                                                                                                id={`${key}_${elementData.name}_${option}`}
                                                                                            >
                                                                                                {option}
                                                                                            </button>
                                                                                        ))}
                                                                                    </div>
                                                                                )}

                                                                                {elementData.type === "str" && (
                                                                                    <input
                                                                                        type="text"
                                                                                        id={elementId}
                                                                                        className={`tempo-widget-custom-form-input chatbotwidgetPlaceHolder type${elementData.name}-${key}`}
                                                                                        placeholder={elementData.default || capitalizeFirstLetter(elementData.name)}
                                                                                        disabled
                                                                                    />
                                                                                )}

                                                                                {elementData.type === "date" && (
                                                                                    <input
                                                                                        type="date"
                                                                                        id={elementId}
                                                                                        className={`tempo-widget-custom-form-input chatbotwidgetPlaceHolder type${elementData.name}`}
                                                                                        placeholder={elementData.default || ""}
                                                                                        name={elementData.name}
                                                                                        disabled
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                                <div className='mx-2 my-1' style={{ color: '#828282' }}>
                                                                    <div className='mx-2 my-1' style={{ color: '#828282' }}>
                                                                        <small><b>Sources</b><br /></small>
                                                                        {/* {element?.workflows[0]?.information?.name} */}
                                                                        {element?.workflows?.map(workflow => (
                                                                            <EditWorkflow allMessages={messages} indexOfMessage={key} item={workflow}></EditWorkflow>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                            </>
                                                        }



                                                        {/* SOURCES */}

                                                    </div>

                                                </div >
                                            )}
                                        {element.sender === 'user' &&
                                            (
                                                <div className="chatbotWidget_question" id={`tempoWidgetQuestion${key}`} style={{ backgroundColor: botUnique?.primary_color, color: botUnique?.primary_text_color, opacity: (key === messages?.length - 1 || key === messages?.length - 2) ? "1" : "0.6" }}>

                                                    {
                                                        element.content === 'WORKFLOW' &&
                                                        <>
                                                            User selected 1
                                                        </>
                                                    }

                                                    {
                                                        element.content === 'INFORMATION' &&
                                                        <>
                                                            User selected 2
                                                        </>
                                                    }

                                                    {
                                                        element.content !== 'WORKFLOW' && element.content !== 'INFORMATION' &&
                                                        <>
                                                            {element.content}
                                                        </>
                                                    }


                                                    <div className="title-element-left" style={{ display: "none" }}>14:11</div>
                                                </div>
                                            )}

                                    </>
                                )}
                            </div >

                        </div>
                    </div>
                </div>
            </div >

            <div className="flex items-center space-x-2 mt-4 justify-start">
                <input
                    type="checkbox"
                    id="forReviewCheckbox"
                    className="custom-checkbox h-5 w-5 text-indigo-600 border-indigo-600 rounded-md transition duration-300 ease-in-out transform hover:scale-110"
                    checked={conversationDetails?.for_review}
                    onClick={handleForReview}
                />
                <label className="text-gray-700 ">For review</label>
            </div>

        </>
    )
}

export default Chat