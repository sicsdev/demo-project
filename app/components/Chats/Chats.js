
import { addBotConversationMessagesReaction, disputeCharge, getBotAllData } from '@/app/API/pages/Bot';
import { getFaqNegative, getKnowledgeData } from '@/app/API/pages/Knowledge';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import EditKnowledge from './EditKnowledge';
import EditWorkflow from './EditWorkflow';
import { getConversationDetails, setForReview } from '@/app/API/pages/Logs';
import { ChatBubbleOvalLeftEllipsisIcon, AtSymbolIcon, DevicePhoneMobileIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../Common/Button/Button';
import LoaderButton from '../Common/Button/Loaderbutton';
import { errorMessage, successMessage } from '../Messages/Messages';
import ApiCallInfo from './ApiCallInfo';
import './LogsStyle.css'
import { useRouter } from 'next/navigation';
import { createRecommendation } from '@/app/API/pages/LearningCenter';
import Answerknowledge from '../KnowledgeAnswer/AnswerKnowlwdge';

const Chat = ({ messages, selectedBot, idOfOpenConversation, setExternalQuestionFromLogs, selectedBotObject }) => {

    // Helpers
    const CDN_URL = "https://widget-dev.usetempo.ai";
    const router = useRouter()
    const chatLogsRef = useRef(null);



    // Local states
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const [botUnique, setBotUnique] = useState({})
    const [allKnowledge, setAllKnowledge] = useState([])
    const [conversationDetails, setConversationDetails] = useState({})
    const [disputeLoader, setDisputeLoader] = useState(false);
    const bot = useSelector(state => state.botId.botData.data)


    useEffect(() => {
        getKnowledge()
        getDetails()
        handleResize()

        // Scroll chat content to end.
        if (chatLogsRef.current) {
            const element = chatLogsRef.current;
            element.scrollTop = element.scrollHeight;
        }

        // responsive
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [idOfOpenConversation])


    useEffect(() => {
        if (!botUnique?.id) {
            getBotAllData().then(res => {
                const filterBot = res?.results?.find((x) => x.id === selectedBot)
                if (filterBot) { setBotUnique(filterBot) }
            })
        }
    }, [botUnique, selectedBot, selectedBotObject])



    // Handlers 

    async function getAllBots() {
        let bots = await getBotAllData()
        const filterBot = bots?.results?.find((x) => x.id === selectedBot)
        console.log(filterBot, 'filterbot')
        if (filterBot) { setBotUnique(filterBot) }
    }

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

    const raiseDisputHandler = async (event) => {
        try {
            setDisputeLoader(true);
            const disputeResult = await disputeCharge({}, idOfOpenConversation);
            if (disputeResult?.status === 200 || disputeResult?.status === 201) {
                // successMessage("Dispute Created Successfully!");
                setConversationDetails({ ...conversationDetails, charge_status: 'REFUNDED' })
            } else {
                errorMessage("Unable to create dispute!");
            }
            setDisputeLoader(false);
        } catch (error) {
            console.log(error)
            errorMessage("Unable to create dispute!");
            setDisputeLoader(false)
        }
    };


    const divideAnswer = (element) => {


        function formatLinks(text) {
            const linkRegex = /\[([^\]:]+):([^\]]+)\]/g;
            return text.replace(linkRegex, `<a style='font-weight: 600' target='_blank' href="$2">$1</a>`);
        }

        const content = element.content

        const maxChars = 150;
        let startIndex = 0;
        let endIndex = 0;
        const contentParts = [];

        while (startIndex < content.length) {
            endIndex = startIndex + maxChars;
            if (endIndex < content.length) {
                const nextPeriodIndex = content.indexOf('. ', endIndex);
                endIndex = nextPeriodIndex !== -1 ? nextPeriodIndex + 1 : content.length;
            } else {
                endIndex = content.length;
            }

            contentParts.push(content.substring(startIndex, endIndex + 1));
            startIndex = endIndex + 1;
        }




        return (
            <div>
                {contentParts.map((part, index) => (
                    <>
                        <div className='flex mb-2'>
                            <img className="profile-photo_ChatBot_back"
                                src={`${botUnique?.enterprise?.logo ||
                                    `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                            <div className="answer_text_div">
                                <div key={index} className='flex items-center justify-between gap-1'>
                                    <div className="answer_text_with_thumbs !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(part)}>
                                        <div dangerouslySetInnerHTML={{ __html: formatLinks(part) }} />
                                    </div>
                                    <div className="chatBotWidgetThumbs" title='Rate this answer as NEGATIVE'>
                                        <button className='cursor-pointer' onClick={(e) => { createFlag(element) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2" stroke="grey" className="w-[13px] h-[13px] opacity-80">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        );
    }


    const [loadingRedirect, setLoadingRedirect] = useState(false)
    const handleAddSource = async (key) => {
        if (loadingRedirect) return;

        let userMessage = messages[key - 1]

        setLoadingRedirect(true)

        if (userMessage.content == "WORKFLOW") {
            userMessage = messages[key - 2]
            let payload = {
                question: userMessage.actions.options.WORKFLOW,
                bot: botUnique.id
            }

            let postRecommendation = await createRecommendation(payload)

            if (postRecommendation?.data) {
                setExternalQuestionFromLogs(postRecommendation?.data)
            }

        } else if (userMessage.content == "INFORMATION") {
            userMessage = messages[key - 2]
            let payload = {
                question: userMessage.actions.options.INFORMATION,
                bot: botUnique.id
            }
            let postRecommendation = await createRecommendation(payload)

            if (postRecommendation?.data) {
                setExternalQuestionFromLogs(postRecommendation?.data)
            }

        } else if (userMessage.content == "HUMAN-HANDOFF") {
            userMessage = messages[key - 2]
            let payload = {
                question: userMessage.actions.options["HUMAN-HANDOFF"],
                bot: botUnique.id
            }
            let postRecommendation = await createRecommendation(payload)
            if (postRecommendation?.data) {
                setExternalQuestionFromLogs(postRecommendation?.data)
            }

        } else {

            let payload = {
                question: userMessage.content,
                bot: botUnique.id
            }
            let postRecommendation = await createRecommendation(payload)

            if (postRecommendation?.data) {
                setExternalQuestionFromLogs(postRecommendation?.data)
            }
        }


        setLoadingRedirect(false)

    }

    return (
        <>
            {botUnique?.id &&
                <>
                    <div className='flex justify-content-center'>
                        <small className='m-auto' >{conversationDetails?.created && formatDateTime(conversationDetails.created)}</small>
                    </div>


                    <div className='mt-5'>

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
                        <div className='relative h-[80vh] sm:h-auto'>
                            <div className="chatbot_widget_logs" id="chatbot_widget_logs">
                                <div className="containerChatBot_entire !bg-transparent !block">
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
                                        <div ref={chatLogsRef} className="chat_content_logs" style={{ maxHeight: isSmallScreen ? '63vh' : '60vh' }}>

                                            <div className="answer_with_thumbs_logs">
                                                <img className="profile-photo_ChatBot_back"
                                                    src={`${botUnique?.enterprise?.logo ||
                                                        `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                <div className="answer_text_div"></div>
                                                <div className="answer_text_with_thumbs !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }}>
                                                    {botUnique.chat_default_message ? botUnique.chat_default_message : "How can I help you today?"}
                                                </div>
                                            </div>

                                            {messages.map((element, key) =>
                                                <>
                                                    {console.log(element, '239823')}
                                                    {element.sender === 'bot' &&
                                                        (
                                                            <div id={key} key={key} className='mb-2' style={{ opacity: (key === messages?.length - 1 || key === messages?.length - 2) ? "1" : "0.8" }}>


                                                                <div className="title-element-right" style={{ display: "none" }}>14:11</div>
                                                                {
                                                                    element.content === 'HUMAN-HANDOFF' &&
                                                                    <>
                                                                        <div className="answer_with_thumbs">
                                                                            <img className="profile-photo_ChatBot_back"
                                                                                src={`${botUnique?.enterprise?.logo ||
                                                                                    `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                                            <div className="answer_text_div"></div>
                                                                            <div className="answer_text_with_thumbs  !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(element.content)}>
                                                                                I'm sorry but this question may require a supervisor to take a look. Would you like to speak to a human agent?
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }

                                                                {
                                                                    element.content === 'OPTIONS' &&
                                                                    <>
                                                                        <div className="answer_with_thumbs">

                                                                            <img className="profile-photo_ChatBot_back"
                                                                                src={`${botUnique?.enterprise?.logo ||
                                                                                    `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                                            <div className="answer_text_div"></div>
                                                                            <div className="answer_text_with_thumbs  !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(element.content)}>
                                                                                Could you please clarify how I can best help you?
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }


                                                                {
                                                                    element.content === 'FORM' &&
                                                                    <>
                                                                        <div className="answer_with_thumbs">

                                                                            <img className="profile-photo_ChatBot_back"
                                                                                src={`${botUnique?.enterprise?.logo ||
                                                                                    `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                                            <div className="answer_text_div"></div>
                                                                            <div className="answer_text_with_thumbs  !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(element.content)}>
                                                                                No problem, I can help you with that! Could you please provide the following information:
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                }







                                                                {/*************  SOURCES & INFORMATION ******************/}
                                                                {
                                                                    element.content !== 'OPTIONS' && element.content !== 'HUMAN-HANDOFF' && element.content !== 'FORM' && element.type !== 'action' &&
                                                                    <>


                                                                        {divideAnswer(element)}

                                                                        <div key={'a' + key} id={'a' + key} className='mx-2 my-1 flex justify-between w-100 mt-4' style={{ color: '#828282' }}>
                                                                            <div className='w-100' style={{ width: '100%' }}>
                                                                                <small className='flex gap-3 items-center'>
                                                                                    <b>Sources</b>
                                                                                    <small
                                                                                        onClick={() => handleAddSource(key)}
                                                                                        className='px-1 border border-gray rounded-md cursor-pointer bg-[#cbf5d3] focus:shadow-[0_8px_9px_-4px_#0000ff8a]'>
                                                                                        Add Source
                                                                                    </small>
                                                                                </small>
                                                                                {
                                                                                    element?.knowledge?.length ?
                                                                                        element?.knowledge?.map(item => (
                                                                                            <EditKnowledge allMessages={messages} indexOfMessage={key} item={item} allKnowledge={allKnowledge}></EditKnowledge>
                                                                                        ))

                                                                                        :

                                                                                        <div className='flex gap-4 items-center mt-2'>
                                                                                            <small>LLM</small>
                                                                                        </div>

                                                                                }
                                                                            </div>
                                                                            <div>
                                                                                {element.calls?.length > 0 && <ApiCallInfo calls={element.calls}></ApiCallInfo>}
                                                                            </div>

                                                                        </div>
                                                                        {<div>

                                                                        </div>}
                                                                    </>
                                                                }

                                                                {
                                                                    element.content === 'HUMAN-HANDOFF' &&
                                                                    <>
                                                                        <div key={'b' + key} id={'b' + key} className="attention_required_answer">
                                                                            <button id="tempoWidget-acceptButton" onclick="acceptContact()">Yes</button>
                                                                            <button id="tempoWidget-rejectButton" onclick="rejectContact()">No</button>
                                                                        </div>
                                                                        <div className='mx-2 my-1 flex justify-between w-100 mt-3' style={{ color: '#828282' }}>
                                                                            <div>
                                                                                <small className='flex gap-3 items-center'>
                                                                                    <b>Sources</b>
                                                                                    <small
                                                                                        onClick={() => handleAddSource(key)}
                                                                                        className='px-1 border border-gray rounded-md cursor-pointer bg-[#cbf5d3] focus:shadow-[0_8px_9px_-4px_#0000ff8a]'>
                                                                                        Add Source
                                                                                    </small>
                                                                                </small>
                                                                                Custom
                                                                            </div>
                                                                            <div>
                                                                                {element.calls?.length > 0 && <ApiCallInfo calls={element.calls}></ApiCallInfo>}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }

                                                                {
                                                                    element.content === 'OPTIONS' && element?.actions?.options &&
                                                                    <>
                                                                        <div key={'c' + key} id={'c' + key} className="tempo-widget-options-container">
                                                                            {Object.keys(element.actions.options).map((key, index) =>
                                                                                <button className="tempo-widget-options-button" data-options-id="${optionsId}" name="${key}">
                                                                                    {element.actions.options[key]}
                                                                                    {`     `}
                                                                                    <small>
                                                                                        {key == 'WORKFLOW' && Math.round(element.workflows[0].score * 100) + '%'}
                                                                                        {key == 'INFORMATION' && Math.round(element.knowledge[0].score * 100) + '%'}
                                                                                    </small>
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                        <div key={'d' + key} id={'d' + key} className='mx-2 my-1 flex justify-between w-100 mt-3' style={{ color: '#828282' }}>
                                                                            <div className='w-100' style={{ width: '100%' }}>
                                                                                <small className='flex gap-3 items-center'>
                                                                                    <b>Sources</b>
                                                                                    <small
                                                                                        onClick={() => handleAddSource(key)}
                                                                                        className='px-1 border border-gray rounded-md cursor-pointer bg-[#cbf5d3] focus:shadow-[0_8px_9px_-4px_#0000ff8a]'>
                                                                                        Add Source
                                                                                    </small>
                                                                                </small>

                                                                                {element?.workflows?.map(workflow => (
                                                                                    <EditWorkflow allMessages={messages} indexOfMessage={key} item={workflow}></EditWorkflow>
                                                                                ))}

                                                                                {element && element?.knowledge.length > 0 && (
                                                                                    <EditKnowledge allMessages={messages} indexOfMessage={key} item={element?.knowledge[0]} allKnowledge={allKnowledge}></EditKnowledge>
                                                                                )}

                                                                            </div>
                                                                            <div>
                                                                                {element.calls?.length > 0 && <ApiCallInfo calls={element.calls}></ApiCallInfo>}
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }


                                                                {
                                                                    element.type == "action" && (!element.content || element.content == 'FORM') &&

                                                                    <>
                                                                        <div className="answer_with_thumbs">
                                                                            <img className="profile-photo_ChatBot_back"
                                                                                src={`${botUnique?.enterprise?.logo ||
                                                                                    `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                                            <div className="answer_text_div"></div>
                                                                            <div className="answer_text_with_thumbs  !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(element.content)}>
                                                                                No problem, I can help you with that! Could you please provide the following information:
                                                                            </div>
                                                                        </div>

                                                                        <div key={'d' + key} id={'d' + key} className="component_answer" style={{ width: '300px' }}></div>

                                                                        <div className="answer_with_thumbs">

                                                                            <img className="profile-photo_ChatBot_back"
                                                                                src={`${botUnique?.enterprise?.logo ||
                                                                                    `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />

                                                                            <div className="tempo-widget-custom-form">
                                                                                {Object.keys(element.actions).map(key => {
                                                                                    const elementData = element.actions[key];
                                                                                    const elementId = `tempo-widget-custom-form-${key}`;

                                                                                    return (
                                                                                        <>
                                                                                            <div key={key}>
                                                                                                <label className="tempo-widget-custom-form-label text-black">
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
                                                                                        </>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>

                                                                        <div className='mx-2 my-1' style={{ color: '#828282' }}>
                                                                            <div className='mx-2 my-1 flex justify-between w-100 mt-3' style={{ color: '#828282' }}>
                                                                                <div className='w-100' style={{ width: '100%' }}>
                                                                                    <small className='flex gap-3 items-center'>
                                                                                        <b>Sources</b>
                                                                                        <small
                                                                                            onClick={() => handleAddSource(key)}
                                                                                            className='px-1 border border-gray rounded-md cursor-pointer bg-[#cbf5d3] focus:shadow-[0_8px_9px_-4px_#0000ff8a]'>
                                                                                            Add Source
                                                                                        </small>
                                                                                    </small>

                                                                                    {element?.workflows?.map(workflow => (
                                                                                        <EditWorkflow allMessages={messages} indexOfMessage={key} item={workflow}></EditWorkflow>
                                                                                    ))}

                                                                                    {element && element?.knowledge.length > 0 && (
                                                                                        <EditKnowledge allMessages={messages} indexOfMessage={key} item={element?.knowledge[0]} allKnowledge={allKnowledge}></EditKnowledge>
                                                                                    )}

                                                                                </div>
                                                                                <div>
                                                                                    {element.calls?.length > 0 && <ApiCallInfo calls={element.calls}></ApiCallInfo>}
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }

                                                            </div>
                                                        )}
                                                    {element.sender === 'user' &&
                                                        (
                                                            <div key={'tempoWidgetQuestion' + key} className="chatbotWidget_question" id={`tempoWidgetQuestion${key}`} style={{ backgroundColor: botUnique?.primary_color, color: botUnique?.primary_text_color, opacity: (key === messages?.length - 1 || key === messages?.length - 2) ? "1" : "0.6" }}>

                                                                {
                                                                    element.content === 'WORKFLOW' &&
                                                                    <>
                                                                        User selected: {messages[key - 1]?.actions?.options?.WORKFLOW || 'WORKFLOW'}
                                                                    </>
                                                                }

                                                                {
                                                                    element.content === 'INFORMATION' &&
                                                                    <>
                                                                        User selected: {messages[key - 1]?.actions?.options?.INFORMATION || 'INFORMATION'}
                                                                    </>
                                                                }

                                                                {
                                                                    element.content === 'HUMAN-HANDOFF' &&
                                                                    <>
                                                                        User selected: {messages[key - 1]?.actions?.options["HUMAN-HANDOFF"] || 'HUMAN-HANDOFF'}
                                                                    </>
                                                                }


                                                                {
                                                                    element.content !== 'WORKFLOW' && element.content !== 'INFORMATION' && element.content !== "HUMAN-HANDOFF" &&
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
                        </div>
                    </div >
                    <div className="flex items-center space-x-2 mt-4 justify-start">


                        {
                            conversationDetails.charge_status === "REFUNDED" ?
                                <div className='flex gap-2 text-grey text-xs items-center'>REFUNDED<CheckCircleIcon className='w-4 h-4'></CheckCircleIcon></div>
                                :
                                <span
                                    className="text-xs text-border font-[500] cursor-pointer"
                                    onClick={(e) => { raiseDisputHandler(e) }}
                                >
                                    {disputeLoader === true ? 'Loading...' : 'Dispute Charge'}
                                </span>

                        }

                    </div>

                </>

            }
        </>
    )
}

export default Chat