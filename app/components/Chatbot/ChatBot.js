'use client'
import React, { useRef, useState, useEffect, use } from 'react'
import Image from 'next/image'
const ChatBot = () => {
    const [height, setHeight] = useState(536)
    // show chat 
    const [show, setShow] = useState(false)
    const [thinking, setThinking] = useState(false)
    const [text, setText] = useState("")

    {/* for messages scroll to bottom the latest messages*/ }
    const messageEl = useRef(null);
    const scrollToBottom = () => {
        if (messageEl.current) {
            messageEl.current.scrollTop = messageEl.current.scrollHeight;
        }
    }

    // useEffect(() => {
    //     scrollToBottom()
    // }, [messageEl.current])
    // console.log(messageEl.current)

    {/* text area height maintaince */ }
    const ref = useRef(null);
    const handleInput = (e) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${e.target.scrollHeight}px`;
            setText(ref.current.value)
        }
    };

    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: 'Welcome to Deflection AI!'
        }
    ])
    // example messages 

    const addText = () => {
        clearTimeout();
        setMessages(prev => [
            ...prev,
            { from: 'user', text: text },
        ])
        setTimeout(
            () => {
                setThinking(true)
                setMessages(prev => [
                    ...prev,
                    { from: 'bot', text: 'Thanks for Joining me : ' + text }
                ])
            },
            1000,
        );

        setTimeout(
            () => {
                setThinking(false)
                scrollToBottom()
            },
            5000,
        );
        setText('')
        ref.current.style.height = 'auto'
        scrollToBottom()
    }



    useEffect(() => {
        if (messageEl.current) {
            messageEl.current?.scrollIntoView({ behavior: 'smooth' });
            messageEl.current.scrollTop = messageEl.current.scrollHeight;
        }
    }, [messages.length]);
    return (
        <>
            <div className={`${show ? "block animate-wiggle" : "hidden"} rounded-lg shadow-2xl fixed bottom-28 h-[536px] lg:left-none right-5 sm:right-12 md:right-12 lg:right-12 w-[90%] sm:w-[400px] md:w-[400px] lg:w-[400px] cursor-pointer z-50 bg-white`}>
                <div className=' rounded-t-lg  flex justify-start gap-2 items-center p-3 bg-bot'>
                    <div onClick={() => { setShow(!show) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-time-bot">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='relative h-10 w-10 rounded-full'>
                        <Image src={'https://static.intercomassets.com/avatars/4448521/square_128/4448521-1665142820.jpg'} fill={true} alt='bot_img' className='rounded-full bg-contain mx-auto' />
                    </div>
                    <div>
                        <h1 className='text-white font-bold'>Deflection AI</h1>
                        <h3 className='flex items-center gap-1 text-xs font-semibold text-time-bot' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg> Within a day
                        </h3>
                    </div>
                </div>
                <div>
                    <div className='block p-4 overflow-y-scroll h-[420px] pb-[60px] relative ' ref={messageEl}>

                        {messages.map((element, key) =>
                            <>
                                {element.from === 'bot' &&
                                    <div key={key} className={'rounded-lg shadow-2xl my-2 cursor-pointer z-50  bg-[#f4037b17] font-semibold float-left p-4 w-[75%] text-heading text-sm'}><p className='break-words'>{element.text}</p></div>
                                }
                                {element.from === 'user' &&
                                    (<div key={key} className={'rounded-lg  break-words shadow-2xl my-2 cursor-pointer  z-50 bg-bot font-semibold float-right p-4 w-[75%] right-0 text-white text-sm'}><p>{element.text}</p></div>)}

                            </>
                        )}
                    </div>
                </div>

            </div>


            <div className={'transition ease-in-out delay-10 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white rounded-full bg-bot w-[60px] h-[60px] fixed  bottom-10 right-8 flex justify-center items-center cursor-pointer z-50 shadow-2xl'} onClick={() => {
                setShow(!show)
            }
            }>
                {show ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${show ? 'animate-bottoggle' : ''}`}>
                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="animate-backbottoggle w-10 h-10 transition-transform duration-160 ease-linear delay-0 duration-80 ">
                        <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                    </svg>
                }

            </div>
        </>
    )
}

export default ChatBot