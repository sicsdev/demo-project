import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { AdjustmentsHorizontalIcon, ArrowLeftIcon, ClipboardDocumentIcon, ClipboardIcon, DocumentTextIcon, EllipsisHorizontalIcon, LinkIcon, PaperClipIcon, PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon, Cog6ToothIcon, PlusSmallIcon, UserIcon } from '@heroicons/react/24/solid';
import Modal from '../Common/Modal/Modal';
import { FileUploader } from "react-drag-drop-files";

const ManageKnowledgeBase = ({ viewKnowledgeCenterHandler }) => {
    const [createModal, setCreateModal] = useState(false);
    const [createPdfModal, setCreatePdfModal] = useState(false);
    const [createOptions, setCreateOptions] = useState(null)
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentStatusSteps = ['first', 'second', 'third', 'fourth'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const knowledgeCenterRecords = [
        {
            title: "Provider credentials - hims, inc.",
            state: "Active",
            content_source: "External",
            audience: "Everyone",
            time_anwsers: 0,
            last_edited: "7 hours ago"
        },
        {
            title: "Provider credentials - hims, inc.",
            state: "Active",
            content_source: "External",
            audience: "Everyone",
            time_anwsers: 0,
            last_edited: "7 hours ago"
        },
        {
            title: "Provider credentials - hims, inc.",
            state: "Disable",
            content_source: "External",
            audience: "Everyone",
            time_anwsers: 0,
            last_edited: "7 hours ago"
        }
    ];

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

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
            selector: (row) => <h3 data-tag="allowRowEvents" className={`font-bold text-xs whitespace-normal`}>{row.title}</h3>,
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
                <span data-tag="allowRowEvents" className={`inline-block whitespace-nowrap rounded ${row.state === "Active" ?"bg-[#d8efdc] text-[#107235]":"bg-border text-white"}  px-4 py-2 align-baseline text-xs font-bold leading-none`}>
                    {row.state}
                </span>
            ),
        },
        {
            name: "Content Source",
            selector: (row) => row.content_source,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <div data-tag="allowRowEvents" className="flex justify-center items-center gap-2">
                    <LinkIcon className="h-4 w-4 font-semibold" />
                    <span className="text-xs font-semibold">{row.content_source}</span>
                </div>
            ),
        },
        {
            name: "Audience",
            selector: (row) => row.audience,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <span data-tag="allowRowEvents" className="inline-block whitespace-nowrap rounded-full bg-[#f1f1f1] text-black px-4 py-2 align-baseline text-xs font-semibold leading-none">
                    {row.audience}
                </span>
            ),
        },
        {
            name: "Times used in anwsers",
            selector: (row) => <span data-tag="allowRowEvents" className="text-xs">{row.time_anwsers}</span>,
            sortable: false,
            reorder: false,
        },
        {
            name: "Last Edited",
            selector: (row) => <span data-tag="allowRowEvents" className="text-xs">{row.last_edited}</span>,
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

    return (
        <>
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
                            <button type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black disabled:bg-input_color disabled:text-white">
                                <Cog6ToothIcon className='h-4 w-4' />
                                Manage Sources
                            </button>
                        </div>
                        <div>
                            <button onClick={(e) => setCreateModal(true)} type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] disabled:bg-input_color disabled:text-white">
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
                                <h2 className="text-3xl font-semibold">0</h2>
                                <p className="text-sm font-semibold">Article</p>
                                <p className="text-sm text-[#9CA3AF] font-semibold">out of 1</p>
                            </div>
                            <div className='w-[25%]'>
                                <h2 className="text-3xl font-semibold">95</h2>
                                <p className="text-sm font-semibold">External pages</p>
                                <p className="text-sm text-[#9CA3AF] font-semibold">
                                    from 1 source
                                </p>
                            </div>
                            <div className='w-[25%]'>
                                <h2 className="text-3xl font-semibold">0</h2>
                                <p className="text-sm font-semibold">Snippets</p>
                                <p className="text-sm text-[#9CA3AF] font-semibold">out of 0</p>
                            </div>
                            <div className='w-[25%]'>
                                <h2 className="text-3xl font-semibold">0</h2>
                                <p className="text-sm font-semibold">Files</p>
                                <p className="text-sm text-[#9CA3AF] font-semibold">out of 0</p>
                            </div>
                        </div>
                    </div>

                    <div className="block sm:flex gap-10 justify-start items-center">
                        <div className="relative">
                            <input
                                placeholder="Search"
                                className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white focus:text-sm rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
                                type="text"
                            />
                            <img className="w-5 top-[10px] left-[14px] absolute" src="/search.png" />
                        </div>
                        <div className='mt-4 sm:mt-0'>
                            <div className="text-sm bg-[#F1F1F1] rounded-lg inline-block p-1 px-2">
                                <button
                                    type="button"
                                    className="border-none p-0 m-0 flex gap-1 items-center text-lg font-bold "
                                >
                                    <AdjustmentsHorizontalIcon className='h-4 w-4' />
                                    <small className="">All content sources</small>
                                </button>
                            </div>
                        </div>
                        <div className='mt-4 sm:mt-0'>
                            <span
                                className="flex justify-start gap-1 text-xs sm:text-sm cursor-pointer items-center font-bold rounded-t-lg"
                                aria-current="page"
                            >
                                <PlusIcon className={`h-4 w-4`} />
                                Add filter
                            </span>
                        </div>
                    </div>
                </div>
                <DataTable
                    title={``}
                    fixedHeader
                    highlightOnHover
                    pointerOnHover
                    defaultSortFieldId="question"
                    pagination
                    columns={knowledgeCenterColumns}
                    onRowClicked={(rowData) => {
                        viewKnowledgeCenterHandler(rowData);
                    }}
                    noDataComponent={<><p className="text-center text-sm p-3">No Records Found!</p></>}
                    data={knowledgeCenterRecords}
                />
            </div>  
            {createModal === true && (
                <Modal title={'Add New Content'} show={createModal} setShow={setCreateModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
                    <div className='block sm:flex justify-center items-center gap-4 py-4'>
                        <div onClick={() => handleCreateOptions('snippet')} className='my-2 border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3'>
                            <DocumentTextIcon className='h-10 w-10 text-white bg-red rounded-lg p-2' />
                            <h3 className='text-sm text-black hover:text-primary font-bold py-4'>Snippet</h3>
                            <p className='text-xs font-normal'>Plain text content specific for Tempo.</p>
                        </div>
                        <div onClick={() => handleCreateOptions('pdf')} className='my-2  border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3'>
                            <PaperClipIcon className='h-10 w-10 text-white bg-primary rounded-lg p-2' />
                            <h3 className='text-sm text-black hover:text-primary font-bold py-4'>File Upload</h3>
                            <p className='text-xs font-normal'>Txt or PDF FAQ or support file | Public URL Source...</p>
                        </div>
                        <div onClick={() => handleCreateOptions('url')} className='my-2  border border-border bg-white p-5 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg cursor-pointer w-full sm:w-1/3'>
                            <LinkIcon className='h-10 w-10 text-white bg-btn_y_hover rounded-lg p-2' />
                            <h3 className='text-sm text-black hover:text-primary font-bold py-4'>Public URL Source</h3>
                            <p className='text-xs font-normal'>Provide a top-level domain and we will fetch all sub-domains</p>
                        </div>
                    </div>
                </Modal>

            )}


            {createOptions === 'snippet' && (
                <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'>
                    <div className='w-full sm:w-auto fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                        <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                            <div className='flex flex-col sm:flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800 dark:border-gray-700'>
                                <div className='flex flex-row flex-1'>
                                    <input type='text' className='border-0 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Enter a Title' />
                                </div>
                                <div className='flex flex-row justify-end gap-2'>
                                    <button onClick={(e) => setCreateOptions(null)} type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black disabled:bg-input_color disabled:text-white">
                                        <XCircleIcon className='h-4 w-4' />
                                        Delete
                                    </button>
                                    <button onClick={(e) => setCreateOptions(null)} type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] disabled:bg-input_color disabled:text-white">
                                        Save and close
                                    </button>
                                </div>
                            </div>

                            <div className='my-8'>
                                <div className='flex flex-col gap-6'>
                                    <div className='flex flex-row items-center'>
                                        <span className='pr-5 text-xs'>State</span>
                                        <div className='flex flex-row items-center gap-2 col-span-4'>
                                            <div>
                                                <label className="switch" style={{ height: "unset" }}>
                                                    <input type="checkbox" name="billingEnabled" />
                                                    <span className="slider round h-[27px] w-[55px]"></span>
                                                </label>
                                            </div>
                                            <p className="inline-block whitespace-nowrap rounded bg-[#d8efdc] text-[#107235] px-4 py-2 align-baseline text-xs font-bold leading-none">
                                                {`Active`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='relative pb-6'>
                                        <textarea rows="10" cols="30" className='border-0 shadow-none block px-3 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[20px] text-[20px] disabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px]' placeholder='Start writing your content...'></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-[#E8E8E8] flex items-start gap-3 py-[10px] px-[15px] rounded-lg absolute bottom-4 left-3 right-3'>
                                <div className="flex gap-3 items-start justify-start">
                                    <svg className="mt-1" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.10039 4.90449C9.10039 4.29698 8.6079 3.80449 8.00039 3.80449C7.39288 3.80449 6.90039 4.29698 6.90039 4.90449C6.90039 5.51201 7.39288 6.00449 8.00039 6.00449C8.6079 6.00449 9.10039 5.51201 9.10039 4.90449Z"></path><path d="M7.25 7.00449V12.0045H8.75V7.00449H7.25Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00039 15.3226C3.9411 15.3226 0.650391 12.0319 0.650391 7.97256C0.650391 3.91327 3.9411 0.622559 8.00039 0.622559C12.0597 0.622559 15.3504 3.91327 15.3504 7.97256C15.3504 12.0319 12.0597 15.3226 8.00039 15.3226ZM2.35039 7.97256C2.35039 11.093 4.87998 13.6226 8.00039 13.6226C11.1208 13.6226 13.6504 11.093 13.6504 7.97256C13.6504 4.85215 11.1208 2.32256 8.00039 2.32256C4.87998 2.32256 2.35039 4.85215 2.35039 7.97256Z"></path></svg>
                                    <p className='font-sm'><span className='font-bold'>Tip:</span> Snippets are exclusive to Tempo and not publicly available to your customers. <a href=''>Learn more.</a></p>
                                </div>
                                <div className="cursor-pointer banner__hide-link">
                                    <a data-test-banner-hide-link="" data-ember-action="" data-ember-action-2188="2188"><svg className="interface-icon o__standard o__standard__close" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5097 3.5097C3.84165 3.17776 4.37984 3.17776 4.71178 3.5097L7.99983 6.79775L11.2879 3.5097C11.6198 3.17776 12.158 3.17776 12.49 3.5097C12.8219 3.84165 12.8219 4.37984 12.49 4.71178L9.20191 7.99983L12.49 11.2879C12.8219 11.6198 12.8219 12.158 12.49 12.49C12.158 12.8219 11.6198 12.8219 11.2879 12.49L7.99983 9.20191L4.71178 12.49C4.37984 12.8219 3.84165 12.8219 3.5097 12.49C3.17776 12.158 3.17776 11.6198 3.5097 11.2879L6.79775 7.99983L3.5097 4.71178C3.17776 4.37984 3.17776 3.84165 3.5097 3.5097Z"></path></svg></a>
                                </div>
                            </div>



                        </div>
                    </div>
                </div >
            )}
            {createOptions === 'url' && (
                <div className='rightSlideAnimations bg-[#222023A6] fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50'>
                    <div className='w-full sm:w-auto fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white'>
                        <div className='shadow-lg w-full sm:w-[700px] h-[100%] relative flex flex-col pl-8 pr-8'>
                            <div className='flex flex-row gap-2 items-center py-4 border-b border-border dark:bg-gray-800'>
                                <div className='flex flex-row flex-1'>
                                    <h2 className='font-bold text-lg'>Manage sources</h2>
                                </div>
                                <div className='flex flex-row justify-end gap-2'>
                                    <div className='cursor-pointer' onClick={(e) => setCreateOptions(null)}>
                                        <XMarkIcon className='h-8 w-8 rounded-lg text-black bg-[#f1f1f1] p-2' />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col flex-1 p-0'>
                                <div className='flex flex-col gap-16 border-gray-lightest p-8 -mx-8'>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='font-bold text-black'>Enter the URL of your external support content</h3>
                                        <p class="text font-normal text-xs">
                                            We will fetch all of the pages from the website URL you provide. Please provide a <strong>top-level domain</strong>. We will read from all the sub domain pages.
                                        </p>
                                        <input type='text' name='' placeholder='https://support.mywebsite.com/' className='new_input block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2 placeholder:text-[12px] text-[12px] disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full focus:bg-white focus:text-[12px]' />
                                        <div className='flex flex-col gap-2 pt-2'>
                                            <ul class="text mt-0 px-6 list-disc text-sm">
                                                <li class="mb-2">
                                                    Provide your <strong>external help center homepage link</strong> for best results
                                                </li>
                                                <li class="mb-2">
                                                    <strong>Top-level domains will give the best results</strong> (e.g. https://myhelpcenter.com rather than https://myhelpcenter.com/home)
                                                </li>
                                            </ul>
                                            <div class="flex flex-row">
                                                <button type="button" className="flex items-center justify-center gap-2 focus:ring-4 focus:outline-none font-bold bg-primary rounded-md text-sm py-2.5 px-4 w-auto focus:ring-yellow-300 text-white hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] disabled:bg-input_color disabled:text-white">
                                                    Sync external support content
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='font-bold text-black'>Synced external sources</h3>
                                        <p class="text font-normal text-xs">
                                            Tempo will automatically generate responses using the following external sources:
                                        </p>
                                        <div class="flex flex-col gap-4 mt-4">
                                            <div className='border-gray-300 cursor-pointer	 shadow-[0_0_10px_0px_#00000014] hover:shadow-[0_0_10px_0px_#00000054] rounded-lg'>
                                                <div class="flex flex-wrap sm:flex-auto justify-between rounded bg-white p-4">
                                                    <div className='flex items-center justify-center'>
                                                        <div>
                                                            <label className="switch" style={{ height: "unset" }}>
                                                                <input type="checkbox" checked name="billingEnabled" />
                                                                <span className="slider round h-[27px] w-[55px]"></span>
                                                            </label>
                                                        </div>
                                                        <h3 className='font-semibold'>https://support.gmail.com</h3>
                                                    </div>
                                                    <div className='pt-4 sm:pt-0 flex justify-center gap-1 items-center'>
                                                        <p className="inline-block whitespace-nowrap rounded bg-[#d8efdc] text-[#107235] px-4 py-2 align-baseline text-xs font-bold leading-none">
                                                            {`Active`}
                                                        </p>
                                                        <EllipsisHorizontalIcon className="h-6 w-6 font-bold text-heading cursor-pointer" />
                                                    </div>
                                                </div>
                                                <div class="flex flex-col justify-between rounded bg-white p-4">
                                                    <p className='text-xs pb-4'>We are indexing your website and collecting your support content</p>
                                                    <div class="grid grid-rows-`4` grid-flow-col gap-1 h-[5px]">
                                                        {currentStatusSteps.map((item, index) => (
                                                            <div key={index} className={`rounded-[10px] ${index === currentIndex ? 'blink-in-progress-animation' : ''} ${index < currentIndex ? 'flex-none bg-[#222]' : ''} ${index > currentIndex ? 'flex-auto bg-[#e8e8e8]' : ''} `}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )}
            {createPdfModal === true && (
                <Modal
                    title={<span className='flex items-center justify-center gap-1'><ArrowLeftIcon onClick={(e) => { setCreatePdfModal(false); setCreateModal(true); }} className='w-6 h-6 pr-2 hover:text-primary cursor-pointer' />Add new Support Content</span>}
                    show={createPdfModal}
                    setShow={setCreatePdfModal}
                    showCancel={true}
                    className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"}
                >
                    <div className=''>
                        <div className='border-b border-gray pb-5'>
                            <h3 className='font-bold my-2'>File Upload</h3>
                            <div className='block sm:flex items-center justify-between gap-8'>
                                <div>
                                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                                </div>
                                <div className='pt-4 sm:pt-0'>
                                    <ul className='list-disc text-sm'>
                                        <li>Support format is text PDF or txt in English. Images won't be scraped.</li>
                                        <li>Files with multiple text columns, encrypted or password protected are not supported.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default ManageKnowledgeBase