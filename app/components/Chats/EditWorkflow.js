import { getKnowledgeData, patchKnowledgeQuestion } from '@/app/API/pages/Knowledge'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const EditWorkflow = ({ item, allKnowledge }) => {

    // let descriptions = item?.information?.description[0].split(', ') || null
    // let descriptions = item?.information?.description[0] || null
    let descriptionLine = "If user says I want a refund"

    useEffect(() => {
        // getThisKnowledge()

    }, [])



    // Local states
    const [loading, setLoading] = useState(false)
    const [dropdownOpen, isDropdownOpen] = useState(false)
    const [inputValue, setInputValue] = useState(descriptionLine)

    // Handlers

    const toggleDropdown = () => {
        isDropdownOpen(!dropdownOpen)
    }


    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const handlePatchWorkflow = async () => {
        setLoading(true)
        let newDescription = item?.information?.description[0].replace(descriptionLine, inputValue)
        await updateWorkFlowStatus({ description: [newDescription] })
        setLoading(false)
    }

    return (
        <>

            <div key={item.information?.id} className='mt-1 border p-2 rounded-md border-gray shadow-md'>

                <div className="relative">

                    <div className="flex pointer" onClick={toggleDropdown}>
                        <span className="w-full flex items-center" >
                            <small id={item?.information?.id}>
                                {item?.information?.name}
                            </small>
                        </span>


                        {!dropdownOpen ?
                            <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                            :
                            <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        }
                    </div>
                    {dropdownOpen &&

                        <div className="my-2">
                            {/* {descriptions?.map(w => ( */}

                            <div className="flex flex-row flex-1">
                                <input
                                    type="text"
                                    className="border border-border my-2 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]"
                                    placeholder="Question"
                                    id={descriptionLine}
                                    name={descriptionLine}
                                    value={inputValue}
                                    onChange={handleInput}
                                />
                            </div>
                            {/* ))} */}

                            <button
                                type="button"
                                onClick={handlePatchWorkflow}
                                className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none"
                            >
                                {loading ? "Saving.." : "Save"}
                            </button>
                        </div>

                    }

                </div>


            </div>
        </>
    )
}

export default EditWorkflow