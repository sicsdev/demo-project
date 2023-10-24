"use client";
import React, { useEffect, useRef, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CheckCircleIcon, CheckIcon, ClipboardIcon, LinkIcon, PencilSquareIcon, PlusCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
import { useSearchParams } from "next/navigation";

const pusher = new Pusher("1fc282a0eb5e42789c23", {
    cluster: "mt1",
});


const Page = () => {

    const params = useSearchParams()

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

        // let originalObject = {
        //     "id": "8bc8d832-f1bd-4258-865a-f06c5462bfd4",
        //     "bot": {
        //         "id": "0975dbcc-d2a5-4aaf-8e46-c020ae625652",
        //         "category": "standard",
        //         "description": "",
        //         "chat_title": "NextMed"
        //     },
        //     "question": "How does the program work?",
        //     "answer": "",
        //     "number_of_messages": 2,
        //     "accepted": false,
        //     "created": "2023-10-16T13:14:24.158378-04:00"
        // }

        // sessionStorage.setItem('externalQuestionFromLogs', JSON.stringify(originalObject));

        const externalQuestionFromLogs = sessionStorage.getItem('externalQuestionFromLogs');
        const parsedItem = JSON.parse(externalQuestionFromLogs)


        // if (externalSnippet && externalContent) { handleCreateOptions('snippet'); setExternalTitleForSnippet(externalContent) }

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
        try {
            const excludeRecord = await excludeRecommendationRecord(id);
            if (excludeRecord?.status === 204) {
                const query = `&page=${pageVal}&page_size=${perPage}&ordering=${recommendationOrderBy}`
                const response = await GetAllRecommendations(query)
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
                                <>
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
                            </>
                        )}

                </div>
            ),
        },



    ];

    const handleRecomodationValue = async (page) => {
        setLoading(true)
        setPageVal(page)
        const query = `&page=${pageVal}&page_size=${perPage}&ordering=${recommendationOrderBy}`
        const response = await GetAllRecommendations(query)
        if (response) {
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const handleSort = async (column, sortDirection) => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (column && column?.name === 'Count') {
            setLoading(true)
            const queryParam = sortDirection === 'asc' ? '&ordering=number_of_messages' : '&ordering=-number_of_messages';
            setRecommendationOrderBy(queryParam);

            const query = `&page=${pageVal}&page_size=${perPage}${queryParam}`
            const response = await GetAllRecommendations(query)
            debugger
            if (response) {
                dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
                setLoading(false)
            }
        }
    };
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        setPageVal(page)
        const query = `&page=${page}&page_size=10${recommendationOrderBy}`
        const response = await GetAllRecommendations(query)
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

        const query = `&page=${pageVal}&page_size=${perPage}&ordering=${recommendationOrderBy}${queryParam}`
        const response = await GetAllRecommendations(query)
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

                                    <input type="search" id="search" className="border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px] pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                                </div>
                            }
                        </div>

                        <DataTable
                            title={''}
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
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
                            className='sm:!h-[75vh] !h-[65vh]'
                            sortServer
                            onSort={handleSort}
                            customStyles={customStyles}
                            defaultSortAsc={false}
                        />
                    </div>
                </>

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
                    >

                    </AnswersEditor>
                )}
            </div >
            <ToastContainer />


        </>
    );
};

export default Page;



