'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { getBotConversationMessages } from '@/app/API/pages/Bot';
import Loading from '@/app/components/Loading/Loading';
import Link from 'next/link';

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        setLoading(true)
        const bot_id = searchParams.get('id');
        if (bot_id) {
            getCoversationMessages(bot_id);
        } else {
            router.back()
        }
    }, []);
    const getCoversationMessages = async (id) => {
        const response = await getBotConversationMessages(id)
        if (response.status === 200) {
            setMessages(response.data.results)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }
    return (
        <div className='z-[50]'>
            <div className="flex items-center justify-between border-b border-primary dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a
                            href="#"
                            className="flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                            aria-current="page"
                        >
                            <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-500" /> Chats

                        </a>
                    </li>
                </ul>
                <p className="text-sm">
                    <Link href="/dashboard/analytics"><ArrowLeftIcon className="h-6 w-6 text-heading" /></Link>
                </p>
            </div>


            {loading === true ? <Loading /> :
                <>
                    <div className=''>
                        <h3 className='text-heading font-semibold text-xl text-center mt-4'>Chat</h3></div>

                    <div className='chat-scroll'>
                        <div className='block z-0 p-4 scroll-smooth  overflow-y-scroll h-[600px] sm:h-[420px] md:h-[420px] lg:h-[420px] pb-[60px] relative my-8 sm:mx-20 md:mx-20 lg:mx-20' >

                            {messages.map((element, key) =>
                                <>
                                    {element.sender === 'bot' &&
                                        (
                                            <div className='flex justify-start'>
                                                <div key={key} className={'rounded-lg my-2 cursor-pointer z-50 bg-[#2196f333] font-normal p-4 w-auto max-w-[500px] border-border text-heading text-md'}><p className='leading-relaxed break-words'>{element.content}</p></div>
                                            </div>
                                        )}
                                    {element.sender === 'user' &&
                                        (<div className='flex justify-end'><div key={key} className={'rounded-lg  break-words my-2 cursor-pointer  z-50 bg-heading text-md font-normal  p-4 w-auto max-w-[500px] right-0 text-white'}><p className='leading-relaxed'>{element.content}</p></div></div>)}

                                </>
                            )}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Chat