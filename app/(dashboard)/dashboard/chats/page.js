'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DataTable from 'react-data-table-component';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { getBotConversation, getBotConversationMessages } from '@/app/API/pages/Bot';

const Chat = () => {
    const [messages, setMessages] = useState([])
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const bot_id = searchParams.get('id');
        if (bot_id) {
            getCoversationMessages(bot_id);
        }
    }, []);
    const getCoversationMessages = async (id) => {
        const response = await getBotConversationMessages(id)
        if (response.status === 200) {
            setMessages(response.data.results)
        }
        debugger
    }
    return (
        <div>  <div className="border-b border-primary dark:border-gray-700">
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
        </div>
        <div><h3 className='text-heading font-semibold text-xl text-center mt-4'>Chat</h3></div>
            <div className='block p-4 overflow-y-scroll h-[420px] pb-[60px] relative my-8 mx-12'>

                {messages.map((element, key) =>
                    <>
                        {element.sender === 'bot' &&
                            (
                                <>
                                    <div key={key} className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-border font-semibold float-left p-4 w-[75%] text-white text-sm'}><p className='break-words'>{element.content}</p></div>

                                </>

                            )}
                        {element.sender === 'user' &&
                            (<div key={key} className={'rounded-lg  break-words shadow-2xl my-2 cursor-pointer  z-50 bg-bot font-semibold float-right p-4 w-[75%] right-0 text-white text-sm'}><p>{element.content}</p></div>)}

                    </>
                )}
            </div>
        </div>
    )
}

export default Chat