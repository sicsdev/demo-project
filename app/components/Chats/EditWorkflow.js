import { getKnowledgeData, patchKnowledgeQuestion } from '@/app/API/pages/Knowledge'
import { deleteNegativeWorkflow, getNegativeWorkflows, rateWorkflowNegative, updateWorkFlowStatus } from '@/app/API/pages/Workflow'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Tooltip } from 'react-tooltip'

const EditWorkflow = ({ item, allKnowledge, allMessages, indexOfMessage, dropdownOpenId, setDropdownOpenId, message}) => {

    let descriptions = item?.information?.description[0].split(', ') || ['Add new line']

    const [allNegativeWorkflows, setAllNegativeWorkflows] = useState([])

    useEffect(() => {
        // getThisKnowledge()
        // console.log(allNegativeWorkflows.some(wkf => wkf.id === item.information.id), item.information.name)
        getAllNegativeWorkflows()
        setInputValue(item?.information?.description[item.index])
    }, [])



    // Local states
    const [rated, setRated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [descriptionLine, setDescriptionLine] = useState(descriptions[item.index])
    const [loading, setLoading] = useState(false)
    const [dropdownOpen, isDropdownOpen] = useState(false)
    const [inputValue, setInputValue] = useState(descriptionLine)
    const [workflowObject, setWorflowObject] = useState({})
    const [showingNegativeOptions, setShowingNegativeOptions] = useState(false)
    const [rating, setRating] = useState(item.is_negative)
    const [isHandoff, setisHandoff] = useState(message.is_human_handoff)


    // Handlers

    const getAllNegativeWorkflows = async () => {
        await getNegativeWorkflows().then(results => {
            setAllNegativeWorkflows(results);
            let workflowFinder = results.find(wkf => wkf.workflow.id == item.information.id)
            if (workflowFinder) {
                setRated(true); setWorflowObject(workflowFinder)
            } else { setRated(false) }

        })
    }

    const toggleDropdown = () => {

        setInputValue(item?.information?.description[item.index])

        if (rated) { return }
        isDropdownOpen(!dropdownOpen)
        if (dropdownOpenId == item.information.id) { setDropdownOpenId(''); return }
        setDropdownOpenId(item.information.id)
    }


    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const handlePatchWorkflow = async () => {
        setLoading(true)
        let newDescription = item?.information?.description[0].replace(descriptionLine, inputValue)
        await updateWorkFlowStatus({ description: [newDescription] }, item.information?.id)
        setLoading(false)
        toggleDropdown()
    }

    const handleRateNegative = async (type) => {
        let previousMessage = allMessages[indexOfMessage - 1]
        let contentToSend;

        if (previousMessage.content === 'WORKFLOW') {
            let finder = allMessages[indexOfMessage - 2]
            contentToSend = finder?.actions?.options?.WORKFLOW || 'WORKFLOW'
        } else if (previousMessage.content === 'INFORMATION') {
            let finder = allMessages[indexOfMessage - 2]
            contentToSend = finder?.actions?.options?.INFORMATION || 'INFORMATION'
        } else {
            contentToSend = previousMessage.content
        }

        let score;

        if (type == 'block' && !rating) { score = -1 }
        if (type == 'reduce' && !rating) { score = -0.1 }

        if (type == 'block' && rating == -0.1) { await handleRateAsPositive(); score = -1 }
        if (type == 'block' && rating == -1) { await handleRateAsPositive(); setRating(null); await getAllNegativeWorkflows(); return; }

        if (type == 'reduce' && rating == -1) { await handleRateAsPositive(); score = -0.1 }
        if (type == 'reduce' && rating == -0.1) { await handleRateAsPositive(); setRating(null); await getAllNegativeWorkflows(); return; }


        await rateWorkflowNegative({
            score: score,
            search: contentToSend,
            workflow: item.information.id
        })

        setRating(score)

        await getAllNegativeWorkflows()

    }


    const handleRateAsPositive = async () => {
        await deleteNegativeWorkflow(workflowObject?.id)
        await getAllNegativeWorkflows()
    }


    const handleDeleteWorkflow = async () => {
        setLoading(true)
        let newDescription = item?.information?.description[0].replace(descriptionLine, '')
        await updateWorkFlowStatus({ description: [newDescription] }, item.information?.id)
        setLoading(false)
        setDeleted(true)
    }

    const toggleShowNegativeOptions = () => {
        isDropdownOpen(false)
        setShowingNegativeOptions(!showingNegativeOptions)
    }


    const handleForceHandOff = async () => {

        let previousMessage = allMessages[indexOfMessage - 1]
        let contentToSend;


        if (previousMessage.content === 'WORKFLOW') {
            let finder = allMessages[indexOfMessage - 2]
            contentToSend = finder?.actions?.options?.WORKFLOW || 'WORKFLOW'
        } else if (previousMessage.content === 'INFORMATION') {
            let finder = allMessages[indexOfMessage - 2]
            contentToSend = finder?.actions?.options?.INFORMATION || 'INFORMATION'
        } else {
            contentToSend = previousMessage.content
        }


        if (isHandoff) {
            deleteHandoff(isHandoff)
            setisHandoff(false)
        } else {
            await addHumanHandoffWorkflowData({ search: contentToSend })
            setisHandoff(true)
        }
    }




    return (
        <>
            {!deleted &&
                <>
                    <div key={item.information?.id + indexOfMessage} id={item.information?.id + indexOfMessage} className='flex items-center w-full align-middle'>
                        <div className={`mt-1 border p-2 rounded-md border-gray shadow-xs w-full`}>

                            <div className="relative">

                                <div className={`flex pointer`} onClick={toggleDropdown}>
                                    <span className="w-full flex items-center" >
                                        <small id={item.information.id + 'text' + indexOfMessage}>
                                            {item?.information?.name}
                                        </small>
                                    </span>


                                    {!dropdownOpen &&
                                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                        </svg>}
                                    {dropdownOpen &&
                                        <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    }

                                    {/* {rated &&
                                <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            } */}


                                </div>
                                {dropdownOpenId == item.information.id &&

                                    <div className="my-2">
                                        {/* {descriptions?.map(w => ( */}

                                        <div className="flex flex-row flex-1 mb-">
                                            <input
                                                type="text"
                                                className="border !text-xs border-border my-2 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white"
                                                placeholder="Write a new answer"
                                                id={descriptionLine}
                                                name={descriptionLine}
                                                value={inputValue}
                                                onChange={handleInput}
                                                style={{ fontSize: '12px' }}

                                            />
                                        </div>
                                        {/* ))} */}
                                        <div className='flex justify-between'>

                                            <button
                                                type="button"
                                                onClick={handlePatchWorkflow}
                                                className="text-xs flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md py-1 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                            >
                                                {loading ? "Saving.." : "Save"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleDeleteWorkflow}
                                                className="flex items-center justify-center gap-2 focus:outline-none font-bold bg-red rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                            >
                                                {loading ? "Deleting.." : "Delete"}
                                            </button>
                                        </div>

                                    </div>

                                }

                            </div>


                        </div>

                        <button>
                            {showingNegativeOptions ?
                                <XMarkIcon onClick={toggleShowNegativeOptions} className="h-4 w-4 text-black mx-3 pointer" title='Close' style={{ border: '1px solid gray', borderRadius: '50%' }}></XMarkIcon>
                                :
                                <MinusIcon onClick={toggleShowNegativeOptions} className="h-4 w-4 text-black mx-3 pointer" title='Report this Workflow as negative' style={{ border: '1px solid gray', borderRadius: '50%' }}></MinusIcon>
                            }
                        </button>
                    </div >



                    {showingNegativeOptions &&
                        <div className='flex gap-4 mx-5 mb-4 mt-2 justify-end mr-10'>
                            <button
                                type="button"
                                className={`${rating == -0.1 && rating !== -1 ? "bg-gradiant-red-button text-white" : "text-red border-red"} text-red flex items-centerborder border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300  hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                                onClick={() => handleRateNegative('reduce')}
                                data-tooltip-id={'tooltip'}
                                data-tooltip-content={`Click to ${rating == -0.1 ? 'increase score' : 'reduce score'}`}
                            >
                                {rating == -0.1 ? "Reduced" : "Reduce"}
                            </button>
                            <button
                                type="button"
                                className={`${rating == -1 && rating !== -0.1 ? "text-white bg-[#CA0B00] " : "text-[#CA0B00] border-[#CA0B00]"} flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                                onClick={() => handleRateNegative('block')}
                                data-tooltip-id={'tooltip'}
                                data-tooltip-content={`Click to ${rating == -1 ? 'unlock FAQ' : 'block FAQ'}`}
                            >
                                {rating == -1 ? "Blocked" : "Block"}

                            </button>

                            <button
                                type="button"
                                className={`${isHandoff ? "bg-black text-white" : "border-black text-black"} flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none`}
                                onClick={() => handleForceHandOff()}
                                data-tooltip-id={'tooltip'}
                                data-tooltip-content={isHandoff ? "Click to remove Human Escal" : `Click to force Human Escal`}
                            >
                                {isHandoff ? "Human Escaled" : "Human Escal"}
                            </button>
                            <Tooltip id={'tooltip'} place="top" type="dark" effect="solid" />
                        </div>
                    }


                    {/* {rated && <div className="text-xs text-grey flex justify-end" style={{ fontSize: '8px', marginRight: '10%' }}>Rated as negative</div>} */}
                </>
            }
        </>

    )
}

export default EditWorkflow