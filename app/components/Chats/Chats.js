
import React from 'react';
const Chat = ({ messages }) => {

    return (
        <div className='z-[50]'>
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

        </div>
    )
}

export default Chat