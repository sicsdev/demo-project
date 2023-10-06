import React, { useEffect, useState, useRef } from 'react'
import DataTable from "react-data-table-component";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon, CheckIcon, ClipboardDocumentListIcon, ClipboardIcon, EllipsisHorizontalIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { getWorkflowByStatus, getWorkflowEmbed, removeWorkFlow, updateWorkFlowStatus } from '@/app/API/pages/Workflow';
import { successMessage } from '../../Messages/Messages';
import copy from 'copy-to-clipboard';
import { makeCapital } from '../../helper/capitalName';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import DeleteWorkflow from './DeleteWorkflow';
import Button from '../../Common/Button/Button';

const WorkFlowTemplates = ({ workflowData, fetchData, status, setShowTestBot, setWorkflowToTest, state, workflowLoading, createNewWorkFlow }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("")
    const router = useRouter();
    const [urls, setUrls] = useState([])
    const [isCopied, setIsCopied] = useState({
        id: null,
        copied: false,
        loading: false
    })

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
    }, [workflowData])


    const editWorkFlowHandler = (ele) => {
        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${ele?.id}`);
    };

    const manageData = async () => {

        let workflows = await getWorkflowByStatus(status)
        let result = workflows.results
        let array_of_urls = []

        result?.forEach(async (el) => {
            result = await getWorkflowEmbed(el.id).then(url => {
                array_of_urls.push({ id: el.id, url: url.url })
            })
        })

        setUrls(array_of_urls)
        setData(result);
    }

    const customStyles = {
        rows: {
            style: {
                padding: "10px 0",
                cursor: 'pointer',
            },
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value)
        const workflowOptionsfilter = data?.filter(
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

    const getIntegrationIcon = (automations, name = "") => {
        const getIcon = automations?.find((x) => x?.automation?.integration?.icon !== null && x?.automation?.integration?.icon !== "");

        if (getIcon !== undefined && getIcon?.automation?.integration?.icon !== undefined) {
            return getIcon?.automation?.integration?.icon;
        }
        return null;
    };

    const [loading, setLoading] = useState(true);
    const getInitials = (name) => {
        const words = name.split(' ');
        if (words.length === 1) {
            // If there is only one word in the name, return the first character as initials
            return words[0].charAt(0).toUpperCase();
        } else {
            // If there are multiple words, return the first character of each word as initials
            return words.map(word => word.charAt(0)).join('').toUpperCase();
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])
    console.log("data", data)
    return (
        <div>
            <div className='mt-4'>
                <div className='flex justify-center sm:justify-end md:justify-end lg:justify-end  items-center p-2 bg-white'>
                    <div className='flex justify-center sm:justify-end md:justify-end lg:justify-end gap-4 items-center p-2 bg-white'>
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
                                <input type="search" id="search" className="block w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-gray-900 border border-border !rounded-md" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                            </div>
                        }
                    </div>
                    <div>
                        {loading ?
                            <SkeletonLoader count={1} height={30} width={80} />
                            :
                            <Button
                                type={"button"}
                                className="inline-block rounded border border-primary bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                                disabled={workflowLoading === true}
                                onClick={(e) => createNewWorkFlow()}
                            >
                                {workflowLoading ? "Loading..." : 'Create'}
                            </Button>
                        }
                    </div>

                </div>
            </div>

            <div className='w-full'>

                {
                    data?.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 mx-auto items-center my-2'>
                            {data?.map((item, key) =>
                                <div
                                    style={{
                                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                    }}
                                    key={key}
                                    className='relative border border-[#F0F0F1] p-3 rounded-md cursor-pointer bg-white h-[200px]'
                                    onClick={(e) => router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${item?.id}`)}
                                >

                                    <div className='relative h-full'>
                                        <div className='flex items-center justify-start gap-2'>
                                            {item.icon && (
                                                loading ?
                                                    <SkeletonLoader className="mr-2" count={1} height={30} width={40} /> :
                                                    <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" >
                                                        {item.icon}
                                                    </div>
                                            )}
                                            {getIntegrationIcon(item?.automations, item?.name) !== null && (
                                                <div className="relative w-[25px] h-[25px] gap-2 rounded-lg" >
                                                    {loading ?
                                                        <SkeletonLoader className="mr-2" count={1} height={30} width={40} />
                                                        :
                                                        <Image
                                                            fill={"true"}
                                                            className="bg-contain mx-auto object-scale-down w-full rounded-lg"
                                                            alt="logo.png"
                                                            src={getIntegrationIcon(item?.automations, item?.name)}
                                                        />
                                                    }
                                                </div>
                                            )}
                                            {item?.automations?.length > 0 && item?.automations?.map((element, index) =>
                                                (element?.automation == null) && (
                                                    <div key={key} className="relative w-[25px] h-[25px] gap-2 rounded-lg">
                                                        {element.condition && (
                                                            <>
                                                                {loading ?
                                                                    <SkeletonLoader count={1} height={30} width={40} />
                                                                    :
                                                                    <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                                                                }
                                                            </>
                                                        )}

                                                        {element.question && (
                                                            <>
                                                                {loading ?
                                                                    <SkeletonLoader count={1} height={30} width={40} />
                                                                    :
                                                                    <ArrowUturnLeftIcon className="h-6 w-6 text-gray-500" />
                                                                }
                                                            </>
                                                        )}

                                                        {element?.transformer && (
                                                            <>
                                                                {loading ?
                                                                    <SkeletonLoader count={1} height={30} width={40} />
                                                                    :
                                                                    <PuzzlePieceIcon className="h-6 w-6 text-gray-500" />
                                                                }
                                                            </>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className=''>
                                            <h2 className='text-[#151D23] !font-bold mt-2 text-base'>
                                                {loading ?
                                                    <SkeletonLoader count={1} height={30} width="70%" />
                                                    :
                                                    <>
                                                        {makeCapital(item.name)}
                                                    </>
                                                }</h2>
                                            <p className='text-xs text-[#151d23cc] mt-1'>

                                                {loading ?
                                                    <SkeletonLoader count={1} height={20} width="50%" />
                                                    :
                                                    <>
                                                        By Tempo
                                                    </>
                                                }
                                            </p>
                                        </div>
                                        <div className='absolute bottom-0 w-full'>
                                            <div className='flex items-center justify-between '>
                                                <p className='text-xs text-[#151d23cc]'>
                                                    {loading ?
                                                        <SkeletonLoader count={1} height={30} width={50} />
                                                        : <>
                                                            {item.active ? 'Active' : 'Draft'}
                                                        </>
                                                    }
                                                </p>
                                                <p className='text-danger text-xs' onClick={(e) => deleteWorkflowHandler(e, item)}>
                                                    {loading ?
                                                        <SkeletonLoader count={1} height={30} width={50} />
                                                        : <>
                                                            Delete
                                                        </>
                                                    }</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
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