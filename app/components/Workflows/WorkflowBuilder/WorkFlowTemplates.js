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


const WorkFlowTemplates = ({ setTab, workflowData, fetchData, status, setShowTestBot, setWorkflowToTest, state, workflowLoading, createNewWorkFlow, source }) => {
    const [data, setData] = useState([]);
    const [suggestModal, setSuggestModal] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [search, setSearch] = useState("")
    const router = useRouter();
    const [urls, setUrls] = useState([])

    const userData = useSelector((state) => state?.user?.data)

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

    const columns = [
        {
            name: "Name",
            selector: (row, index) => row.name,
            sortable: true,
            reorder: true,
            minWidth: '250px',
            cell: (row, index) => (
                <div className="flex gap-2 items-center cursor-pointer" onClick={(e) => editWorkFlowHandler(row)}>
                    <div className="relative inline-flex items-center justify-center mr-2 !whitespace-pre-wrap w-[20px] h-[40px] sm:h-10 overflow-hidden rounded-lg">
                        {row.icon ? <p className='text-[18px]'>{row.icon}</p> : <span className='text-[18px]'>😊</span>}

                        {/* <Image fill="true" className="bg-contain mx-auto w-full rounded-lg" alt="logo.png" src={row?.icon ?? '/workflow/reactive-subscription.png'} /> */}
                    </div>
                    <h3 className="text-heading font-semibold text-xs whitespace-break-spaces my-1 ">{makeCapital(row.name)}</h3>
                </div>
            )
        },
        {
            name: "Status",
            selector: (row) => row.active ? 'Active' : 'Draft',
            sortable: true,
            reorder: true,

        },
        {
            name: "Actions",
            sortable: false,
            cell: (row, index) => (
                <ButtonComponent data={row} index={index} alldata={data} setData={setData} workflowData={workflowData} fetchData={fetchData} setShowTestBot={setShowTestBot} setWorkflowToTest={setWorkflowToTest} />
            ),

        }


    ]

    const columns1 = [
        {
            name: "Name",
            selector: (row, index) => row.name,
            sortable: true,
            reorder: true,
            minWidth: '250px',
            cell: (row, index) => (
                <div className="flex gap-2 items-center cursor-pointer" onClick={(e) => editWorkFlowHandler(row)}>
                    <div className="relative inline-flex items-center justify-center mr-2 !whitespace-pre-wrap w-[20px] h-[40px] sm:h-10 overflow-hidden rounded-lg">
                        {row.icon ? <p className='text-[18px]'>{row.icon}</p> : <span className='text-[18px]'>😊</span>}

                    </div>
                    <h3 className="text-heading font-semibold text-xs whitespace-break-spaces my-1 ">{makeCapital(row.name)}</h3>
                </div>
            )
        },
        {
            name: "Status",
            selector: (row) => row.active ? 'Active' : 'Draft',
            sortable: true,
            reorder: true,
            hide: "sm"
        },
        {
            name: "Actions",
            sortable: false,
            cell: (row, index) => (
                <ButtonComponent data={row} index={index} alldata={data} setData={setData} workflowData={workflowData} fetchData={fetchData} setShowTestBot={setShowTestBot} setWorkflowToTest={setWorkflowToTest} />
            ),

        },
        {
            name: "Embed URL",
            sortable: false,
            cell: (row, index) => (
                <>
                    {row.id === isCopied.id && isCopied.copied === true ? (
                        <button
                            type={"button"}
                            className="border-none p-0 m-0 flex gap-1 items-center"
                        >
                            <CheckIcon className="h-4 w-4 " /> Copied!
                        </button>) :
                        <button
                            type={"button"}
                            onClick={() => getUrl(row.id)}
                            className="border-none p-0 m-0 flex gap-1 items-center"
                        >
                            <ClipboardIcon className=" h-5 w-5 text-black" /> Copy
                        </button>}


                </>
            ),
            hide: "sm"

        },


    ]



    useEffect(() => {
        manageData()
        console.log(userData)
    }, [workflowData])


    const editWorkFlowHandler = (ele) => {
        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${ele?.id}`);
    };

    const manageData = async () => {

        let workflows = await getWorkflowByStatus(status, source)
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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 400);
    }, [])


    return (
        <div>
            <div className='mt-4'>
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
                            ((userData?.email?.endsWith('@deflection.ai') || userData?.email?.endsWith('@joinnextmed.com') || userData?.email?.endsWith('@usetempo.ai')) &&
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
                    data?.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 mx-auto items-center my-2' >
                            {data?.map((item, key) =>

                                <>
                                    <WorkflowCard data={data} loading={loading} item={item} key={key} manageData={manageData}></WorkflowCard>
                                </>
                            )}
                        </div>
                    )
                        :
                        ""
                }

            </div>

            {/* <div className='data_table_wrapper w-full'>
                <DataTable
                    title=""
                    fixedHeader
                    highlightOnHover
                    pagination
                    paginationPerPage={10}
                    onRowClicked={(rowData) => {
                        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${rowData?.id}`);
                    }}
                    columns={status === true ? columns1 : columns}
                    className='data-table-class'
                    data={data}
                    customStyles={customStyles}
                    noDataComponent={<div className="w-full mt-3 relative"><SkeletonLoader count={9} height={40} width="100%" className={"mt-2"} /></div>}
                />
            </div> */}
            {suggestModal && (
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
            )}
        </div >
    )
}

export default WorkFlowTemplates

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