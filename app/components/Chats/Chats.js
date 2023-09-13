
import { addBotConversationMessagesReaction } from '@/app/API/pages/Bot';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import Image from 'next/image';

const Chat = ({ messages, selectedBot }) => {
    const [botUnique, setBotUnique] = useState({})
    const createFlag = async (value) => {
        const response = await addBotConversationMessagesReaction(value.id, { reaction: "DISLIKE" })
    }
    const bot = useSelector(state => state.botId.botData.data)

    useEffect(() => {
        if (bot) {
            const filterBot = bot.bots.find((x) => x.id === selectedBot)
            if (filterBot) {
                setBotUnique(filterBot)
            }
        }
    }, [bot])
    console.log("botUnique", botUnique)
    const getInitials = (name) => {
        const words = name?.split(' ');
        if (words?.length === 1) {
            // If there is only one word in the name, return the first character as initials
            return words[0]?.charAt(0).toUpperCase();
        } else {
            // If there are multiple words, return the first character of each word as initials
            return words?.map(word => word?.charAt(0)).join('').toUpperCase();
        }
    }
    return (
        <>

            <div className='z-[50]'>
                <>
                    <div className=''>
                        <div className='flex justify-between gap-4 items-center'>
                            <div className='flex justify-between gap-2 items-center'>
                                {!botUnique?.enterprise?.logo ?
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-lg">
                                        <span className="font-bold text-white">{getInitials(botUnique?.enterprise?.name)}</span>
                                    </div> :
                                    <div className="relative w-[45px] h-[45px] gap-1 rounded-lg">
                                        <Image
                                            fill={"true"}
                                            className="bg-contain mx-auto w-full rounded-lg"
                                            alt="logo.png"
                                            src={botUnique?.enterprise?.logo}
                                        />
                                    </div>}
                                <div>
                                    <h3 className='text-sm !font-bold text-heading'>{botUnique?.enterprise?.name}</h3>
                                    <p className='text-xs pt-2'><span className='bg-[#306192] px-2 py-1 text-white rounded-md font-semibold'>AI</span> Powered by Tempo</p>
                                </div>
                            </div>
                            <div>
                                <button type='button' className='bg-[#3498db2f] p-1 font-semibold text-primary cursor-pointer rounded-md text-xs'>Beta</button>
                            </div>
                        </div>
                    </div>
                    <div className='chat-scroll'>
                        <div className='block z-0 p-4 scroll-smooth  overflow-y-scroll h-[600px] sm:h-[420px] md:h-[420px] lg:h-[420px] pb-[60px] relative my-8 sm:mx-10 md:mx-10 lg:mx-10' >

                            {messages.map((element, key) =>
                                <div key={key}>
                                    {element.sender === 'bot' &&
                                        (
                                            <div className='flex justify-start gap-2 items-center' >
                                                <div style={{ backgroundColor: botUnique?.secondary_color ,color:botUnique?.secondary_text_color}}  className={`rounded-[8px] my-2 cursor-pointer z-50  font-medium p-2 w-auto max-w-[500px] border-border text-[14px]`}><p className='leading-relaxed break-words'>{element.content}</p></div>
                                                <button className='cursor-pointer ' onClick={(e) => { createFlag(element) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    {element.sender === 'user' &&
                                        (<div className='flex justify-end'><div  style={{ backgroundColor: botUnique?.primary_color ,color:botUnique?.primary_text_color}} className={'rounded-[8px]  break-words my-2 cursor-pointer  z-50 font-medium  p-2 w-auto max-w-[500px] right-0 text-[14px]'}><p className='leading-relaxed'>{element.content}</p></div></div>)}

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