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
import ManageKnowledgeBase from "@/app/components/LearningCenter/ManageKnowledgeBase";
import ViewKnowledgeCenter from "@/app/components/LearningCenter/EditKnowledgeCenter";
import { getKnowledgeData } from "@/app/API/pages/Knowledge";
import { fetchWorkflows } from "@/app/components/store/slices/workflowSlice";
import UpdateWorkflowBasic from "@/app/components/Workflows/WorkflowBuilder/UpdateWorkflowBasic";
import { updateWorkFlowStatus } from "@/app/API/pages/Workflow";
import { makeCapital } from "@/app/components/helper/capitalName";
import Link from "next/link";

const Page = () => {
    const workflowState = useSelector(state => state.workflow);
    const [updateLoader, setUpdateLoader] = useState(null);
    const [deleteLoader, setDeleteLoader] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const [tab, setTab] = useState(0);
    const [tabLoader, setTabLoader] = useState(true);
    const [knowledge, setKnowledge] = useState([])
    const [basicFormData, setBasicFormData] = useState({})
    const [workflow, setWorkflow] = useState([])
    console.log("state", state?.data?.count)
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
                // successMessage("Recommendation Delete Successfully");
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
        dispatch(editRecommendation(updatedData));
    };
    const handleWorkflow = async (workflow_data, questionId) => {
        const row = state?.data?.results.find(item => item.id === questionId);
        let Payload = {
            description: workflow_data.description + " " + row.answer,
        }
        const response = await updateWorkFlowStatus(Payload, workflow_data.id)
        if (response.status === 200 || response.status === 201) {
            const excludeRecord = await excludeRecommendationRecord(questionId);
            if (excludeRecord?.status === 204) {
                dispatch(fetchRecommendation());
            } else {
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
    const columns = [
        {
            name: "Question",
            selector: (row) => <p className=' whitespace-normal'>{row.question}</p>,
            sortable: true,
            reorder: true,
            style: {
                whiteSpace: "inherit"
            },
        },
        {
            name: "New Answer",
            selector: (row) => row.answer,
            // sortable: true,
            reorder: true,
            cell: (row) => (
                <div className='my-2 w-[100%]'>
                    <TextField
                        onChange={(e) => handleInput({ ...row, answer: e.target.value })}
                        value={row.answer}
                        name="interrogatory_type"
                        className="py-2 mt-2"
                        type={"text"}
                        id={"interrogatory_type"}
                    />
                </div>
            ),
        },
        {
            name: "Accepted",
            selector: (row) => <p className=' whitespace-normal'>{row.accepted === true ? 'Yes' : 'No'}</p>,
            sortable: true,
            reorder: true,
            style: {
                // width: '20%',
                // justifyContent: 'end'
            },
        },
        {
            name: "",
            cell: (row) => (
                <div className="flex justify-center gap-4 ml-5" >
                    {
                        row?.accepted === false && (
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
                                            <XCircleIcon className="h-6 w-6 text-danger " /></button></div>
                                }
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
                                        <button type="button" onClick={(e) => updateButtonHandler(row.id)}>
                                            <CheckCircleIcon className="h-6 w-6 text-success " />
                                        </button>
                                    </div>
                                }
                                <ButtonComponent row={row} handleWorkflow={handleWorkflow} workflow={workflow} />

                            </>
                        )}

                </div>
            ),
            style: {
                width: '20%',
                justifyContent: 'end'
            },
        },
    ];
    const handleRecomodationValue = async (page) => {
        const response = await GetAllRecommendations(page)
        if (response) {
            const result = response?.results?.filter((item) => !item.accepted);
            dispatch(editRecommendation({ ...response, totalCount: response?.result?.length }))
        }
    }
    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <div className="border-b border-border flex items-center justify-between">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                        <li className="mr-2" onClick={() => { setTab(0) }}>
                            <span
                                className={`flex justify-start text-xs sm:text-sm gap-2 cursor-pointer items-center  py-2 ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                                aria-current="page"
                            >
                                <BookOpenIcon className="h-5 w-5 text-primary" /> Learning center
                            </span>
                        </li>
                        <li className="mr-2" onClick={() => { setTab(1) }}>
                            <span
                                className={`flex justify-start gap-2 pl-2 text-xs sm:text-sm cursor-pointer items-center py-2  ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active  group`}
                                aria-current="page"
                            >
                                <AcademicCapIcon className="h-5 w-5 text-primary" /> Manage Knowledge Base
                            </span>
                        </li>
                    </ul>
                </div>

                {loading === true ? (
                    <div className="">
                        <h1 className="mt-2 text-sm">
                            <SkeletonLoader height={40} width={100} />
                        </h1>
                        <div className="mt-3">
                            <SkeletonLoader count={9} height={30} className={"mt-2"} />
                        </div>
                    </div>
                ) : (
                    <>
                        {tab === 0 && (
                            <div className="w-full" >
                                <DataTable
                                    title={''}
                                    fixedHeader
                                    highlightOnHover
                                    pointerOnHover
                                    defaultSortFieldId="question"
                                    pagination
                                    className='data-table-class'
                                    columns={columns}
                                    noDataComponent={<><p className="text-center text-xs p-3">Questions Tempo needs your help answering will show here when they're ready!</p></>}
                                    data={state?.data?.results}
                                    paginationPerPage={10}
                                    paginationTotalRows={state?.data?.count}
                                    paginationServer
                                    onChangePage={(page) => {
                                        handleRecomodationValue(page)
                                    }}


                                />
                            </div>
                        )}
                        {tab === 1 && basicFormData?.knowledgeData && (

                            <ManageKnowledgeBase tabLoader={tabLoader} setTabLoader={setTabLoader} knowledge={knowledge} setKnowledge={setKnowledge} basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                        )}
                    </>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Page;




export const ButtonComponent = ({ row, handleWorkflow, workflow }) => {
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

                </button>
                <div className="relative" >

                    {openWorkflows === row.id && (
                        <div className={`absolute left-[-315px] top-[34px]  sm:left-[-280px] md:left-[-280px] lg:left-[-280px]  z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44`}>
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