import { updateKnowledgeRecord } from '@/app/API/pages/Knowledge'
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/solid'
import React, { useRef, useState, useEffect } from 'react'

const UrlManagement = ({ setCreateOptions, currentStatusSteps, currentIndex, basicFormData, setBasicFormData, handleSubmit, loading, getCount, deleteRecord, knowledge, setKnowledge }) => {
    const [url, setUrl] = useState(basicFormData?.url ?? '')
    const [knowledgeData, setKnowledgeData] = useState(getCount(basicFormData?.knowledgeData || [], 'EXTERNAL'))
    const handleInputChange = (e) => {
        const { value, name } = e.target
        setUrl(value)
        setBasicFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const DisablingButton = () => {
        return ["url"].some(
            (key) => !basicFormData[key] || basicFormData[key].trim() === ""
        );
    }

    const handleToggle = async (index, id) => {
        const knowledgeIndex = knowledge.findIndex(obj => obj.id === id);
        const basicFormDataIndex = basicFormData?.knowledgeData.findIndex(obj => obj.id === id);
        let knowledgeData = [...knowledge]
        let basic = [...basicFormData.knowledgeData]
        let singleData = [...knowledgeData]
        const payload = { active: true };
        if (singleData[index].active === true) {
            singleData[index].active = false
            payload.active = false
            basic[basicFormDataIndex].active = false
            knowledgeData[knowledgeIndex].active = false
        } else {
            singleData[index].active = true
            basic[basicFormDataIndex].active = true
            knowledgeData[knowledgeIndex].active = true
        }
        setBasicFormData((prev) => {
            return {
                ...prev,
                knowledgeData: basic
            }
        })
        try {
            await updateKnowledgeRecord(payload, singleData[index].id);
            setKnowledge(knowledgeData)
            setKnowledgeData(getCount(basic || [], 'EXTERNAL'))
        } catch (error) {
        }

    }

    const deleteRecordNew = (id) => {
        const filerData = knowledgeData.filter((x) => x.id !== id)
        setKnowledgeData(filerData)
    }
    return (
        <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'>
            <div className={` overflow-y-scroll w-full sm:w-auto fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}>
                <div className={`shadow-lg w-full sm:w-[700px] relative flex flex-col pl-8 pr-8 ${knowledgeData.length < 2 && "h-[100%]"}`}>
                    <div className='flex flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800'>
                        <div className='flex flex-1'>
                            <h2 className='font-bold text-lg'>Manage sources</h2>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <div className='cursor-pointer' onClick={(e) => setCreateOptions(null)}>
                                <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] p-2' />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col flex-1 p-0 my-2'>
                        <div className='flex flex-col gap-8 border-gray-lightest px-8 -mx-8'>
                            <div className='flex flex-col gap-2'>
                                <h3 className='font-bold text-black'>Enter the URL of your external support content</h3>
                                <p className="text font-normal text-xs">
                                    We will fetch all of the pages from the website URL you provide. Please provide a <strong>top-level domain</strong>. We will read from all the sub domain pages.
                                </p>
                                <input type='text' placeholder='https://support.mywebsite.com/' className='new_input block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[12px] text-[12px] disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full focus:bg-white focus:text-[12px]' onChange={handleInputChange} name="url" id='url' />
                                <div className='flex flex-col gap-2 pt-2'>
                                    <ul className="text mt-0 px-6 list-disc text-sm">
                                        <li className="mb-2">
                                            Provide your <strong>external help center homepage link</strong> for best results
                                        </li>
                                        <li className="mb-2">
                                            <strong>Top-level domains will give the best results</strong> (e.g. https://myhelpcenter.com rather than https://myhelpcenter.com/home)
                                        </li>
                                    </ul>
                                    <div className="flex flex-row">
                                        <button type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:cursor-pointer disabled:bg-input_color disabled:text-white" disabled={DisablingButton() || loading === true} onClick={() => handleSubmit({ type: "URL" })} value={url}>
                                            {loading ? "Loading..." : "Sync external support content"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold text-black'>Synced external sources</h3>
                                <p className="text font-normal text-xs">
                                    Tempo will automatically generate responses using the following external sources:
                                </p>
                                <div className='mb-4'>
                                    {knowledgeData.map((_, key) =>
                                        <div className="cursor-pointer flex flex-col gap-4 mt-4  shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg " key={key}>
                                            <div className=' '>
                                                <div className="flex flex-wrap sm:flex-auto justify-between rounded bg-white p-4">
                                                    <div className='flex items-center justify-center'>
                                                        <div>
                                                            <label className="switch" style={{ height: "unset" }}>
                                                                <input type="checkbox" name="url_active" onChange={() => { handleToggle(key, knowledgeData[key].id) }} checked={knowledgeData[key].active === true} />
                                                                <span className="slider round h-[27px] w-[55px]"></span>
                                                            </label>
                                                        </div>
                                                        <h3 className='font-semibold'>{knowledgeData[key]?.url}</h3>
                                                    </div>
                                                    <div className='pt-4 sm:pt-0 flex justify-center gap-1 items-center'>
                                                        <p className={`inline-block whitespace-nowrap rounded ${knowledgeData[key].status === "FAILED" ? "bg-[#FDE8E8] text-red" : knowledgeData[key]?.active === true ? `bg-[#d8efdc] text-[#107235]` : 'text-black bg-[#ececf1]'} px-4 py-2 align-baseline text-xs font-bold leading-none`}>
                                                            {knowledgeData[key].status === "FAILED" ? "Failed" : knowledgeData[key]?.active === true ? `Active` : `Disabled`}
                                                        </p>
                                                        <ButtonComponent data={{ id: knowledgeData[key]?.id }} deleteRecord={deleteRecord} deleteRecordNew={deleteRecordNew} />

                                                    </div >

                                                </div>
                                                {knowledgeData[key].status === "FAILED" && (
                                                    <div className=' p-4 '>
                                                        <p className='bg-[#FDE8E8] text-red rounded-md font-semibold text-xs p-1 flex items-center gap-2' ><XCircleIcon className="h-5 w-5 text-red" /> There was an error processing the content. Please try again or contact support.</p>
                                                    </div>
                                                )}
                                                {knowledgeData[key].status === "IN-PROGRESS" && (
                                                    <div className="flex flex-col justify-between rounded bg-white p-4">
                                                        <p className='text-xs pb-4'>We are indexing your website and collecting your support content</p>
                                                        <div className="grid grid-rows-`4` grid-flow-col gap-1 h-[5px]">
                                                            {currentStatusSteps.map((item, index) => (
                                                                <div key={index} className={`rounded-[10px] ${index === currentIndex ? 'blink-in-progress-animation' : ''} ${index < currentIndex ? 'flex-none bg-[#222]' : ''} ${index > currentIndex ? 'flex-auto bg-[#e8e8e8]' : ''} `}></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UrlManagement




export const ButtonComponent = ({ data, deleteRecord, deleteRecordNew }) => {
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
                        <button type='button' className="text-heading font-semibold  border border-border rounded-lg  hover:bg-black hover:text-white flex items-center justify-center gap-2 px-2 py-2 " onClick={() => {
                            deleteRecord(data.id)
                            deleteRecordNew(data.id)
                        }}>
                            <XCircleIcon className='w-4 h-4' />
                            Delete</button>

                    </div>
                )}
            </div >
        </>
    )

}