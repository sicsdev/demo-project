import { getKnowledgeData, patchKnowledgeQuestion, rateFaqNegative } from '@/app/API/pages/Knowledge'
import { MinusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const EditKnowledge = ({ item, allKnowledge, indexOfMessage, allMessages }) => {

    useEffect(() => {
        getThisKnowledge()
    }, [])


    // Local states
    const [loading, setLoading] = useState(false)
    const [thisKnowledge, setThisKnowledge] = useState({})
    const [dropdownOpen, isDropdownOpen] = useState(false)
    const [rated, setRated] = useState(false)
    const [info, setInfo] = useState({
        question: item?.information?.question || '',
        answer: item?.information?.answer || ''
    })

    // Handlers

    const getThisKnowledge = async () => {
        const response = await getKnowledgeData()
        if (response?.data?.results) {
            let knowledgeFinder = response.data.results.find(e => e.id == item.information.knowledge.id)
            knowledgeFinder && setThisKnowledge(knowledgeFinder)
        }
    }

    const toggleDropdown = () => {
        isDropdownOpen(!dropdownOpen)
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
            contentToSend = finder.actions.options.WORKFLOW
        } else if (previousMessage.content === 'INFORMATION') {
            let finder = allMessages[indexOfMessage - 2]
            contentToSend = finder.actions.options.INFORMATION
        } else {
            contentToSend = previousMessage.content
        }

        await rateFaqNegative({
            search: contentToSend,
            faqs: item.information.id
        })

        setRated(true)

    }


    return (
        <>
            {thisKnowledge &&
                <div className='flex items-center w-full align-middle'>
                    <div key={item.information?.knowledge?.id} className='mt-1 border p-2 rounded-md border-gray shadow-md hover:text-primary w-full'>

                        <div className="relative">

                            <div className="flex pointer" onClick={toggleDropdown}>
                                <span className="w-full flex items-center" >
                                    <small id={item?.information?.knowledge?.id}>
                                        {item?.information?.question}
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

                                    <div className="flex flex-row flex-1">
                                        <input
                                            type="text"
                                            className="border border-border my-2 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]"
                                            placeholder="Question"
                                            id="title"
                                            name="title"
                                            value={info.question}
                                            onChange={handleInputQuestion}
                                        />
                                    </div>

                                    <div className="relative pb-6">

                                        <textarea
                                            type="text"
                                            className="border border-border shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-0 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]"
                                            placeholder="Answer"
                                            id="title"
                                            name="title"
                                            value={info.answer}
                                            onChange={handleInputAnswer}
                                            style={{ minHeight: '100px' }}
                                        />

                                    </div>
                                    <button
                                        type="button"
                                        onClick={handlePatchFaq}
                                        className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:text-white disabled:shadow-none"
                                    >
                                        {loading ? "Saving.." : "Save"}
                                    </button>
                                </div>

                            }

                        </div>


                    </div>


                    <button disabled={rated} onClick={handleRateNegative} >
                        <MinusIcon className="h-5 w-5 text-black mx-3" title='Report this FAQ as negative' style={{ border: '1px solid gray', borderRadius: '50%' }}></MinusIcon>
                    </button>
                </div>
            }
        </>
    )
}

export default EditKnowledge