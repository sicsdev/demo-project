import { deleteNegativeFaq, getKnowledgeData, patchKnowledgeQuestion, rateFaqNegative, getFaqNegative, deleteFaqQuestions } from '@/app/API/pages/Knowledge'
import { ArrowRightIcon, InformationCircleIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { Tooltip } from 'react-tooltip'
import { addHumanHandoffWorkflowData, deleteHandoff } from '@/app/API/pages/HumanHandoff'
import { postPromptAppender } from '@/app/API/pages/NagetiveFaq'
import TextField from '../Common/Input/TextField'
import Card from '../Common/Card/Card'
import UpdateFaqModal from '../SideModal/UpdateFaqModal'

const EditKnowledge = ({ item, allKnowledge, indexOfMessage, allMessages, dropdownOpenId, setDropdownOpenId, message, idOfOpenConversation }) => {

    // Local states
    const [allNegativeFAQS, setAllNegativeFAQS] = useState([])
    const [show, setShow] = useState(false)
    const [faqObject, setFAQObject] = useState({})
    const [showingNegativeOptions, setShowingNegativeOptions] = useState(false)
    const [isHandoff, setisHandoff] = useState(message.is_human_handoff)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [modifierMode, setModifierMode] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [thisKnowledge, setThisKnowledge] = useState({})
    const [dropdownOpen, isDropdownOpen] = useState(false)
    const [rated, setRated] = useState(false)
    const [info, setInfo] = useState({
        question: item?.information?.question || '',
        answer: item?.information?.answer || ''
    })

    const [rating, setRating] = useState(item.is_negative)


    useEffect(() => {
        getThisKnowledge()
        getAllNegativeFaqs()
    }, [])


    useEffect(() => {
        handlePatchFaq()
    }, [info])



    // Handlers
    const getAllNegativeFaqs = async () => {
        await getFaqNegative().then(results => {
            setAllNegativeFAQS(results);
            let faqFinder = results?.find(faq => faq?.faq?.id == item.information.id)
            if (faqFinder) {
                setRated(true); setFAQObject(faqFinder)
            } else {
                setRated(false)
            }

        })
    }

    const getThisKnowledge = async () => {
        const response = await getKnowledgeData()
        if (response?.data?.results) {
            let knowledgeFinder = response.data.results.find(e => e.id == item.information.knowledge.id)
            knowledgeFinder && setThisKnowledge(knowledgeFinder)
        }
    }

    const toggleDropdown = () => {

        setInfo({
            question: item?.information?.question || '',
            answer: item?.information?.answer || ''
        })

        isDropdownOpen(!dropdownOpen)
        setShowingNegativeOptions(false)

        if (dropdownOpenId == item.information.id) { setDropdownOpenId(''); return }
        setDropdownOpenId(item.information.id)
    }


    const handleInputQuestion = (e) => {
        setInfo({
            ...info,
            question: e.target.value
        })
    }

    const handleInputAnswer = (e) => {
        setInfo({
            ...info,
            answer: e.target.value
        })
    }

    const handlePatchFaq = async () => {
        setLoading(true)
        await patchKnowledgeQuestion(info, item?.information?.id)
            .then(() => { setLoading(false); isDropdownOpen(false) })
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
        if (type == 'block' && rating == -1) { await handleRateAsPositive(); setRating(null); await getAllNegativeFaqs(); return; }

        if (type == 'reduce' && rating == -1) { await handleRateAsPositive(); score = -0.1 }
        if (type == 'reduce' && rating == -0.1) { await handleRateAsPositive(); setRating(null); await getAllNegativeFaqs(); return; }


        await rateFaqNegative({
            score: score,
            search: contentToSend,
            faq: item.information.id
        })

        setRating(score)

        await getAllNegativeFaqs()

    }

    const handleRateAsPositive = async () => {
        await deleteNegativeFaq(faqObject?.id)
        await getAllNegativeFaqs()
    }

    const handlefaqdelete = async () => {
        setLoadingDelete(true)
        await deleteFaqQuestions(item.information.id); setDeleted(true)
        setLoadingDelete(false)
    }


    const handleDeleteFaq = async () => {
        setShow(true)
        // const result = await Swal.fire({
        //     title: 'Are you sure?',
        //     text: `Do you want to delete this FAQ? You won't be able to recover it and you'll have to create it again.`,
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#d33',
        //     cancelButtonColor: '#3085d6',
        //     confirmButtonText: 'Yes, delete it.',
        //     cancelButtonText: 'Cancel'
        // });

        // if (result.isConfirmed) {
        //     setLoadingDelete(true)
        //     await deleteFaqQuestions(item.information.id); setDeleted(true)
        //     setLoadingDelete(false)
        // }
    }


    const toggleShowNegativeOptions = () => {
        isDropdownOpen(false)
        setDropdownOpenId(null)
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
            {thisKnowledge && !deleted &&

                < div key={indexOfMessage + item.information?.knowledge?.id + item.information.id} id={indexOfMessage + item.information?.knowledge?.id + item.information.id} className='flex items-center w-full align-middle'>
                    <div className={`mt-1 border p-2 rounded-md border-gray shadow-xs w-full`}>

                        <div className="relative">

                            <div className={`flex pointer`} onClick={toggleDropdown}>
                                <span className="w-full flex items-center" >
                                    <small id={item.information?.knowledge?.id + item.information.id + 'text'}>
                                        {!(dropdownOpenId == item.information.id) ?
                                            item?.information?.question : ''}
                                    </small>
                                </span>


                                {!(dropdownOpenId == item.information.id) &&
                                    <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>}
                                {dropdownOpenId == item.information.id &&
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
                                <div id={indexOfMessage + item.information?.knowledge?.id + item.information.id} key={indexOfMessage + item.information?.knowledge?.id + item.information.id} className="my-2">

                                    <div className="flex flex-row flex-1">
                                        <input
                                            type="text"
                                            className="mb-1 border !text-xs border-border shadow-none block px-3 bg-white rounded-xs text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white"
                                            placeholder="Question"
                                            id="title"
                                            name="title"
                                            value={info.question}
                                            onChange={handleInputQuestion}
                                            style={{ fontSize: '12px' }}
                                        />
                                    </div>

                                    <div className="relative pb-6">

                                        <textarea
                                            type="text"
                                            className="p-2 border !text-xs border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white"
                                            placeholder="Answer"
                                            id="title"
                                            name="title"
                                            value={info.answer}
                                            onChange={handleInputAnswer}
                                            style={{ minHeight: '100px', fontSize: '12px' }}
                                        />

                                    </div>
                                    <div className='flex justify-between mx-2'>

                                        <div className='flex gap-2'>
                                            <a href={`/dashboard/basic-knowledge/source?openKnowledgeId=${item.information.id}`} target='_blank'>
                                                <button
                                                    type="button"
                                                    // onClick={handleDeleteFaq}
                                                    className="flex items-center justify-center gap-2 focus:outline-none font-bold bg-gray rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 text-black hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                                >
                                                    Go to <ArrowRightIcon className='w-3 h-3'></ArrowRightIcon>
                                                </button>
                                            </a>

                                            <button
                                                type="button"
                                                onClick={handleDeleteFaq}
                                                className="flex items-center justify-center gap-2 focus:outline-none font-bold bg-red rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                            >
                                                {loadingDelete ? "Deleting.." : "Delete"}
                                            </button>
                                        </div>

                                        {/* <button
                                            type="button"
                                            onClick={handlePatchFaq}
                                            className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-xs py-1 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                            disabled={item?.information?.answer == info.answer}
                                        >
                                            {loading ? "Saving.." : "Save"}
                                        </button> */}

                                    </div>
                                </div>

                            }
                            {show ? <UpdateFaqModal handlefaqdelete={handlefaqdelete} setShow={setShow} title={'Are you sure?'} text={"Do you want to delete this FAQ? You won't be able to recover it and you'll have to create it again."} icon={'warning'} confirmButtonText={'Yes, delete it.'} cancelButtonText={'Cancel'} /> : " "}
                        </div>

                    </div>


                    {/* <button >
                        {showingNegativeOptions ?
                            <XMarkIcon onClick={toggleShowNegativeOptions} className="h-4 w-4 text-black mx-3 pointer" title='Close' style={{ border: '1px solid gray', borderRadius: '50%' }}></XMarkIcon>
                            :
                            <MinusIcon onClick={toggleShowNegativeOptions} className="h-4 w-4 text-black mx-3 pointer" title='Report this FAQ as negative' style={{ border: '1px solid gray', borderRadius: '50%' }}></MinusIcon>
                        }
                    </button> */}




                </div >


            }
            {/* //bg-gradiant-red-button */}
            {

                < div className='flex gap-2 mb-1 mt-1 mr-10'>
                    <small>
                        <small
                            type="button"
                            className={`${rating == -0.1 && rating !== -1 ? "bg-gradiant-red-button text-white" : "text-red border-red"} text-red flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md px-2 focus:ring-yellow-300  hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none cursor-pointer`}
                            onClick={() => handleRateNegative('reduce')}
                            data-tooltip-id={'tooltip'}
                            data-tooltip-content={`Click to ${rating == -0.1 ? 'increase score' : 'reduce score'}`}
                        >
                            {rating == -0.1 ? "Reduced" : "Reduce"}
                        </small>
                    </small>
                    <small>
                        <small
                            type="button"
                            className={`${rating == -1 && rating !== -0.1 ? "text-white bg-[#CA0B00] " : "text-[#CA0B00] border-[#CA0B00]"} flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md px-2 focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none cursor-pointer`}
                            onClick={() => handleRateNegative('block')}
                            data-tooltip-id={'tooltip'}
                            data-tooltip-content={`Click to ${rating == -1 ? 'unlock FAQ' : 'block FAQ'}`}
                        >
                            {rating == -1 ? "Blocked" : "Block"}
                        </small>
                    </small>
                    {/* <button
                            type="button"
                            className={`${isHandoff ? "bg-black text-white" : "border-black text-black"} flex items-center border justify-center gap-2 focus:outline-none font-bold rounded-md text-xs py-1 px-2 w-auto focus:ring-yellow-300 hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none mr-4`}
                            onClick={() => handleForceHandOff()}
                            data-tooltip-id={'tooltip'}
                            data-tooltip-content={isHandoff ? "Click to remove Human Escal" : `Click to force Human Escal`}
                        >
                            {isHandoff ? "Human Escaled" : "Human Escal"}
                        </button> */}


                    <Tooltip id={'tooltip'} place="top" type="dark" effect="solid" />

                </div >
            }

            {/* {rated && <div className="text-xs text-grey flex justify-end" style={{ fontSize: '8px', marginRight: '10%' }}>Rated as negative</div>} */}

        </>
    )
}

export default EditKnowledge