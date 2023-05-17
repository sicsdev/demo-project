import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
const Info = () => {
    const slides = [
        {
            url: 'https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75',
        },
        {
            url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        },
        {
            url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
        },

        {
            url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
        },
        {
            url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
        },
    ];
    return (
        <div>
            <h1 className='text-center text-5xl font-semibold text-gray-600'>
                Intuitive and contextual support
            </h1>
            <h3 className='text-center text-xl my-3 font-medium text-gray-600'>
                Empower your support teams to deliver timely and consistent support at any scale
            </h3>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-2 py-10 lg:grid-cols-2 gap-4">
                  
                    <div className="relative mx-0 my-0">
                    <div
                            style={{ backgroundImage: `url(${slides[0].url})` }}
                            className='w-full h-full  bg-center bg-cover duration-500'
                        ></div>
                    </div>
                    <div className="text-lg font-bold text-center p-20  rounded-lg ">
                        <h3 className='text-start text-lg my-3 font-medium text-gray-600'>TEMPOCHAT</h3>
                        <h1 className='text-start text-5xl my-8 font-semibold text-gray-600'>
                            Scaling support with bots and messaging channels?
                        </h1>
                        <h3 className='text-start text-xl my-8 font-normal text-gray-600'>Tempochat lets you service customers on modern messaging channels like WhatsApp, SMS, social, and more. And easily deploy AI-driven bots across those same channels for effortless self-service.</h3>
                        <div className='text-start text-violet-700'>
                            <Link href={"/"} >Explore Support Desk</Link>
                        </div>
                    </div>
                    <div className="text-lg font-bold text-center p-20  rounded-lg ">
                        <h3 className='text-start text-lg my-3 font-medium text-gray-600'>CONTACT CENTER</h3>
                        <h1 className='text-start text-5xl my-8 font-semibold text-gray-600'>
                            Conversations made easy with built-in telephony
                        </h1>
                        <h3 className='text-start text-xl my-8 font-normal text-gray-600'>Make it easy for your agents to provide exceptional service on voice with an intuitive, all-in-one contact center solution.</h3>
                        <div className='text-start text-violet-700'>
                            <Link href={"/"} >Explore Support Desk</Link>
                        </div>
                    </div>
                    <div className="relative mx-0 my-0">
                    <div
                            style={{ backgroundImage: `url(${slides[0].url})` }}
                            className='w-full h-full rounded-3xl  bg-center bg-cover duration-500'
                        ></div>
                    </div>
                    <div className="relative mx-0 my-0">
                    <div
                            style={{ backgroundImage: `url(${slides[0].url})` }}
                            className='w-full h-full  bg-center bg-cover duration-500'
                        ></div>
                    </div>
                    <div className="text-lg font-bold text-center p-20  rounded-lg ">
                        <h3 className='text-start text-lg my-3 font-medium text-gray-600'>TEMPOCHAT</h3>
                        <h1 className='text-start text-5xl my-8 font-semibold text-gray-600'>
                            Scaling support with bots and messaging channels?
                        </h1>
                        <h3 className='text-start text-xl my-8 font-normal text-gray-600'>Tempochat lets you service customers on modern messaging channels like WhatsApp, SMS, social, and more. And easily deploy AI-driven bots across those same channels for effortless self-service.</h3>
                        <div className='text-start text-violet-700'>
                            <Link href={"/"} >Explore Support Desk</Link>
                        </div>
                    </div>
                    <div className="text-lg font-bold text-center p-20  rounded-lg ">
                        <h3 className='text-start text-lg my-3 font-medium text-gray-600'>CONTACT CENTER</h3>
                        <h1 className='text-start text-5xl my-8 font-semibold text-gray-600'>
                            Conversations made easy with built-in telephony
                        </h1>
                        <h3 className='text-start text-xl my-8 font-normal text-gray-600'>Make it easy for your agents to provide exceptional service on voice with an intuitive, all-in-one contact center solution.</h3>
                        <div className='text-start text-violet-700'>
                            <Link href={"/"} >Explore Support Desk</Link>
                        </div>
                    </div>
                    <div className="relative mx-0 my-0">
                    <div
                            style={{ backgroundImage: `url(${slides[0].url})` }}
                            className='w-full h-full  bg-center bg-cover duration-500'
                        ></div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Info