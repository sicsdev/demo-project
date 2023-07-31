import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { removeWorkFlow, updateWorkFlowStatus } from '@/app/API/pages/Workflow';
import { successMessage } from '../../Messages/Messages';
import { useRef } from 'react';
const WorkFlowTemplates = ({ workflowData, fetchData, status }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("")
    const router = useRouter();

    const columns = [
        {
            name: "Name",
            selector: (row,index) => (
                <div className="flex gap-2 items-center cursor-pointer" onClick={(e) => editWorkFlowHandler(row)}>
                    <div className="relative inline-flex items-center justify-center w-40 sm:w-10 h-10 overflow-hidden bg-border rounded-lg">
                        <Image fill="true" className="bg-contain mx-auto w-full rounded-lg" alt="logo.png" src={row?.logo ?? '/workflow/reactive-subscription.png'} />
                    </div>
                    <h3 className="text-heading font-semibold text-sm my-1">{row.name}</h3>
                </div>
            ),
            sortable: true,
            reorder: true,
        },
        {
            name: "Description",
            selector: (row) => <p className=' whitespace-normal'>{row.description}</p>,
            sortable: true,
            reorder: true,
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
            cell: (row,index) => (
                <ButtonComponent data={row} index={index} alldata={data} setData={setData} workflowData={workflowData} fetchData={fetchData} />
            ),

        },
    ];
    
    useEffect(() => {
        manageData()
    }, [workflowData])

    const editWorkFlowHandler = (ele) => {
        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${ele?.id}`);
    };
    const manageData = () => {
        const result = workflowData?.results?.filter((x) => x.active === status);
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
                item?.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item?.description.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setData(workflowOptionsfilter)
    }
    return (
        <div>
            <h3 className='text-heading text-center font-semibold text-xl my-2'>Add, edit, and manage your Tempo workflows</h3>
            <div className='flex justify-end gap-4 items-center mt-2 p-2 bg-[#F8F8F8]'>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="search" className="block w-full p-2 focus:outline-none focus:border-sky focus:ring-2 pl-10 text-sm text-gray-900 border border-border rounded-lg" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
                </div>
            </div>
            <div className='data_table_wrapper w-full'>
                <DataTable
                    title=""
                    fixedHeader
                    highlightOnHover
                    pagination
                    paginationPerPage={5}
                    onRowClicked={(rowData) => {
                        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${rowData?.id}`);
                    }}
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    noDataComponent={<><p className="text-center p-3 my-4">No workflows found</p></>}
                />
            </div>
        </div>
    )
}

export default WorkFlowTemplates

export const ButtonComponent = ({ data, alldata, setData, fetchData,index }) => {
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
            successMessage("Workflow deleted successfully")
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
                successMessage("Workflow Disabled Successfully!");
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
                setShowHelp(prev => { if (prev === data.id) { return null } else { return data.id } }) }}>
                <EllipsisHorizontalIcon className="h-6 w-6 font-bold text-heading cursor-pointer" />
                {showHelp === data.id && (
                    <div className={`absolute left-[-280px] ${index === alldata.length -1 ||index === alldata.length -2 ?"top-[-106px]":"top-[40px]" }  z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44`}>
                        <ul className="py-2 text-sm text-gray-700 ">
                            <li className='hover:bg-primary hover:text-white text-heading my-2' onClick={(e) => editWorkFlowHandler(data)}>
                                <button type='button' className="block px-4 py-2 ">Edit</button>
                            </li>
                            {data.active && (
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