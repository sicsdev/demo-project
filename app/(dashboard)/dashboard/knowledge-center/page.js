"use client";
import React, { useEffect, useRef, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, CheckCircleIcon, LinkIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TextField from "@/app/components/Common/Input/TextField";
import { GetAllRecommendations, excludeRecommendationRecord, updateRecommendationRecord } from "@/app/API/pages/LearningCenter";
import { ToastContainer } from 'react-toastify';
import { successMessage, errorMessage } from "@/app/components/Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { editRecommendation, fetchRecommendation } from "@/app/components/store/slices/recommendation";
import { ColorRing } from "react-loader-spinner";
import { getKnowledgeData } from "@/app/API/pages/Knowledge";
import { fetchWorkflows } from "@/app/components/store/slices/workflowSlice";
import { updateWorkFlowStatus } from "@/app/API/pages/Workflow";
import { makeCapital } from "@/app/components/helper/capitalName";
import Link from "next/link";
import TopBar from "@/app/components/Common/Card/TopBar";
import TextArea from "@/app/components/Common/Input/TextArea";

const Page = () => {
    const workflowState = useSelector(state => state.workflow);
    const [updateLoader, setUpdateLoader] = useState(null);
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
    const [recommendationOrderBy, setRecommendationOrderBy] = useState('');
    const [search, setSearch] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const getData = async () => {
        setTabLoader(true);
        const response = await getKnowledgeData()
        if (response?.data?.results.length > 0) {
            setKnowledge(response?.data?.results)

            const botDataArray = response?.data?.results.map(entry => {
                if (entry.bots.length === 0) {
                    return []; // Return an empty array for entries with no bots
                } else {
                    return entry.bots.map(bot => ({
                        value: bot.bot.id,
                        name: bot.bot.chat_title,
                    }));
                }
            });
            setBasicFormData(prev => {
                return {
                    ...prev,
                    selectedBot: botDataArray,
                    knowledgeData: response?.data?.results
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

    const updateButtonHandler = async (id) => {
        try {
            const row = state?.data?.results.find(item => item.id === id);
            const inputValue = row.answer;
            if (inputValue === '' || inputValue === undefined) {
                return false;
            }
            let payload = {
                answer: inputValue
            }
            setUpdateLoader(id);
            const updateRecord = await updateRecommendationRecord(payload, id);
            setUpdateLoader(null);
            if (updateRecord?.status === 201 || updateRecord?.status === 200) {
                dispatch(fetchRecommendation());
                // successMessage("Recommendation Updated Successfully");
            } else {
                errorMessage("Unable to Update!");
            }
        } catch (error) {
            setUpdateLoader(null);
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

    const handleInput = (row) => {
        const updatedData = state?.data?.results?.map((item) =>
            item.id === row.id ? { ...item, ...row } : item
        );
        dispatch(editRecommendation({ results: updatedData }));
    };

    const handleWorkflow = async (workflow_data, questionId) => {
        const row = state?.data?.results.find(item => item.id === questionId);
        let descriptions = [...workflow_data.description]
        if (row.answer) {
            descriptions.push(row.answer)
        }
        let Payload = {
            description: descriptions.filter((x) => x !== ''),
        }
        const response = await updateWorkFlowStatus(Payload, workflow_data.id)
        if (response.status === 200 || response.status === 201) {
            const excludeRecord = await excludeRecommendationRecord(questionId);
            if (excludeRecord?.status === 204) {
                dispatch(fetchRecommendation());
            } else {
                errorMessage(response.response.data.description)
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
                minHeight: '80px', // override the row height
                maxHeight: '300px', // override the row height
            },
        }
    };

    const columns = [
        {
            name: "Question",
            id: "question",
            selector: 'question',
            sortable: false,
            reorder: true,
            cell: (row) => (
                <p className='whitespace-normal'>{row.question}</p>
            ),
            style: {
                whiteSpace: "inherit",
                width: '300px !important',
                // padding: '10px 0 10px 0'
            },
        },
        {
            name: "New Answer",
            selector: 'question',
            // sortable: true,
            reorder: true,
            cell: (row) => (
                <div className='w-[100%]'>
                    <TextArea name="interrogatory_type"
                        className="py-2"
                        type={"text"}
                        id={"interrogatory_type"}
                        onChange={(e) => handleInput({ ...row, answer: e.target.value })}
                        value={row.answer} />
                </div>
            ),
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
            name: "Actions",
            center: true,
            cell: (row, index) => (
                <div className="flex justify-center gap-4 w-[100%]" >
                    {
                        row?.accepted === false && (
                            <>

                                {updateLoader === row.id ?
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
                                        <button type="button" onClick={(e) => {
                                            if (checkValue(row.answer) === true) {
                                                updateButtonHandler(row.id)
                                            }
                                        }}>
                                            <CheckCircleIcon className={`${checkValue(row.answer) === false ? "text-border" : "text-success"} h-6 w-6 `} />
                                        </button>
                                    </div>
                                }
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
                                            <XCircleIcon className="h-6 w-6 text-danger " /></button></div>
                                }
                                <ButtonComponent row={row} handleWorkflow={handleWorkflow} workflow={workflow} index={index} total={state?.data?.results?.length} />

                            </>
                        )}

                </div>
            ),
            style: {
                width: '20%',
                justifyContent: 'start'
            },
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

    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <TopBar title={`Learning Center`} icon={<AcademicCapIcon className="h-5 w-5 text-primary" />} />
                {/* {loading === true ? (
                    <div className="">
                        <div className='grid grid-cols-[85%,15%] my-2'>
                            <div></div>
                            <SkeletonLoader height={30} width={"100%"} />
                        </div>
                        <div className="mt-3">
                            <SkeletonLoader count={9} height={30} className={"mt-2"} />
                        </div>
                    </div>
                ) : ( */}
                <>
                    <div className="w-full" >


                        <div className='flex justify-end gap-4 items-center mt-2 p-2'>
                            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
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
                            paginationRowsPerPageOptions={[5, 10, 20, 30]}
                            className=''
                            sortServer
                            onSort={handleSort}
                            customStyles={customStyles}
                            defaultSortAsc={false}
                        />
                    </div>
                </>
                {/* )} */}
            </div>
            <ToastContainer />
        </>
    );
};

export default Page;




export const ButtonComponent = ({ row, handleWorkflow, workflow, index, total }) => {
    const divRef = useRef(null);
    const [openWorkflows, setOpenWorkflow] = useState(null)
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

    return (
        <>
            <div className='cursor-pointer relative' ref={divRef} onClick={(e) => setOpenWorkflow(prev => prev === row.id ? null : row.id)}>
                <button type="button">
                    <PlusCircleIcon className="h-6 w-6 text-success " />
                    {/* {index} */}
                </button>
                <div className="relative" >

                    {openWorkflows === row.id && (
                        <div className={`absolute left-[-315px]  ${(index === total - 1 || index === total - 2 || index === total - 3) ? 'top-[unset] bottom-[50px]' : 'top-[34px]'}   sm:left-[-280px] md:left-[-280px] lg:left-[-280px]  z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44`}>
                            {workflow.length > 0 ?
                                <ul className="py-2 text-sm text-gray-700 ">
                                    {workflow.map((ele, key) =>
                                        <li className='hover:bg-primary hover:text-white text-heading my-2' key={key} onClick={() => handleWorkflow(ele, row.id)}>
                                            <button type='button' className="block px-4 py-2 ">{makeCapital(ele.name)}</button>
                                        </li>

                                    )}
                                    <li className='hover:bg-primary hover:text-white text-heading my-2' >
                                        <Link href={'/dashboard/workflow/workflow-builder'}><button type='button' className="block px-4 py-2 ">Add New Workflow </button></Link>
                                    </li>
                                </ul> : <small>No data found!</small>}
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}