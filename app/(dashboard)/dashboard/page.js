'use client'
import React, { useState } from 'react'
import { UsersIcon } from '@heroicons/react/24/outline';
import QuickStart from '@/app/components/Dashboard/QuickStart';
import TopBar from '@/app/components/Common/Card/TopBar';
import ChatBots from '@/app/components/Dashboard/ChatBots';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setDemoKnowledge } from '@/app/API/pages/get-trial';
import { updateScrapperKnowledgeState } from '@/app/components/store/slices/scrapperKnowledgeSlice';
import { useSelector } from 'react-redux';

const Page = () => {

    const knowledgeScrapperState = useSelector((state) => state.knowledgeScrapper);
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [loadingScrapper, setLoadingScrapper] = useState(false)
    const [finishingScrapping, setFinishingScrapping] = useState(false)
    const [finishedScrapper, setFinishedScrapper] = useState(false)

    useEffect(() => {
        if (knowledgeScrapperState && knowledgeScrapperState.data && knowledgeScrapperState.loader == 0) {
            setKnowledgeFirstData(knowledgeScrapperState.data.main_webpage, knowledgeScrapperState.data.faqs_webpage)
            setLoadingScrapper(true)
        }

        if (knowledgeScrapperState?.state?.loader?.toFixed() == 100) {
            dispatch(updateScrapperKnowledgeState(null));
            setLoadingScrapper(false)
        }

        if (userData?.data?.enterprise?.information_filled) {
            setLoadingScrapper(false)
        }

    }, [userData?.data?.enterprise?.information_filled])



    const setKnowledgeFirstData = async (mainPage, faqPage) => {
        setLoadingScrapper(true);

        setTimeout(() => {
            setFinishingScrapping(true);
        }, 75000);

        let payload = {
            main_webpage: mainPage,
            faqs_webpage: faqPage,
        };

        await setDemoKnowledge(payload);
        setLoadingScrapper(false);
        setFinishingScrapping(false)
        setFinishedScrapper(true)
        dispatch(updateScrapperKnowledgeState(null));
    };


    return (
        <div style={{ whiteSpace: "normal" }}>
            <QuickStart loadingScrapper={loadingScrapper} setloadingScrapper={setLoadingScrapper} finishingScrapping={finishingScrapping} finishedScrapper={finishedScrapper} />
        </div>
    );
}

export default Page