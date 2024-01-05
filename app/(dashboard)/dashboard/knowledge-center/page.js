"use client";
import React, { useEffect, useRef, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CheckCircleIcon, CheckIcon, ClipboardIcon, InformationCircleIcon, LinkIcon, PencilSquareIcon, PlusCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TextField from "@/app/components/Common/Input/TextField";
import { GetAllRecommendations, acceptInKnowledge, excludeRecommendationRecord, expandRecommendationRecord, updateRecommendationRecord } from "@/app/API/pages/LearningCenter";
import { ToastContainer } from 'react-toastify';
import { successMessage, errorMessage } from "@/app/components/Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { editRecommendation, fetchRecommendation } from "@/app/components/store/slices/recommendation";
import { ColorRing } from "react-loader-spinner";
import { getFaqQuestions, getKnowledgeData, patchKnowledgeQuestion, searchMatchesFaqQuestions } from "@/app/API/pages/Knowledge";
import { fetchWorkflows } from "@/app/components/store/slices/workflowSlice";
import { updateWorkFlowStatus } from "@/app/API/pages/Workflow";
import { makeCapital } from "@/app/components/helper/capitalName";
import Link from "next/link";
import TopBar from "@/app/components/Common/Card/TopBar";
import TextArea from "@/app/components/Common/Input/TextArea";
import { isMobile } from "react-device-detect";
import SideModal from "@/app/components/SideModal/SideModal";
import { fetchFaqQuestions } from "@/app/components/store/slices/questionsSlice";
import { searchReccomodationWorkflow } from "@/app/API/pages/NagetiveWorkflow";
import { addHumanHandoffWorkflowData } from "@/app/API/pages/HumanHandoff";
import Pusher from 'pusher-js';
import { v4 as uuidv4 } from 'uuid';
import Modal from "@/app/components/Common/Modal/Modal";
import TextEditor from "@/app/components/URL/Richtext";
import AnswersEditor from "./AnswersEditor";
import { useSearchParams, useRouter } from "next/navigation";
import FaqHistoryTab from "@/app/components/LearningCenter/FaqHistoryTab";
import SelectOption from "@/app/components/Common/Input/SelectOption";

const pusher = new Pusher("1fc282a0eb5e42789c23", {
    cluster: "mt1",
});


const Page = () => {

    const params = useSearchParams()
    const router = useRouter();

    const workflowState = useSelector(state => state.workflow);
    const [pageVal1, setPageVal1] = useState(1)
    const [updateLoader, setUpdateLoader] = useState(false);
    const [updateLoader1, setUpdateLoader1] = useState(false);
    const [modal, setModal] = useState(false);
    const [link, setLink] = useState({
        url: '',
        links: [],
        index: null,
        edit: false
    });
    const [explandLoader, setExplandLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [pageVal, setPageVal] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingContentPage, setLoadingContentPage] = useState(true);
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const [tabLoader, setTabLoader] = useState(true);
    const [knowledge, setKnowledge] = useState([])
    const [basicFormData, setBasicFormData] = useState({})
    const [workflow, setWorkflow] = useState([])
    const [recommendationOrderBy, setRecommendationOrderBy] = useState('&ordering=-number_of_messages');
    const [search, setSearch] = useState('');
    const [searchKnowledge, setSearchKnowledge] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const faqQuestionState = useSelector((state) => state.faqQuestions);
    const [workflowView, setWorkflowView] = useState(null)
    const [show, setShow] = useState(null)
    const [knowledgeId, setKnowledgeId] = useState(null)
    const [mode, setMode] = useState('normal')
    const [answer, setAnswer] = useState('')
    const [workFlowData, setWorkFlowData] = useState({
        name: "",
        id: "",
        accepted_loader: false,
        submit_loader: false,
        name: "",
        workflow: [],
        showInput: false,
        answer: '',
        target: "workflow",
        workflowValue: null,
        reccomodation: []
    })
    const [questionData, setQuestionData] = useState([])
    const [workflowValue, setWorkflowValue] = useState(null)
    const [subQuestions, setSubQuestions] = useState([])
    const [newUUI, setNewUUI] = useState('')
    const [pusherStreaming, setPusherStreaming] = useState(false)
    const [externalContentForTextEditor, setExternalContentForTextEditor] = useState('')
    const [defaultTitle, setDefaultTitle] = useState('Recommended')
    const firstRender = useRef(true);
    const [tab, setTab] = useState(1)
    const [loadingChangeAnswer, setLoadingChangeAnswer] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(null);
    const [currentFilters, setCurrentFilters] = useState({
        page: 1,
        page_size: 10,
        created__gte: null,
        created__lte: null,
        search: '',
        ordering: '-number_of_messages',
    })

    function buildQueryString(filters) {
        const queryString = Object.entries(filters)
          .filter(([key, value]) => value !== null && value !== undefined && value !== '')
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
      
        return `?${queryString}`;
      }

    const checkValue = (str) => {
        if (str.length < 2) {
            return false
        }
        return true
    }
    const getAllWorkflowData = async () => {
        dispatch(fetchWorkflows)
    }

    useEffect(() => {
        getAllWorkflowData();
        if (workflowState) {
            manageData()
        }

        let newUUID = uuidv4()
        setNewUUI(newUUID)

        const externalQuestionFromLogs = sessionStorage.getItem('externalQuestionFromLogs');
        const parsedItem = JSON.parse(externalQuestionFromLogs)

        let timeoutId;
        const channel = pusher.subscribe(`recommendation-${newUUID}`);
        channel.bind('messages', data => {
            clearTimeout(timeoutId);
            setPusherStreaming(true)
            setAnswer(prev => prev + data.message);

            setExternalContentForTextEditor(prev => prev + data.message)

            timeoutId = setTimeout(() => {
                setPusherStreaming(false)
            }, 2000);
        })

    }, [workflowState])

    const manageData = () => {
        const result = workflowState?.data?.results?.filter((x) => x.active === true);
        setWorkFlowData((prev) => {
            return {
                ...prev,
                workflow: result ?? []
            }
        })
    }

    const updateButtonHandler = async (id, new_answer = null) => {
        try {
            const row = state?.data?.results.find(item => item.id === id);
            const inputValue = answer ? answer : new_answer
            if (inputValue === '' || inputValue === undefined) {
                return false;
            }
            let payload = {
                answer: inputValue
            }
            setUpdateLoader(true);
            setUpdateLoader1(true);

            let updateRecord;

            if (new_answer) {
                updateRecord = await acceptInKnowledge(workflowView.id, subQuestions[0].data.id)
            } else {
                updateRecord = await updateRecommendationRecord(payload, id);
            }

            if (updateRecord?.status === 201 || updateRecord?.status === 200) {
                setWorkflowView(null)
                setKnowledgeId(null)
                setUpdateLoader(false);
                setUpdateLoader1(false);
                dispatch(fetchRecommendation());
            } else {
                errorMessage("Unable to Update!");
                setUpdateLoader(false);
                setUpdateLoader1(false);
            }
        } catch (error) {
            setUpdateLoader(false);
            setUpdateLoader1(false);
        }
    };

    const deleteButtonHandler = async (id) => {
        
        setDeleteLoader(id)
        console.log("id", id);
        try {
            const excludeRecord = await excludeRecommendationRecord(id);
            if (excludeRecord?.status === 204) {
                const response = await GetAllRecommendations()
                console.log("response", response)
                if (response) {
                    dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
                }
                setDeleteLoader(null)
            } else {
                errorMessage("Unable to Delete!");
                setDeleteLoader(null)
            }
        } catch (error) {
            setDeleteLoader(null);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setLoadingContentPage(false);
        }, 500);
    }, [])




    const divRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                // setOpenWorkflow(null);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const customStyles = {
        rows: {
            style: {
                minHeight: 'auto', // override the row height
                // maxHeight: '100%', // override the row height
                // paddingTop: "10px",
                // paddingBottom: "10px",
                height: "auto",


            },
        }
    };



