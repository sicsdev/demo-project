import React, { useState } from 'react'

const UpperBasicKnowledge = ({ basicFormData, search, handleChange }) => {
    const [showSourceFilter, setShowSourceFilter] = useState(false)
    return (
        <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">
            <div className="bg-[#f1f1f1] p-6 rounded-md mb-6">
                <p className="text-xs mb-5 font-semibold">
                    To answer customer questions, Tempo is using:
                </p>
                <div className="flex gap-4 sm:gap-10 justify-start align-top">
                    <div className='w-[25%]'>
                        <h2 className="text-sm font-semibold">{basicFormData?.external}</h2>
                        <p className="text-xs font-semibold"> {basicFormData?.external === 1 ? "External page" : "External pages"}</p>
                        <p className="text-xs text-[#9CA3AF] font-semibold">out of {basicFormData?.external}</p>
                    </div>
                    <div className='w-[25%]'>
                        <h2 className="text-sm font-semibold">{basicFormData?.snippet}</h2>
                        <p className="text-xs font-semibold">{basicFormData?.snippet === 1 ? 'Snippet' : "Snippets"}</p>
                        <p className="text-xs text-[#9CA3AF] font-semibold">out of {basicFormData?.snippet}</p>
                    </div>
                    <div className='w-[25%]'>
                        <h2 className="text-sm font-semibold">{basicFormData?.file}</h2>
                        <p className="text-xs font-semibold">{basicFormData?.file === 1 ? 'File' : "Files"}</p>
                        <p className="text-xs text-[#9CA3AF] font-semibold">out of {basicFormData?.file}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between sm:flex gap-10 justify-start items-center">
                <div className='mt-0 sm:mt-0 relative' >
                    <div className="text-sm bg-[#FFF] rounded-md inline-block"
                        style={{ border: "1px solid #C7C6C7" }}>
                        <button
                            type="button"
                            className="border-none m-0 p-1 px-[0px] flex gap-1 items-center text-lg font-semibold w-[175px]"
                            onClick={() => { setShowSourceFilter(prev => !prev) }}
                        >
                            {/* 
                    <AdjustmentsHorizontalIcon className='h-4 w-4' />
                */}
                            <small className="flex gap-2 justify-between w-full font-normal items-center text-xs p-2">all
                                <i style={{ fontSize: "15px" }} className="fa">&#xf0d7;</i>
                            </small>
                        </button>
                    </div>
                    {showSourceFilter && (
                        <div id="dropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700"
                            style={{ border: "1px solid #C7C6C7" }}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li className='hover:bg-gray cursor-pointer' onClick={() => {
                                    // setKnowledge(getCount(basicFormData?.knowledgeData || [], 'All'))
                                    // setShowSourceFilter(prev => !prev)
                                    // setFilterhead('All')
                                }}>
                                    <p className="block px-2 text-xs py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >All</p>
                                </li>
                                <li className='hover:bg-gray cursor-pointer ' onClick={() => {
                                    // setKnowledge(getCount(basicFormData?.knowledgeData || [], 'EXTERNAL'))
                                    // setShowSourceFilter(prev => !prev)
                                    // setFilterhead('External')

                                }}>
                                    <p className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >External</p>
                                </li>
                                <li className='hover:bg-gray cursor-pointer ' onClick={() => {
                                    // setKnowledge(getCount(basicFormData?.knowledgeData || [], 'SNIPPET'))
                                    // setShowSourceFilter(prev => !prev)
                                    // setFilterhead('Snippet')

                                }}>
                                    <p href="#" className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Snippet</p>
                                </li>
                                <li className='hover:bg-gray cursor-pointer ' onClick={() => {
                                    // setKnowledge(getCount(basicFormData?.knowledgeData || [], 'FILE'))
                                    // setShowSourceFilter(prev => !prev)
                                    // setFilterhead('File')
                                }}>
                                    <p href="#" className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">File</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <input
                        placeholder="Search"
                        className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white focus:text-sm rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
                        type="text"
                        value={search}
                        onChange={handleChange}
                    />
                    <img className="w-5 top-[10px] left-[14px] absolute" src="/search.png" />
                </div>
            </div>
        </div>
    )
}

export default UpperBasicKnowledge