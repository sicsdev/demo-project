import React, { useEffect, useRef, useState } from 'react'
import SideModal from '../SideModal/SideModal'
import { DocumentTextIcon, LinkIcon, PaperClipIcon } from '@heroicons/react/24/outline'
import SnippetManagement from './SnippetManagement'
import UrlManagement from './UrlManagement'
import FileManagement from './FileManagement'
import { createNewKnowledge, getFaqQuestions } from '@/app/API/pages/Knowledge'
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { fetchBot } from '../store/slices/botIdSlice'

const UpperBasicKnowledge = ({ questions,setCheck, basicFormData, search, handleChange, setBasicFormData,getDataWithFilters ,getQuestionsData}) => {
    const [showSourceFilter, setShowSourceFilter] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [formData, setFormData] = useState({})
    const [createPdfModal, setCreatePdfModal] = useState(false);
    const [createOptions, setCreateOptions] = useState(null)
    const fileTypes = ["JPG", "PNG", "GIF"];
    const currentStatusSteps = ['first', 'second', 'third', 'fourth'];
    const [loading, setLoading] = useState(false)
    const [filterhead, setFilterhead] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);
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
        }, 1200);
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
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <>  <div className='flex justify-end items-center gap-2 w-full mt-2'>
            <div className='mr-[18px]'>
                <button onClick={(e) => setCreateModal(true)} type="button" className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                    Create
                </button>
            </div>
        </div>
            <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">

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

                <div className="block sm:flex gap-10 justify-between items-center">
                    {skeletonloading ?
                        <SkeletonLoader count={1} height={35} width={200} />
                        :
                        <>
                            <div className='mt-0 sm:mt-0 relative' ref={dropdown}>
                                <div className="text-sm bg-[#FFF] rounded-md inline-block"
                                    style={{ border: "1px solid #C7C6C7" }}>
                                    <button
                                        type="button"
                                        className="border-none m-0 p-1 px-[0px] flex gap-1 items-center text-lg font-semibold w-full"
                                        onClick={() => { setShowSourceFilter(prev => !prev) }}
                                    >
                                        <small className="flex gap-2 justify-between w-full font-normal items-center text-xs p-2">{filterhead}
                                            <i style={{ fontSize: "15px" }} className="fa">&#xf0d7;</i>
                                        </small>
                                    </button>
                                </div>
                                {showSourceFilter && (
                                    <div id="dropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700"
                                        style={{ border: "1px solid #C7C6C7" }}>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li className='hover:bg-gray cursor-pointer' onClick={(e)=>{
                                                getDataWithFilters('ALL')
                                                setFilterhead("all")
                                                setShowSourceFilter(false)
                                            }}>
                                                <p className="block px-2 text-xs py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >All</p>
                                            </li>
                                            <li className='hover:bg-gray cursor-pointer ' onClick={(e)=>{
                                                getDataWithFilters('EXTERNAL')
                                                setFilterhead("External")
                                                setShowSourceFilter(false)
                                            }}>
                                                <p className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >External</p>
                                            </li>
                                            <li className='hover:bg-gray cursor-pointer ' onClick={(e)=>{
                                                getDataWithFilters('SNIPPET')
                                                setFilterhead("Snippet")
                                                setShowSourceFilter(false)
                                            }}>
                                                <p href="#" className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Snippet</p>
                                            </li>
                                            <li className='hover:bg-gray cursor-pointer ' onClick={(e)=>{
                                                getDataWithFilters('FILE')
                                                setFilterhead("File")
                                                setShowSourceFilter(false)
                                            }}>
                                                <p href="#" className="block text-xs px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">File</p>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative mt-2 sm:mt-0">
                                <input
                                    placeholder="Search"
                                    className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white focus:text-sm rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
                                    type="text"
                                    value={search}
                                    onChange={handleChange}
                                />
                                <img className="w-5 top-[10px] left-[14px] absolute" src="/search.png" />
                            </div>
                        </>
                    }
                </div>
            </div>

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
                <SnippetManagement hideComponent={hideComponent} setCreateOptions={setCreateOptions} basicFormData={formData} setBasicFormData={setFormData} handleSubmit={handleSubmit} loading={loading} />
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