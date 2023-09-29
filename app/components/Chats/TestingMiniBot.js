"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./Minibot/miniBotStyles.css"
// import "./Minibot/optionscomponent.css"
import "./Minibot/customform.css"

import { getConversationId, getTestBot, postQuestion, startWorkflowMessages } from '@/app/API/components/Minibot';
import Pusher from 'pusher-js';
// import renderCustomForm from './Minibot/CustomForm'
import CustomForm from './Minibot/CustomForm'

const TestingMiniBot = ({ workflow }) => {
    const pusher = new Pusher("1fc282a0eb5e42789c23", {
        cluster: "mt1",
    });

    const [preferences, setPreferences] = useState({
        id: "",
        enterprise: {},
        category: "",
        description: "",
        refund_tolerance: 0,
        automation_tolerance: 0,
        primary_text_color: "#ffffff",
        secondary_text_color: "#000000",
        primary_color: "#0057ff",
        secondary_color: "#dcdcdc",
        logo: "",
        thumbnail: "",
        chat_title: "Tempo AI Bot (Test Mode)",
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
        active: true,
        origins_blocked: [],
        customer_service_email: "",
        chat_default_message: "Welcome to Tempo Bot's Test Mode!",
        chat_suggestions: []
    });

    const [chatContent, setChatContent] = useState([<div className="first_answer_testing ">
        <img
            className="profile-photo_ChatBot_testing "
            src={
                preferences.logo || "https://usetempo.ai/bot.png"
            }
            alt="Profile Photo"
            width="35px"
        />
        <div
            className="answer_text_testing"
            style={{
                backgroundColor: preferences.secondary_color,
                color: preferences.secondary_text_color,
            }}
        >
            {preferences.chat_default_message}
        </div>
    </div>,]);


    useEffect(() => {
        getTestingBot()
    }, []);


    const [conversationId, setConversationId] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [sendingQuestion, setSendingQuestion] = useState(false)

    const getTestingBot = () => {
        getTestBot().then(res => {
            getConvoID(res.id);
            // getConvoID("0975dbcc-d2a5-4aaf-8e46-c020ae625652") // hardcode nextmed bot id
        })
    }

    const getConvoID = async (botId) => {
        await getConversationId(botId)
            .then(res => {
                setConversationId(res.id)
                const channel = pusher.subscribe(`conversation-${res.id}`);
                channel.bind('messages', data => {
                    appendAnswer(data)
                    console.log('Recibido en tiempo real:', data);
                });

                channel.bind('actions', async function (data) {
                    console.log('pusher channel action received:', data)
                    // if (data.type == "HUMAN-HANDOFF") {
                    //     renderHumanHandoffResponse()
                    // }

                    if (data.type == "FORM") { renderCustom(data, res.id) }
                    // if (data.type == "SCHEDULE") {
                    //     createAppointmentComponent(data.data, companyName)
                    // }
                    if (data.type == "OPTIONS") { renderOptionsComponent(data) }

                })

                if (workflow) testWorkflow(workflow, res.id)

                return () => {
                    channel.unbind('messages');
                    channel.unsubscribe();
                };

            })
    }

    const appendAnswer = (data) => {
        setChatContent((prevChatContent) => {
            const newAnswer = (
                <div className="first_answer_testing ">
                    <img
                        className="profile-photo_ChatBot_testing "
                        src={
                            preferences.logo || "https://usetempo.ai/bot.png"
                        }
                        alt="Profile Photo"
                        width="35px"
                    />
                    <div
                        className="answer_text_testing"
                        style={{
                            backgroundColor: preferences.secondary_color,
                            color: preferences.secondary_text_color,
                        }}
                    >
                        {data.message}
                    </div>
                </div>
            );
            return [...prevChatContent, newAnswer];
        });
    };

    const appendQuestion = (question) => {
        setChatContent((prevChatContent) => {
            const newQuestion = (
                <div
                    className="question_testing"
                    style={{
                        backgroundColor: preferences.primary_color,
                        color: preferences.primary_text_color,
                    }}
                >
                    {question}
                </div>
            );
            return [...prevChatContent, newQuestion];
        });
    };

    const sendQuestion = async (e) => {
        let content = inputValue
        if (content) {
            appendQuestion(content)
            setInputValue('')
            setSendingQuestion(true)
            await postQuestion(content, conversationId).then(() => setSendingQuestion(false))
        }
    }

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }


    // OPTIONS
    const renderOptionsComponent = (data) => {
        console.log(data)
        const { id, type, data: optionsData } = data;

        setChatContent((prevChatContent) => {
            const options = (
                <div className="tempo-widget-options-container_testing ">
                    {Object.entries(optionsData.options).map(([key, value]) => (
                        <button
                            key={key}
                            className="tempo-widget-options-button_testing "
                            data-options-id={id}
                            name={key}
                            onClick={postQuestion(value, conversationId)}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            );
            return [...prevChatContent, options];
        });

    }



    /// CUSTOM FORM
    const renderCustom = (data, conversation_id) => {

        let response = <CustomForm payload={data.data} customFormId={data.id} preferences={preferences} conversation_id={conversation_id} ></CustomForm>

        setChatContent((prevChatContent) => {
            const customForm = response;
            return [...prevChatContent, customForm];
        });
    }

    const testWorkflow = async (workflow, convId) => {
        console.log(workflow, 'workflow')
        await startWorkflowMessages(workflow.id, convId)

    }

    return (


        <div
            id="minibotContainer"
            className="w-full mt-6 sm:mt-0 testbotwidget rounded-xl"
        >

            <div className="justify-center bg-white rounded-xl">
                <div className="containerChatBot_entire_testing" >
                    <div className="header_ChatBotWidget_testing">
                        <div className="profile_photo_container_testing ">
                            <img
                                width="45px"
                                src={
                                    preferences.logo || "https://usetempo.ai/bot.png"
                                }
                            />
                        </div>
                        <div>
                            <div>
                                <select
                                    id="chatTitle"
                                    name="chatTitle"
                                    className="block w-full p-2 border rounded-md w-full"
                                >
                                    <option value="1">{preferences.chat_title}</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            {/* <div className="subtitle_div_testing ">
                                <span className="subtitle_ChatBotWidget_testing ">
                                    <span className="ai_icon_testing ">AI</span>{" "}
                                    {preferences.description || "Powered by Tempo"}
                                </span>
                            </div> */}
                        </div>
                    </div>
                    <hr className="custom_hr_testing " />
                    <div className="chat_content_testing">
                        {chatContent?.map((message, index) => (
                            message
                        ))}
                    </div>

                    {/* <div className="chat_content" id='testChatContent'>

                        <div className="first_answer">
                            <img
                                className="profile-photo_ChatBot"
                                src={
                                    preferences.logo || "https://usetempo.ai/bot.png"
                                }
                                alt="Profile Photo"
                                width="35px"
                            />
                            <div
                                className="answer_text"
                                style={{
                                    backgroundColor: preferences.secondary_color,
                                    color: preferences.secondary_text_color,
                                }}
                            >
                                {preferences.chat_default_message}
                            </div>
                        </div>

                        <div
                            className="question"
                            style={{
                                backgroundColor: preferences.primary_color,
                                color: preferences.primary_text_color,
                            }}
                        >
                            What is the price of the product?
                        </div>
                        {preferences.chat_suggestions &&
                            <div className="tempoWidget-suggestedQuestions-div">
                                {preferences.chat_suggestions.map(el => (
                                    <div className="tempoWidget-suggestedQuestions-option">
                                        {el}
                                    </div>
                                ))}
                            </div>
                        }

                    </div> */}

                    <div class="chatbotwidget_footer_testing">
                        <div className="reply_container_testing">
                            <textarea value={inputValue} disabled={sendingQuestion} id="inputtext_chatwidget_testing" onChange={handleInputValue} className="input_question_testing" type="text" maxlength="180" placeholder={sendingQuestion ? "Please wait for a response..." : "Write a reply..."} />

                            <div className="send_audio_button_testing " onclick="handleAudioButton()" id="audioButton">
                                <svg fill={preferences.primary_color} width="25px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="${preferences.primary_color}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </div>

                            <div className="send_button_testing " onClick={sendQuestion} id="sendButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" className=""
                                    fill={preferences.primary_color}>
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                                </svg>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* <button onClick={testWorkflow}>test workflow</button> */}
        </div>
    )
}

export default TestingMiniBot