// const handleLogsRedirection=(row)=>{
//     console.log("rowww", row.messages)

// router.push(`/dashboard/analytics?id=${row.messages[0].conversation}`)

// }

    const columns = [
        {
            name: <p className="font-[600]">Question</p>,
            id: "question",
            selector: 'question',
            sortable: false,
            minWidth: "200px",
            reorder: true,
            cell: (row) => (
                <p style={{ paddingTop: '15px', paddingBottom: '15px', width: "85%" }} data-tag="allowRowEvents" className='whitespace-normal' onClick={() => {
                    setWorkflowView(row)
                    setShow(true)
                    setAnswer('')
                    setQuestionData([])
                    setSearchKnowledge('')
                    setKnowledgeId(null)
                    getWorkFlowReccomodation(row.question)
                    searchMatched({
                        question: row.question
                    }, false)
                }}> {row.question}</p >
            )
        },
        // {
        //     name: <p className="font-[600] m">Count</p>,
        //     selector: 'number_of_messages',
        //     sortable: true,
        //     reorder: true,
        //     width: "100px",
        //     center: true,
        //     hide: "sm",
        //     style: { paddingRight: "25px" }
        // },
        {
            name: <p className="font-[600] ">Created</p>,
            id: "created",
            selector: 'question',
            sortable: false,
            minWidth: "150px",
            reorder: true,
            cell: (row) => (
                <>

                    <p style={{ paddingTop: '15px', paddingBottom: '15px', color:"#626060" }} data-tag="allowRowEvents" className='whitespace-normal sm:mr-[0rem] mr-[3rem]'> {formatISODate(row.created)}</p >
                </>

            )
        },
         
        {
            name: <p className="font-[600] ">Source</p>,
            center: true,
            cell: (row, index) => (
                <>
                   <div style={{ paddingTop: '15px', paddingBottom: '15px', margin:"auto" }}  className={`${row.messages.length ? "text-primary cursor-pointer p-[5px]" : "text-[black]"}`}>{row.messages.length  ? <Link href={`/dashboard/analytics?recommendation_id=${row.id}&count=${row.messages.length}`}> {row.number_of_messages}  conv</Link>  : <p>Uploaded</p>}</div>
                </>
            ),
        },

    

        {
            name: "",
            center: true,
            cell: (row, index) => (

                <>

                {deleteLoader }
                    <div className="flex justify-center items-center gap-4 w-[100%]" onClick={(e) => {
                        setWorkflowView(row)
                        searchMatched({ question: row.question }, false)
                        getWorkFlowReccomodation(row.question)
                        setShow(true)
                        setAnswer('')
                        setQuestionData([])
                        setSearchKnowledge('')
                        setKnowledgeId(null)
                    }}>
                        {
                            row?.accepted === false && (
                                <>
                                
                                    <div>
                                        <button type="button">
                                            <PlusCircleIcon className="h-6 w-6 text-[#0000ffad] " />
                                        </button>
                                    </div>
                                    <>
                                        {deleteLoader === row.id ?
                                            <ColorRing
                                                height="30"
                                                width="30"
                                                color="#2563eb"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperClass="text-center"
                                                visible={true}
                                            /> :
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteButtonHandler(row.id);
                                                    }}
                                                >
                                                    <XCircleIcon className="h-6 w-6 text-[#626060] " /> 
                                                </button>
                                            </div>
                                        }
                                    </>
                                </>
                            )
                        }
                    </div>
                </>
            ),
        },

    ];

