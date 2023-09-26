import React, { useState, useEffect, useRef } from 'react'
import DataTable from "react-data-table-component";
import { AdjustmentsHorizontalIcon, ClipboardIcon, DocumentTextIcon, LinkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon, PlusSmallIcon, UserIcon } from '@heroicons/react/24/solid';
import Modal from '../Common/Modal/Modal';
import { createNewKnowledge, getKnowledgeData, deleteKnowledgeRecord, updateKnowledgeRecord } from '@/app/API/pages/Knowledge';

import Multiselect from 'multiselect-react-dropdown';
import SnippetManagement from './SnippetManagement';
import UrlManagement from './UrlManagement';
import FileManagement from './FileManagement';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBot } from '../store/slices/botIdSlice';
import { errorMessage, successMessage } from '../Messages/Messages';
import SkeletonLoader from '../Skeleton/Skeleton';
import EditKnowledgeCenter from './EditKnowledgeCenter';
import Loading from '../Loading/Loading';
import './ManageKnowledgeBase.css'
import SideModal from '../SideModal/SideModal'; 
import Button from '../Common/Button/Button';

const ManageKnowledgeBase = ({ tabLoader, knowledge, setKnowledge, basicFormData, setBasicFormData }) => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.botId);
    const [createModal, setCreateModal] = useState(false);
    const [createPdfModal, setCreatePdfModal] = useState(false);
    const [createOptions, setCreateOptions] = useState(null)
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentStatusSteps = ['first', 'second', 'third', 'fourth'];
    const [loading, setLoading] = useState(false)
    const [showSourceFilter, setShowSourceFilter] = useState(false)
    const [editKnowledgeCenter, setEditKnowledgeCenter] = useState(false);
    const [placeholderText, setPlaceholderText] = useState('')
    const [singleKnowledgeData, setSingleKnowledgeData] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [filterhead, setFilterhead] = useState('All');
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [knowledgeRecordID, setKnowledgeRecordID] = useState(null);

    const handleFilterChange = (event) => {
        const searchText = event.target.value;
        setFilterText(searchText);
        const filteredData = basicFormData?.knowledgeData.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setKnowledge(filteredData);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 6000);

        return () => clearInterval(interval);
    }, []);


    const getCount = (data, type) => {
        switch (type) {
            case "FILE":
                return data.filter((x) => x.source === 'file')
            case "EXTERNAL":
                return data.filter((x) => x.source === 'external')
            case "SNIPPET":
                return data.filter((x) => x.source === 'snippet')
            default:
                return data
        }
    }


    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    const onSelectData = (selectedList, selectedItem, index) => {
        let updatedSelectedList = [...basicFormData.selectedBot];
        updatedSelectedList[index] = selectedList;
        setBasicFormData(prev => ({
            ...prev,
            selectedBot: updatedSelectedList
        }));
    }


    const getAllBots = () => {
        const getTitle = state.botData.data.bots.map(
            (element) => element.chat_title
        );
        const widgetCode = state.botData.data.widgets;
        const mergedArray = widgetCode.map((item, index) => {
            const title = getTitle[index];
            return {
                value: item.id,
                name: title,
            };
        });
        setBasicFormData((prev) => {
            return {
                ...prev,
                bots: mergedArray
            }
        })
    }

    const updateBotSelection = async (rowIndex, selectedBots) => {
        const recordId = knowledge[rowIndex]?.id; // Assuming your data contains the record ID
        const payload = { bots: selectedBots.map(botId => ({ bot: botId.value, active: true })) };
        try {
            await updateKnowledgeRecord(payload, recordId);
        } catch (error) {
            // Handle error
        }
    };
    useEffect(() => {
        if (state.botData.data?.bots && state.botData.data?.widgets) {
            getAllBots();
        } else {
            dispatch(fetchBot())
        }
    }, [state.botData.data]);

    const knowledgeCenterColumns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: false,
            reorder: false,
            cell: (row) => (
                <h3 data-tag="allowRowEvents" className={`font-normal text-xs w-[200px] sm:w-auto`}>{row.title}</h3>
            ),
        },
        {
            name: "State",
            selector: (row) => row.state,
            sortable: false,
            reorder: false,
            cell: (row) => (
                <span data-tag="allowRowEvents" className={`inline-block text-center whitespace-nowrap rounded ${row.active === true ? "bg-[#d8efdc] text-[#107235]" : "bg-border text-white"}  px-4 py-2 align-baseline text-xs font-bold leading-none w-[80px]`}>
                    {row.active ? "Active" : "Disabled"}
                </span>
            )
        },
        {
            name: "Content Source",
            selector: (row) => row.source,
            sortable: false,
            reorder: false,
            cell: (row) => (
                <div data-tag="allowRowEvents" className="flex justify-start w-full items-center gap-2">

                    {row.source === 'snippet' ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                        </svg>
                        : row.source === 'file' ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"></path>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                            </svg>
                    }
                    <span className="text-xs font-semibold">{row.source}</span>
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
                        options={basicFormData?.bots ?? []}
                        selectedValues={basicFormData.selectedBot ? basicFormData?.selectedBot[index] : []}
                        onSelect={(selectedList, selectedItem) => {
                            onSelectData(selectedList, selectedItem, index);
                            updateBotSelection(index, selectedList); // Call API when selection changes
                        }}
                        onRemove={(selectedList, selectedItem) => {
                            onSelectData(selectedList, selectedItem, index);
                            updateBotSelection(index, selectedList); // Call API when selection changes
                        }}
                        placeholder={basicFormData?.selectedBot && basicFormData?.selectedBot[index]?.length === basicFormData?.bots?.length ? '' : "Select Bots"}
                        displayValue="name"
                        closeOnSelect={true}
                        showArrow={false}
                    /></div>,
        },
        {
            name: "Last Edited",
            selector: (row) => row.created,
            sortable: false,
            reorder: false,
            cell: (row, index) => (
                <span data-tag="allowRowEvents" className="text-xs">{moment(row.created).fromNow()}</span>
            )
        },
    ];
    const handleCreateOptions = (option) => {
        if (option === 'pdf') {
            setCreatePdfModal(true);
        } else {
            setCreateOptions(option)
        }
        setCurrentIndex(0)
        setCreateModal(false)
    }
    const handleSubmit = async (value) => {
        setLoading(true)
        let payload = {}
        switch (value.type) {
            case "SNIPPET":
                payload = {
                    content: basicFormData?.content,
                    source: "snippet",
                    active: basicFormData?.snippet_active === true ? true : false,
                    title: basicFormData?.title
                }
                break;
            case "FILE":
                payload = {
                    file: basicFormData?.file,
                    source: "file",
                    active: true,
                    title: basicFormData?.title
                }
                break;
            case "URL":
                payload = {
                    url: basicFormData?.url,
                    source: "external",
                    active: true,
                    title: basicFormData?.url
                }
                break;
            default:
                break;
        }

        const response = await createNewKnowledge(payload)
        if (response.status === 201) {
            setCreateModal(false)
            setLoading(false)
            setCreateOptions(null)
            setCreatePdfModal(false)
            let filterKnowledge = [...basicFormData.knowledgeData]
            let knowledgeDataValue = [...knowledge]
            filterKnowledge.unshift(response.data)
            knowledgeDataValue.unshift(response.data)
            setBasicFormData((prev) => {
                const botDataArray = knowledgeDataValue.map(entry => {
                    if (entry.bots.length === 0) {
                        return []; // Return an empty array for entries with no bots
                    } else {
                        return entry.bots.map(bot => ({
                            value: bot.bot.id,
                            name: bot.bot.chat_title,
                        }));
                    }
                });
                return {
                    ...prev,
                    knowledgeData: filterKnowledge,
                    selectedBot: botDataArray,
                }
            })
            setKnowledge(knowledgeDataValue)
            // successMessage(value.type + " Added successfully")

        }
    }

    const viewKnowledgeCenterHandler = (data) => {
        console.log(data)
        setEditKnowledgeCenter(true);
        setSingleKnowledgeData(data)
    };

    const closeKnowledgeCenter = () => {
        setEditKnowledgeCenter(false);
        setSingleKnowledgeData(null)
    }

    const deleteKnowledgeCenterHandler = async (id) => {
        setKnowledgeRecordID(id)
        setDeleteConfirmationModal(true);
    };

    const deleteKnowledgeCenterRecord = async () => {
        const deleteRecord = await deleteKnowledgeRecord(knowledgeRecordID)
        if (deleteRecord.status === 204) {
            const filterKnowledge = basicFormData.knowledgeData.filter((x) => x.id !== knowledgeRecordID)
            const knowledgeDataValue = knowledge.filter((x) => x.id !== knowledgeRecordID)
            setBasicFormData((prev) => {
                const botDataArray = filterKnowledge.map(entry => {
                    if (entry.bots.length === 0) {
                        return []; // Return an empty array for entries with no bots
                    } else {
                        return entry.bots.map(bot => ({
                            value: bot.bot.id,
                            name: bot.bot.chat_title,
                        }));
                    }
                });
                return {
                    ...prev,
                    knowledgeData: filterKnowledge,
                    selectedBot: botDataArray,
                }
            })
            successMessage("Knowledge Removed Successfully")
            setKnowledge(knowledgeDataValue)
            setEditKnowledgeCenter(false);
            setSingleKnowledgeData(null)
            setDeleteConfirmationModal(false);
            setKnowledgeRecordID(null);
        } else {
            errorMessage('Unable To Delete Record!');
        }
    };

    const hideComponent = () => {
        setCreateOptions(null)
        setCreatePdfModal(false)
        setEditKnowledgeCenter(false)
    }


    const dropdown = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                console.log("Asdsd")
                setShowSourceFilter(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const customStyles = {
        rows: {
            style: {
                minHeight: 'auto', // override the row height
                // maxHeight: '100%', // override the row height
                paddingTop: "10px",
                paddingBottom: "10px",
                height: "auto"
            },
        }
    }
    return (
        <>
            {tabLoader ? <Loading /> :
                <div className="w-full">
                    <div className="sm:flex rounded-t-lg pt-4 sm:pt-4  border-border justify-between items-center">
                        <div className="flex justify-between items-center gap-4 w-full sm:w-1/4">
                            {/* 
                            <div className='flex justify-between items-center gap-1'>
                                <ClipboardIcon className='h-4 w-4' />
                                <p className="text-sm font-bold text-heading">Tempo Content</p>
                            </div>
                    */}

                        </div>
                        <div className='flex flex-wrap sm:justify-end items-center gap-2 w-full sm:w-3/4'>
                            {/* 
                            <div>
                                <button type="button" onClick={() => handleCreateOptions('url')} className="flex items-center justify-center text-xs gap-2 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black disabled:bg-input_color disabled:text-white">
                                    <Cog6ToothIcon className='h-4 w-4' />
                                    Manage Sources
                                </button>
                            </div>
                    */}
                            <div className='mr-[18px]'>
                                <button onClick={(e) => setCreateModal(true)} type="button" className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                                    {/* 
                                    <PlusSmallIcon className='h-4 w-4' />
                                     */}
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">
                        <div className="bg-[#f1f1f1] p-6 rounded-md mb-6">
                            <p className="text-xs mb-5 font-semibold">
                                To answer customer questions, Tempo is using:
                            </p>
                            <div className="flex gap-4 sm:gap-10 justify-start align-top">
                                <div className='w-[25%]'>
                                    <h2 className="text-sm font-semibold">{getCount(basicFormData?.knowledgeData || [], 'EXTERNAL').length}</h2>
                                    <p className="text-xs font-semibold"> {getCount(basicFormData?.knowledgeData || [], 'EXTERNAL').length === 1 ? "External page" : "External pages"}</p>
                                    <p className="text-xs text-[#9CA3AF] font-semibold">out of {getCount(basicFormData?.knowledgeData || [], 'EXTERNAL').length}</p>
                                </div>
                                <div className='w-[25%]'>
                                    <h2 className="text-sm font-semibold">{getCount(basicFormData?.knowledgeData || [], 'SNIPPET').length}</h2>
                                    <p className="text-xs font-semibold">{getCount(basicFormData?.knowledgeData || [], 'SNIPPET').length === 1 ? 'Snippet' : "Snippets"}</p>
                                    <p className="text-xs text-[#9CA3AF] font-semibold">out of {getCount(basicFormData?.knowledgeData || [], 'SNIPPET').length}</p>
                                </div>
                                <div className='w-[25%]'>
                                    <h2 className="text-sm font-semibold">{getCount(basicFormData?.knowledgeData || [], 'FILE').length}</h2>
                                    <p className="text-xs font-semibold">{getCount(basicFormData?.knowledgeData || [], 'FILE').length === 1 ? 'File' : "Files"}</p>
                                    <p className="text-xs text-[#9CA3AF] font-semibold">out of {getCount(basicFormData?.knowledgeData || [], 'FILE').length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between sm:flex gap-10 justify-start items-center">
                            <div className='mt-0 sm:mt-0 relative' ref={dropdown}>
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
                                        <small className="flex gap-2 justify-between w-full font-normal items-center text-xs p-2">{filterhead}
                                            <i style={{ fontSize: "15px" }} className="fa">&#xf0d7;</i>
                                        </small>
                                    </button>
                                </div>
                                {showSourceFilter && (
                                    <div id="dropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700"
                                        style={{ border: "1px solid #C7C6C7" }}>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li className='hover:bg-gray cursor-pointer' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'All'))
                                                setShowSourceFilter(prev => !prev)
                                                setFilterhead('All')
                                            }}>
                                                <p className="block px-2 text-xs py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >All</p>
                                            </li>
                                            <li className='hover:bg-gray cursor-pointer ' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'EXTERNAL'))
                                                setShowSourceFilter(prev => !prev)
                                                setFilterhead('External')

                                            }}>
                                                <p className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >External</p>
                                            </li>
                                            <li className='hover:bg-gray cursor-pointer ' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'SNIPPET'))
                                                setShowSourceFilter(prev => !prev)
                                                setFilterhead('Snippet')

                                            }}>
                                                <p href="#" className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Snippet</p>
                                            </li>
                                            <li className='hover:bg-gray cursor-pointer ' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'FILE'))
                                                setShowSourceFilter(prev => !prev)
                                                setFilterhead('File')
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
                                    value={filterText}
                                    onChange={handleFilterChange}
                                />
                                <img className="w-5 top-[10px] left-[14px] absolute" src="/search.png" />
                            </div>
                        </div>
                    </div>
                    {
                        tabLoader === true ? (
                            <div className="">
                                <h1 className="mt-2 text-sm">
                                    <SkeletonLoader height={40} width={100} />
                                </h1>
                                <div className="mt-3">
                                    <SkeletonLoader count={9} height={30} className={"mt-2"} />
                                </div>
                            </div>
                        ) : (
                            <div className='data_table_wrapper'>
                                <DataTable
                                    title={``}
                                    fixedHeader
                                    highlightOnHover
                                    className='data-table-class'
                                    pointerOnHover
                                    defaultSortFieldId="title"
                                    pagination
                                    selectableRows
                                    customStyles={customStyles}
                                    columns={knowledgeCenterColumns}
                                    onRowClicked={(rowData) => {
                                        viewKnowledgeCenterHandler(rowData);
                                    }}
                                    rowsPerPageOptions={[]}
                                    noDataComponent={<div className='bg-[#F1F1F1] w-full py-8 px-16'>
                                        <div className='block sm:flex justify-center items-center gap-4 py-4 '>
                                            <div onClick={() => handleCreateOptions('snippet')} className='my-2 border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3 h-[180px]' >
                                                <DocumentTextIcon className='h-10 w-10 text-white bg-red rounded-lg p-2' />
                                                <h3 className='text-sm text-black hover:text-primary font-bold py-4'>Snippet</h3>
                                                <p className='text-xs font-normal'>Plain text content specific for Tempo.</p>
                                            </div>
                                            <div onClick={() => handleCreateOptions('pdf')} className='my-2  border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3  h-[180px]'>
                                                <PaperClipIcon className='h-10 w-10 text-white bg-primary rounded-lg p-2' />
                                                <h3 className='text-sm text-black hover:text-primary font-bold py-4'>File Upload</h3>
                                                <p className='text-xs font-normal'>Txt or PDF FAQ or support file.</p>
                                            </div>
                                            <div onClick={() => handleCreateOptions('url')} className='my-2  border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3  h-[180px]'>
                                                <LinkIcon className='h-10 w-10 text-white bg-btn_y_hover rounded-lg p-2' />
                                                <h3 className='text-sm text-black hover:text-primary font-bold py-4'>Public URL Source</h3>
                                                <p className='text-xs font-normal'>Provide a top-level domain and we will fetch all sub-domains</p>
                                            </div>
                                        </div></div>}
                                    data={knowledge}
                                />
                            </div>
                        )
                    }

                </div>
            }


            {createModal === true && (
                <SideModal heading={'Add New Content'} setShow={setCreateModal}>
                    <div className='block sm:flex justify-center items-center gap-4 my-8'>
                        <div onClick={() => handleCreateOptions('snippet')} className='my-2 border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3 h-[180px]' >
                            <DocumentTextIcon className='h-10 w-10 text-white bg-red rounded-lg p-2' />
                            <h3 className='text-sm text-black hover:text-primary font-bold py-4'>Snippet</h3>
                            <p className='text-xs font-normal'>Plain text content specific for Tempo.</p>
                        </div>
                        <div onClick={() => handleCreateOptions('pdf')} className='my-2  border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3  h-[180px]'>
                            <PaperClipIcon className='h-10 w-10 text-white bg-primary rounded-lg p-2' />
                            <h3 className='text-sm text-black hover:text-primary font-bold py-4'>File Upload</h3>
                            <p className='text-xs font-normal'>Txt or PDF FAQ or support file.</p>
                        </div>
                        <div onClick={() => handleCreateOptions('url')} className='my-2  border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3  h-[180px]'>
                            <LinkIcon className='h-10 w-10 text-white bg-btn_y_hover rounded-lg p-2' />
                            <h3 className='text-sm text-black hover:text-primary font-bold py-4'>Public URL Source</h3>
                            <p className='text-xs font-normal'>Provide a top-level domain and we will fetch all sub-domains</p>
                        </div>
                    </div>
                </SideModal>
            )}


            {createOptions === 'snippet' && (
                <SnippetManagement hideComponent={hideComponent} setCreateOptions={setCreateOptions} basicFormData={basicFormData} setBasicFormData={setBasicFormData} handleSubmit={handleSubmit} loading={loading} />
            )}
            {createOptions === 'url' && (
                <UrlManagement
                    hideComponent={hideComponent} currentStatusSteps={currentStatusSteps} currentIndex={currentIndex} setCreateOptions={setCreateOptions} basicFormData={basicFormData} setBasicFormData={setBasicFormData} handleSubmit={handleSubmit} loading={loading} getCount={getCount} deleteRecord={deleteKnowledgeCenterHandler} knowledge={knowledge} setKnowledge={setKnowledge} />
            )}
            {createPdfModal === true && (
                <SideModal heading={'File Upload'} setShow={setCreatePdfModal}>
                    <FileManagement hideComponent={hideComponent} createPdfModal={createPdfModal} setCreatePdfModal={setCreatePdfModal} handleChange={handleChange} fileTypes={fileTypes} setCreateModal={setCreateModal} basicFormData={basicFormData} setBasicFormData={setBasicFormData} handleSubmit={handleSubmit} loading={loading} />
                </SideModal>
            )}
            {editKnowledgeCenter === true && (
                <EditKnowledgeCenter hideComponent={hideComponent} singleKnowledgeData={singleKnowledgeData} setSingleKnowledgeData={setSingleKnowledgeData} isClose={closeKnowledgeCenter} deleteRecord={deleteKnowledgeCenterHandler} handleSubmit={handleSubmit} setKnowledge={setKnowledge} setBasicFormData={setBasicFormData} basicFormData={basicFormData} knowledge={knowledge} />
            )}

            {
                deleteConfirmationModal &&
                <Modal
                    title={<h3 className="text-base !font-bold">Remove Knowledge Base</h3>}
                    show={deleteConfirmationModal}
                    setShow={setDeleteConfirmationModal}
                    showCancel={true}
                    className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"}
                    customHideButton={false}
                    showTopCancleButton={false}
                    hr={false}
                >
                    <div className=''>
                        <h3 className="text-xs my-2 text-heading font-normal">Are you sure you want to remove this content from the knowledge base?</h3>
                        <div className={`flex  py-2 rounded-b mt-5 justify-between gap-4`}>
                            {" "}
                            <Button
                                className="inline-block float-left rounded bg-white px-6 pb-2 pt-2 text-xs font-medium leading-normal text-heading border border-border "
                                onClick={() => {
                                    setDeleteConfirmationModal((prev) => !prev);
                                }}
                            >
                                No
                            </Button>
                            <Button
                                type={"button"}
                                className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                onClick={() => { deleteKnowledgeCenterRecord() }}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </Modal>
            }


        </>
    )
}

export default ManageKnowledgeBase

