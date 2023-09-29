import React from 'react'
import TestingMiniBot from '../Chats/TestingMiniBot'
import { useState } from 'react'

const TestWidgetLayout = () => {

    const [showTestBot, setShowTestBot] = useState(false)

    return (
        <>

            {showTestBot &&
                <>

                    <div
                        className=" bg-transparent overflow-auto  flex flex-col z-50"
                        onClick={() => setShowTestBot(false)}
                    >
                        {" "}
                    </div>
                    <div
                        className={` z-50 w-full sm:w-[550px] fixed right-0 m-auto max-h-[100%] shadow-md rounded-xl testbotwidget `}
                    >
                        <TestingMiniBot></TestingMiniBot>

                    </div>

                </>
            }

            <button
                onClick={() => setShowTestBot(!showTestBot)}
                className={`fixed bottom-3 right-3 m-auto rounded-xl pointer z-100`}
            >
                <div class="p-3 bg-primary rounded-full">
                    {showTestBot ?
                        (

                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="25px" height="25px" viewBox="0 0 24 24" >
                                <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                            </svg>

                        )
                        :
                        (
                            < svg xmlns="http://www.w3.org/2000/svg" width='25px' fill='white' viewBox="0 0 24 24" className="chat_trigger">
                                <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                            </svg>
                        )
                    }
                </div>
            </button>


        </>
    )
}

export default TestWidgetLayout