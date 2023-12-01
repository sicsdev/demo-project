import React, { useEffect, useRef, useState } from 'react'
import SideModal from '../SideModal/SideModal'
import { DocumentTextIcon, LinkIcon, PaperClipIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import SnippetManagement from './SnippetManagement'
import UrlManagement from './UrlManagement'
import FileManagement from './FileManagement'
import { createNewKnowledge, getFaqQuestions } from '@/app/API/pages/Knowledge'
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { fetchBot } from '../store/slices/botIdSlice'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

const UpperBasicKnowledge = ({ filters, setFilters, questions, setCheck, basicFormData, search, handleChange, setBasicFormData, getDataWithFilters, getQuestionsData, setCurrentTab }) => {

    const [showSourceFilter, setShowSourceFilter] = useState(false)
    const [createMode, setCreateMode] = useState('snippet')
    const [createModal, setCreateModal] = useState(false)
    const [formData, setFormData] = useState({})
    const [createPdfModal, setCreatePdfModal] = useState(false);
    const [createOptions, setCreateOptions] = useState(null)
    const [loading, setLoading] = useState(false)
    const [filterhead, setFilterhead] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [externalTitleForSnippet, setExternalTitleForSnippet] = useState('')
    const [skeletonloading, setSkeletonLoading] = useState(true)
    const [botValue, setBotValue] = useState([]);


    // Helpers
    const state = useSelector((state) => state.botId);
    const dropdown = useRef(null);
    const params = useSearchParams()
    const fileTypes = ["JPG", "PNG", "GIF"];
    const currentStatusSteps = ['first', 'second', 'third', 'fourth'];

    useEffect(() => {
        getAllBots()
        setTimeout(() => {
            setSkeletonLoading(false);
        }, 300);
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
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
            case "PRODUCT":
                payload = {
                    description: formData?.content,
                    source: "product",
                    active: formData?.snippet_active === true ? true : false,
                    title: formData?.title
                }

                if (formData?.product_price) {
                    payload['price'] = formData.product_price
                }
                if (formData?.product_url) {
                    payload['url'] = formData.product_url
                }
                if (formData?.product_file) {
                    payload['image'] = formData.product_file
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

            } else if (value.type === 'PRODUCT') {
                const updatedFormData = { ...questions };
                updatedFormData.data.total.produc = basicFormData.product + 1;
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



    const getAllBots = async () => {
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

        mergedArray.sort((a, b) => a.name.localeCompare(b.name))
        setBotValue(mergedArray);

    }

    const handleFilters = (e) => {
        setFilters({
            ...filters,
            currentBot: e.target.value
        })
    }


    return (
        <>

            <div className={skeletonloading ? " my-2        " : "border-b-2 border-border dark:border-gray-700 flex items-center justify-between my-2"}>
                <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

                    <li className={` ${skeletonloading ? "" : filterhead === "all" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        getDataWithFilters('ALL')
                        setFilterhead("all")
                        setShowSourceFilter(false)
                        setCurrentTab('')
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


                    {/* EXTERNAL TAB DEPRECATED 14/11/23 */}
                    {/* <li className={`  ${filterhead === "External" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        getDataWithFilters('EXTERNAL')
                        setFilterhead("External")
                        setShowSourceFilter(false)
                        setCurrentTab('external')
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
                    </li> */}


                    <li className={`  ${filterhead === "File" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        // getDataWithFilters('FILE')
                        setFilterhead("File")
                        setShowSourceFilter(false)
                        setCurrentTab('file')
                    }}>
                        {skeletonloading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                aria-current="page"
                            >
                                Files
                            </span>
                        }
                    </li>
                    <li className={`  ${filterhead === "Snippet" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        // getDataWithFilters('SNIPPET')
                        setFilterhead("Snippet")
                        setShowSourceFilter(false)
                        setCurrentTab('snippet')
                    }}>
                        {skeletonloading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                                aria-current="page"
                            >
                                Snippets
                            </span>
                        }
                    </li>
                    <li className={`  ${filterhead === "Products" ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => {
                        // getDataWithFilters('PRODUCT')
                        setFilterhead("Products")
                        setShowSourceFilter(false)
                        setCurrentTab('product')
                    }}>
                        {skeletonloading ?
                            <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                            :
                            <span
                                className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2 rounded-lg active  group`}
                                aria-current="page"
                            >
                                Products
                            </span>
                        }
                    </li>
                </ul>
            </div>
            <div className='flex items-center justify-between'>

                <div className='flex items-center gap-2'>
                    <div className="w-full flex items-center sm:mt-0 justify-between sm:justify-end gap-4">
                        <div
                            className="w-full sm:w-auto flex items-center justify-between sm:justify-start flex-wrap"
                            style={{ rowGap: "4px" }}
                        >
                            {/* <button
                                onClick={(e) => handleFilters({ target: { value: '', name: '' } })}
                                key={'allbotsfilter'}
                                className={`${!filters.currentBot ? "text-white bg-primary" : "bg-white text-[#151D23]"} flex items-center gap-2 justify-center font-semibold text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
                            >
                                {" "}
                                All
                            </button> */}

                            {botValue?.length > 1 &&
                                botValue?.map((element, key) => (
                                    <button
                                        onClick={(e) => handleFilters({ target: { value: element.value, name: element.name } })}
                                        key={key}
                                        className={`${filters.currentBot == element.value ? "text-white bg-primary" : "bg-white text-[#151D23]"} flex items-center gap-2 justify-center font-semibold text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
                                    >
                                        {" "}
                                        {element?.name}
                                    </button>
                                ))}


                        </div>
                    </div>
                </div>

                <div className='flex justify-end sm:justify-end md:justify-end lg:justify-end  gap-4 items-center  bg-white lg:mx-2 my-4'>
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

            </div>

            {/* <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">

                        <div className="bg-[#f1f1f1] p-6 rounded-md mb-6">
                            <p className="text-xs mb-5 font-semibold">
                                {skeletonloading ?
                                    <SkeletonLoader count={1} height={20} width={150} />
                                    :
                                    "To answer customer questions, Deflection AI is using:"
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
                <SideModal heading={'Add new content'} setShow={setCreateModal} width={'sm:w-[500px]'} titleStyles={'text-primary'}>

                    <div className='block items-center my-3'>
                        <ul className="list-none p-0 m-0 w-100">
                            <li className="w-100 p-2 rounded-md mb-4 cursor-pointer hover:text-primary hover:bg-lowgray">
                                <div
                                    onClick={() => {
                                        handleCreateOptions('snippet');
                                        setCreateMode('snippet');
                                    }}
                                    className="flex items-center"
                                >
                                    <div className="flex-shrink-0 h-10 w-10 bg-red rounded-lg p-2">
                                        <DocumentTextIcon className="h-full w-full text-white" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-bold">
                                            <b>Snippet</b>
                                        </h3>
                                        <p className="text-xs font-normal">Plain text content specific for Deflection AI.</p>
                                    </div>
                                </div>
                            </li>
                            <li className="w-100 p-2 rounded-md mb-4 cursor-pointer hover:text-primary hover:bg-lowgray">
                                <div onClick={() => handleCreateOptions('pdf')} className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-lg p-2">
                                        <PaperClipIcon className="h-full w-full text-white" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-bold">
                                            <b>File Upload</b>
                                        </h3>
                                        <p className="text-xs font-normal">Txt or PDF FAQ or support file.</p>
                                    </div>
                                </div>
                            </li>

                            <li className="w-100 p-2 rounded-md mb-4 cursor-pointer hover:text-primary hover:bg-lowgray">
                                <div
                                    onClick={() => {
                                        handleCreateOptions('snippet');
                                        setCreateMode('product');
                                    }}
                                    className="flex items-center"
                                >
                                    <div className="flex-shrink-0 h-10 w-10 bg-[#C01A59] rounded-lg p-2">
                                        <PuzzlePieceIcon className="h-full w-full text-white" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-bold">
                                            <b>Product</b>
                                        </h3>
                                        <p className="text-xs font-normal">
                                            A product or service that users can purchase directly from Deflection AI.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </SideModal >
            )}

            {
                createOptions === 'snippet' && (
                    <SnippetManagement externalTitle={externalTitleForSnippet} hideComponent={hideComponent} setCreateOptions={setCreateOptions} basicFormData={formData} setBasicFormData={setFormData} handleSubmit={handleSubmit} loading={loading} getQuestionsData={getQuestionsData}
                        setCreateModal={setCreateModal}
                        setLoading={setLoading}
                        setCreatePdfModal={setCreatePdfModal} creationMode={createMode} />
                )
            }
            {
                createOptions === 'url' && (
                    <UrlManagement
                        hideComponent={hideComponent} currentStatusSteps={currentStatusSteps} currentIndex={currentIndex} setCreateOptions={setCreateOptions} basicFormData={formData} setBasicFormData={setFormData} handleSubmit={handleSubmit} loading={loading} getCount={getCount} deleteRecord={deleteKnowledgeCenterHandler} />
                )
            }
            {
                createPdfModal === true && (
                    <SideModal heading={'File Upload'} setShow={setCreatePdfModal}>
                        <FileManagement hideComponent={hideComponent} createPdfModal={createPdfModal} setCreatePdfModal={setCreatePdfModal} handleChange={handleChangeFile} fileTypes={fileTypes} setCreateModal={setCreateModal} basicFormData={formData} setBasicFormData={setFormData} handleSubmit={handleSubmit} loading={loading} />
                    </SideModal>
                )
            }
        </>
    )
}

export default UpperBasicKnowledge