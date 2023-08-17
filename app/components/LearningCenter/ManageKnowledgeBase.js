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
    const [singleKnowledgeData, setSingleKnowledgeData] = useState(null);
    const [filterText, setFilterText] = useState('');
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
            name: <div><input type="checkbox" className="" /></div>,
            selector: (row) => ``,
            sortable: false,
            reorder: false,
            cell: (row) => (
                <div>
                    <input type="checkbox" className="" />
                </div>
            ),
            maxWidth: '20px'
        },
        {
            name: "Title",
            selector: (row) => <h3 data-tag="allowRowEvents" className={`font-normal text-xs whitespace-normal`}>{row.title}</h3>,
            sortable: true,
            reorder: true,
            style: {
                whiteSpace: "inherit"
            },
        },
        {
            name: "State",
            selector: (row) => row.state,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <span data-tag="allowRowEvents" className={`inline-block w-auto sm:w-[100px] text-center whitespace-nowrap rounded ${row.active === true ? "bg-[#d8efdc] text-[#107235]" : "bg-border text-white"}  px-4 py-2 align-baseline text-xs font-bold leading-none`}>
                    {row.active ? "Active" : "Disable"}
                </span>
            ),
        },
        {
            name: "Content Source",
            selector: (row) => row.source,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <div data-tag="allowRowEvents" className="flex justify-center items-center gap-2">
                    <LinkIcon className="h-4 w-4 font-semibold" />
                    <span className="text-xs font-semibold">{row.source}</span>
                </div>
            ),
        },
        {
            name: "Bots",
            selector: (row) => row.bots,
            sortable: true,
            reorder: true,
            cell: (row, index) =>
                <Multiselect
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
                    placeholder={"Select Bots"}
                    displayValue="name"
                    closeOnSelect={true}
                />,
        },
        {
            name: "Last Edited",
            selector: (row) => <span data-tag="allowRowEvents" className="text-xs">{moment(row.created).fromNow()}</span>,
            sortable: false,
            reorder: false
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
            successMessage(value.type + " Added successfully")

        }
    }

    const viewKnowledgeCenterHandler = (data) => {
        setEditKnowledgeCenter(true);
        setSingleKnowledgeData(data)
    };

    const closeKnowledgeCenter = () => {
        setEditKnowledgeCenter(false);
        setSingleKnowledgeData(null)
    }

    const deleteKnowledgeCenterHandler = async (id) => {
        const deleteRecord = await deleteKnowledgeRecord(id)
        if (deleteRecord.status === 204) {
            successMessage("Knowledge deleted successfully")
            const filterKnowledge = basicFormData.knowledgeData.filter((x) => x.id !== id)
            const knowledgeDataValue = knowledge.filter((x) => x.id !== id)
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
            setKnowledge(knowledgeDataValue)
            setEditKnowledgeCenter(false);
            setSingleKnowledgeData(null)
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
                setShowSourceFilter(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <>
            {tabLoader ? <Loading /> :
                <div className="w-full">
                    <div className="sm:flex rounded-t-lg pt-4 sm:pt-4 p-2 sm:p-5 border-border justify-between items-center">
                        <div className="flex justify-between items-center gap-4 w-full sm:w-1/4">
                            <div className='flex justify-between items-center gap-1'>
                                <ClipboardIcon className='h-4 w-4' />
                                <h3 className="text-normal font-bold text-heading">Tempo Content</h3>
                            </div>
                        </div>
                        <div className='flex flex-wrap sm:justify-end items-center gap-2 w-full sm:w-3/4'>

                            <div>
                                <button type="button" onClick={() => handleCreateOptions('url')} className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black disabled:bg-input_color disabled:text-white">
                                    <Cog6ToothIcon className='h-4 w-4' />
                                    Manage Sources
                                </button>
                            </div>
                            <div>
                                <button onClick={(e) => setCreateModal(true)} type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                                    <PlusSmallIcon className='h-4 w-4' />
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">
                        <div className="bg-[#f1f1f1] p-6 rounded-md mb-6">
                            <p className="text-sm mb-4 font-semibold">
                                To answer customer questions, Tempo is using:
                            </p>
                            <div className="flex gap-4 sm:gap-10 justify-start align-top">
                                <div className='w-[25%]'>
                                    <h2 className="text-3xl font-semibold">{getCount(basicFormData?.knowledgeData || [], 'EXTERNAL').length}</h2>
                                    <p className="text-sm font-semibold"> {getCount(basicFormData?.knowledgeData || [], 'EXTERNAL').length > 1 ? "External pages" : "External page"}</p>
                                    <p className="text-sm text-[#9CA3AF] font-semibold">out of {getCount(basicFormData?.knowledgeData || [], 'ALL').length}</p>
                                </div>
                                <div className='w-[25%]'>
                                    <h2 className="text-3xl font-semibold">{getCount(basicFormData?.knowledgeData || [], 'SNIPPET').length}</h2>
                                    <p className="text-sm font-semibold">{getCount(basicFormData?.knowledgeData || [], 'SNIPPET').length > 1 ? 'Snippets' : "Snippet"}</p>
                                    <p className="text-sm text-[#9CA3AF] font-semibold">out of {getCount(basicFormData?.knowledgeData || [], 'ALL').length}</p>
                                </div>
                                <div className='w-[25%]'>
                                    <h2 className="text-3xl font-semibold">{getCount(basicFormData?.knowledgeData || [], 'FILE').length}</h2>
                                    <p className="text-sm font-semibold">{getCount(basicFormData?.knowledgeData || [], 'FILE').length > 1 ? 'Files' : "File"}</p>
                                    <p className="text-sm text-[#9CA3AF] font-semibold">out of {getCount(basicFormData?.knowledgeData || [], 'ALL').length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="block sm:flex gap-10 justify-start items-center">
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
                            <div className='mt-4 sm:mt-0 relative' ref={dropdown}>
                                <div className="text-sm bg-[#F1F1F1] rounded-lg inline-block p-1 px-2">
                                    <button
                                        type="button"
                                        className="border-none p-0 m-0 flex gap-1 items-center text-lg font-bold "
                                        onClick={() => { setShowSourceFilter(prev => !prev) }}
                                    >
                                        <AdjustmentsHorizontalIcon className='h-4 w-4' />
                                        <small className="">All content sources</small>
                                    </button>
                                </div>
                                {showSourceFilter && (
                                    <div id="dropdown" className="z-10 absolute my-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="p-2  text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li className='hover:bg-gray rounded-md cursor-pointer ' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'ALL'))
                                                setShowSourceFilter(prev => !prev)
                                            }}>
                                                <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >All</p>
                                            </li>
                                            <li className='hover:bg-gray rounded-md cursor-pointer ' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'EXTERNAL'))
                                                setShowSourceFilter(prev => !prev)
                                            }}>
                                                <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >External</p>
                                            </li>
                                            <li className='hover:bg-gray rounded-md cursor-pointer ' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'SNIPPET'))
                                                setShowSourceFilter(prev => !prev)
                                            }}>
                                                <p href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Snippet</p>
                                            </li>
                                            <li className='hover:bg-gray rounded-md cursor-pointer ' onClick={() => {
                                                setKnowledge(getCount(basicFormData?.knowledgeData || [], 'FILE'))
                                                setShowSourceFilter(prev => !prev)
                                            }}>
                                                <p href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">File</p>
                                            </li>
                                        </ul>
                                    </div>
                                )}
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
                                    pointerOnHover
                                    defaultSortFieldId="question"
                                    pagination
                                    customStyles={{
                                        rows: {
                                            style: {
                                                padding: '5px' // Adjust as needed
                                            }
                                        }
                                    }}
                                    className='custom-data-table'
                                    columns={knowledgeCenterColumns}
                                    onRowClicked={(rowData) => {
                                        viewKnowledgeCenterHandler(rowData);
                                    }}
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

                </div>}


            {createModal === true && (
                <Modal title={'Add New Content'} show={createModal} setShow={setCreateModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                    <div className='block sm:flex justify-center items-center gap-4 py-4'>
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
                </Modal>
            )}


            {createOptions === 'snippet' && (
                <SnippetManagement hideComponent={hideComponent} setCreateOptions={setCreateOptions} basicFormData={basicFormData} setBasicFormData={setBasicFormData} handleSubmit={handleSubmit} loading={loading} />
            )}
            {createOptions === 'url' && (
                <UrlManagement hideComponent={hideComponent} currentStatusSteps={currentStatusSteps} currentIndex={currentIndex} setCreateOptions={setCreateOptions} basicFormData={basicFormData} setBasicFormData={setBasicFormData} handleSubmit={handleSubmit} loading={loading} getCount={getCount} deleteRecord={deleteKnowledgeCenterHandler} knowledge={knowledge} setKnowledge={setKnowledge} />
            )}
            {createPdfModal === true && (
                <FileManagement hideComponent={hideComponent} createPdfModal={createPdfModal} setCreatePdfModal={setCreatePdfModal} handleChange={handleChange} fileTypes={fileTypes} setCreateModal={setCreateModal} basicFormData={basicFormData} setBasicFormData={setBasicFormData} handleSubmit={handleSubmit} loading={loading} />
            )}
            {editKnowledgeCenter === true && (
                <EditKnowledgeCenter hideComponent={hideComponent} singleKnowledgeData={singleKnowledgeData} setSingleKnowledgeData={setSingleKnowledgeData} isClose={closeKnowledgeCenter} deleteRecord={deleteKnowledgeCenterHandler} handleSubmit={handleSubmit} setKnowledge={setKnowledge} setBasicFormData={setBasicFormData} basicFormData={basicFormData} knowledge={knowledge} />
            )}

        </>
    )
}

export default ManageKnowledgeBase


