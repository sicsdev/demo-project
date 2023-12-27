'use client'
import React, { useState } from 'react'
import { UsersIcon } from '@heroicons/react/24/outline';
import QuickStart from '@/app/components/Dashboard/QuickStart';
import TopBar from '@/app/components/Common/Card/TopBar';
import ChatBots from '@/app/components/Dashboard/ChatBots';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setDemoKnowledge } from '@/app/API/pages/get-trial';
import { updateScrapperKnowledgeState } from '@/app/components/store/slices/scrapperKnowledgeSlice';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { getUserProfile } from '@/app/API/components/Sidebar';
import { fetchProfile } from '@/app/components/store/slices/userSlice';
import { fetchBot } from '@/app/components/store/slices/botIdSlice';
import Pusher from 'pusher-js';

const pusher = new Pusher("1fc282a0eb5e42789c23", {
    cluster: "mt1",
});

const Page = () => {

    const knowledgeScrapperState = useSelector((state) => state.knowledgeScrapper);
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [loadingScrapper, setLoadingScrapper] = useState(false)
    const [finishingScrapping, setFinishingScrapping] = useState(false)
    const [finishedScrapper, setFinishedScrapper] = useState(false)
    const [startPusher, setStartPusher] = useState(false)

    // Dedicated useEffect to control first waiting for scrapping data.
    useEffect(() => {

        if (knowledgeScrapperState && knowledgeScrapperState.data && knowledgeScrapperState.loader == 0) {
            setKnowledgeFirstData(knowledgeScrapperState.data.main_webpage, knowledgeScrapperState.data.faqs_webpage)
            setLoadingScrapper(true)
            setStartPusher(true)
            sessionStorage.setItem('isFirstLoginInDeflection', 'true')
        }

        if (knowledgeScrapperState?.state?.loader?.toFixed() == 50) {
            checkIfInformationWasFilled()
        }

        if (userData?.data?.enterprise?.information_filled) {
            setLoadingScrapper(false)
            dispatch(fetchBot())
        }
    }, [userData?.data?.enterprise, knowledgeScrapperState?.loader])


    // Start pusher after get userData info.
    useEffect(() => {
        if (startPusher && userData?.data?.enterprise?.id) { connectPusher(); setStartPusher(false) }
    }, [userData?.data?.enterprise])


    // We use Pusher to know when the scrap of the data finished.
    const connectPusher = async () => {
        console.log(userData.data.enterprise.id)
        const channel = pusher.subscribe(userData.data.enterprise.id);
        channel.bind('status', data => {
            console.log('Pusher action status received')
            dispatch(fetchProfile());
            dispatch(fetchBot())
            setLoadingScrapper(false);
            setFinishingScrapping(false)
            setFinishedScrapper(true)
            sessionStorage.setItem('autoTriggerBot', 'true')
        })
    }

    const checkIfInformationWasFilled = async () => {
        let attempts = 0;
        const maxAttempts = 5;
        const interval = 7000;

        const tryFetchProfile = async () => {
            if (attempts < maxAttempts) {
                let userProfile = await getUserProfile();

                if (userProfile.enterprise.information_filled == true) {
                    setFinishedScrapper(true)
                    dispatch(fetchProfile());
                    dispatch(fetchBot())
                    sessionStorage.setItem('scrappDataHasFinished', 'true')

                    setTimeout(() => {
                        setLoadingScrapper(false);
                    }, 3000);
                    return;
                } else {
                    attempts++;
                    setTimeout(tryFetchProfile, interval);
                }
            } else {
                setLoadingScrapper(false);
            }
        };

        await tryFetchProfile();
    };

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
        // dispatch(updateScrapperKnowledgeState(null));
    };

    return (
        <div style={{ whiteSpace: "normal" }}>
            <QuickStart loadingScrapper={loadingScrapper} setloadingScrapper={setLoadingScrapper} finishingScrapping={finishingScrapping} finishedScrapper={finishedScrapper} />
        </div>
    );
}

export default Page