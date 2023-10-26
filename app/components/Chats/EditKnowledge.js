import { deleteNegativeFaq, getKnowledgeData, patchKnowledgeQuestion, rateFaqNegative, getFaqNegative, deleteFaqQuestions } from '@/app/API/pages/Knowledge'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const EditKnowledge = ({ item, allKnowledge, indexOfMessage, allMessages, dropdownOpenId, setDropdownOpenId }) => {

    useEffect(() => {
        getThisKnowledge()
        getAllNegativeFaqs()
    }, [])


    // Local states
    const [allNegativeFAQS, setAllNegativeFAQS] = useState([])
    const [faqObject, setFAQObject] = useState({})

    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [thisKnowledge, setThisKnowledge] = useState({})
    const [dropdownOpen, isDropdownOpen] = useState(false)
    const [rated, setRated] = useState(false)
    const [info, setInfo] = useState({
        question: item?.information?.question || '',
        answer: item?.information?.answer || ''
    })

    // Handlers

    const getAllNegativeFaqs = async () => {
        await getFaqNegative().then(results => {
            setAllNegativeFAQS(results);
            let faqFinder = results.find(faq => faq?.faq?.id == item.information.id)
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

        if (rated) { return }
        isDropdownOpen(!dropdownOpen)

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


    const handleRateNegative = async () => {
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

        await rateFaqNegative({
            search: contentToSend,
            faq: item.information.id
        })

        await getAllNegativeFaqs()

    }

    const handleRateAsPositive = async () => {
        await deleteNegativeFaq(faqObject?.id)
        await getAllNegativeFaqs()
    }


    const handleDeleteFaq = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete this FAQ? You won't be able to recover it and you'll have to create it again.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it.',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) { await deleteFaqQuestions(item.information.id); setDeleted(true) }
    }



    return (
        <>
            {thisKnowledge && !deleted &&
                <div key={indexOfMessage + item.information?.knowledge?.id + item.information.id} id={indexOfMessage + item.information?.knowledge?.id + item.information.id} className='flex items-center w-full align-middle'>
                    <div className={`mt-1 border p-2 rounded-md border-gray ${!rated ? 'hover:text-primary shadow-md' : 'shadow-xs'} w-full`}>

                        <div className="relative">

                            <div className={`flex ${!rated && 'pointer'}`} onClick={toggleDropdown}>
                                <span className="w-full flex items-center" >
                                    <small id={item.information?.knowledge?.id + item.information.id + 'text'}>
                                        {!(dropdownOpenId == item.information.id) ?
                                            item?.information?.question : ''}
                                    </small>
                                </span>


                                {!rated && !(dropdownOpenId == item.information.id) &&
                                    <svg className="mx-3" xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>}
                                {!rated && dropdownOpenId == item.information.id &&
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
                                    <div className='flex justify-between'>
                                        <button
                                            type="button"
                                            onClick={handlePatchFaq}
                                            className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-xs py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                        >
                                            {loading ? "Saving.." : "Save"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDeleteFaq}
                                            className="flex items-center justify-center gap-2 focus:outline-none font-bold bg-red rounded-md text-xs py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-danger-600 hover:shadow-red disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                        >
                                            {loading ? "Deleting.." : "Delete"}
                                        </button>
                                    </div>
                                </div>

                            }

                        </div>


                    </div>


                    <button >
                        {rated ?
                            <PlusIcon onClick={handleRateAsPositive} className="h-5 w-5 text-black mx-3 pointer" title='Report this FAQ as positive' style={{ border: '1px solid gray', borderRadius: '50%' }}></PlusIcon>
                            :
                            <MinusIcon onClick={handleRateNegative} className="h-5 w-5 text-black mx-3 pointer" title='Report this FAQ as negative' style={{ border: '1px solid gray', borderRadius: '50%' }}></MinusIcon>
                        }
                    </button>


                </div>

            }

            {rated && <div className="text-xs text-grey flex justify-end" style={{ fontSize: '8px', marginRight: '10%' }}>Rated as negative</div>}

        </>
    )
}

export default EditKnowledge