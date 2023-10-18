"use client";
import React, { useEffect, useRef, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CheckCircleIcon, CheckIcon, ClipboardIcon, LinkIcon, PencilSquareIcon, PlusCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TextField from "@/app/components/Common/Input/TextField";
import { GetAllRecommendations, excludeRecommendationRecord, expandRecommendationRecord, updateRecommendationRecord } from "@/app/API/pages/LearningCenter";
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

const pusher = new Pusher("1fc282a0eb5e42789c23", {
    cluster: "mt1",
});


const Page = () => {


    const workflowState = useSelector(state => state.workflow);
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
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const [tab, setTab] = useState(0);
    const [tabLoader, setTabLoader] = useState(true);
    const [knowledge, setKnowledge] = useState([])
    const [basicFormData, setBasicFormData] = useState({})
    const [workflow, setWorkflow] = useState([])
    const [recommendationOrderBy, setRecommendationOrderBy] = useState('&ordering=number_of_messages');
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


    const getData = async () => {
        setTabLoader(true);
        const response = await getKnowledgeData()
        if (response?.data?.results.length > 0) {
            setKnowledge(response?.data?.results)
            setBasicFormData((prev) => {
                return {
                    ...prev,
                    knowledge: response?.data?.results
                }
            })
            setTabLoader(false);
        } else {
            setBasicFormData(prev => {
                return {
                    ...prev,
                    knowledgeData: []
                }
            })
            setTabLoader(false);
        }
    }
    useEffect(() => {
        getData()
    }, [])
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
            const updateRecord = await updateRecommendationRecord(payload, id);
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
        try {
            const excludeRecord = await excludeRecommendationRecord(id);
            if (excludeRecord?.status === 204) {
                dispatch(fetchRecommendation());
                // successMessage("Question Deleted Successfully");
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
        }, 1200);
    }, [])




    const divRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setOpenWorkflow(null);
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
                paddingTop: "10px",
                paddingBottom: "10px",
                height: "auto"
            },
        }
    };

    const columns = [
        {
            name: "Question",
            id: "question",
            selector: 'question',
            sortable: false,
            minWidth: "200px",
            reorder: true,
            cell: (row) => (
                <p data-tag="allowRowEvents" className='whitespace-normal'>{row.question}</p>
            )
        },
        {
            name: "Count",
            selector: 'number_of_messages',
            sortable: true,
            reorder: true,
            width: "100px",
            center: true,
            hide: "sm"
        },
        {
            name: "",
            center: true,
            cell: (row, index) => (
                <div className="flex justify-center items-center gap-4 w-[100%]" >
                    {
                        row?.accepted === false && (
                            <>


                                <div>
                                    <button type="button" onClick={(e) => {
                                        setWorkflowView(row)
                                        searchMatched({ question: row.question }, false)

                                        getWorkFlowReccomodation(row.question)
                                        setShow(true)
                                        setAnswer('')
                                        setQuestionData([])
                                        setSearchKnowledge('')
                                        setKnowledgeId(null)
                                    }}>
                                        <PlusCircleIcon className="h-6 w-6 text-success " />
                                    </button>
                                </div>

                                {deleteLoader === row.id ?
                                    <ColorRing
                                        height="30"
                                        width="30"
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperClass="text-center"
                                        visible={true}
                                    /> :
                                    <div>
                                        <button type="button" onClick={(e) => deleteButtonHandler(row.id)}>
                                            <XCircleIcon className="h-6 w-6 text-danger " /></button>
                                    </div>
                                }

                            </>
                        )}

                </div>
            ),
        },



    ];

    const handleRecomodationValue = async (page) => {
        setLoading(true)
        setPageVal(page)
        const response = await GetAllRecommendations(page, recommendationOrderBy, perPage)
        if (response) {
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const handleSort = async (column, sortDirection) => {

        setTimeout(async () => {
            if (column?.name === 'Count') {
                setLoading(true)
                try {
                    const queryParam = sortDirection === 'asc' ? '&ordering=number_of_messages' : '&ordering=-number_of_messages';
                    setRecommendationOrderBy(queryParam);
                    const response = await GetAllRecommendations(1, queryParam, perPage)
                    if (response) {
                        dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
                        setLoading(false)
                    }
                } catch (error) {
                    console.log("Error", error)
                    setLoading(false)
                }
            }
        }, 100);
    };
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await GetAllRecommendations(page, recommendationOrderBy, newPerPage)
        setPerPage(newPerPage)
        if (response) {
            setLoading(false)
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
        } else {
            setLoading(false)
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
        setLoading(true)
        const queryParam = `&search=` + text;
        const response = await GetAllRecommendations(1, queryParam, perPage)
        if (response) {
            setLoading(false)
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
        } else {
            setLoading(false)
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
        if (knowledgeId) {
            updateFaq()
        } else {
            updateButtonHandler(workflowView.id)
        }
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
    const submitWorkflowTrigger = async () => {
        setWorkFlowData((prev) => {
            return {
                ...prev,
                submit_loader: true
            }
        })
        if (workFlowData.target === "workflow") {
            let descriptions = workFlowData.answer.split('\n')
            let Payload = {
                description: descriptions.filter((x) => x !== ''),
            }
            const response = await updateWorkFlowStatus(Payload, workFlowData.workflowValue.id)
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
        } else if (workFlowData.target === "human_handoff") {
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

        await expandRecommendationRecord({
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


    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <TopBar title={`Learning Center`} icon={<AcademicCapIcon className="h-5 w-5 text-primary" />} />
                <p className="text-sm p-2">Questions your customers have asked that Tempo does not know how to answer</p>
                <>
                    <div className="w-full sm:relative sm:mt-[20px]">
                        <div className='flex justify-end gap-4 items-center mt-2 px-2 pt-2 sm:absolute sm:right-[0] sm:top-[-15px] sm:z-[2]'>
                            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            {loading ? "" :
                                <div className="relative w-full sm:w-[unset]">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>

                                    <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  !rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                                </div>
                            }
                        </div>

                        <DataTable
                            title={''}
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
                            defaultSortFieldId="number_of_messages"
                            pagination
                            columns={columns}
                            noDataComponent={<><p className="text-center text-xs p-3">Questions Tempo needs your help answering will show here when they're ready!</p></>}
                            data={state?.data?.results}
                            progressPending={loading}
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
                            className=''
                            sortServer
                            onSort={handleSort}
                            customStyles={customStyles}
                            defaultSortAsc={false}
                        />
                    </div>
                </>
                {workflowView && show && (
                    <SideModal
                        deleteButton={true}
                        data={workflowView}
                        deleteRecord={(id) => {
                            deleteButtonHandler(workflowView?.id)
                            setTimeout(() => {
                            setWorkflowView(null)
                            setKnowledgeId(null)
                            setUpdateLoader(false);
                            setUpdateLoader1(false);
                            setShow(false)
                            setExternalContentForTextEditor('')
                            }, 2000);
                        }}
                        setShow={(t) => {
                            setWorkflowView(null)
                            setKnowledgeId(null)
                            setUpdateLoader(false);
                            setUpdateLoader1(false);
                            setShow(false)
                            setExternalContentForTextEditor('')

                        }} heading={<p className="w-full sm:w-[500px]">{workflowView?.question}</p>}>
                        <div className={"border-b-2 my-2 border-border dark:border-gray-700 flex items-center justify-between"}>
                            <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                                <li className={` ${tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(0) }}>

                                    <span
                                        className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                        aria-current="page"
                                    >
                                        Add to Knowledge Base
                                    </span>

                                </li>
                                <li className={`  ${tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                                    setTab(1)
                                }}>

                                    <span
                                        className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                        aria-current="page"
                                    >
                                        Trigger Workflow
                                    </span>

                                </li>


                            </ul>
                        </div>

                        <>

                            {tab === 0 && (
                                <div>
                                    <div className=' mt-2 '>
                                        {subQuestionLoading === true ?
                                            <div className="mt-6">
                                                <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                                    <SkeletonLoader height={20} width={"20%"} />
                                                    <div className="p-2">
                                                        <div className="mt-3">
                                                            <SkeletonLoader height={18} width={"60%"} />
                                                        </div>
                                                        <div className="mt-1">
                                                            <SkeletonLoader height={15} width={"70%"} />
                                                            <SkeletonLoader height={15} width={"50%"} />
                                                            <SkeletonLoader height={15} width={"80%"} />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <SkeletonLoader height={25} width={100} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div> :
                                            <>
                                                {subQuestions.length > 0 && (
                                                    <>
                                                        <div className={`bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                                            <ul className="text-start py-2 text-sm text-gray-700 ">
                                                                <h1 className="text-xs font-semibold">Recommended Answer:</h1>
                                                                {subQuestions.slice(0, 1).map((element, key) =>
                                                                    <li className='p-2 text-justify text-heading my-2 cursor-pointer' key={key}>

                                                                        <p className="text-xs font-semibold">{element.data.question}</p>

                                                                        <p className="text-xs  mt-2">{element.data.answer}</p>
                                                                        <div className='mt-6'>
                                                                            <div className="flex justify-between items-center gap-2">
                                                                                <div onClick={() => {
                                                                                    setAnswer(element.data.answer)
                                                                                    setMode('normal')
                                                                                    setExternalContentForTextEditor(element.data.answer)
                                                                                }} className='text-sm bg-skyblue rounded-xl inline-block p-1 px-2 hover:bg-sky hover:text-white text-sky'>

                                                                                    <button
                                                                                        type={"button"}
                                                                                        className="border-none p-0 m-0 flex gap-1 items-center text-sm"

                                                                                    >
                                                                                        <small className=''>Edit</small>
                                                                                    </button>
                                                                                </div>
                                                                                <div onClick={() => {
                                                                                    if (!updateLoader1) {
                                                                                        SubmitTheAnswerForm(element.data.answer)
                                                                                    }
                                                                                }} className='text-sm bg-skyblue rounded-xl inline-block p-1 px-2 hover:bg-sky hover:text-white text-sky'>
                                                                                    <button
                                                                                        type={"submit"}
                                                                                        className="border-none p-0 m-0 flex gap-1 items-center text-sm"

                                                                                    > <small className=''>{updateLoader1 ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                                    </svg>
                                                                                        <span>Loading...</span> </> : "Accept Answer"}</small>
                                                                                    </button>
                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )}

                                                            </ul>


                                                        </div>
                                                    </>
                                                )}
                                            </>}

                                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  !rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10" placeholder="Search" value={searchKnowledge} onChange={(e) => { searchFaqs(e) }} />
                                        </div>
                                    </div>

                                    {!knowledgeId && questionData.length > 0 && (
                                        <div className={` bg-[#F8F8F8] my-4 rounded-md`}>
                                            <ul className="py-2 text-sm text-gray-700 ">
                                                {questionData.map((element, key) =>
                                                    <li className='hover:bg-primary hover:text-white text-heading my-2 cursor-pointer' key={key} onClick={(e) => {
                                                        setAnswer(element.answer)
                                                        setKnowledgeId(element)

                                                    }}>
                                                        <button type='button' className="block px-4 py-2 text-xs">{element.question}</button>
                                                    </li>
                                                )}

                                            </ul>
                                        </div>
                                    )}

                                    <div>

                                        {knowledgeId && (
                                            <>
                                                <div className={` bg-primary text-white my-4 p-4 rounded-md`}>
                                                    <p className="text-xs">{knowledgeId.question}</p>
                                                </div>

                                            </>
                                        )}
                                        <div className='my-2 relative'>
                                            {link.links.length > 0 && (
                                                <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>

                                                    {link.links.map((element, key) =>
                                                        <div className="flex justify-between items-center my-2" key={key}>
                                                            <a href={element} target="_blank" className="hover:text-primary"> <span className="text-xs font-semibold">{element}</span></a>
                                                            <div className="flex justify-end gap-4 items-center">
                                                                <PencilSquareIcon className="h-4 w-4 text-gray-500 cursor-pointer " onClick={(e) => {
                                                                    setLink((prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            edit: true,
                                                                            index: key,
                                                                            url: element
                                                                        }
                                                                    })
                                                                    setModal(true)

                                                                }}
                                                                />
                                                                <XMarkIcon className="h-4 w-4 cursor-pointer text-gray-500" onClick={() => {
                                                                    let data = link.links.filter((x) => x !== element)
                                                                    setLink((prev) => {
                                                                        return {
                                                                            ...prev,
                                                                            links: data
                                                                        }
                                                                    })

                                                                }
                                                                } />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {/* <TextArea name="answer"
                                                className="py-2 !p-[10px]"
                                                type={"text"}
                                                id={"answer"}
                                                placeholder={"Create new knowledge base entry"}
                                                rows="8"
                                                onChange={(e) => {
                                                    if (e.target.value.length === 1) {
                                                        setMode("expand")
                                                    } else if (e.target.value.length === 0) {
                                                        setMode("normal")
                                                    }
                                                    setAnswer(e.target.value)
                                                }}
                                                value={answer} /> */}

                                            <TextEditor handleTextEditorChange={handleTextEditorChange} externalContent={externalContentForTextEditor} oldContent={answer}></TextEditor>
                                            {/* <button
                                                onClick={(e) => setModal(true)}
                                                type="button"
                                                className="button-link absolute left-[9px] bottom-[9px] cursor-pointer  flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                                                <LinkIcon className="h-4 w-4 text-gray-500" />

                                            </button> */}
                                        </div>


                                        <div className="flex justify-between items-center gap-2">


                                            <button
                                                onClick={(e) => SubmitTheForm()}
                                                type="button"
                                                className="my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={updateLoader || answer === ""}>
                                                {updateLoader ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                    <span>Loading...</span> </> : "Submit"}
                                            </button>
                                            {mode === 'expand' && (
                                                <button
                                                    // onClick={(e) => SubmitTheFormExpand()}
                                                    onClick={getExpandedAnswer}
                                                    type="button"
                                                    className="my-6 flex items-center justify-center text-xs gap-1 text-primary font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 text-whitedisabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={answer === "" || pusherStreaming}>
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
                                                    ) : "Expand Answer"}
                                                </button>

                                            )}
                                        </div>
                                    </div>

                                </div>
                            )}
                            {tab === 1 && (
                                <div>
                                    <div className=' mt-2 '>
                                        {workFlowData.reccomodation.length > 0 && (
                                            <>
                                                <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                                    <ul className="text-start py-2 text-sm text-gray-700 ">
                                                        <h1 className="text-xs font-semibold">Recommended Answer:</h1>
                                                        {workFlowData.reccomodation.slice(0, 1).map((element, key) =>
                                                            <li className='p-2 text-justify text-heading my-2 cursor-pointer' key={key}>
                                                                <p className="text-xs font-semibold">{element?.data?.name}</p>
                                                                <p className="text-xs  mt-2">{element?.data?.description.join('\n')}</p>
                                                                <div className='mt-2'>
                                                                    <div className="flex justify-between items-center gap-2">
                                                                        <div onClick={() => {
                                                                            setWorkFlowData((prev) => {
                                                                                return {
                                                                                    ...prev,
                                                                                    answer: element?.data?.description.join('\n'),
                                                                                    workflowValue: element.data,
                                                                                    showInput: true,
                                                                                    target: 'workflow'

                                                                                }
                                                                            })
                                                                        }}
                                                                            className='text-sm bg-skyblue rounded-xl inline-block p-1 px-2 hover:bg-sky hover:text-white text-sky'>
                                                                            <button
                                                                                type={"button"}
                                                                                className="border-none p-0 m-0 flex gap-1 items-center text-sm"

                                                                            >
                                                                                <small className='' >Edit</small>
                                                                            </button>
                                                                        </div>
                                                                        <div onClick={() => {
                                                                            if (!workFlowData.accepted_loader) {
                                                                                setWorkFlowData((prev) => {
                                                                                    return {
                                                                                        ...prev,
                                                                                        answer: element?.data?.description.join('\n'),
                                                                                        workflowValue: element.data,
                                                                                        showInput: false,
                                                                                        target: 'workflow'

                                                                                    }
                                                                                })
                                                                                handleWorkflow({
                                                                                    answer: element?.data?.description.join('\n'),
                                                                                    workflowValue: element.data,
                                                                                    showInput: false,
                                                                                    target: 'workflow'
                                                                                })
                                                                            }
                                                                        }}
                                                                            className='text-sm bg-skyblue rounded-xl inline-block p-1 px-2 hover:bg-sky hover:text-white text-sky'>
                                                                            <button
                                                                                type={"button"}
                                                                                className="border-none p-0 m-0 flex gap-1 items-center text-sm"


                                                                            > <small className=''>{workFlowData.accepted_loader ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                            </svg>
                                                                                <span>Loading...</span> </> : "Accept Answer"}</small>
                                                                            </button>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}

                                                    </ul>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                    <div className={` bg-[#F8F8F8] my-4`}>
                                        <ul className="py-2 text-sm text-gray-700 ">
                                            {workFlowData.workflow.length > 0 && workFlowData.workflow.map((ele, key) =>
                                                <>
                                                    {workFlowData.reccomodation.find((x) => x.data.name === ele.name) ? null :
                                                        <li className={`${ele.name === workFlowData.workflowValue?.name ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}  text-heading my-2 cursor-pointer`} key={key} onClick={() => {
                                                            setWorkFlowData((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    workflowValue: ele,
                                                                    showInput: false,
                                                                    target: 'workflow',
                                                                    answer: ele.description.join('\n')
                                                                }
                                                            })
                                                        }}>
                                                            <button type='button' className="block px-4 py-2  text-xs">{(ele.name)}</button>
                                                        </li>
                                                    }
                                                </>
                                            )}

                                            <li className={`${"Human Handoff" === workFlowData.workflowValue?.name ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}  text-heading my-2 cursor-pointer`} onClick={() => {
                                                setWorkFlowData((prev) => {
                                                    return {
                                                        ...prev,
                                                        workflowValue: { "name": "Human Handoff", id: "human_handoff" },
                                                        showInput: true,
                                                        answer: '',
                                                        target: 'human_handoff'
                                                    }
                                                })

                                            }}>
                                                <button type='button' className="block px-4 py-2  text-xs">Human Handoff</button>
                                            </li>
                                        </ul>

                                    </div>
                                    {/* {workFlowData.showInput && (<>
                                        <div className='my-2'>
                                            <TextArea name="workflow_answer"
                                                className="py-2"
                                                type={"text"}
                                                id={"workflow_answer"}
                                                placeholder={""}
                                                rows="8"
                                                onChange={(e) => setWorkFlowData((prev) => {
                                                    return {
                                                        ...prev,
                                                        answer: e.target.value
                                                    }
                                                })}
                                                value={workFlowData.answer} />
                                        </div>

                                    </>)} */}
                                    <button onClick={(e) => submitWorkflowTrigger()} type="button" className="my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={workFlowData.workflowValue === null || workFlowData.submit_loader}>
                                        {workFlowData.submit_loader ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                            <span>Loading...</span> </> : "Submit"}
                                    </button>
                                </div>

                            )}
                        </>

                        {modal === true
                            ? (
                                <Modal
                                    title={''}
                                    className={"w-[50%]"}
                                    show={modal}
                                    setShow={setModal}
                                    showCancel={true}
                                    customHideButton={false}
                                    showTopCancleButton={false}
                                    hr={false}
                                >
                                    <form onSubmit={() => {

                                        if (link.edit === true) {
                                            let data = [...link.links]
                                            data[link.index] = link.url
                                            setLink((prev) => {
                                                return {
                                                    ...prev,
                                                    links: data,
                                                    edit: false,
                                                    index: null,
                                                    url: ''

                                                }
                                            })
                                        } else {
                                            setLink((prev) => {
                                                return {
                                                    ...prev,
                                                    links: [...link.links, link.url],
                                                    edit: false,
                                                    index: null,
                                                    url: ''
                                                }
                                            })
                                        }
                                        setModal(false)

                                    }}>
                                        <div className="mb-5 flex justify-between  gap-4 items-center">
                                            <input type="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  !rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " placeholder="Enter or paste link" value={link.url} onChange={(e) => {
                                                setLink((prev) => {
                                                    return {
                                                        ...prev,
                                                        url: e.target.value
                                                    }
                                                })
                                            }} />
                                            <button
                                                type="submit"

                                                className=" flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md  py-2 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={link.url === ''}>
                                                Apply
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            ) : null}
                    </SideModal>
                )}
            </div >
            <ToastContainer />


        </>
    );
};

export default Page;