console.log("result", state?.data?.results);

    function formatISODate(isoDate) {
        // Crear un objeto de fecha a partir de la fecha en formato ISO
        const date = new Date(isoDate);

        // Opciones para formatear la fecha
        const options = {
            year: '2-digit',
            month: 'numeric',  // Use 'numeric' instead of '2-digit'
            day: 'numeric',    // Use 'numeric' instead of '2-digit'
         
        };

        // Formatear la fecha
        return date.toLocaleString('en-US', options).replace(',', '');
    }


    const handleRecomodationValue = async (page) => {
        setLoadingContentPage(true)
        setPageVal(page)

        setCurrentFilters({ ...currentFilters, page: page })

        const query = buildQueryString({ ...currentFilters, page: page })
        const response = await GetAllRecommendations(query)
        if (response) {
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
            setLoadingContentPage(false)
        } else {
            setLoadingContentPage(false)
        }
    }

    const handleSort = async (column, sortDirection) => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (column && column?.selector === 'number_of_messages') {
            setLoadingContentPage(true)
            const queryParam = sortDirection === 'asc' ? 'number_of_messages' : '-number_of_messages';
            setRecommendationOrderBy(queryParam);
            
            setCurrentFilters({ ...currentFilters, ordering: queryParam })

            let query = buildQueryString({...currentFilters, ordering: queryParam })

            const response = await GetAllRecommendations(query)

            if (response) {
                dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
                setLoadingContentPage(false)
            }
        }
    };

    const getReccomodationByTime = async (filterDate) => {
        setLoadingContentPage(true)
        let response = null
        if (filterDate) {
            const query = buildQueryString({
                ...currentFilters,
                created__gte: filterDate?.created__gte,
                created__lte: filterDate?.created__lte
            }) 

            response = await GetAllRecommendations(query)
        } else {
            const query = `&page=${pageVal}&page_size=${perPage}${recommendationOrderBy}`
            response = await GetAllRecommendations(query)
        }

        if (response) {
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
            setLoadingContentPage(false)
        }
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoadingContentPage(true)
        setPageVal(page)

        setCurrentFilters({ ...currentFilters,page: page, page_size: newPerPage })

        const query = buildQueryString({
            ...currentFilters,
            page: page,
            page_size: newPerPage
        })
        const response = await GetAllRecommendations(query)
        setPerPage(newPerPage)
        if (response) {
            setLoadingContentPage(false)
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
        } else {
            setLoadingContentPage(false)
        }
    }

    const handleChange = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);

        // Clear the previous timeout to prevent rapid search requests
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout to perform the search after a delay (e.g., 300 milliseconds)
        const newTypingTimeout = setTimeout(() => {
            performSearch(searchText);
        }, 1000);

        setTypingTimeout(newTypingTimeout);
    };

    const performSearch = async (text) => {
        setLoadingContentPage(true)

        setCurrentFilters({ ...currentFilters, search: text })

        const query = buildQueryString({
            ...currentFilters,
            search: text
        })

        const response = await GetAllRecommendations(query)
        if (response) {
            setLoadingContentPage(false)
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
        } else {
            setLoadingContentPage(false)
        }
    };
    const searchQuestionFaq = async (value) => {
        const response = await getFaqQuestions(`page=1&page_size=10&search=${value}`)
        if (response && response.results) {
            setQuestionData(response.results ?? [])
        }
    }
    const searchFaqs = (e) => {
        const searchText = e.target.value;
        setSearchKnowledge(searchText);
        if (searchText === '') {
            searchMatched({ question: workflowView.question }, false)
            setKnowledgeId(null)
            setQuestionData([])
            setDefaultTitle('Recommended')
        } else {
            setKnowledgeId(null)
            setAnswer('')
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            const newTypingTimeout = setTimeout(() => {
                searchQuestionFaq(searchText)
            }, 1000);

            setTypingTimeout(newTypingTimeout);
        }

    }




    const updateFaq = async (new_answer = null) => {
        const response = await patchKnowledgeQuestion({ answer: answer ? answer : new_answer }, knowledgeId.id)
        if (response.status === 200 || response.status === 201) {
            setUpdateLoader(false)
            setUpdateLoader1(false)
            setWorkflowView(null)
            setKnowledgeId(null)
        } else {
            setUpdateLoader(false)
            setUpdateLoadesetUpdateLoader1(false)
        }
    }
    const SubmitTheForm = () => {
        setUpdateLoader(true)
        setLoadingChangeAnswer(true)
        if (knowledgeId) {
            updateFaq()
        } else {
            updateButtonHandler(workflowView.id)
        }

        setLoadingChangeAnswer(false)
    }

    const SubmitTheFormExpand = async () => {
        setExplandLoader(true)
        let payload = {
            question: workflowView?.question,
            answer: answer
        }
        const resposne = await expandRecommendationRecord(payload)
        if (resposne.status === 200 || resposne.status === 201) {
            setUpdateLoader(false)
            setUpdateLoader1(false)
            setExplandLoader(false)
            setAnswer(resposne.data.answer)
            setMode("normal")
        } else {
            setExplandLoader(false)
        }
    }

    const SubmitTheAnswerForm = (new_answer) => {

        setUpdateLoader1(true)
        if (knowledgeId) {
            updateFaq(new_answer)
        } else {
            updateButtonHandler(workflowView.id, new_answer)
        }
    }
    const getWorkFlowReccomodation = async (question) => {
        const response = await searchReccomodationWorkflow('search=' + question)
        
        setWorkFlowData((prev) => {
            return {
                ...prev,
                reccomodation: response
            }
        })
    }


    const [subQuestionLoading, setSubQuestionLoading] = useState(false)
    const searchMatched = async (element, showknowledge = true) => {

        setSubQuestionLoading(true)
        if (showknowledge) {
            setKnowledgeId(element)
        }
        let queryParam = 'search=' + element.question
        const response = await searchMatchesFaqQuestions(queryParam)
        if (response && response.length > 0) {
            setSubQuestions(response)
            setSubQuestionLoading(false)
            setAnswer('')
        } else {
            setSubQuestions([])
            setAnswer(element.answer)
            setSubQuestionLoading(false)
        }
        setSubQuestionLoading(false)
    }

    const handleWorkflow = async (workflow_data) => {
        setWorkFlowData((prev) => {
            return {
                ...prev,
                accepted_loader: true
            }
        })
        let descriptions = workflow_data.answer.split('\n')
        let Payload = {
            description: descriptions.filter((x) => x !== ''),
        }
        const response = await updateWorkFlowStatus(Payload, workflow_data.workflowValue.id)
        if (response.status === 200 || response.status === 201) {
            const excludeRecord = await excludeRecommendationRecord(workflowView.id);
            if (excludeRecord?.status === 204) {
                dispatch(fetchRecommendation());
                setWorkflowView(null)
                setKnowledgeId(null)
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        name: "",
                        id: "",
                        name: "",
                        submit_loader: false,
                        accepted_loader: false,
                        showInput: false,
                        answer: '',
                        target: "workflow",
                        workflowValue: null,
                    }
                })
            } else {
                errorMessage(response.response.data.description)
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        accepted_loader: false
                    }
                })
            }
        }

    }
    const submitWorkflowTrigger = async (workFlowData1) => {
        setWorkFlowData((prev) => {
            return {
                ...prev,
                submit_loader: true
            }
        })
        if (workFlowData1.target === "workflow") {
            let descriptions = workFlowData1.answer.split('\n')
            let Payload = {
                description: descriptions.filter((x) => x !== ''),
            }
            const response = await updateWorkFlowStatus(Payload, workFlowData1.workflowValue.id)
            if (response.status === 200 || response.status === 201) {
                const excludeRecord = await excludeRecommendationRecord(workflowView.id);
                if (excludeRecord?.status === 204) {
                    dispatch(fetchRecommendation());
                    setWorkflowView(null)
                    setKnowledgeId(null)
                    setWorkFlowData((prev) => {
                        return {
                            ...prev,
                            name: "",
                            id: "",
                            name: "",
                            submit_loader: false,
                            accepted_loader: false,
                            showInput: false,
                            answer: '',
                            target: "workflow",
                            workflowValue: null,
                        }
                    })
                } else {
                    errorMessage(response.response.data.description)
                    setWorkFlowData((prev) => {
                        return {
                            ...prev,
                            submit_loader: false
                        }
                    })
                }
            }
        } else if (workFlowData1.target === "human_handoff") {
            let payload = {
                search: workflowView?.question,
                recommendation: workflowView.id
            }
            const response = await addHumanHandoffWorkflowData(payload)
            if (response.status === 201 || response.status === 200) {
                dispatch(fetchRecommendation());
                setWorkflowView(null)
                setKnowledgeId(null)
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        name: "",
                        id: "",
                        name: "",
                        submit_loader: false,
                        accepted_loader: false,
                        showInput: false,
                        answer: '',
                        target: "workflow",
                        workflowValue: null,
                    }
                })
            } else {
                setWorkFlowData((prev) => {
                    return {
                        ...prev,
                        submit_loader: false
                    }
                })
            }
        }
    }



    const getExpandedAnswer = async () => {
        let answerBackup = answer
        setAnswer('')
        setExternalContentForTextEditor('')

        const response = await expandRecommendationRecord({
            question: workflowView?.question,
            answer: answerBackup,
            streaming: true,
            id: `recommendation-${newUUI}`
        })

        // let newUUID = uuidv4()
        // setNewUUI(newUUID)

        // const channel = pusher.subscribe(`recommendation-${newUUID}`);
        // channel.bind('messages', data => {
        //     setAnswer(prev => prev + data.message);
        // })
    }

    // const sendQuestionToPusher = async () => {
    //     setAnswer('')
    //     await expandRecommendationRecord({
    //         question: "How do I sign up?",
    //         answer: "Go to your profile",
    //         streaming: true,
    //         id: `recommendation-${newUUI}`
    //     })
    // }


    const handleTextEditorChange = (content) => {
        if (content) {
            setMode("expand")
        } else {
            setMode("normal")
        }
        setAnswer(content)
    }

    const handleSwapRecommendedXSearch = (element) => {
        setSubQuestions([{
            "data": element,
            "score": 1
        }]);
        setDefaultTitle('Selected')
    }


    const handlemouseOver = (id) => {
        console.log("mouse", id)
        setIsMouseOver(id)
    }

    const handlemouseLeave = (id) => {
        // setIsMouseOver(null);
    }


    const DateValues = ["Filter by date", "Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month", "Last 3 Months", "This Year", "Last Year"]

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        const value = event.target.value
        if (value === "Filter by date") {
            // dispatch(fetchWorkflows)
            const query = buildQueryString(currentFilters)
            
            setSelectedOption("");
            getReccomodationByTime(query)
        } else {
            setSelectedOption(value);
            const dates = getDatesForOption(value);
            if (dates) {
                setCurrentFilters({
                    ...currentFilters,
                    created__gte: dates.created__gte,
                    created__lte: dates.created__lte
                })
                getReccomodationByTime(dates)
            }
        }

    };

    const getDatesForOption = (option) => {
        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let startDate, endDate;
        if (option === "Filter by date") {
            return null
        }
        switch (option) {
            case 'Today':
                startDate = endDate = today;
                break;
            case 'Yesterday':
                startDate = endDate = new Date(today.setDate(today.getDate() - 1));
                break;
            case 'Last 7 Days':
                startDate = new Date(today.setDate(today.getDate() - 7));
                endDate = currentDate;
                break;
            case 'Last 30 Days':
                startDate = new Date(today.setDate(today.getDate() - 30));
                endDate = currentDate;
                break;
            case 'This Month':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = currentDate;
                break;
            case 'Last Month':
                startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                endDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            case 'Last 3 Months':
                startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
                endDate = currentDate;
                break;
            case 'This Year':
                startDate = new Date(today.getFullYear(), 0, 1);
                endDate = currentDate;
                break;
            case 'Last Year':
                startDate = new Date(today.getFullYear() - 1, 0, 1);
                endDate = new Date(today.getFullYear() - 1, 11, 31);
                break;
            default:
                // Default to today if no option is matched
                startDate = endDate = currentDate;
                break;
        }

        return {
            created__gte: startDate.toISOString().split('T')[0],
            created__lte: endDate.toISOString().split('T')[0]
        };

    };

    const formatArrayData = (data) => {
        return data.map((item) => {
            if(item?.number_of_messages == 0){
                return {
                    ...item,
                    number_of_messages: "-"
                }
            }else{
                return item
            }
        })
    }

    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <TopBar loader={loading} title={`Learning Center`} icon={<AcademicCapIcon className="h-5 w-5 text-primary" />} />

                <div className={false ? "my-2 mb-5" : "border-b-2 border-border dark:border-gray-700 flex items-center justify-between my-2 mb-5"}>

                    <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                        <li className={`  ${tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                            setTab(1)
                        }}>
                            {loading ?
                                <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                :
                                <span
                                    className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                                                rounded-lg active  group`}
                                    aria-current="page"
                                >
                                    FAQs
                                </span>
                            }
                        </li>

                        {/* <li className={`  ${filterhead === "External" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { */}
                        <li className={`${tab === 2 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {

                            setTab(2)
                        }}>
                            {loading ?
                                <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                                :
                                <span
                                    className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                                                rounded-lg active  group`}
                                    aria-current="page"
                                >
                                    History
                                </span>
                            }
                        </li>

                    </ul>

                </div>



                {tab == 2 &&
                    <>
                        <FaqHistoryTab></FaqHistoryTab>
                    </>
                }




                {tab == 1 &&
                    <>
                        {/* <div className='flex w-full m-auto justify-center'>
                            <p className="text-sm p-2 m-auto opacity-80  text-[#333333]" style={{ fontFamily: 'sans-serif' }}>
                                Questions your customers have asked that Deflection AI does not know how to answer
                            </p>
                        </div> */}

                        <div className="flex justify-end gap-4 items-center sm:mt-[20px] !w-[97.5%]">
                            <div className="w-full sm:w-[16%]">
                                <SelectOption
                                    onChange={(e) => handleSelectChange(e)}
                                    value={selectedOption || ""}
                                    name="filtering"
                                    values={DateValues.map((e) => { return { name: e, value: e } })}
                                    title={""}
                                    id={"filtering"}
                                    className="!py-[4px] !px-[8px] !rounded-md !m-0 focus:!py-1.5  focus:!m-0 focus:shadow-none"
                                    error={""}
                                    showOption={false}
                                />
                            </div>
                            <div className='flex justify-end gap-4 items-center '>
                                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                {loading ? "" :
                                    <div className="relative w-full sm:w-[unset]">


                                        <input type="search" id="search" className="border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px] pr-[25px]" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                                        <div className="absolute inset-y-0 right-[10px] flex items-center pl-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className=" sm:mt-[20px] abc">
                            <DataTable
                                title={''}
                                fixedHeader
                                highlightOnHover
                                pointerOnHover
                                pagination
                                columns={columns}
                                // onRowMouseEnter={(e) => handlemouseOver(e.id)}
                                // onRowMouseLeave={(e) => handlemouseLeave(e.id)}
                                noDataComponent={<><p className="text-center text-xs p-3">Questions Deflection AI needs your help answering will show here when they're ready!</p></>}
                                data={formatArrayData(state?.data?.results || [])}
                                progressPending={loadingContentPage}
                                progressComponent={
                                    <div className="w-full mt-3 relative">
                                        <SkeletonLoader count={11} height={30} width="100%" className={"mt-2"} />
                                    </div>}
                                paginationDefaultPage={pageVal}
                                paginationPerPage={perPage}
                                paginationTotalRows={state?.data?.count}
                                paginationServer
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={(page) => {
                                    handleRecomodationValue(page)
                                }}
                                onRowClicked={(rowData) => {
                                    setWorkflowView(rowData)
                                    setShow(true)
                                    setAnswer('')
                                    setQuestionData([])
                                    setSearchKnowledge('')
                                    setKnowledgeId(null)
                                    getWorkFlowReccomodation(rowData.question)
                                    searchMatched({ question: rowData.question }, false)
                                }}
                                paginationRowsPerPageOptions={[5, 10, 20, 30]}
                                className={`${state?.data?.results?.length <=5 ? "h-[300px] sm:h-[400px] overflow-y-scroll":"h-auto"}  !w-[95%] !m-[auto]   myDataTable`}
                                sortServer
                                onSort={handleSort}
                                customStyles={customStyles}
                                defaultSortAsc={false}
                            />
                        </div>

                        {workflowView && show && (
                            <AnswersEditor
                                setShow={setShow}
                                setWorkflowView={setWorkflowView}
                                setKnowledgeId={setUpdateLoader}
                                setUpdateLoader={setUpdateLoader}
                                setUpdateLoader1={setUpdateLoader1}
                                setExternalContentForTextEditor={setExternalContentForTextEditor}
                                workflowView={workflowView}
                                knowledgeId={knowledgeId}
                                questionData={questionData}
                                setQuestionData={setQuestionData}
                                setAnswer={setAnswer}
                                setSubQuestions={setSubQuestions}
                                handleSwapRecommendedXSearch={handleSwapRecommendedXSearch}
                                subQuestions={subQuestions}
                                subQuestionLoading={subQuestionLoading}
                                defaultTitle={defaultTitle}
                                updateLoader1={updateLoader1}
                                updateLoader={updateLoader}
                                SubmitTheAnswerForm={SubmitTheAnswerForm}
                                link={link}
                                setLink={setLink}
                                setModal={setModal}
                                modal={modal}
                                handleTextEditorChange={handleTextEditorChange}
                                externalContentForTextEditor={externalContentForTextEditor}
                                answer={answer}
                                SubmitTheForm={SubmitTheForm}
                                getExpandedAnswer={getExpandedAnswer}
                                pusherStreaming={pusherStreaming}
                                setWorkFlowData={setWorkFlowData}
                                workFlowData={workFlowData}
                                submitWorkflowTrigger={submitWorkflowTrigger}
                                searchKnowledge={searchKnowledge}
                                setSearchKnowledge={setSearchKnowledge}
                                mode={mode}
                                setMode={setMode}
                                searchFaqs={searchFaqs}
                                handleWorkflow={handleWorkflow}
                                setSubQuestionLoading={setSubQuestionLoading}
                            >

                            </AnswersEditor>
                        )}
                    </>}





            </div >
            <ToastContainer />


        </>
    );
};

export default Page;



