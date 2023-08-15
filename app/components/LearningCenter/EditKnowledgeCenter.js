import React, { useState, useRef, useEffect } from 'react'
import { BoltIcon, XMarkIcon, EllipsisHorizontalIcon, XCircleIcon } from '@heroicons/react/24/outline'
import moment from 'moment';
import { makeCapital } from '../helper/capitalName';
import { updateKnowledgeRecord } from '@/app/API/pages/Knowledge';
import { errorMessage, successMessage } from '../Messages/Messages';

const EditKnowledgeCenter = ({ singleKnowledgeData, isClose, deleteRecord, setSingleKnowledgeData, getData }) => {
    const [content, setContent] = useState(singleKnowledgeData?.content ?? '')
    const [loading, setLoading] = useState(false)
    const handleInputChange = (e) => {
        const { value, name } = e.target
        if (name === "content") {
            setContent(value)
        }
        setSingleKnowledgeData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    function extractErrorMessage(response) {
        // Find the first key in the response object that has an error array
        const errorKey = Object.keys(response).find(key => Array.isArray(response[key]));

        // If an error key was found, return the error message as a string
        if (errorKey) {
            const errorMessage = response[errorKey][0];
            return errorMessage;
        }

        // Return a default message if no error key with an array was found
        return "An unknown error occurred";
    }
    const handleSubmit = async () => {
        setLoading(true)
        let payload = { content: content, title: singleKnowledgeData.title }
        const response = await updateKnowledgeRecord(payload, singleKnowledgeData.id);
        if (response.status === 201 || response.status === 200) {
            successMessage(singleKnowledgeData.source + " Updated Successfully !")
            setLoading(false)
            isClose()
            getData()
        } else {
            errorMessage(extractErrorMessage(response))
            setLoading(false)
        }
    }
    const DisablingButton = () => {
        return ["content",'title'].some(
            (key) => !singleKnowledgeData[key] || singleKnowledgeData[key].trim() === ""
        );
    }
    return (
        <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'>
            <div className='w-full sm:w-auto fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                <div className=' overflow-y-scroll shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>

                    <div className="bg-white p-4">
                        <div className="flex items-center justify-between border-b border-border dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-black-color text-xl font-semibold my-4">
                                {singleKnowledgeData?.title}
                            </p>
                            <div className='flex hover:cursor-pointer items-center justify-center gap-2'>
                                <ButtonComponent data={singleKnowledgeData} deleteRecord={deleteRecord} />
                                <XMarkIcon className='h-5 w-5' onClick={(e) => isClose()} />
                            </div>

                        </div>
                        <p className="text-xs my-2 font-bold ">DETAILS</p>
                        <div className='my-4 grid grid-cols-2 gap-4 items-center'>

                            <div>
                                <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                                    {singleKnowledgeData.source === "file" && "File"}
                                    {singleKnowledgeData.source === "external" && "URL"}
                                    {singleKnowledgeData.source === "snippet" && "Title"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold p-1">
                                    {singleKnowledgeData.title}
                                </p>
                            </div>
                            <div>
                                <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                                    Source
                                </p>
                            </div>
                            <div>
                                <p className=" bg-[#E5EDFF] text-primary inline-block whitespace-nowrap rounded px-4 py-2 align-baseline text-xs font-bold leading-none">
                                    {makeCapital(singleKnowledgeData.source)}
                                </p>
                            </div>
                            <div>
                                <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                                    State
                                </p>
                            </div>

                            <div>
                                <p className={` ${singleKnowledgeData.active === true ? 'bg-[#d8efdc] text-[#107235] ' : 'text-black bg-[#ececf1]'} inline-block whitespace-nowrap rounded px-4 py-2 align-baseline text-xs font-bold leading-none`}>
                                    {singleKnowledgeData.active ? "Active" : "Disable"}
                                </p>
                            </div>

                            <div>
                                <p className="w-[105px] text-sm text-[#9CA3AF] font-semibold">
                                    Last edited
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold p-1">{moment(singleKnowledgeData.created).fromNow()}</p></div>
                        </div>
                        <hr className='mt-6 text-border' />
                        <div className="pt-4">
                            <p className="text-xs mb-4 font-semibold">
                                CONTENT IMPORTED
                            </p>
                            <div className='mt-2'>
                                {singleKnowledgeData.source === "snippet" && (
                                    <div className='flex flex-row flex-1'>
                                        <input type='text' className='border border-border my-2 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Enter a Title' id='title' name='title' value={singleKnowledgeData.title} onChange={handleInputChange} />
                                    </div>)}

                                <div className='relative pb-6'>
                                    <textarea rows="10" cols="30" className='border border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Start writing your content...' value={content} name='content' id='content' onChange={handleInputChange}></textarea>
                                </div>
                                <button onClick={(e) => handleSubmit()} type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none" disabled={DisablingButton() || loading === true}>
                                    {loading ? "Loading..." : "Save and close"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditKnowledgeCenter


export const ButtonComponent = ({ data, deleteRecord }) => {
    const [showDelete, setShowDelete] = useState(null)

    const divRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShowDelete(null);
            }
        };
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div className='cursor-pointer relative' ref={divRef} onClick={(e) => {
                setShowDelete(prev => { if (prev === data.id) { return null } else { return data.id } })
            }}>
                <EllipsisHorizontalIcon className="h-6 w-6 font-bold text-heading cursor-pointer" />
                {showDelete === data.id && (
                    <div className={`absolute right-[0px] top-[20px] z-10 w-auto bg-[#F8F8F8] divide-y divide-gray-100shadow`}>
                        <button type='button' className="text-heading font-semibold  border border-border rounded-lg  hover:bg-black hover:text-white flex items-center justify-center gap-2 px-2 py-2 " onClick={() => deleteRecord(data.id)}>
                            <XCircleIcon className='w-4 h-4' />
                            Delete</button>

                    </div>
                )}
            </div >
        </>
    )

}