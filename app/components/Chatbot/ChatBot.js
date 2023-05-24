'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import autosize from 'autosize';
const ChatBot = () => {
    const textareaRef = useRef(null);

    useEffect(() => {
        autosize(textareaRef.current);
    }, []);
    const [show, setShow] = useState(false)
    return (
        <>
            {show && (
                <div className={'rounded-lg shadow-2xl fixed bottom-28 right-12 w-[400px] cursor-pointer z-50 bg-white'}>
                    <div className=' rounded-t-lg  flex justify-start gap-2 items-center p-3 bg-bot'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-time-bot">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='relative h-10 w-10 rounded-full'>
                            <Image src={'https://static.intercomassets.com/avatars/4448521/square_128/4448521-1665142820.jpg'} fill={true} alt='bot_img' className='rounded-full bg-contain mx-auto' />
                        </div>
                        <div>
                            <h1 className='text-white font-bold'>Tempo</h1>
                            <h3 className='flex items-center gap-1 text-xs font-semibold text-time-bot' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg> Within a day
                            </h3>
                        </div>

                    </div>
                    <div className='block p-4 overflow-y-scroll max-h-[60vh]'>
                        <div className=' snap-y  w-full'>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-border font-semibold float-left p-4 w-[75%] text-white text-sm'}><p>Are you an Intercom customer?</p></div>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-border font-semibold float-left  p-4 w-[75%] text-white text-sm'}><p>Welcome! You'll get a reply from the team.</p></div>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-bot font-semibold float-right p-4 w-[75%] right-0 text-white text-sm'}><p>Are you an Intercom customer?</p></div>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-bot font-semibold float-right p-4 w-[75%] right-0 text-white text-sm'}><p>Are you an Intercom customer?</p></div>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-border font-semibold  float-left  p-4 w-[75%] text-white text-sm'}><p>Welcome! You'll get a reply from the team.</p></div>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-bot font-semibold float-right p-4 w-[75%] right-0 text-white text-sm'}><p>Are you an Intercom customer?</p></div>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-border font-semibold  float-left  p-4 w-[75%] text-white text-sm'}><p>Welcome! You'll get a reply from the team.</p></div>
                            <div className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50 bg-border font-semibold  float-left  p-4 w-[75%] text-white text-sm'}><p>Welcome! You'll get a reply from the team.</p></div>

                        </div>

                    </div>
                    <div className='flex rounded-lg overflow-x-hidden min-h-[10px] max-h-[100px] items-center justify-evenly'>
                        <textarea
                            ref={textareaRef}
                            className="w-[70%]  px-4 py-2 resize-none flex items-center h-12 text-start rounded focus:outline-none  focus:border-0" placeholder='Write a reply...'
                        ></textarea>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-bot">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>

                    </div>
                </div>
            )}

            <div className={'transition ease-in-out delay-10 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white rounded-full bg-bot w-[60px] h-[60px] fixed  bottom-10 right-8 flex justify-center items-center cursor-pointer z-50 shadow-2xl'} onClick={() => setShow(!show)}>
                {show ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 transition-transform duration-160 ease-linear delay-0 duration-80 ">
                        <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                    </svg>
                }

            </div>
        </>
    )
}

export default ChatBot