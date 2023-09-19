
import { addBotConversationMessagesReaction } from '@/app/API/pages/Bot';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'

const Chat = ({ messages, selectedBot }) => {
    const [botUnique, setBotUnique] = useState({})
    const CDN_URL = "https://widget-dev.usetempo.ai";
    const createFlag = async (value) => {
        const response = await addBotConversationMessagesReaction(value.id, { reaction: "DISLIKE" })
    }
    const bot = useSelector(state => state.botId.botData.data)

    useEffect(() => {
        if (bot) {
            const filterBot = bot.bots.find((x) => x.id === selectedBot)
            if (filterBot) {
                setBotUnique(filterBot)
            }
        }

    }, [bot])

    const copyMessageText = (text) => {
        navigator?.clipboard?.writeText(text)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className='z-[50]'>
                <div className="chatbot_widget" id="chatbot_widget">
                    <div className="containerChatBot_entire !block">
                        <div className={`widget_container active`}>
                            <div className="header_ChatBotWidget_container" id="widget_headerContainer">
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
                            <div className="chat_content">
                                {messages.map((element, key) =>
                                    <>
                                        {element.sender === 'bot' &&
                                            (
                                                <div className="answer_with_thumbs" style={{ opacity: (key === messages?.length - 1 || key === messages?.length - 2) ? "1" : "0.6" }}>
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
                                                            element.content !== 'OPTIONS' && element.content !== 'HUMAN-HANDOFF' && element.content !== 'FORM' &&

                                                            <div className="answer_text_with_thumbs pointer" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} title="Copy answer to clipboard" onClick={(e) => copyMessageText(element.content)}>
                                                                {element.content}
                                                            </div>
                                                        }




                                                        {/* </div> */}



                                                        {/* BUTTONS AND HELPERS FOR WORKFLOWS BELOW TEXT */}

                                                        {
                                                            element.content === 'HUMAN-HANDOFF' &&
                                                            <><div className="attention_required_answer">
                                                                <button id="tempoWidget-acceptButton" onclick="acceptContact()">Yes</button>
                                                                <button id="tempoWidget-rejectButton" onclick="rejectContact()">No</button>
                                                            </div>
                                                            </>
                                                        }

                                                        {
                                                            element.content === 'OPTIONS' &&
                                                            <>
                                                                <div className="tempo-widget-options-container">
                                                                    {Object.keys(element.actions.options).map((key, index) =>
                                                                        <button className="tempo-widget-options-button" data-options-id="${optionsId}" name="${key}">
                                                                            ({index + 1}) {element.actions.options[key]}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </>
                                                        }


                                                        {
                                                            element.content === 'FORM' &&

                                                            <>
                                                                <div className="component_answer" style={{ width: '300px' }}></div>
                                                                <div className="tempo-widget-custom-form">
                                                                    {Object.keys(element.actions).map(key => {
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

                                                            </>


                                                        }
                                                    </div>
                                                    <div className="chatBotWidgetThumbs">
                                                        {/* <div className="chatBotWidgetThumbs_thumb_up">
                                                            <svg stroke="currentColor" className="chatWidgetThumb_icon" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                                                strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 2ca2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                                                                </path>
                                                            </svg>
                                                        </div>
                                                        <div className="chatBotWidgetThumbs_thumb_down">
                                                            <svg stroke="currentColor" className="chatWidgetThumb_icon" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                                                strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17">
                                                                </path>
                                                            </svg>
                                                        </div> */}
                                                        <button className='cursor-pointer' onClick={(e) => { createFlag(element) }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[13px] h-[13px] opacity-80">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                                            </svg>
                                                        </button>
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
        </>
    )
}

export default Chat