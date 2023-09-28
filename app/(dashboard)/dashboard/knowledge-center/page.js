"use client";
import React, { useEffect, useRef, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CheckCircleIcon, CheckIcon, ClipboardIcon, LinkIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TextField from "@/app/components/Common/Input/TextField";
import { GetAllRecommendations, excludeRecommendationRecord, updateRecommendationRecord } from "@/app/API/pages/LearningCenter";
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

const Page = () => {
    const workflowState = useSelector(state => state.workflow);
    const [updateLoader, setUpdateLoader] = useState(false);
    const [updateLoader1, setUpdateLoader1] = useState(false);
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
    const [answer, setAnswer] = useState('')
    const [questionData, setQuestionData] = useState([])
    const [workflowValue, setWorkflowValue] = useState(null)
    const [subQuestions, setSubQuestions] = useState([])
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
    }, [workflowState])

    const manageData = () => {
        const result = workflowState?.data?.results?.filter((x) => x.active === true);
        setWorkflow(result ?? []);
    }

    const updateButtonHandler = async (id, new_answer = null) => {
        try {
            const row = state?.data?.results.find(item => item.id === id);
            const inputValue = new_answer ? new_answer : answer
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
                setWorkflowValue(null)
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


    const handleWorkflow = async (workflow_data, questionId) => {
        setUpdateLoader(true)
        setUpdateLoader1(true)
        let descriptions = [...workflow_data.description]
        if (answer) {
            descriptions.push(answer)
        }
        let Payload = {
            description: descriptions.filter((x) => x !== ''),
        }
        const response = await updateWorkFlowStatus(Payload, workflow_data.id)
        if (response.status === 200 || response.status === 201) {
            const excludeRecord = await excludeRecommendationRecord(questionId);
            if (excludeRecord?.status === 204) {
                dispatch(fetchRecommendation());
                setWorkflowView(null)
                setKnowledgeId(null)
                setUpdateLoader(false);
                setUpdateLoader1(false);
                setWorkflowValue(null)
            } else {
                errorMessage(response.response.data.description)
                setUpdateLoader(false)
                setUpdateLoader1(false)
            }
        }


    }


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
                                        setShow(true)
                                        setSubQuestions([])
                                        setAnswer('')
                                        setQuestionData([])
                                        setSearchKnowledge('')
                                        setKnowledgeId(null)
                                        setWorkflowValue(null)
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
                                {/* <ButtonComponent row={row} handleWorkflow={handleWorkflow} workflow={workflow} index={index} total={state?.data?.results?.length} /> */}

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
        const response = await patchKnowledgeQuestion({ answer: new_answer ? new_answer : answer }, knowledgeId.id)
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
    const SubmitTheAnswerForm = (new_answer) => {
        setUpdateLoader1(true)
        if (knowledgeId) {
            updateFaq(new_answer)
        } else {
            updateButtonHandler(workflowView.id, new_answer)
        }
    }
    const searchMatched = async (element, showknowledge = true) => {
        if (showknowledge) {
            setKnowledgeId(element)
        }


        let queryParam = 'search=' + element.question
        const response = await searchMatchesFaqQuestions(queryParam)
        if (response && response.length > 0) {
            setSubQuestions(response)
            setAnswer('')
        } else {
            setSubQuestions([])
            setAnswer(element.answer)
        }
    }


    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <TopBar title={`Learning Center`} icon={<AcademicCapIcon className="h-5 w-5 text-primary" />} />
                <>
                    <div className="w-full sm:relative sm:mt-[20px]">
                        <div className='flex justify-end gap-4 items-center mt-2 px-2 pt-2 sm:absolute sm:right-[0] sm:top-[-15px] sm:z-[2]'>
                            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative w-full sm:w-[unset]">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                            </div>
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
                            progressComponent={<div className="w-full mt-3 relative"><SkeletonLoader count={9} height={30} width="100%" className={"mt-2"} /></div>}
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
                                setWorkflowValue(null)
                                setSubQuestions([])
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
                    <SideModal setShow={(setShow)} heading={<p className="w-full sm:w-[500px]">{workflowView?.question}</p>}>
                        <div className="border-b border-border dark:border-gray-700 flex items-center justify-between mt-5">
                            <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-xs font-medium text-center text-gray-500">
                                <li className="mr-2" onClick={() => { setTab(0) }}>
                                    <span
                                        className={`flex justify-start text-xs gap-2 cursor-pointer items-center py-2  ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                                        aria-current="page"
                                    >
                                        <AcademicCapIcon className="h-5 w-5 text-gray-500" /> Add to Knowledge Base
                                    </span>
                                </li>
                                <li className="mr-2" onClick={() => { setTab(1) }}>
                                    <span
                                        className={`flex justify-start gap-2 text-xs  cursor-pointer items-center py-2   ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active ml-2 group`}
                                        aria-current="page"
                                    >
                                        <BriefcaseIcon className="h-5 w-5 text-gray-500" /> Trigger Workflow
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {tab === 0 && (
                            <div>
                                <div className=' mt-2 '>
                                    {subQuestions.length > 0 && (
                                        <>
                                            <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                                <ul className="text-start py-2 text-sm text-gray-700 ">
                                                    <h3>Recommended Answer:</h3>
                                                    {subQuestions.slice(0, 1).map((element, key) =>
                                                        <li className='p-2 text-justify text-heading my-2 cursor-pointer' key={key}>
                                                            <p className="text-xs font-semibold">{makeCapital(element.data.question)}</p>
                                                            <p className="text-xs  mt-2">{makeCapital(element.data.answer)}</p>
                                                            <div className='flex justify-end mt-2'>
                                                                <div className='text-sm bg-skyblue rounded-xl inline-block p-1 px-2 hover:bg-sky hover:text-white text-sky'>

                                                                    <button
                                                                        type={"submit"}
                                                                        className="border-none p-0 m-0 flex gap-1 items-center text-sm"
                                                                        onClick={(e) => {
                                                                            if (updateLoader1) {
                                                                            } else {
                                                                                SubmitTheAnswerForm(element.data.answer)
                                                                            }

                                                                        }}
                                                                    > <small className=''>{updateLoader1 ? "Loading..." : "Accept Answer"}</small>
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}

                                                </ul>


                                            </div>
                                        </>
                                    )}
                                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10" placeholder="Search" value={searchKnowledge} onChange={(e) => { searchFaqs(e) }} />
                                    </div>
                                </div>

                                {!knowledgeId && questionData.length > 0 && (
                                    <div className={` bg-[#F8F8F8] my-4 rounded-md`}>
                                        <ul className="py-2 text-sm text-gray-700 ">
                                            {questionData.map((element, key) =>
                                                <li className='hover:bg-primary hover:text-white text-heading my-2 cursor-pointer' key={key} onClick={(e) => {
                                                    searchMatched(element)

                                                }}>
                                                    <button type='button' className="block px-4 py-2 text-xs">{makeCapital(element.question)}</button>
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
                                    <div className='my-2'>
                                        <TextArea name="answer"
                                            className="py-2"
                                            type={"text"}
                                            id={"answer"}
                                            placeholder={""}
                                            rows="8"
                                            onChange={(e) => setAnswer(e.target.value)}
                                            value={answer} />
                                    </div>
                                    <button
                                        onClick={(e) => SubmitTheForm()}
                                        type="button"
                                        className="my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={updateLoader || answer === ""}>
                                        {updateLoader1 ? "Submit" : updateLoader ? "Loading..." : "Submit"}
                                    </button>
                                </div>

                            </div>
                        )}
                        {tab === 1 && (
                            <div>
                                {workflowValue && (
                                    <div className={` bg-primary text-white my-4 p-4`}>
                                        <p className="text-xs">{workflowValue.name}</p>
                                    </div>)}
                                <div className={` bg-[#F8F8F8] my-4`}>
                                    {!workflowValue && workflow.length > 0 && (
                                        <ul className="py-2 text-sm text-gray-700 ">
                                            {workflow.map((ele, key) =>
                                                <li className='hover:bg-primary hover:text-white text-heading my-2 cursor-pointer' key={key} onClick={() => {


                                                    setWorkflowValue(ele)
                                                }}>
                                                    <button type='button' className="block px-4 py-2  text-xs">{makeCapital(ele.name)}</button>
                                                </li>
                                            )}

                                        </ul>
                                    )}
                                </div>
                                <button onClick={(e) => handleWorkflow(workflowValue, workflowView.id)} type="button" className="my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={workflowValue === null || updateLoader}>
                                    {updateLoader ? "Loading..." : "Submit"}
                                </button>
                            </div>
                        )}
                    </SideModal>
                )}
            </div >
            <ToastContainer />
        </>
    );
};

export default Page;



