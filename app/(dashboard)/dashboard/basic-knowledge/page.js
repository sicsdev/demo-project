"use client";
import React, { useEffect, useState } from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import ManageKnowledgeBase from "@/app/components/LearningCenter/ManageKnowledgeBase";
import { getKnowledgeData } from "@/app/API/pages/Knowledge";
import { fetchWorkflows } from "@/app/components/store/slices/workflowSlice";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const state = useSelector((state) => state.recommendation);
    const [tabLoader, setTabLoader] = useState(true);
    const [knowledge, setKnowledge] = useState([])
    const [basicFormData, setBasicFormData] = useState({})
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
    }, [])

  


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, [])



    return (
        <>
            <div style={{ whiteSpace: "normal" }}>
                <div className="border-b border-border flex items-center justify-between">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                        <li className="mr-2">
                            <span
                                className={`flex justify-start gap-2 pl-2 text-xs sm:text-sm cursor-pointer items-center py-2  border-b-2  text-primary border-primary font-bold rounded-t-lg active  group`}
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


