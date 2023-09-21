"use client";
import React, { useEffect, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import ManageKnowledgeBase from "@/app/components/LearningCenter/ManageKnowledgeBase";
import { getFaqQuestions, getKnowledgeData } from "@/app/API/pages/Knowledge";
import { fetchWorkflows } from "@/app/components/store/slices/workflowSlice";
import TopBar from "@/app/components/Common/Card/TopBar";
import ManageFaqs from "@/app/components/LearningCenter/ManageFaqs";
import { fetchFaqQuestions } from "@/app/components/store/slices/questionsSlice";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const faqQuestionState = useSelector((state) => state.faqQuestions);
    const [tabLoader, setTabLoader] = useState(true);
    const [knowledge, setKnowledge] = useState([])
    const [basicFormData, setBasicFormData] = useState({})
    const [tab, setTab] = useState(0);

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



    useEffect(() => {
        if (faqQuestionState?.data === null) {
            dispatch(fetchFaqQuestions());
        }
    }, [faqQuestionState?.data]);

    const getAllWorkflowData = async () => {
        dispatch(fetchWorkflows)
    }

    useEffect(() => {
        getAllWorkflowData();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, [])

    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <TopBar title={`Knowledge Base`} icon={<BookOpenIcon className="h-5 w-5 text-primary" />} />
                {loading === true ? (
                    <>
                        <div className="w-full">
                            <div className="sm:flex rounded-t-lg pt-4 sm:pt-4  border-border justify-between items-center">
                                <div className="flex justify-between items-center gap-4 w-full sm:w-1/4">
                                    <div className='flex justify-between items-center gap-1'>
                                        <SkeletonLoader height={30} width={100} />
                                    </div>
                                </div>
                                <div className='flex flex-wrap sm:justify-end items-center gap-2 w-full sm:w-3/4'>

                                    <div>
                                        <SkeletonLoader height={40} width={100} />
                                    </div>
                                    <div>
                                        <SkeletonLoader height={40} width={100} />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">
                                <div className="bg-[#f1f1f1] p-6 rounded-md mb-6">
                                    <SkeletonLoader height={20} width={200} />
                                    <div className="flex gap-4 sm:gap-10 justify-start align-top">
                                        <div className='w-[25%]'>
                                            <SkeletonLoader height={40} width={100} />
                                        </div>
                                        <div className='w-[25%]'>
                                            <SkeletonLoader height={40} width={100} />
                                        </div>
                                        <div className='w-[25%]'>
                                            <SkeletonLoader height={40} width={100} />
                                        </div>
                                    </div>
                                </div>

                                <div className="block sm:flex gap-10 justify-start items-center">
                                    <div className="relative">
                                        <SkeletonLoader height={40} width={200} />
                                    </div>
                                    <div className='mt-4 sm:mt-0 relative'>
                                        <SkeletonLoader height={40} width={200} />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="mt-3">
                                    <SkeletonLoader count={9} height={30} className={"mt-2"} />
                                </div>
                            </div>

                        </div>
                    </>
                ) : (
                    <>
                        <div className="border-b border-border dark:border-gray-700 flex items-center justify-between mt-5">
                            <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-xs font-medium text-center text-gray-500">
                                <li className="mr-2" onClick={() => { setTab(0) }}>
                                    <span
                                        className={`flex justify-start text-xs gap-2 cursor-pointer items-center py-2  ${tab === 0 && ("border-b-2 text-primary border-primary")}  font-bold  rounded-t-lg active  group`}
                                        aria-current="page"
                                    >
                                        <BookOpenIcon className="h-5 w-5 text-gray-500" /> Sources
                                    </span>
                                </li>
                                <li className="mr-2" onClick={() => { setTab(1) }}>
                                    <span
                                        className={`flex justify-start gap-2 text-xs  cursor-pointer items-center py-2   ${tab === 1 && (" border-b-2  text-primary border-primary")}  font-bold rounded-t-lg active pl-2 group`}
                                        aria-current="page"
                                    >
                                        <PencilSquareIcon className="h-5 w-5 text-gray-500" /> Questions
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {tab === 0 && (
                            basicFormData?.knowledgeData && (

                                <ManageKnowledgeBase tabLoader={tabLoader} setTabLoader={setTabLoader} knowledge={knowledge} setKnowledge={setKnowledge} basicFormData={basicFormData} setBasicFormData={setBasicFormData} />
                            )
                        )}

                        {tab === 1 && (
                            <ManageFaqs questions={faqQuestionState} />
                        )}
                    </>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Page;


