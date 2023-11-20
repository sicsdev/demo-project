"use client"
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import Image from 'next/image';

const Secureform = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])
    return (
        <>
            <div className='bg-[#f8f9fa] pb-28'>
                {loading ? <div className='px-10 py-10 flex justify-center'><SkeletonLoader count={1} height={50} width={200} baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='sm:text-3xl sm:font-bold flex justify-center pt-10 pb-10'>
                    Request a Quote
                </div>}

                <div className='sm:grid sm:grid-cols-2 block'>
                    <div className='w-auto sm:pl-80 sm:pr-10 p-10'>
                        {loading ? <div className='py-50'><SkeletonLoader count={10} height={40} className="w-full sm:w-[700px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <><input
                            type={"text"}
                            placeholder={"Full Name"}
                            className={
                                "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-sm text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                            }
                            required

                        />
                            <input
                                type={"text"}
                                placeholder={"Business Email"}
                                className={
                                    "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-sm text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                                }
                                required
                            />
                            <input
                                type={"text"}
                                placeholder={"Phone"}
                                className={
                                    "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-sm text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                                }
                                required
                            />
                            <input
                                type={"email"}
                                placeholder={"Company"}
                                className={
                                    "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-sm text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                                }
                                id={"email"}
                                required
                            />
                            <input
                                type={"text"}
                                placeholder={"Number of Employees"}
                                className={
                                    "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-sm text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                                }
                                required
                            />
                            <select placeholder={"Add Company"}
                                className={
                                    "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-sm text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                                }
                                required>
                                <option>Select Company</option>
                                <option>Deflection AI</option>
                                <option>Next Med</option>
                            </select>
                        </>}
                        {loading ? <div className='py-10'><SkeletonLoader count={1} height={50} className="w-full sm:w-[500px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className="flex items-center my-6">
                            <input
                                id="link-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            // onChange={(e) => Abc(e)}
                            />
                            <label
                                htmlFor="link-checkbox"
                                className="ml-2 text-xs font-medium text-border "
                            >
                                By checking this box, you are opting in to receive future communications from 8x8.
                            </label>
                        </div>}
                        {loading ? <div className=''><SkeletonLoader count={1} height={50} className="w-full sm:w-[100px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='flex justify-center'>
                            <button className='bg-[#FF5721] text-xl font-bold p-3 rounded-full text-white '>Request a Quote</button>
                        </div>}

                    </div>
                    <div className='bg-white border border-gray sm:w-[400px] w-96 h-[500px] text-center sm:ml-20 m-auto sm:mt-8'>
                        {loading ? <div className='pt-20'><SkeletonLoader count={1} height={50} className="w-full sm:w-[100px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div className='flex justify-center text-2xl pt-20 pb-2 text-bot'>
                            1-855-519-0283
                        </div>}

                        <hr className='m-3 text-gray' />
                        {loading ? <div className=''><SkeletonLoader count={3} height={40} className="w-full sm:w-[100px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div>
                            <div>
                                Chat with an 8x8 Expert
                            </div>
                            <button className='sm:pt-5 sm:text-lg pt-5 text-sm font-bold onHoveLine'>Chat With Sales<i class="fa fa-arrow-right text-orange text-sm"></i></button>
                            <button className='sm:pt-5 sm:text-lg pt-5 text-sm font-bold onHoveLine'>Schedule a Meeting or Demo<i class="fa fa-arrow-right text-orange text-xs"></i></button>
                        </div>}

                        <hr className='m-3 text-gray' />
                        {loading ? <div className=''><SkeletonLoader count={2} height={40} className="w-full sm:w-[100px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div>
                            <div>
                                Calculate your savings in 60-seconds.
                            </div>
                            <button className='sm:pt-5 sm:text-lg pt-5 text-sm font-bold onHoveLine'>Start 8*8 ROI Tool<i class="fa fa-arrow-right text-orange text-sm"></i></button>
                        </div>}

                        <hr className='m-3 text-gray' />
                        {loading ? <div className=''><SkeletonLoader count={2} height={40} className="w-full sm:w-[100px]" baseColor="gray" highlightColor="#f6f6f6" /></div> : <div>
                            <div>
                                Need product help?
                            </div>
                            <button className='sm:pt-5 sm:text-lg pt-5 text-sm font-bold onHoveLine'>Go to Support<i class="fa fa-arrow-right text-orange text-sm"></i></button>
                        </div>}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Secureform