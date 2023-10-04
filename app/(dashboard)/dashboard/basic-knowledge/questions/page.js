"use client";
import React, { useEffect, useState } from "react";
import { AcademicCapIcon, BookOpenIcon, PencilIcon, PencilSquareIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
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
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [search, setSearch] = useState('');

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
        const queryParam = `page=1&page_size=10&search=` + text;
        dispatch(fetchFaqQuestions(queryParam));
    };
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
                <TopBar title={`Questions`} icon={<QuestionMarkCircleIcon className="h-5 w-5 text-primary" />} />
                <div className='flex justify-end gap-4 items-center mt-2 px-2 pt-2'>
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative w-full sm:w-[unset]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  !rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                    </div>
                </div>
                {loading === true ? (
                    <>
                        <div className="">
                            <div className="mt-3">
                                <SkeletonLoader count={9} height={30} className={"mt-2"} />
                            </div>
                        </div>

                    </>
                ) : (
                    <>

                        <ManageFaqs questions={faqQuestionState} />

                    </>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Page;


