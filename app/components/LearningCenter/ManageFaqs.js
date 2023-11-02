import React, { useEffect } from 'react'
import { useState } from 'react';
import DataTable from 'react-data-table-component'
import { isMobile } from "react-device-detect";
import SkeletonLoader from '../Skeleton/Skeleton';
import { fetchFaqQuestions } from "@/app/components/store/slices/questionsSlice";
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import SideModal from '../SideModal/SideModal';
import TextArea from '../Common/Input/TextArea';
import { deleteFaqQuestions, getFaqHistory, patchKnowledgeQuestion } from '@/app/API/pages/Knowledge';
import { addNagetiveQuestionData, deleteNagetiveQuestionData, editNagetiveQuestionData, getNagetiveQuestionData, getSingleNagetiveQuestionData } from '@/app/API/pages/NagetiveFaq';
import { makeCapital } from '../helper/capitalName';
import { AcademicCapIcon, BriefcaseIcon, DocumentArrowUpIcon, MinusCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Multiselect from 'multiselect-react-dropdown';
import TextEditor from '../URL/Richtext';
import TextField from '../Common/Input/TextField';
import FaqHistoryTab from './FaqHistoryTab';

const ManageFaqs = ({ questions, bots, getQuestionsData, setBasicFormData }) => {
    console.log("questions", questions)
    const [perPage, setPerPage] = useState(10);
    const [tab, setTab] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showAdd, setShowAdd] = useState(true);
    const [nLoading, setNLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const [negativeQuestions, setNagetiveQuestions] = useState([])
    const [negative, setNagetive] = useState(false)
    const [updateLoader, setUpdateLoader] = useState(false);
    const customStyles = {
        rows: {
            style: {
                minHeight: 'auto', // override the row height
                maxHeight: '100%', // override the row height
                paddingTop: "10px",
                paddingBottom: "10px",
                height: "auto"
            },
        }
    }


    const updateBotSelection = async (rowIndex, selectedBots) => {
        const recordId = questions?.data?.results[rowIndex]?.id; // Assuming your data contains the record ID
        const payload = { bots: selectedBots.map(botId => ({ bot: botId.value, active: true })) };
        try {
            await patchKnowledgeQuestion(payload, recordId);
        } catch (error) {
            // Handle error
        }
    };

    const onSelectData = (selectedList, selectedItem, index) => {
        let updatedSelectedList = [...questions.selectedBot];
        updatedSelectedList[index] = selectedList;
        console.log("updatedSelectedList", updatedSelectedList)
        setBasicFormData(prev => ({
            ...prev,
            selectedBot: updatedSelectedList
        }));
    }

    const updateFaq = async () => {
        setUpdateLoader(true)
        const response = await patchKnowledgeQuestion({ answer: selected.answer }, selected.id)
        if (response.status === 200 || response.status === 201) {
            // dispatch(fetchFaqQuestions('page=1&page_size=10'));
            getQuestionsData()
            setUpdateLoader(false)
            setSelected(null)
        } else {
            setUpdateLoader(false)
        }
    }
    const columns = [
        {
            name: "Question",
            selector: (row, index) => row.question,
            sortable: false,
            reorder: false,
            minWidth: "200px",
            padding: "12px",
            cell: (row) => (
                <p className='whitespace-normal p-2' onClick={() => { setSelected(row) }}>{row.question}</p>
            ),
        },
        {
            name: "Content Source",
            selector: (row) => row?.knowledge?.source,
            sortable: false,
            reorder: false,
            minWidth: "200px",
            hide: "sm",
            // width: "10%",
            cell: (row) => (
                <div className="flex justify-start w-full items-center gap-2" onClick={() => { setSelected(row) }}>
                    {
                        row?.knowledge?.source === 'snippet' ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                            </svg>
                            : row?.knowledge?.source === 'file' ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"></path>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                                </svg>
                    }
                    <span className="text-xs font-semibold">{row?.knowledge?.source}</span>
                </div>
            ),
        },
        {
            name: "Bots",
            selector: (row) => row.bots,
            sortable: false,
            reorder: false,
            cell: (row, index) =>
                <div className="py-2">
                    <Multiselect
                        className=''
                        options={bots ?? []}
                        selectedValues={questions.selectedBot ? questions?.selectedBot[index] : []}
                        onSelect={(selectedList, selectedItem) => {
                            onSelectData(selectedList, selectedItem, index);
                            updateBotSelection(index, selectedList); // Call API when selection changes
                        }}
                        onRemove={(selectedList, selectedItem) => {
                            onSelectData(selectedList, selectedItem, index);
                            updateBotSelection(index, selectedList); // Call API when selection changes
                        }}
                        placeholder={questions?.selectedBot && questions?.selectedBot[index]?.length === questions?.bots?.length ? '' : "Select Bots"}
                        displayValue="name"
                        closeOnSelect={true}
                        showArrow={false}
                    /></div>,
        },
    ];
    const columns1 = [
        {
            name: "Question",
            selector: (row, index) => row.question,
            sortable: false,
            reorder: false,
            minWidth: "100px",
            padding: "12px",
            cell: (row) => (
                <p className='whitespace-normal p-2' onClick={() => { setSelected(row) }}>{row.question}</p>
            ),
        },
        {
            name: "Bots",
            selector: (row) => row.bots,
            sortable: false,
            minWidth: "70px",
            reorder: false,
            cell: (row, index) =>
                <div className="py-2">
                    <Multiselect
                        className=''
                        options={bots ?? []}
                        selectedValues={questions.selectedBot ? questions?.selectedBot[index] : []}
                        onSelect={(selectedList, selectedItem) => {
                            onSelectData(selectedList, selectedItem, index);
                            updateBotSelection(index, selectedList); // Call API when selection changes
                        }}
                        onRemove={(selectedList, selectedItem) => {
                            onSelectData(selectedList, selectedItem, index);
                            updateBotSelection(index, selectedList); // Call API when selection changes
                        }}
                        placeholder={questions?.selectedBot && questions?.selectedBot[index]?.length === questions?.bots?.length ? '' : "Select Bots"}
                        displayValue="name"
                        closeOnSelect={true}
                        showArrow={false}
                    /></div>,
        }
    ];

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage)
        const queryParam = `page=${page}&page_size=${newPerPage}`;
        // dispatch(fetchFaqQuestions(queryParam));
        getQuestionsData(queryParam)
    }

    const onPageChange = async (page) => {
        const queryParam = `page=${page}&page_size=${perPage}`;
        getQuestionsData(queryParam)
    }

    const deleteRecord = async (id) => {
        await deleteFaqQuestions(id)
        const queryParam = `page=1&page_size=${10}`;
        // dispatch(fetchFaqQuestions(queryParam));
        getQuestionsData(queryParam)
        setUpdateLoader(false)
        setSelected(null)
    }
    const getNagetiveQuestions = async (id) => {
        const response = await getSingleNagetiveQuestionData(id)
        setNagetiveQuestions(response?.data)
        setNagetive(false)
    }
    const deleteNegativeFaq = async (id) => {
        const response = await deleteNagetiveQuestionData(id)
        const filterData = negativeQuestions.filter((x) => x.id !== id)
        setNagetiveQuestions(filterData)
    }
    const addNewNagetiveFaq = async () => {
        setNLoading(true)
        if (isEdit === false) {
            const response = await addNagetiveQuestionData({ search: selected.negative_answer, faq: selected.id })
            if (response.status === 200 || response.status === 201) {
                setIsEdit(false)
                setNagetiveQuestions((prev) => {
                    return [
                        ...prev,
                        response.data
                    ]
                })
                setSelected((prev) => {
                    return {
                        ...prev,
                        negative_answer: ''
                    }
                })
                setNLoading(false)
            } else {
                setSelected((prev) => {
                    return {
                        ...prev,
                        negative_answer: ''
                    }
                })
                setNLoading(false)
            }
        } else {
            const response = await editNagetiveQuestionData({ search: selected.negative_answer }, selected.negative_id)
            if (response.status === 200 || response.status === 201) {
                const filterData = [...negativeQuestions]
                filterData[selected.index].search = selected.negative_answer
                setIsEdit(false)
                setNagetiveQuestions(filterData
                )
                setSelected((prev) => {
                    return {
                        ...prev,
                        negative_answer: ''
                    }
                })

                setNLoading(false)
            } else {

                setNLoading(false)
            }
        }
    }

    const handleTextEditorChange = (content) => {
        setSelected((prev) => {
            return {
                ...prev,
                answer: content
            }
        })
    }



    return (
        <div className="knowledgebase_table w-full px-2 pt-2">
            <div className=' hidden sm:block md:block lg:block'>
                <DataTable
                    title={''}
                    fixedHeader
                    highlightOnHover
                    pointerOnHover
                    pagination
                    className='!h-[69vh]'
                    columns={columns}
                    noDataComponent={<><p className="text-center text-xs p-3">Questions Tempo needs your help answering will show here when they're ready!</p></>}
                    data={questions?.data?.results}
                    progressPending={questions?.isLoading}
                    progressComponent={<div className="w-full mt-3 relative"><SkeletonLoader count={9} height={30} width="100%" className={"mt-2"} /></div>}
                    paginationTotalRows={questions?.data?.count}
                    paginationDefaultPage={questions?.data?.page}
                    onRowClicked={(rowData) => { setSelected(rowData) }}
                    paginationPerPage={perPage}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={(page) => {
                        onPageChange(page)
                    }}
                    paginationRowsPerPageOptions={[5, 10, 20, 30]}
                    customStyles={customStyles}
                />
            </div>
            <div className=' block sm:hidden md:hidden lg:hidden'>
                <DataTable
                    title={''}
                    fixedHeader
                    highlightOnHover
                    className='custome_table'
                    pointerOnHover
                    pagination
                    columns={columns1}
                    noDataComponent={<><p className="text-center text-xs p-3">Questions Tempo needs your help answering will show here when they're ready!</p></>}
                    data={questions?.data?.results}
                    progressPending={questions?.isLoading}
                    progressComponent={<div className="w-full mt-3 relative"><SkeletonLoader count={9} height={30} width="100%" className={"mt-2"} /></div>}
                    paginationTotalRows={questions?.data?.count}
                    paginationDefaultPage={questions?.data?.page}
                    onRowClicked={(rowData) => { setSelected(rowData) }}
                    paginationPerPage={perPage}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={(page) => {
                        onPageChange(page)
                    }}
                    paginationRowsPerPageOptions={[5, 10, 20, 30]}
                    customStyles={customStyles}
                />
            </div>

            {selected && (
                <SideModal heading={selected.question} setShow={(text) => {
                    setIsEdit(false)
                    setTab(0)
                    setSelected(null)
                }}
                    deleteButton={true}
                    data={selected}
                    deleteRecord={(id) => deleteRecord(id)}>

                    <div className={"border-b-2 my-2 border-border dark:border-gray-700 flex items-center justify-between"}>
                        <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                            <li className={` ${tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(0) }}>

                                <span
                                    className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                    aria-current="page"
                                >
                                    Answer
                                </span>

                            </li>
                            <li className={`  ${tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                                setNagetive(true)
                                getNagetiveQuestions(selected.id)
                                setTab(1)
                            }}>

                                <span
                                    className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                    aria-current="page"
                                >
                                    Negative Search Terms
                                </span>

                            </li>

                            <li className={` ${tab === 3 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(3) }}>

                                <span
                                    className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                    aria-current="page"
                                >
                                    History
                                </span>

                            </li>

                        </ul>
                    </div>
                    {tab === 0 && (
                        <>
                            {/* <div className='my-8 sss'>
                                <TextArea name="answer"
                                    className="py-2 !p-[10px]"
                                    type={"text"}
                                    id={"answer"}
                                    placeholder={""}
                                    rows={'5'}
                                    onChange={(e) =>
                                        setSelected((prev) => {
                                            return {
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }
                                        })}
                                    value={selected.answer} />
                               
                            </div> */}

                            <TextEditor oldContent={selected.answer} handleTextEditorChange={handleTextEditorChange}></TextEditor>

                            <button
                                onClick={(e) => updateFaq()}
                                type="button"
                                className="my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white" disabled={selected.answer == '' || updateLoader}>
                                {updateLoader ? <>
                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    <span>Loading...</span> </> : "Submit"}
                            </button>
                        </>)}
                    {tab === 1 && (
                        <>
                            {negative ?
                                <div className="mt-6">
                                    <SkeletonLoader height={100} width={"100%"} />
                                    <div className="mt-3">
                                        <SkeletonLoader height={40} width={"10%"} />
                                    </div>

                                    <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                        <div className="mt-1 flex items-center justify-between">
                                            <SkeletonLoader height={15} width={500} />
                                            <div className="flex items-center justify-between gap-2">
                                                <SkeletonLoader height={25} width={25} />
                                                <SkeletonLoader height={25} width={25} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                :
                                <>
                                    {showAdd && (
                                        <div className='my-8'>
                                            <TextField name="negative_answer"
                                                className="py-2 !p-[10px]"
                                                type={"text"}
                                                id={"negative_answer"}

                                                placeholder={negativeQuestions.length === 0 ? "You don't have any negative search terms yet. Please enter your first search term here to get started." : ""}
                                                rows={'5'}
                                                onChange={(e) => setSelected((prev) => {
                                                    return {
                                                        ...prev,
                                                        [e.target.name]: e.target.value
                                                    }
                                                })}
                                                value={selected.negative_answer} />
                                            <button
                                                onClick={(e) => addNewNagetiveFaq()}
                                                type="button"
                                                disabled={selected.negative_answer === "" || !selected.negative_answer || nLoading}
                                                className="my-6 flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                                                {nLoading ? 'Loading...' : isEdit ? "Edit" : "Submit"}
                                            </button>

                                        </div>
                                    )}
                                    {negativeQuestions.length > 0 && (
                                        <div className={` bg-[#96b2ed2e] my-4 rounded-md p-3`}>
                                            <ul className="text-start py-2 text-sm text-gray-700 ">
                                                {negativeQuestions.map((element, key) =>
                                                    <li className='p-2 text-justify text-heading my-2 cursor-pointer flex justify-between items-center gap-4' key={key}>
                                                        <p className="text-xs">{element.search}</p>
                                                        <div className='flex justify-start gap-4 items-center'>
                                                            <PencilSquareIcon className="h-5 w-5" onClick={() => {
                                                                setIsEdit(true)
                                                                setSelected((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        negative_answer: element.search,
                                                                        negative_id: element.id,
                                                                        index: key
                                                                    }
                                                                })
                                                            }} />
                                                            <TrashIcon className="h-5 w-5" onClick={() => { deleteNegativeFaq(element.id) }} />
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </>}
                        </>


                    )}



                    {tab === 3 && (
                        <>
                            <FaqHistoryTab selectedWorkflow={selected}></FaqHistoryTab>
                        </>
                    )}
                </SideModal>
            )}
        </div>
    )
}

export default ManageFaqs