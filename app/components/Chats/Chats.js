
import { addBotConversationMessagesReaction, disputeCharge, getBotAllData } from '@/app/API/pages/Bot';
import { getFaqNegative, getKnowledgeData } from '@/app/API/pages/Knowledge';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import EditKnowledge from './EditKnowledge';
import EditWorkflow from './EditWorkflow';
import { getConversationDetails, setForReview } from '@/app/API/pages/Logs';
import { ChatBubbleOvalLeftEllipsisIcon, AtSymbolIcon, DevicePhoneMobileIcon, CheckCircleIcon, EnvelopeIcon, ArrowRightIcon, CalendarIcon, PhoneArrowDownLeftIcon, UserIcon, GlobeAltIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import Button from '../Common/Button/Button';
import LoaderButton from '../Common/Button/Loaderbutton';
import { errorMessage, successMessage } from '../Messages/Messages';
import ApiCallInfo from './ApiCallInfo';
import './LogsStyle.css'
import { useRouter } from 'next/navigation';
import { createRecommendation } from '@/app/API/pages/LearningCenter';
import Answerknowledge from '../KnowledgeAnswer/AnswerKnowledge';
import ProductComponent from './ProductComponent/ProductComponent';
import Link from 'next/link';
import { getAllCustomerConversationsById } from '@/app/API/pages/CustomerDetails';
import { getWorkflowLogsByCustomerID } from '@/app/API/pages/Workflow';
import WorkflowUsageLogs from '@/app/(dashboard)/dashboard/workflow/workflow-builder/logs/WorkflowUsageLogs';
import WorkflowUsageTable from '@/app/(dashboard)/dashboard/workflow/workflow-builder/logs/WorkflowUsageTable';

const Chat = ({ messages, selectedBot, idOfOpenConversation, setExternalQuestionFromLogs, selectedBotObject, filterDataHandler, setShowChat, setChatDateTime, isShowWorkflowLogsUI, setIsShowWorkflowLogsUI }) => {

    // Helpers
    const CDN_URL = "https://widget-dev.deflection.ai";
    const router = useRouter()
    const chatLogsRef = useRef(null);
    const bot = useSelector(state => state.botId.botData.data)


    // Local states
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const [botUnique, setBotUnique] = useState({})
    const [allKnowledge, setAllKnowledge] = useState([])
    const [conversationDetails, setConversationDetails] = useState({})
    const [numberOfTicketsForThisCustomer, setNumberOfTicketsForThisCustomer] = useState(0)
    const [totalWorkflowUsageRecordsCustomer, setTotalWorkflowUsageRecordsCustomer] = useState({
        count: 0,
        results: []
    })
    // const [isShowWorkflowLogsUI, setIsShowWorkflowLogsUI] = useState(false);

    const [loadingData, setLoadingData] = useState(true)
    // Loaders
    const [disputeLoader, setDisputeLoader] = useState(false);
    const [loadingRedirect, setLoadingRedirect] = useState(false)

    // Dropdown of sources
    const [dropdownOpenId, setDropdownOpenId] = useState('')


    useEffect(() => {
        getKnowledge()
        getDetails()
        handleResize()


        // responsive
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            setDropdownOpenId('')
        };

    }, [idOfOpenConversation, messages])


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
        if (filterBot) { setBotUnique(filterBot) }
    }

    async function getDetails() {
        if (idOfOpenConversation) {
            let convoDetails = await getConversationDetails(idOfOpenConversation)
            if (convoDetails.data) {
                console.log('convodetails,', convoDetails.data)
                setNumberOfTicketsForThisCustomer(convoDetails.data.customer?.conversation_count)
                setTotalWorkflowUsageRecordsCustomer({ ...totalWorkflowUsageRecordsCustomer, count: convoDetails.data.customer?.workflow_log_count })
                getWorkflowUasgeByCustomerID(convoDetails.data.customer?.id)
                setConversationDetails(convoDetails.data)
                setLoadingData(false)
                if (convoDetails.data?.created) {
                    setChatDateTime(formatDateTime(convoDetails.data.created));
                }
            }
            setLoadingData(false)
        }
    }

    function handleResize() {
        window && setIsSmallScreen(window.innerWidth < 600);
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
                let maxReachedText = "Maximum dispute limit reached. Please contact your sales manager in Slack to request a billing adjustment if you feel you are having an issue"
                let errorString = disputeResult?.response?.data?.error == "Maximum disputes reached" ? maxReachedText : "Unable to create dispute!"
                errorMessage(errorString);
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
            <div style={{ marginRight: '25px' }}>
                {contentParts.map((part, index) => (
                    <>
                        <div className='flex mb-2'>
                            <img className="profile-photo_ChatBot_back"
                                src={`${botUnique?.logo ||
                                    `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                            <div className="answer_text_div">
                                <div key={index} className='flex items-center justify-between gap-1'>
                                    <div className="answer_text_with_thumbs !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(part)}>
                                        <div dangerouslySetInnerHTML={{ __html: formatLinks(part) }} />
                                    </div>
                                    {/* <div className="chatBotWidgetThumbs" title='Rate this answer as NEGATIVE'>
                                        <button className='cursor-pointer' onClick={(e) => { createFlag(element) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2" stroke="grey" className="w-[13px] h-[13px] opacity-80">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                            </svg>
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        );
    }

    const handleAddSource = async (key) => {
        if (loadingRedirect) return;

        let userMessage = messages[key - 1]

        setLoadingRedirect(true)


        let mockedObject = {
            id: "538f9221-0c03-483c-9948-77ba6cf6cc81",
            bot: {
                id: "0975dbcc-d2a5-4aaf-8e46-c020ae625652",
                category: "standard",
                description: "NextMed Labs",
                chat_title: "NextMed"
            },
            question: "{\"email\":\"Sharonmanthony@gmail.com\"}",
            answer: "",
            number_of_messages: 0,
            accepted: true,
            created: "2023-10-23T15:42:46.612946-04:00"
        }

        if (userMessage.content == "WORKFLOW") {
            userMessage = messages[key - 2]

            let objectToMock = {
                ...mockedObject,
                question: userMessage.actions.options.WORKFLOW,
            }
            setExternalQuestionFromLogs(objectToMock)


        } else if (userMessage.content == "INFORMATION") {
            userMessage = messages[key - 2]
            let objectToMock = {
                ...mockedObject,
                question: userMessage.actions.options.INFORMATION,
            }
            setExternalQuestionFromLogs(objectToMock)

        } else if (userMessage.content == "HUMAN-HANDOFF") {
            userMessage = messages[key - 2]
            let objectToMock = {
                ...mockedObject,
                question: userMessage.actions.options["HUMAN-HANDOFF"],
            }
            setExternalQuestionFromLogs(objectToMock)

        } else {
            let objectToMock = {
                ...mockedObject,
                question: userMessage.content,
            }

            setExternalQuestionFromLogs(objectToMock)
        }


        setLoadingRedirect(false)

    }


    const getAddition = (key) => {
        // If last message of user (we found it using the key in message array) ends with "?" we will add 5% to this probability.
        let userMessage = messages[key - 1]
        let lastChar;
        let content = userMessage?.content

        if (content) { lastChar = content[content.length - 1] }
        if (lastChar && lastChar == '?') { return 5 }

        return 0;
    }


    const getValueBasedInNextMessage = (elementData, key) => {
        let nextMessage = messages[key + 1]

        let parsed = {}
        try {
            parsed = JSON.parse(nextMessage.content)
        } catch {
            // console.log('')
        }

        let field = parsed[elementData.name]

        return field
    }


    // This function is to extract subject from first message (email conversation types has the subject within te first message separated by a line break)
    function extractSubjectBasedInFirstLine() {
        let text = messages[0].content
        if (text) {
            const newlineIndex = text.indexOf('\n');
            if (newlineIndex !== -1) { return text.substring(0, newlineIndex); }
            return null;
        }
    }


    function removeFirstParagraph(text) {
        const newlineIndex = text.indexOf('\n');
        if (newlineIndex !== -1) { return text.substring(newlineIndex + 1); }
        return text;
    }


    function filterChatsByCustomerId(customer_id) {
        if (numberOfTicketsForThisCustomer <= 1) { return }
        const mockEvent = { target: { value: customer_id, name: "customer_id" } };
        filterDataHandler(mockEvent)
        setShowChat(false)
        router.push('/dashboard/analytics')
    }

    const toggleWorkflowLogsUI = () => {
        setIsShowWorkflowLogsUI(!isShowWorkflowLogsUI);
    }

    async function getWorkflowUasgeByCustomerID(customer_id) {
        let queryParam = `customer_id=${customer_id}`;
        let totalRecords = await getWorkflowLogsByCustomerID(queryParam)
        if (totalRecords.status === 200 || totalRecords.status === 201) {
            setTotalWorkflowUsageRecordsCustomer(totalRecords.data)
        }
    }

    const getTicketsInfo = () => {
        if (numberOfTicketsForThisCustomer > 1) {
            return (
                <div className='flex items-center gap-1 text-primary'>
                    {numberOfTicketsForThisCustomer} Tickets <ArrowRightIcon className="w-3 h-3" />
                </div>
            );
        } else {
            return (
                <div className='flex items-center gap-1 text-black opacity-70'>
                    {numberOfTicketsForThisCustomer} Ticket
                </div>
            )
        }
    }

    const getCountWorkflowUsageInfo = () => {
        if (totalWorkflowUsageRecordsCustomer.count > 1) {
            return (
                <div className='flex items-center gap-1 text-primary cursor-pointer'>
                    {totalWorkflowUsageRecordsCustomer.count} Workflows {isShowWorkflowLogsUI ? <ArrowDownIcon className="w-3 h-3" /> : <ArrowRightIcon className="w-3 h-3" />}
                </div>
            );
        } else {
            return (
                <div className='flex items-center gap-1 text-primary cursor-pointer'>
                    {totalWorkflowUsageRecordsCustomer.count} Workflow {isShowWorkflowLogsUI ? <ArrowDownIcon className="w-3 h-3" /> : <ArrowRightIcon className="w-3 h-3" />}
                </div>
            )
        }
    };

    const formatPhoneNumber = () => {
        let number = conversationDetails?.customer_phone || conversationDetails.customer?.phone || conversationDetails?.metadata?.phone
        if (!number) { return 'Unknown' }

        const match = number.match(/^\+(\d)(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
        } else {
            return number;
        }
    }

    return (
        <>
            {botUnique?.id && !loadingData &&
                <div className='pb-5'>
                    {/* <div className='flex justify-content-center'>
                        <small className='m-auto flex gap-2' >
                            <CalendarIcon className="h-4 w-4" />
                            {conversationDetails?.created && formatDateTime(conversationDetails.created)}</small>
                    </div> */}


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
                                        {/* {conversationDetails.type == 'email' ?
                                            <div>
                                                <div className="emailheader_ChatBotWidget">
                                                    <div className=' flex gap-2 items-center'>
                                                        <EnvelopeIcon className='h-4 w-4'></EnvelopeIcon> {conversationDetails.customer_email}
                                                    </div>
                                                    <div className=' flex gap-2 items-center mx-1'>
                                                        <ArrowRightIcon className='h-3 w-3'></ArrowRightIcon><small> {extractSubjectBasedInFirstLine()}</small>
                                                    </div>

                                                </div>

                                            </div>
                                            :
                                            <div className="" id="widget_headerContainer">
                                                <div className="header_ChatBotWidget">
                                                    <div className="profile_photo_container">
                                                        <img width="45px" src={`${botUnique?.logo ||
                                                            `${CDN_URL}/v1/assets/img/profileDefault.png`} `} />
                                                    </div>
                                                    <div className="header_ChatBotWidget-middlebox">
                                                        <div>
                                                            <div>
                                                                <b>{botUnique?.chat_title}</b>
                                                            </div>
                                                            <div className="subtitle_div">
                                                                <span className="subtitle_ChatBotWidget">
                                                                    <span className="ai_icon">AI</span>{" "}
                                                                    {botUnique?.description || "Powered by Deflection AI"}
                                                                </span>
                                                            </div>

                                                        </div>
                                                        <div className="widgetchatbot_betatag">Beta </div>
                                                    </div>
                                                </div>
                                            </div>
                                        } */}
                                        <div className="emailheader_ChatBotWidget relative flex justify-between !flex-row">

                                            <div className="infoContainer text-xs" >

                                                {
                                                    !(conversationDetails.customer_name || conversationDetails.customer?.name || conversationDetails?.metadata?.name || conversationDetails?.metadata?.patient_name)
                                                    && !(conversationDetails?.customer_email || conversationDetails.customer?.email || conversationDetails?.metadata?.email)
                                                    && !(conversationDetails?.customer_phone || conversationDetails.customer?.phone || conversationDetails?.metadata?.phone)
                                                    &&
                                                    <>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <UserIcon className="h-4 w-4 text-primary" />
                                                            <span>User unknown</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <GlobeAltIcon className="h-4 w-4 text-primary" />
                                                            <span>{conversationDetails.customer?.ip}</span>
                                                        </div>
                                                    </>
                                                }

                                                {(conversationDetails.customer_name || conversationDetails.customer?.name || conversationDetails?.metadata?.name || conversationDetails?.metadata?.patient_name) &&
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <UserIcon className="h-4 w-4 text-primary" />
                                                        <span>{conversationDetails.customer_name || conversationDetails.customer?.name || conversationDetails?.metadata?.name || conversationDetails?.metadata?.patient_name || 'Unknown'}</span>
                                                    </div>
                                                }


                                                {(conversationDetails?.customer_email || conversationDetails.customer?.email || conversationDetails?.metadata?.email) &&
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <EnvelopeIcon className="h-4 w-4 text-primary" />
                                                        <span>{conversationDetails?.customer_email || conversationDetails.customer?.email || conversationDetails?.metadata?.email || 'Unknown'}</span>
                                                    </div>
                                                }


                                                {(conversationDetails?.customer_phone || conversationDetails.customer?.phone || conversationDetails?.metadata?.phone) &&
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <DevicePhoneMobileIcon className="h-4 w-4 text-primary" />
                                                        <span>{formatPhoneNumber()}</span>
                                                    </div>
                                                }


                                            </div>

                                            {conversationDetails?.customer?.id &&
                                                <div className={`flex flex-col items-start gap-1 text-xs top-4 right-6 text-primary
                                                ${numberOfTicketsForThisCustomer > 1 ? 'cursor-pointer' : ''}`}>
                                                    {/* <Link
                                                        href={`/dashboard/analytics/customer-details?customerId=${conversationDetails?.customer?.id}`}
                                                        className='flex items-center gap-1'>
                                                        View more
                                                        <ArrowRightIcon className='w-3 h-3' />
                                                    </Link> */}

                                                    {
                                                        numberOfTicketsForThisCustomer > 0 &&
                                                        <div className=' text-xs' onClick={() => filterChatsByCustomerId(conversationDetails?.customer?.id)}>
                                                            {getTicketsInfo()}
                                                        </div>
                                                    }
                                                    {
                                                        totalWorkflowUsageRecordsCustomer.count > 0 &&
                                                        <div className='text-xs' onClick={() => toggleWorkflowLogsUI()}>
                                                            {getCountWorkflowUsageInfo()}
                                                        </div>
                                                    }
                                                </div>
                                            }

                                        </div>

                                        <div ref={chatLogsRef} id='chatcontentRef' className="chat_content_logs" style={{ maxHeight: isSmallScreen ? '63vh' : '60vh' }}>
                                            {isShowWorkflowLogsUI ?
                                                <>
                                                    <WorkflowUsageTable data={totalWorkflowUsageRecordsCustomer} loading={false} />
                                                </>
                                                :
                                                <>
                                                    <div className="answer_with_thumbs_logs">
                                                        <img className="profile-photo_ChatBot_back"
                                                            src={`${botUnique?.logo ||
                                                                `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                        <div className="answer_text_div"></div>
                                                        <div className={`answer_text_with_thumbs !text-sm !font-[400]`}
                                                            style={{
                                                                backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color
                                                            }}>
                                                            {botUnique.chat_default_message ? botUnique.chat_default_message : "How can I help you today?"}
                                                        </div>
                                                    </div>

                                                    {messages.map((element, key) =>
                                                        <>
                                                            {element.sender === 'bot' &&
                                                                (
                                                                    <div id={key} key={key} className='mb-2'>


                                                                        <div className="title-element-right" style={{ display: "none" }}>14:11</div>
                                                                        {
                                                                            element.content === 'HUMAN-HANDOFF' &&
                                                                            <>
                                                                                <div className="answer_with_thumbs">
                                                                                    <img className="profile-photo_ChatBot_back"
                                                                                        src={`${botUnique?.logo ||
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
                                                                                        src={`${botUnique?.logo ||
                                                                                            `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                                                    <div className="answer_text_div"></div>
                                                                                    <div className="answer_text_with_thumbs  !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(element.content)}>
                                                                                        Could you please clarify how I can best help you?
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        }


                                                                        {
                                                                            element.content === 'PRODUCTS' &&
                                                                            <>
                                                                                <div className="answer_with_thumbs">
                                                                                    <img className="profile-photo_ChatBot_back"
                                                                                        src={`${botUnique?.logo ||
                                                                                            `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                                                    <div className="answer_text_div"></div>
                                                                                    <ProductComponent product={element?.actions[0]} />
                                                                                </div>
                                                                            </>
                                                                        }



                                                                        {/*************  SOURCES & INFORMATION ******************/}
                                                                        {
                                                                            element.content !== 'OPTIONS'
                                                                            && element.content !== 'HUMAN-HANDOFF'
                                                                            && element.content !== 'FORM'
                                                                            && element.type !== 'action'
                                                                            &&
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
                                                                                                    <EditKnowledge
                                                                                                        message={element}
                                                                                                        setDropdownOpenId={setDropdownOpenId}
                                                                                                        dropdownOpenId={dropdownOpenId}
                                                                                                        allMessages={messages}
                                                                                                        indexOfMessage={key}
                                                                                                        item={item}
                                                                                                        allKnowledge={allKnowledge}>
                                                                                                    </EditKnowledge>
                                                                                                ))

                                                                                                :

                                                                                                element?.workflows?.length ?
                                                                                                    element?.workflows?.map(workflow => (
                                                                                                        <EditWorkflow
                                                                                                            message={element}
                                                                                                            allMessages={messages}
                                                                                                            indexOfMessage={key}
                                                                                                            item={workflow}
                                                                                                            setDropdownOpenId={setDropdownOpenId}
                                                                                                            dropdownOpenId={dropdownOpenId}
                                                                                                        >
                                                                                                        </EditWorkflow>
                                                                                                    ))

                                                                                                    :
                                                                                                    <div className='flex gap-4 items-center mt-2'>
                                                                                                        <small>LLM</small>
                                                                                                    </div>

                                                                                        }
                                                                                    </div>
                                                                                    <div>
                                                                                        {element?.calls?.length > 0 && <ApiCallInfo calls={element.calls}></ApiCallInfo>}
                                                                                    </div>

                                                                                </div>
                                                                                {<div>

                                                                                </div>}
                                                                            </>
                                                                        }





                                                                        {
                                                                            element.content !== 'OPTIONS' && element.content !== 'PRODUCTS' && element.content !== 'HUMAN-HANDOFF' && element.content !== 'FORM' && element.content.length > 5 &&
                                                                            element.knowledge.length == 0 && element.workflows.length == 0 && element.action == null && element.type == 'action' &&
                                                                            <>


                                                                                {divideAnswer(element)}

                                                                                {
                                                                                    element.type_details == "HUMAN-HANDOFF" &&
                                                                                    <div className="attention_required_answer_contacts">
                                                                                        <button className="tempoWidget-EmailContactButton">
                                                                                            <img src="https://widget-dev.deflection.ai/v1/assets/img/handoff/email.png" className="tempo-widget-csat-contact-icon" alt="rate3" width="20px" />
                                                                                            Email Us
                                                                                        </button>

                                                                                        <button className="tempoWidget-PhoneContactButton">
                                                                                            <img src="https://widget-dev.deflection.ai/v1/assets/img/handoff/phone.png" className="tempo-widget-csat-contact-icon" alt="rate3" width="20px" />
                                                                                            Call Us
                                                                                        </button>
                                                                                    </div>

                                                                                }


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
                                                                                                    <EditKnowledge
                                                                                                        message={element}
                                                                                                        setDropdownOpenId={setDropdownOpenId}
                                                                                                        dropdownOpenId={dropdownOpenId}
                                                                                                        allMessages={messages}
                                                                                                        indexOfMessage={key}
                                                                                                        item={item}
                                                                                                        allKnowledge={allKnowledge}>
                                                                                                    </EditKnowledge>
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
                                                                                    {Object.keys(element.actions.options).map((indx, index) =>
                                                                                        <>
                                                                                            <button className="tempo-widget-options-button" data-options-id="${optionsId}" name={indx}>
                                                                                                {element.actions.options[indx]}
                                                                                                {`     `}
                                                                                                <small>
                                                                                                    {indx == 'WORKFLOW' && element.workflows[0]?.score != null && `${Math.round((element.workflows[0].score * 100))}%`}
                                                                                                    {indx == 'INFORMATION' && element.knowledge[0]?.score != null && `${Math.round((element.knowledge[0].score * 100) + getAddition(key))}%`}
                                                                                                </small>
                                                                                            </button>
                                                                                        </>
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
                                                                                            <EditWorkflow
                                                                                                message={element}
                                                                                                allMessages={messages}
                                                                                                indexOfMessage={key}
                                                                                                item={workflow}
                                                                                                setDropdownOpenId={setDropdownOpenId}
                                                                                                dropdownOpenId={dropdownOpenId}
                                                                                            >
                                                                                            </EditWorkflow>
                                                                                        ))}

                                                                                        {element && element?.knowledge.length > 0 && (
                                                                                            <EditKnowledge
                                                                                                message={element}
                                                                                                allMessages={messages}
                                                                                                indexOfMessage={key}
                                                                                                item={element?.knowledge[0]}
                                                                                                allKnowledge={allKnowledge}
                                                                                                setDropdownOpenId={setDropdownOpenId}
                                                                                                dropdownOpenId={dropdownOpenId}
                                                                                            >
                                                                                            </EditKnowledge>
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
                                                                                        src={`${botUnique?.logo ||
                                                                                            `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />
                                                                                    <div className="answer_text_div"></div>
                                                                                    <div className="answer_text_with_thumbs  !text-sm !font-[400]" style={{ backgroundColor: botUnique?.secondary_color, color: botUnique?.secondary_text_color }} onClick={(e) => copyMessageText(element.content)}>
                                                                                        No problem, I can help you with that! Could you please provide the following information:
                                                                                    </div>
                                                                                </div>

                                                                                <div key={'d' + key} id={'d' + key} className="component_answer" style={{ width: '300px' }}></div>

                                                                                <div className="answer_with_thumbs">

                                                                                    <img className="profile-photo_ChatBot_back"
                                                                                        src={`${botUnique?.logo ||
                                                                                            `${CDN_URL}/v1/assets/img/profileDefault.png`} `} alt="Profile Photo" style={{ width: "35px" }} />

                                                                                    <div className="tempo-widget-custom-form">
                                                                                        {Object.keys(element.actions).map(obj => {
                                                                                            const elementData = element.actions[obj];
                                                                                            const elementId = `tempo-widget-custom-form-${obj}`;

                                                                                            return (
                                                                                                <>
                                                                                                    <div id='' key={obj}>
                                                                                                        <label className="tempo-widget-custom-form-label text-black">
                                                                                                            {capitalizeFirstLetter(elementData.name)}
                                                                                                        </label>

                                                                                                        {elementData.type === "select" && (
                                                                                                            <div id={elementId} className="tempo-widget-custom-form-buttons">
                                                                                                                <button
                                                                                                                    className={`tempo-widget-custom-form-button tempo-widget-custom-form-button-${obj}`}
                                                                                                                    data-value="Yes"
                                                                                                                    id={`custom-form-yes-button-${obj}`}
                                                                                                                >
                                                                                                                    Yes
                                                                                                                </button>
                                                                                                                <button
                                                                                                                    className={`tempo-widget-custom-form-button tempo-widget-custom-form-button-${obj}`}
                                                                                                                    data-value="No"
                                                                                                                    id={`custom-form-no-button-${obj}`}
                                                                                                                >
                                                                                                                    No
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        )}

                                                                                                        {elementData.type === "multiselect" && (
                                                                                                            <div id={elementId} className="tempo-widget-custom-form-buttons">
                                                                                                                {elementData.options.map(option => (
                                                                                                                    <button
                                                                                                                        key={`${obj}_${elementData.name}_${option}`}
                                                                                                                        className={`tempo-widget-custom-form-button tempo-widget-custom-form-button-${obj}`}
                                                                                                                        data-value={option}
                                                                                                                        id={`${obj}_${elementData.name}_${option}`}
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
                                                                                                                value={getValueBasedInNextMessage(elementData, key) || ''}
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
                                                                                                <EditWorkflow
                                                                                                    message={element}
                                                                                                    allMessages={messages}
                                                                                                    indexOfMessage={key}
                                                                                                    item={workflow}
                                                                                                    setDropdownOpenId={setDropdownOpenId}
                                                                                                    dropdownOpenId={dropdownOpenId}
                                                                                                >
                                                                                                </EditWorkflow>
                                                                                            ))}

                                                                                            {element && element?.knowledge.length > 0 && (
                                                                                                <EditKnowledge
                                                                                                    message={element}
                                                                                                    allMessages={messages}
                                                                                                    indexOfMessage={key}
                                                                                                    item={element?.knowledge[0]}
                                                                                                    allKnowledge={allKnowledge}
                                                                                                    setDropdownOpenId={setDropdownOpenId}
                                                                                                    dropdownOpenId={dropdownOpenId}
                                                                                                >
                                                                                                </EditKnowledge>
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



                                                            {element.sender === 'user' && !(element.content.startsWith('{') && element.content.endsWith('}')) &&
                                                                (
                                                                    <div key={'tempoWidgetQuestion' + key} className="chatbotWidget_question" id={`tempoWidgetQuestion${key}`} style={{ backgroundColor: botUnique?.primary_color, color: botUnique?.primary_text_color }}>

                                                                        {
                                                                            (element.content == 'WORKFLOW' || element.content.startsWith('WORKFLOW')) &&
                                                                            <>
                                                                                User selected: {
                                                                                    messages[key - 1]?.actions?.options ?
                                                                                        (messages[key - 1].actions.options[element.content] || 'WORKFLOW') :
                                                                                        'WORKFLOW'
                                                                                }
                                                                            </>
                                                                        }

                                                                        {
                                                                            (element.content == 'INFORMATION' || element.content.startsWith('INFORMATION')) &&
                                                                            <>
                                                                                User selected: {
                                                                                    messages[key - 1]?.actions?.options ?
                                                                                        (messages[key - 1].actions.options[element.content] || 'INFORMATION') :
                                                                                        'INFORMATION'
                                                                                }
                                                                            </>
                                                                        }

                                                                        {
                                                                            element.content == 'HUMAN-HANDOFF' &&
                                                                            <>
                                                                                {element.human_handoff_type && element.human_handoff_type == 'email' ?
                                                                                    `HUMAN-HANDOFF: User filled human escalation form and was transferred by ${element.human_handoff_type}.`
                                                                                    :
                                                                                    'HUMAN-HANDOFF: User clicked phone option and phone number was shown.'
                                                                                }
                                                                            </>
                                                                        }

                                                                        {
                                                                            element.content !== 'WORKFLOW' && element.content !== 'INFORMATION' && element.content !== "HUMAN-HANDOFF" && element.content !== 'PRODUCTS' && !element.content.startsWith('WORKFLOW') && !element.content.startsWith('INFORMATION') &&
                                                                            <>
                                                                                {conversationDetails?.type == 'email' && key == 0 ? removeFirstParagraph(element.content) : element.content}
                                                                            </>
                                                                        }

                                                                        {/* <div className="title-element-left" style={{ display: "none" }}>14:11</div> */}
                                                                    </div>
                                                                )}

                                                        </>
                                                    )}
                                                </>
                                            }

                                        </div >

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >

                    {!isShowWorkflowLogsUI &&
                        <div className="flex items-center space-x-2 mt-4 justify-start pb-5 my-5">


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
                    }
                </div >

            }
        </>
    )
}

export default Chat