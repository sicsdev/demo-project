"use client";
import React, { useEffect, useState } from "react";
import { AcademicCapIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import ManageKnowledgeBase from "@/app/components/LearningCenter/ManageKnowledgeBase";
import { getKnowledgeData } from "@/app/API/pages/Knowledge";
import { fetchWorkflows } from "@/app/components/store/slices/workflowSlice";
import TopBar from "@/app/components/Common/Card/TopBar";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const [tabLoader, setTabLoader] = useState(true);
    const [knowledge, setKnowledge] = useState([])
    const [basicFormData, setBasicFormData] = useState({})
    const getData = async () => {
        setTabLoader(true);
        const response = await getKnowledgeData()
        if (response?.data?.results.length > 0) {
            console.log(response.data, 'knowledge data')
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
                        {basicFormData?.knowledgeData && (

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


