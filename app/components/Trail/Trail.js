import React from 'react'

import Image from 'next/image';
const Trail = () => {
    return (
        <div className='bg-cyan-50'>
            {/* <div className="flex items-center justify-center"> */}
            <div className="grid grid-cols-2 md:grid-cols-2 p-20   lg:grid-cols-2 gap-4">
                <div className="text-lg font-bold text-center  ">
                    <h1 className='text-start text-5xl my-8 font-semibold text-gray-600'>
                        Sign up for your free trial today
                    </h1>
                    <h3 className='text-start text-xl my-8 font-normal text-gray-600'>21 days. Unlimited Agents. No credit card required. No strings attached.</h3>
                    <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-lg font-bold  text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Start free trial
                    </a>
                    <a href="#" className="inline-flex items-center justify-center mx-4 px-5 py-3 text-lg font-bold border-2 border-black  text-black bg-transparent rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Request Demo
                    </a>
                </div>
                <div className="relative border-solid m-auto">
                    <div className="">
                            <Image
                              src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F77e9d92a82b96dae%2Foriginal%2FFreshdesk-conversion-panel.webp&w=1920&q=75"
                              width={300}
                                height={300}
                                alt="Picture of the author"
                                className="rounded-3xl"
                            />
                        </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Trail