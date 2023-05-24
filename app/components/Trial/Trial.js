import React from 'react'

import Image from 'next/image';
import Button from '../Common/Button/Button';
const Trial = () => {
    return (
        <div className="">
            <div className='mx-auto  max-w-[90%]'>
                {/* <div className="flex items-center justify-center"> */}
                <div className="grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-4 sm:p-4 md:p-20 lg:p-20 gap-4">
                    <div className=" my-5 sm:text-start md:text-start lg:text-start  ">
                        <h1 className=' text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading'>
                            Sign up for your <span className="text-voilet">free trial today</span>
                        </h1>
                        <h3 className='text-base sm:text-2xl md:text-2xl lg:text-2xl  my-2 font-base text-heading'>21 days. Unlimited Agents. No credit card required. No strings attached.</h3>
                        <Button
                            type={'submit'}
                            className={'group py-[11px] px-2 focus:ring-yellow-300 text-white bg-voilet hover:bg-black dark:focus:ring-voilet-900'}
                        >
                            Start Free Trail
                        </Button>
                        <Button
                            type={'submit'}
                            className={'py-[11px]  px-2 focus:ring-yellow-300 text-white bg-black hover:bg-voilet dark:focus:ring-voilet-900'}
                        >
                             Request Demo
                        </Button>
                      
                    </div>
                    <div className="relative border-solid m-auto text-center">
                        <div className="m-auto w-[100%]">
                            <Image
                                src="https://www.freshworks.com/_next/image/?url=https%3A%2F%2Fdam.freshworks.com%2Fm%2F77e9d92a82b96dae%2Foriginal%2FFreshdesk-conversion-panel.webp&w=1920&q=75"
                                width={400}
                                height={300}
                                alt="Picture of the author"
                                className="rounded-3xl mb-5"
                            />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Trial