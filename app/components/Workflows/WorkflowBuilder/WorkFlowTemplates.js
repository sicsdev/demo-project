import React, { useEffect, useState, useRef } from 'react'
import DataTable from "react-data-table-component";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon, CheckBadgeIcon, CheckIcon, ClipboardDocumentListIcon, ClipboardIcon, EllipsisHorizontalIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { getWorkflowByStatus, getWorkflowEmbed, removeWorkFlow, updateWorkFlowStatus } from '@/app/API/pages/Workflow';
import { successMessage } from '../../Messages/Messages';
import copy from 'copy-to-clipboard';
import { makeCapital } from '../../helper/capitalName';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import DeleteWorkflow from './DeleteWorkflow';
import Button from '../../Common/Button/Button';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import Modal from '../../Common/Modal/Modal';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { capitalizeFirstLetter } from '../../helper/firstLetterCapital';
import WorkflowCard from './WorkflowCard';
import { useSelector } from 'react-redux';


const WorkFlowTemplates = ({ setTab, workflowData, fetchData, status, setShowTestBot, setWorkflowToTest, state, workflowLoading, createNewWorkFlow, source, setShowActive }) => {
    const [data, setData] = useState([]);
    const [suggestModal, setSuggestModal] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [search, setSearch] = useState("")
    const router = useRouter();
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(true);

    const [isAuthorizedUser, setIsAuthorizedUser] = useState(false)
    const [botValue, setBotValue] = useState([]);

    // Filters
    const [filters, setFilters] = useState({
        currentBot: ''
    })

    // Helpers redux
    const botsState = useSelector((state) => state.botId);
    const userData = useSelector((state) => state?.user?.data)


    useEffect(() => {
        manageData()
        setIsAuthorizedUser((userData?.email?.endsWith('@deflection.ai') || userData?.email?.endsWith('@joinnextmed.com') || userData?.email?.endsWith('@usetempo.ai')))
    }, [workflowData, filters])

    useEffect(() => {
        if (botsState && botsState.botData && botsState.botData.data) {
            getAllBots()
        }

    }, [botsState])


    const [isCopied, setIsCopied] = useState({
        id: null,
        copied: false,
        loading: false
    })
    const [emojiData, setEmojiData] = useState({
        id: null,
        emoji: null,
        unified: null
    })

    const updateEmoji = async (id, emoji) => {
        const update = await updateWorkFlowStatus({ icon: emoji }, id)
        setEmojiData({
            id: null,
            emoji: null,
            unified: null
        })
        setSuggestModal(false)
        updateDataById(id, emoji)
    }
    const updateDataById = (id, newData) => {
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return;
        const updatedData = [...data];
        updatedData[index].icon = newData
        setData(updatedData);
    };
    const getUrl = async (id) => {
        setIsCopied(prev => {
            return {
                ...prev,
                id: id,
                loading: true
            }
        });

        let urlFinder = urls.find(e => e.id == id)

        try {
            // const response = await getWorkflowEmbed(id);
            // if (response && response.url) {
            // copy(response.url);

            if (urlFinder?.url) {
                copy(urlFinder.url)
                setIsCopied({
                    id: id,
                    copied: true,
                    loading: false
                });
                setTimeout(() => setIsCopied({
                    id: null,
                    copied: false,
                    loading: false
                }), 2000); // Reset copied state after 2 seconds
            } else {
                setIsCopied({
                    id: null,
                    copied: false,
                    loading: false
                });
            }

        } catch (err) {
            console.error('Failed to copy: ', err);
            setIsCopied({
                id: null,
                copied: false,
                loading: false
            });
        }
    }


    const editWorkFlowHandler = (ele) => {
        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${ele?.id}`);
    };

    const manageData = async () => {
        // setLoading(true)
        let botFilter = filters.currentBot
        let workflows = await getWorkflowByStatus(status, source, botFilter)
        let result = workflows.results
        let array_of_urls = []

        result?.forEach(async (el) => {
            result = await getWorkflowEmbed(el.id).then(url => {
                array_of_urls.push({ id: el.id, url: url.url })
            })
        })
        setUrls(array_of_urls)
        setData(result);
        setOriginalData(result)
        setLoading(false)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
        const workflowOptionsfilter = originalData?.filter(
            (item) =>
                item?.name?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setData(workflowOptionsfilter)
    }

    const deleteWorkflowHandler = async (event, item) => {
        event.stopPropagation();
        const filterData = data.filter((x) => x.id !== item.id)
        const deleteWorkFlow = await removeWorkFlow(item.id)
        if (deleteWorkFlow.status === 204) {
            fetchData();
            setData(filterData)
            // successMessage("Workflow deleted successfully")
        }
    }

    const getAllBots = async () => {
        const getTitle = botsState.botData.data.bots.map(
            (element) => element.chat_title
        );
        const widgetCode = botsState.botData.data.widgets;
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
        setLoading(true)
        setFilters({
            ...filters,
            currentBot: e.target.value
        })
    }



    return (
        <div>
            <div className='mt-4'>

                <div className='flex w-full justify-start items-center gap-1 my-2 w-full'>
                    <div className="w-full flex items-center sm:mt-0 justify-start">
                        {loading ?
                            <SkeletonLoader count={1} height={35} width={200} />
                            :
                            <div
                                className="w-full sm:w-auto sm:flex !contents items-center justify-between sm:justify-start flex-wrap"
                                style={{ rowGap: "0px" }}>
                                {/* {botValue.length > 1 && (
                                    <button
                                        onClick={(e) => handleFilters({ target: { value: '', name: '' } })}
                                        key={'allbotsfilter'}
                                        className={`${!filters.currentBot ? "text-white bg-primary" : "bg-white text-[#151D23]"} my-1 flex items-center gap-2 justify-center font-semibold text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
                                    >
                                        {" "}
                                        All
                                    </button>
                                )} */}

                                {botValue?.length > 1 &&
                                    botValue?.map((element, key) => (
                                        <button
                                            onClick={(e) => handleFilters({ target: { value: element.value, name: element.name } })}
                                            key={key}
                                            className={`${filters.currentBot == element.value ? "text-white bg-primary" : "bg-white text-[#151D23]"} my-1 flex items-center gap-2 justify-center font-semibold text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
                                        >
                                            {" "}
                                            {element?.name}
                                        </button>
                                    ))}


                            </div>
                        }
                    </div>
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
                                <input type="search" id="search" className="border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px] pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                            </div>
                        }
                    </div>
                    <div>

                        {loading ?
                            <SkeletonLoader count={1} height={30} width={80} />
                            :
                            (isAuthorizedUser &&
                                <>
                                    <Button
                                        type={"button"}
                                        className="inline-block rounded border border-primary bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                        disabled={workflowLoading === true}
                                        onClick={(e) => createNewWorkFlow()}
                                    >
                                        {workflowLoading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                            <span>Loading...</span> </> : 'Create'}
                                    </Button>
                                </>
                            )
                        }


                    </div>

                </div>
            </div>

            <div className='w-full'>


                {
                    !loading ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-auto items-center my-2' >
                            {data?.map((item, key) =>

                                <>
                                    <WorkflowCard data={data} loading={loading} item={item} key={key} manageData={manageData} isAuthorizedUser={isAuthorizedUser} setShowActive={setShowActive} setTab={setTab}></WorkflowCard>
                                </>
                            )}
                        </div>
                    )
                        :
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-4 mx-auto items-center my-2' >
                            <div className='flex w-full m-auto'><SkeletonLoader count={1} height={150} width={280} /></div>
                            <div className='flex w-full m-auto'><SkeletonLoader count={1} height={150} width={280} /></div>
                            <div className='flex w-full m-auto'><SkeletonLoader count={1} height={150} width={280} /></div>
                            <div className='flex w-full m-auto'><SkeletonLoader count={1} height={150} width={280} /></div>
                        </div>
                }

                {data?.length == 0 && !loading &&
                    <div className='flex  text-sm justify-center'>
                        No templates available.
                    </div>
                }

            </div>

            {
                suggestModal && (
                    <Modal
                        title={
                            <h3 className="text-base !font-bold">Select Emoji</h3>
                        }
                        className={"sm:w-[30%] w-[100%]"}
                        show={suggestModal}
                        setShow={setSuggestModal}
                        showCancel={true}
                        customHideButton={false}
                        showTopCancleButton={false}
                        hr={false}
                    >{emojiData.unified ?
                        <div className="show-emoji text-center my-2">
                            <h3 className='text-sm'>Your selected Emoji is:</h3>
                            <div className='flex justify-center'>
                                <Emoji unified={emojiData.unified} size={40} />
                            </div>
                        </div> : null}
                        <EmojiPicker width={'100%'} onEmojiClick={(e) => {
                            setEmojiData((prev) => {
                                return {
                                    ...prev,
                                    emoji: e.emoji,
                                    unified: e.unified
                                }
                            })
                        }} previewConfig={{
                            showPreview: true
                        }} />
                        <div className={`flex  py-2 rounded-b mt-5 justify-between gap-4`}>
                            {" "}
                            <Button
                                className="inline-block float-left rounded bg-white px-6 pb-2 pt-2 text-xs font-medium leading-normal text-heading border border-border "
                                onClick={() => {
                                    setSuggestModal((prev) => !prev);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="inline-block rounded border border-primary bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                disabled={emojiData.emoji === null}
                                onClick={() => {
                                    updateEmoji(emojiData.id, emojiData.emoji)
                                }}
                            >
                                Ok
                            </Button>
                        </div>
                    </Modal>
                )
            }
        </div >
    )
}

export default WorkFlowTemplates








// **************** BUTTON COMPONENT *******************


export const ButtonComponent = ({ data, alldata, setData, fetchData, index, setShowTestBot, setWorkflowToTest }) => {
    const [showHelp, setShowHelp] = useState(null)
    const router = useRouter()
    const editWorkFlowHandler = (ele) => {
        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${ele?.id}`);
    };
    const deleteWorkFlow = async (element) => {
        const filterData = alldata.filter((x) => x.id !== element.id)
        const deleteWorkFlow = await removeWorkFlow(element.id)
        if (deleteWorkFlow.status === 204) {
            fetchData();
            setData(filterData)
            // successMessage("Workflow deleted successfully")
        }
    }

    const divRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setShowHelp(null);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const saveWorkFlowHandler = async (element) => {
        try {
            let payload = { active: false }
            !payload.logo && delete payload.logo;
            const updateWorkflow = await updateWorkFlowStatus(payload, element?.id);
            if (updateWorkflow?.status === 201 || updateWorkflow?.status === 200) {
                // successMessage("Workflow Disabled Successfully!");
                fetchData();
            } else {
                errorMessage("Unable to Proceed!");
            }
        } catch (error) {
            setPublishLoader(false);
            errorMessage("Unable to Proceed!");
        }
    };


    return (
        <>
            <div className='cursor-pointer relative' ref={divRef} onClick={(e) => {
                setShowHelp(prev => { if (prev === data?.id) { return null } else { return data?.id } })
            }}>
                <EllipsisHorizontalIcon className="h-6 w-6 font-bold text-heading cursor-pointer" />
                {showHelp === data?.id && (
                    <div className={`absolute left-[-280px] ${index === alldata.length - 1 || index === alldata.length - 2 ? "top-[40px]" : "top-[40px]"}  z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44`}>
                        <ul className="py-2 text-sm text-gray-700 ">
                            <li className='hover:bg-primary hover:text-white text-heading my-2' onClick={(e) => editWorkFlowHandler(data)}>
                                <button type='button' className="block px-4 py-2 ">Edit</button>
                            </li>
                            {data?.active && (
                                <li className='hover:bg-primary hover:text-white text-heading my-2' onClick={(e) => saveWorkFlowHandler(data)}>
                                    <button type='button' className="block px-4 py-2 ">Disable</button>
                                </li>
                            )}

                            <li className='hover:bg-danger hover:text-white text-danger my-2 cursor-pointer' onClick={(e) => { deleteWorkFlow(data) }}>
                                <button type='button' className="block px-4 py-2 ">Delete</button>
                            </li>


                        </ul>
                    </div>
                )}
            </div>

        </>
    )

}