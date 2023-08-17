"use client";
import React, { useEffect, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, CheckCircleIcon, LinkIcon, XCircleIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TextField from "@/app/components/Common/Input/TextField";
import { excludeRecommendationRecord, updateRecommendationRecord } from "@/app/API/pages/LearningCenter";
import { ToastContainer } from 'react-toastify';
import { successMessage, errorMessage } from "@/app/components/Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { editRecommendation, fetchRecommendation } from "@/app/components/store/slices/recommendation";
import { ColorRing } from "react-loader-spinner";
import ManageKnowledgeBase from "@/app/components/LearningCenter/ManageKnowledgeBase";
import ViewKnowledgeCenter from "@/app/components/LearningCenter/EditKnowledgeCenter";
import { getKnowledgeData } from "@/app/API/pages/Knowledge";

const Page = () => {
    const [updateLoader, setUpdateLoader] = useState(null);
    const [deleteLoader, setDeleteLoader] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const [tab, setTab] = useState(0);

    const [tabLoader, setTabLoader] = useState(true);
    const [knowledge, setKnowledge] = useState([])
    const [basicFormData, setBasicFormData] = useState({})

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
                successMessage("Recommendation Updated Successfully");
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
                successMessage("Recommendation Delete Successfully");
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
            name: "Human Answer",
            selector: (row) => row.answer,
            sortable: true,
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
            name: "",
            cell: (row) => (
                <div className="flex justify-center gap-4">
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
                        <button type="button" onClick={(e) => updateButtonHandler(row.id)}>
                            <CheckCircleIcon className="h-6 w-6 text-success " />
                        </button>
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
                        <button type="button" onClick={(e) => deleteButtonHandler(row.id)}>
                            <XCircleIcon className="h-6 w-6 text-danger " /></button>
                    }
                </div>
            ),
            style: {
                width: '20%',
                justifyContent: 'end'
            },
        },
    ];

    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <div className="border-b border-border flex items-center justify-between">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                        <li className="mr-2" onClick={() => { setTab(0) }}>
                            <span
                                className={`flex justify-start text-xs sm:text-sm gap-2 cursor-pointer items-center p-2 sm:p-4  ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                                aria-current="page"
                            >
                                <BookOpenIcon className="h-6 w-6 text-primary" /> Learning center
                            </span>
                        </li>
                        <li className="mr-2" onClick={() => { setTab(1) }}>
                            <span
                                className={`flex justify-start gap-2 text-xs sm:text-sm cursor-pointer items-center p-2 sm:p-4   ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active  group`}
                                aria-current="page"
                            >
                                <AcademicCapIcon className="h-6 w-6 text-primary" /> Manage Knowledge Base
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
                            <div className="w-full">
                                <DataTable
                                    title={<h3 className="text-sm font-semibold">Learning center</h3>}
                                    fixedHeader
                                    highlightOnHover
                                    pointerOnHover
                                    defaultSortFieldId="question"
                                    pagination
                                    columns={columns}
                                    noDataComponent={<><p className="text-center text-sm p-3">Questions Tempo needs your help answering will show here when they're ready!</p></>}
                                    data={state?.data?.results}

                                />
                            </div>
                        )}
                        {tab === 1 && (
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
