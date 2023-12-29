'use client'
import { getFaqQuestions } from '@/app/API/pages/Knowledge'
import TopBar from '@/app/components/Common/Card/TopBar'
import ManageFaqs from '@/app/components/LearningCenter/ManageFaqs'
import UpperBasicKnowledge from '@/app/components/LearningCenter/UpperBasicKnowledge'
import { fetchBot } from '@/app/components/store/slices/botIdSlice'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import '@/app/components/Workflows/WorkflowBuilder\/customStyles.css'
import { useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

const Source = () => {
    const [selectedOptionValue, setSelectedOptionValue] = useState(null);
    const [basicFormData, setBasicFormData] = useState({})
    const [bots, setBots] = useState([])
    const [typingTimeout, setTypingTimeout] = useState(null)
    const [search, setSearch] = useState('')
    const [check, setCheck] = useState(false)
    const [currentTab, setCurrentTab] = useState('')
    const [contentLoader, setContentLoader] = useState(true)

    const [autoOpenKnowledgeId, setAutoOpenKnowledgeId] = useState('')

    // Filters
    const [filters, setFilters] = useState({
        currentBot: ''
    })

    const dispatch = useDispatch()
    const state = useSelector((state) => state.botId);
    let params = useSearchParams()

    useEffect(() => {
        getQuestionsData()
    }, [])

    useEffect(() => {
        if (state.botData.data?.bots && state.botData.data?.widgets) {
            getAllBots();
        } else {
            dispatch(fetchBot())
        }
    }, [state.botData.data]);


    useEffect(() => {
        getDataWithFilters()
    }, [filters, currentTab, selectedOptionValue])




    const getQuestionsData = async (queryParam = 'page=1&page_size=10') => {
        setBasicFormData((prev) => {
            return {
                ...prev,
                isLoading: true
            }
        })
        let filterQueryParam = ``;
        if (filters.currentBot) {
            filterQueryParam = `&bot__id=${filters.currentBot}`;
        }
        const response = await getFaqQuestions(`${queryParam}&ordering=-annotated_knowledgefaq_usage_last_24_hours${filterQueryParam}`)
        if (response) {
            const botDataArray = response?.results?.map(entry => {
                if (entry?.bots?.length === 0) {
                    return []; // Return an empty array for entries with no bots
                } else {
                    return entry?.bots?.map(bot => ({
                        value: bot.bot.id,
                        name: bot.bot.chat_title,
                    }));
                }
            });
            setBasicFormData(prev => {
                return {
                    ...prev,
                    selectedBot: botDataArray?.filter((x) => x.name !== ''),
                    data: response,
                    isLoading: false
                }
            })
        }
    }

    const getAllBots = () => {
        const getTitle = state.botData.data.bots.map(
            (element) => element.chat_title
        );
        const widgetCode = state.botData.data.widgets;
        const mergedArray = widgetCode.map((item, index) => {
            const title = getTitle[index];
            return {
                value: item.id,
                name: title,
            };
        });
        setBots(mergedArray.filter((x) => x.name !== ''))
    }


    const getDataWithFilters = (type) => {
        let query = `page=1&page_size=10${currentTab ? `&knowledge__source=${currentTab}` : ''}${filters?.currentBot ? `&bot__id=${filters.currentBot}` : ''}`
        if (selectedOptionValue) {
            query = query + `&created__gte=${selectedOptionValue.created__gte}&created__lte=${selectedOptionValue.created__lte}`
        }
        getQuestionsData(query)
    }


    const handleChange = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);
        setBasicFormData((prev) => {
            return {
                ...prev,
                isLoading: true
            }
        })
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
        getQuestionsData(queryParam)
    };


    return (
        <>
            <TopBar loader={contentLoader} title={`Knowledge Base`} icon={<BookOpenIcon className="h-5 w-5 text-primary" />} />
            <>
                {basicFormData?.data && (
                    <>
                        <UpperBasicKnowledge setContentLoader={setContentLoader} setFilters={setFilters} filters={filters} setCurrentTab={setCurrentTab} setCheck={setCheck} questions={basicFormData} basicFormData={basicFormData?.data?.total} search={search} handleChange={handleChange} getDataWithFilters={getDataWithFilters} setBasicFormData={setBasicFormData} getQuestionsData={getQuestionsData} selectedOptionValue={selectedOptionValue} setSelectedOptionValue={setSelectedOptionValue} />
                        <ManageFaqs currentTab={currentTab} questions={basicFormData} bots={bots} getQuestionsData={getQuestionsData} setBasicFormData={setBasicFormData} />
                    </>
                )}
            </>
            <ToastContainer />
        </>
    )
}

export default Source