
import { addBotConversationMessagesReaction } from '@/app/API/pages/Bot';
import React from 'react';
const Chat = ({ messages }) => {
    const createFlag = async (value) => {
        const response = await addBotConversationMessagesReaction(value.id, { reaction: "DISLIKE" })
        console.log(response)
    }
    return (
        <>
           
                <div className='z-[50]'>
                    <>

                        <div className='chat-scroll'>
                            <div className='block z-0 p-4 scroll-smooth  overflow-y-scroll h-[600px] sm:h-[420px] md:h-[420px] lg:h-[420px] pb-[60px] relative my-8 sm:mx-10 md:mx-10 lg:mx-10' >

                                {messages.map((element, key) =>
                                    <div key={key}>
                                        {element.sender === 'bot' &&
                                            (
                                                <div className='flex justify-start gap-2 items-center' >
                                                    <div className={'rounded-lg my-2 cursor-pointer z-50 bg-[#2196f333] font-normal p-4 w-auto max-w-[500px] border-border text-heading text-md'}><p className='leading-relaxed break-words'>{element.content}</p></div>
                                                    <button className='cursor-pointer ' onClick={(e) => { createFlag(element) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        {element.sender === 'user' &&
                                            (<div className='flex justify-end'><div className={'rounded-lg  break-words my-2 cursor-pointer  z-50 bg-heading text-md font-normal  p-4 w-auto max-w-[500px] right-0 text-white'}><p className='leading-relaxed'>{element.content}</p></div></div>)}

                                    </div>
                                )}
                            </div>
                        </div>
                    </>

                </div>
        </>
    )
}

export default Chat