import Link from 'next/link'
import React from 'react'
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
        <div className="justify-between mx-auto max-w-[90%] ">
            <h1 className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading'>
            Intelligent and dynamic support
            </h1>
            <h3 className='text-center text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading'>
            Scale your sales operations and customer service without scaling your time
            </h3>
            <div className="grid grid-col-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-2 gap-8 my-16">
                <div className="text-start sm:text-start md:text-start lg:text-start order-1">
                    <h3 className='text-lg my-3 font-medium text-heading'>TEMPOCHAT</h3>
                    <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-5xl md:my-8 lg:my-8 sm:my-8 font-bold text-heading'>
                        Scaling support with bots and messaging channels?
                    </h1>
                    <h3 className='text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading'>Tempochat lets you service customers on modern messaging channels like WhatsApp, SMS, social, and more. And easily deploy AI-driven bots across those same channels for effortless self-service.</h3>
                    <div className='text-voilet font-semibold'>
                        <Link href={"/"} >Explore Support Desk</Link>
                    </div>
                </div>
                <div
                    style={{ backgroundImage: `url(https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75)` }}
                    className='h-64 sm:h-full md:h-full lg:h-full md:w-full sm:w-full lg:w-full bg-cover bg-center order-2 md:my-8 lg:my-8 sm:my-8 '
                ></div>
                <div
                    style={{ backgroundImage: `url(https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75)` }}
                    className='h-64 sm:h-full md:h-full lg:h-full md:w-full sm:w-full lg:w-full bg-cover bg-center md:my-8 lg:my-8 sm:my-8  order-4 md:order-3 sm:order-3 lg:order-3'
                ></div>
                <div className="text-start sm:text-start md:text-start lg:text-start md:my-8 lg:my-8 sm:my-8  order-3 md:order-4 sm:order-4 lg:order-4">
                    <h3 className='text-lg my-3 font-medium text-heading'>CONTACT CENTER</h3>
                    <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-5xl md:my-8 lg:my-8 sm:my-8 font-bold text-heading'>
                        Conversations made easy with built-in telephony
                    </h1>
                    <h3 className='text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading'>Make it easy for your agents to provide exceptional service on voice with an intuitive, all-in-one contact center solution.</h3>
                    <div className='text-voilet font-semibold'>
                        <Link href={"/"} >Explore Support Desk</Link>
                    </div>
                </div>
                <div className="text-start sm:text-start md:text-start lg:text-start md:my-8 lg:my-8 sm:my-8  order-5">
                    <h3 className='text-lg my-3 font-medium text-heading'>TEMPOCHAT</h3>
                    <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-5xl md:my-8 lg:my-8 sm:my-8 font-bold text-heading'>
                        Scaling support with bots and messaging channels?
                    </h1>
                    <h3 className='text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading'>Tempochat lets you service customers on modern messaging channels like WhatsApp, SMS, social, and more. And easily deploy AI-driven bots across those same channels for effortless self-service.</h3>
                    <div className='text-voilet font-semibold'>
                        <Link href={"/"} >Explore Support Desk</Link>
                    </div>
                </div>
                <div
                    style={{ backgroundImage: `url(https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75)` }}
                    className='h-64 sm:h-full md:h-full lg:h-full md:w-full sm:w-full lg:w-full bg-cover bg-center md:my-8 lg:my-8 sm:my-8  order-6'
                ></div>
                <div
                    style={{ backgroundImage: `url(https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F5357153992dc7715%2Foriginal%2FHandle-any-and-every-customer-issue-with-ease.png&w=3840&q=75)` }}
                    className='h-64 sm:h-full md:h-full lg:h-full md:w-full sm:w-full lg:w-full bg-cover bg-center md:my-8 lg:my-8 sm:my-8  order-8 md:order-7 sm:order-7 lg:order-7'
                ></div>
                <div className="text-start sm:text-start md:text-start lg:text-start md:my-8 lg:my-8 sm:my-8 order-7 md:order-8 sm:order-8 lg:order-8">
                    <h3 className='text-lg my-3 font-medium text-heading'>CONTACT CENTER</h3>
                    <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-5xl md:my-8 lg:my-8 sm:my-8 font-bold text-heading'>
                        Conversations made easy with built-in telephony
                    </h1>
                    <h3 className='text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading'>Make it easy for your agents to provide exceptional service on voice with an intuitive, all-in-one contact center solution.</h3>
                    <div className='text-voilet font-semibold'>
                        <Link href={"/"} >Explore Support Desk</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info