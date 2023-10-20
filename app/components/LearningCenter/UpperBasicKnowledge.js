import React, { useEffect, useRef, useState } from 'react'
import SideModal from '../SideModal/SideModal'
import { DocumentTextIcon, LinkIcon, PaperClipIcon } from '@heroicons/react/24/outline'
import SnippetManagement from './SnippetManagement'
import UrlManagement from './UrlManagement'
import FileManagement from './FileManagement'
import { createNewKnowledge, getFaqQuestions } from '@/app/API/pages/Knowledge'
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { fetchBot } from '../store/slices/botIdSlice'
import { useSearchParams } from 'next/navigation'

const UpperBasicKnowledge = ({ questions, setCheck, basicFormData, search, handleChange, setBasicFormData, getDataWithFilters, getQuestionsData }) => {
    const params = useSearchParams()
    const [showSourceFilter, setShowSourceFilter] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [formData, setFormData] = useState({})
    const [createPdfModal, setCreatePdfModal] = useState(false);
    const [createOptions, setCreateOptions] = useState(null)
    const fileTypes = ["JPG", "PNG", "GIF"];
    const currentStatusSteps = ['first', 'second', 'third', 'fourth'];
    const [loading, setLoading] = useState(false)
    const [filterhead, setFilterhead] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [externalTitleForSnippet, setExternalTitleForSnippet] = useState('')

    const handleCreateOptions = (option) => {
        if (option === 'pdf') {
            setCreatePdfModal(true);
        } else {
            setCreateOptions(option)
        }
        setCurrentIndex(0)
        setCreateModal(false)
    }
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



    const handleSubmit = async (value) => {
        setLoading(true)
        let payload = {}
        switch (value.type) {
            case "SNIPPET":
                payload = {
                    content: formData?.content,
                    source: "snippet",
                    active: formData?.snippet_active === true ? true : false,
                    title: formData?.title
                }
                break;
            case "FILE":
                payload = {
                    file: formData?.file,
                    source: "file",
                    active: true,
                    title: formData?.title
                }
                break;
            case "URL":
                payload = {
                    url: formData?.url,
                    source: "external",
                    active: true,
                    title: formData?.url
                }
                break;
            default:
                break;
        }

        const response = await createNewKnowledge(payload)
        if (response.status === 201) {
            if (value.type === "SNIPPET") {
                const updatedFormData = { ...questions };
                updatedFormData.data.total.snippet = basicFormData.snippet + 1;
                setBasicFormData(updatedFormData);
            } else if (value.type === "FILE") {
                const updatedFormData = { ...questions };
                updatedFormData.data.total.file = basicFormData.file + 1;
                setBasicFormData(updatedFormData);
            } else if (value.type === 'URL') {
                const updatedFormData = { ...questions };
                updatedFormData.data.total.external = basicFormData.external + 1;
                setBasicFormData(updatedFormData);
            }
            getQuestionsData()
            setCreateModal(false)
            setLoading(false)
            setCreateOptions(null)
            setCreatePdfModal(false)

        }
    }


    const deleteKnowledgeCenterHandler = async (id) => {
        // setKnowledgeRecordID(id)
    };

    const hideComponent = () => {
        setCreateOptions(null)
        setCreatePdfModal(false)
    }
    const handleChangeFile = (file) => {
        setFile(file);
    };

    const [skeletonloading, setSkeletonLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setSkeletonLoading(false);
        }, 500);
    }, [])
    const dropdown = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                console.log("Asdsd")
                setShowSourceFilter(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);


        const externalSnippet = params.get('createExternalSnippet')
        const externalContent = params.get('externalContent')
        if (externalSnippet && externalContent) { handleCreateOptions('snippet'); setExternalTitleForSnippet(externalContent) }


        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <>

            <div className={skeletonloading ? " my-2        " : "border-b-2 border-border dark:border-gray-700 flex items-center justify-between my-2"}>
                <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                    <li className={` ${skeletonloading ? "" : filterhead === "all" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        getDataWithFilters('ALL')
                        setFilterhead("all")
                        setShowSourceFilter(false)
                    }}>
                        {skeletonloading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`} z
                                aria-current="page"
                            >
                                All
                            </span>
                        }
                    </li>
                    <li className={`  ${filterhead === "External" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        getDataWithFilters('EXTERNAL')
                        setFilterhead("External")
                        setShowSourceFilter(false)
                    }}>
                        {skeletonloading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                aria-current="page"
                            >
                                External
                            </span>
                        }
                    </li>

                    <li className={`  ${filterhead === "File" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        getDataWithFilters('FILE')
                        setFilterhead("File")
                        setShowSourceFilter(false)
                    }}>
                        {skeletonloading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                aria-current="page"
                            >
                                File
                            </span>
                        }
                    </li>
                    <li className={`  ${filterhead === "Snippet" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        getDataWithFilters('SNIPPET')
                        setFilterhead("Snippet")
                        setShowSourceFilter(false)
                    }}>
                        {skeletonloading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                aria-current="page"
                            >
                                Snippet
                            </span>
                        }
                    </li>


                </ul>
            </div>
            <div className='flex justify-center sm:justify-end md:justify-end lg:justify-end  gap-4 items-center  bg-white'>
                <div className='flex justify-center sm:justify-end md:justify-end lg:justify-end gap-4 items-center bg-white'>
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    {loading ?
                        <SkeletonLoader count={1} height={35} width={200} />
                        :
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="search" className="border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px] pl-10" placeholder="Search"
                                value={search}
                                onChange={handleChange} />
                        </div>
                    }
                </div>
                <div>
                    {loading ?
                        <SkeletonLoader count={1} height={30} width={80} />
                        :
                        <button onClick={(e) => setCreateModal(true)} type="button" className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2 px-4 w-auto focus:ring-yellow-300 border border-primary bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                            Create
                        </button>
                    }
                </div>

            </div>

            {/* <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">

                        <div className="bg-[#f1f1f1] p-6 rounded-md mb-6">
                            <p className="text-xs mb-5 font-semibold">
                                {skeletonloading ?
                                    <SkeletonLoader count={1} height={20} width={150} />
                                    :
                                    "To answer customer questions, Tempo is using:"
                                }
                            </p>
                            <div className="flex gap-4 sm:gap-10 justify-start align-top">
                                <div className='w-[25%]'>
                                    <h2 className="text-sm font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={30} />
                                            :
                                            <>
                                                {basicFormData?.external}
                                            </>
                                        }
                                    </h2>
                                    <p className="text-xs font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={140} />
                                            :
                                            <>
                                                {basicFormData?.external === 1 ? "External page" : "External pages"}
                                            </>
                                        }
                                    </p>
                                    <p className="text-xs text-[#9CA3AF] font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={100} />
                                            :
                                            <>
                                                out of {basicFormData?.external}
                                            </>
                                        }
                                    </p>
                                </div>
                                <div className='w-[25%]'>
                                    <h2 className="text-sm font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={30} />
                                            :
                                            <>
                                                {basicFormData?.snippet}
                                            </>
                                        }
                                    </h2>
                                    <p className="text-xs font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={140} />
                                            :
                                            <>
                                                {basicFormData?.snippet === 1 ? 'Snippet' : "Snippets"}
                                            </>
                                        }
                                    </p>
                                    <p className="text-xs text-[#9CA3AF] font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={100} />
                                            :
                                            <>
                                                out of {basicFormData?.snippet}
                                            </>
                                        }</p>
                                </div>
                                <div className='w-[25%]'>
                                    <h2 className="text-sm font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={30} />
                                            :
                                            <>
                                                {basicFormData?.file}
                                            </>
                                        }
                                    </h2>
                                    <p className="text-xs font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={140} />
                                            :
                                            <>
                                                {basicFormData?.file === 1 ? 'File' : "Files"}
                                            </>
                                        }</p>
                                    <p className="text-xs text-[#9CA3AF] font-semibold">
                                        {skeletonloading ?
                                            <SkeletonLoader count={1} height={20} width={100} />
                                            :
                                            <>
                                                out of {basicFormData?.file}
                                            </>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div> */}

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
                <SnippetManagement externalTitle={externalTitleForSnippet} hideComponent={hideComponent} setCreateOptions={setCreateOptions} basicFormData={formData} setBasicFormData={setFormData} handleSubmit={handleSubmit} loading={loading}  getQuestionsData={getQuestionsData}
                setCreateModal={setCreateModal}
                setLoading={setLoading}
                setCreatePdfModal={setCreatePdfModal} />
            )}
            {createOptions === 'url' && (
                <UrlManagement
                    hideComponent={hideComponent} currentStatusSteps={currentStatusSteps} currentIndex={currentIndex} setCreateOptions={setCreateOptions} basicFormData={formData} setBasicFormData={setFormData} handleSubmit={handleSubmit} loading={loading} getCount={getCount} deleteRecord={deleteKnowledgeCenterHandler} />
            )}
            {createPdfModal === true && (
                <SideModal heading={'File Upload'} setShow={setCreatePdfModal}>
                    <FileManagement hideComponent={hideComponent} createPdfModal={createPdfModal} setCreatePdfModal={setCreatePdfModal} handleChange={handleChangeFile} fileTypes={fileTypes} setCreateModal={setCreateModal} basicFormData={formData} setBasicFormData={setFormData} handleSubmit={handleSubmit} loading={loading} />
                </SideModal>
            )}
        </>
    )
}

export default UpperBasicKnowledge