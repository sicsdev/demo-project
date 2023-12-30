import React from 'react'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import TextEditor from '@/app/components/URL/Richtext'
import Modal from '@/app/components/Common/Modal/Modal'
import SideModal from '@/app/components/SideModal/SideModal'
import { useState } from 'react'
import { useEffect } from 'react'
import { makeCapital } from '@/app/components/helper/capitalName'
import { capitalizeFirstLetter } from '@/app/components/helper/firstLetterCapital'
import Button from '@/app/components/Common/Button/Button'



const AnswersEditor = ({
    handleWorkflow,
    setShow,
    setWorkflowView,
    setKnowledgeId,
    setUpdateLoader,
    setUpdateLoader1,
    setExternalContentForTextEditor,
    workflowView,
    knowledgeId,
    questionData,
    setQuestionData,
    setAnswer,
    handleSwapRecommendedXSearch,
    subQuestions,
    subQuestionLoading,
    defaultTitle,
    updateLoader1,
    updateLoader,
    SubmitTheAnswerForm,
    link,
    setLink,
    setModal,
    handleTextEditorChange,
    externalContentForTextEditor,
    answer,
    SubmitTheForm,
    getExpandedAnswer,
    pusherStreaming,
    setWorkFlowData,
    workFlowData,
    submitWorkflowTrigger,
    searchKnowledge,
    setSearchKnowledge,
    mode,
    setMode,
    modal,
    searchFaqs,
    setSubQuestions,
    loadingChangeAnswer,
    setSubQuestionLoading
}) => {

    const [copying, setCopying] = useState(null)
    const [tab, setTab] = useState(0);
    const [showRecommendedQuestions, setShowRecommendedQuestions] = useState(true)
    const [showRecommendedWorkflows, setShowRecommendedWorkflows] = useState(true)
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        subQuestions.length == 0 && setShowRecommendedQuestions(false)
        workFlowData.reccomodation.length == 0 && setShowRecommendedWorkflows(false)
        return () => {
            setShowRecommendedQuestions(true)
            setShowRecommendedWorkflows(true)
        }
    }, [subQuestions, workFlowData.reccomodation])


    useEffect(() => {
        if (subQuestions == recommendations) { setRecommendations(subQuestions); setSubQuestionLoading(false) }
    }, [subQuestions])

    console.log(workFlowData)
    const filterWorkflowArray = (workflows) => {
        if (workflows.length > 0) {
            const updatedWorkflows = [...workflows, { name: "Human Handoff", id: "human_handoff" }];
            const sortedWorkflows = updatedWorkflows.sort((a, b) => a.name.localeCompare(b.name));
            return sortedWorkflows
        }
        return [];
    };



    console.log("workFlowData", workFlowData)
    return (
        <SideModal setShow={(t) => {
            setWorkflowView(null)
            setKnowledgeId(null)
            setUpdateLoader(false);
            setUpdateLoader1(false);
            setShow(false)
            setExternalContentForTextEditor('')
        }} heading={<p className="w-full sm:w-[500px]">{workflowView?.question}</p>}>

            <div className={"border-b-2 my-2 border-border dark:border-gray-700 flex items-center justify-between"}>
                <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                    <li className={` ${tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(0) }}>

                        <span
                            className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
      rounded-lg active  group`}
                            aria-current="page"
                        >
                            Add to Knowledge Base
                        </span>

                    </li>
                    <li className={`  ${tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        setTab(1)
                    }}>

                        <span
                            className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
      rounded-lg active  group`}
                            aria-current="page"
                        >
                            Trigger Workflow
                        </span>

                    </li>


                </ul>
            </div>
            {tab === 0 && (
                <div className='flex justify-between items-center mt-3'>
                    <div className='w-1/2 md:w-3/4'>
                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative mx-2">
                            <div className="absolute inset-y-0 right-[10px] flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  !rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pr-[25px]" placeholder="Search" value={searchKnowledge} onChange={(e) => { searchFaqs(e) }} />
                        </div>
                    </div>
                    {subQuestions.length > 0 &&
                        <div>
                            <Button
                                type={"button"}
                                className={`${showRecommendedQuestions && 'mr-6'} inline-block rounded bg-primary px-2 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]`}
                                onClick={() => setShowRecommendedQuestions
                                    (!showRecommendedQuestions)}

                            >{!showRecommendedQuestions ? "Show recommendations" : "Enter new answer"}</Button>
                        </div>
                    }
                </div>
            )}


            {!knowledgeId && questionData.length > 0 && tab === 0 && (
                <div className={` bg-[#F8F8F8] my-4 rounded-md`}>
                    <ul className="py-2 text-sm text-gray-700 ">
                        {questionData.map((element, key) =>
                            <li className='hover:bg-primary hover:text-white text-heading my-2 cursor-pointer' key={key} onClick={(e) => {
                                setAnswer(element.answer)
                                setKnowledgeId(element)
                                handleSwapRecommendedXSearch(element)
                                setQuestionData([])
                                setSearchKnowledge('')
                            }}>
                                <button type='button' className="block px-4 py-2 text-xs">{element.question}</button>
                            </li>
                        )}

                    </ul>
                </div>
            )}

            <>

                {tab === 0 && (
                    <div>
                        <div className=' mt-2 '>
                            {subQuestionLoading === true ?
                                <div className="mt-6">
                                    <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                        <SkeletonLoader height={20} width={"20%"} />
                                        <div className="p-2">
                                            <div className="mt-3">
                                                <SkeletonLoader height={18} width={"60%"} />
                                            </div>
                                            <div className="mt-1">
                                                <SkeletonLoader height={15} width={"70%"} />
                                                <SkeletonLoader height={15} width={"50%"} />
                                                <SkeletonLoader height={15} width={"80%"} />
                                            </div>
                                            <div className="flex justify-end">
                                                <SkeletonLoader height={25} width={100} />
                                            </div>
                                        </div>
                                    </div>

                                </div> :
                                <>
                                    {subQuestions.length > 0 && showRecommendedQuestions && (
                                        <>
                                            <div className={`my-4 rounded-md p-3 px-2`}>
                                                <ul className="text-start py-2 text-sm text-gray-700" style={{ maxHeight: '61vh', overflowY: 'scroll' }}>
                                                    <h1 className="text-xs font-semibold">{defaultTitle} Answers:</h1>
                                                    {subQuestions?.map((element, key) =>
                                                        <li className='p-4 text-justify bg-[#96b2ed2e] text-heading my-2 cursor-pointer mr-3 rounded-lg' key={key}>
                                                            <p className="text-xs font-semibold">{element.data.question}</p>
                                                            <p className="text-xs  mt-2">{element.data.answer}</p>
                                                            <div className='mt-6'>
                                                                <div className="flex justify-between items-center gap-2">

                                                                    <div onClick={() => {
                                                                        navigator.clipboard.writeText(element.data.answer);
                                                                        setCopying(key)
                                                                        setTimeout(() => {
                                                                            setCopying(null)
                                                                        }, 1500);
                                                                    }} className={`text-sm bg-skyblue rounded-xl inline-block p-1 px-2 hover:text-white ${copying == key ? "text-white bg-success" : "text-sky hover:bg-sky"}`}>

                                                                        <button
                                                                            type={"button"}
                                                                            className="border-none p-0 m-0 flex gap-1 items-center text-sm"

                                                                        >
                                                                            <small className=''>{copying == key ? 'Copied!' : "Copy"}</small>
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}

                                                </ul>


                                            </div>
                                        </>
                                    )}
                                </>}


                        </div>

                        <div>

                            {/* {knowledgeId && (
                                <>
                                    <div className={` bg-primary text-white my-4 p-4 rounded-md`}>
                                        <p className="text-xs">{knowledgeId.question}</p>
                                    </div>

                                </>
                            )} */}
                            <div className='my-2 relative'>
                                {link.links.length > 0 && (
                                    <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>

                                        {link.links.map((element, key) =>
                                            <div className="flex justify-between items-center my-2" key={key}>
                                                <a href={element} target="_blank" className="hover:text-primary"> <span className="text-xs font-semibold">{element}</span></a>
                                                <div className="flex justify-end gap-4 items-center">
                                                    <PencilSquareIcon className="h-4 w-4 text-gray-500 cursor-pointer " onClick={(e) => {
                                                        setLink((prev) => {
                                                            return {
                                                                ...prev,
                                                                edit: true,
                                                                index: key,
                                                                url: element
                                                            }
                                                        })
                                                        setModal(true)

                                                    }}
                                                    />
                                                    <XMarkIcon className="h-4 w-4 cursor-pointer text-gray-500" onClick={() => {
                                                        let data = link.links.filter((x) => x !== element)
                                                        setLink((prev) => {
                                                            return {
                                                                ...prev,
                                                                links: data
                                                            }
                                                        })

                                                    }
                                                    } />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* <TextArea name="answer"
                                    className="py-2 !p-[10px]"
                                    type={"text"}
                                    id={"answer"}
                                    placeholder={"Create new knowledge base entry"}
                                    rows="8"
                                    onChange={(e) => {
                                        if (e.target.value.length === 1) {
                                            setMode("expand")
                                        } else if (e.target.value.length === 0) {
                                            setMode("normal")
                                        }
                                        setAnswer(e.target.value)
                                    }}
                                    value={answer} /> */}

                                {!showRecommendedQuestions && subQuestionLoading == false &&
                                    <>
                                        <div>
                                            <h1 className="text-xs font-semibold mx-1 mb-2 mt-5">Type a New Answer:</h1>
                                        </div>
                                        <TextEditor
                                            handleTextEditorChange={handleTextEditorChange}
                                            externalContent={externalContentForTextEditor}
                                            oldContent={answer}
                                            setExternalContentForTextEditor={setExternalContentForTextEditor}
                                            setAnswer={setAnswer}
                                        >
                                        </TextEditor>

                                    </>


                                }


                                {/* <button
                                    onClick={(e) => setModal(true)}
                                    type="button"
                                    className="button-link absolute left-[9px] bottom-[9px] cursor-pointer  flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                                    <LinkIcon className="h-4 w-4 text-gray-500" />

                                </button> */}

                            </div>


                            <div className="flex justify-between items-center gap-2">
                                <button
                                    onClick={(e) => SubmitTheForm()}
                                    type="button"
                                    className="mx-2 my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={answer === ""}>
                                    {loadingChangeAnswer ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                        <span>Loading...</span> </> : "Submit"}
                                </button>


                                {mode === 'expand' && (
                                    <button
                                        // onClick={(e) => SubmitTheFormExpand()}
                                        onClick={getExpandedAnswer}
                                        type="button"
                                        className="my-6 flex items-center justify-center text-xs gap-1 text-primary font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 text-whitedisabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={answer === "" || pusherStreaming}>
                                        {pusherStreaming ? (
                                            <>
                                                <span className="text-black">Generating</span>
                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    width="20px" height="20px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" space="preserve">
                                                    <path opacity="0.4" fill="#00000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                                                    <path fill="#00000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
C22.32,8.481,24.301,9.057,26.013,10.047z">
                                                        <animateTransform attributeType="xml"
                                                            attributeName="transform"
                                                            type="rotate"
                                                            from="0 20 20"
                                                            to="360 20 20"
                                                            dur="0.5s"
                                                            repeatCount="indefinite" />
                                                    </path>
                                                </svg>
                                            </>
                                        ) : "Expand Answer"}
                                    </button>
                                )}


                            </div>
                        </div>

                    </div>
                )}
                {tab === 1 && (
                    <div>
                        <div className=' mt-2 '>





                        </div>


                        <>
                            {/* <div>
                                <h1 className="text-xs font-semibold">Recommended {workFlowData.workflow && workFlowData.workflow?.length > 1 ? "Workflows" : "Workflow"}:</h1>
                            </div> */}

                            <div className={` my-4`}>

                                <ul className="py-2 text-sm text-gray-700 ">
                                    {
                                        filterWorkflowArray(workFlowData.workflow).map((ele, key) =>
                                            <>
                                               
                                                    <>

                                                        <li className='p-4 text-justify bg-[#96b2ed2e] text-heading my-2 cursor-pointer mr-3 flex items center justify-between' key={key}>

                                                            <p className="text-xs font-semibold gap-2 flex items-center ">
                                                                {ele.id === "human_handoff" ?
                                                                    <span>👩‍💼</span> :
                                                                    <span>{ele?.icon}</span>}
                                                                <span> {ele?.name}</span>
                                                            </p>

                                                            <div className=''>
                                                                <div className="flex justify-end items-center gap-2">

                                                                    <div onClick={() => {
                                                                        if (ele.id === "human_handoff") {
                                                                            setWorkFlowData((prev) => {
                                                                                return {
                                                                                    ...prev,
                                                                                    workflowValue: { "name": "Human Handoff", id: "human_handoff" },
                                                                                    showInput: true,
                                                                                    answer: '',
                                                                                    target: 'human_handoff'
                                                                                }
                                                                            })
                                                                            submitWorkflowTrigger({
                                                                                ...workFlowData, workflowValue: { "name": "Human Handoff", id: "human_handoff" },
                                                                                showInput: true,
                                                                                answer: '',
                                                                                target: 'human_handoff'
                                                                            })
                                                                        } else {
                                                                            setWorkFlowData((prev) => {
                                                                                return {
                                                                                    ...prev,
                                                                                    workflowValue: ele,
                                                                                    showInput: false,
                                                                                    target: 'workflow',
                                                                                    answer: ele.description.join('\n')
                                                                                }
                                                                            })
                                                                            submitWorkflowTrigger({
                                                                                ...workFlowData, workflowValue: ele,
                                                                                showInput: false,
                                                                                target: 'workflow',
                                                                                answer: ele.description.join('\n')
                                                                            })
                                                                        }
                                                                    }}
                                                                        className='text-sm bg-skyblue rounded-xl inline-block p-1 px-2 hover:bg-sky hover:text-white text-sky'>
                                                                        <button
                                                                            type={"button"}
                                                                            className="border-none p-0 m-0 flex gap-1 items-center text-sm"


                                                                        > <small className=''>{workFlowData.submit_loader && workFlowData?.workflowValue?.id === ele.id ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                        </svg>
                                                                            <span>Loading...</span> </> : "Select"}</small>
                                                                        </button>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                              
                                            </>
                                        )}
                                </ul>

                            </div>
                        </>

                    </div>

                )}
            </>

            {modal === true
                ? (
                    <Modal
                        title={''}
                        className={"w-[50%]"}
                        show={modal}
                        setShow={setModal}
                        showCancel={true}
                        customHideButton={false}
                        showTopCancleButton={false}
                        hr={false}
                    >
                        <form onSubmit={() => {

                            if (link.edit === true) {
                                let data = [...link.links]
                                data[link.index] = link.url
                                setLink((prev) => {
                                    return {
                                        ...prev,
                                        links: data,
                                        edit: false,
                                        index: null,
                                        url: ''

                                    }
                                })
                            } else {
                                setLink((prev) => {
                                    return {
                                        ...prev,
                                        links: [...link.links, link.url],
                                        edit: false,
                                        index: null,
                                        url: ''
                                    }
                                })
                            }
                            setModal(false)

                        }}>
                            <div className="mb-5 flex justify-between  gap-4 items-center">
                                <input type="search" className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white  !rounded-md shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  invalid:border-pink-500  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " placeholder="Enter or paste link" value={link.url} onChange={(e) => {
                                    setLink((prev) => {
                                        return {
                                            ...prev,
                                            url: e.target.value
                                        }
                                    })
                                }} />
                                <button
                                    type="submit"

                                    className=" flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md  py-2 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={link.url === ''}>
                                    Apply
                                </button>
                            </div>
                        </form>
                    </Modal>
                ) : null}
        </SideModal>

    )
}

export default AnswersEditor
