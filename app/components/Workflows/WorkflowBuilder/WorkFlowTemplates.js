import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
const WorkFlowTemplates = ({ workflowData }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("")
    const router = useRouter();
    const columns = [
        {
            name: "Name",
            selector: (row) => (
                <div className="flex gap-2 items-center cursor-pointer" onClick={(e) => editWorkFlowHandler(row)}>
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-border rounded-lg">
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
            selector: (row) => row.description,
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
            cell: (row) => (
                <ButtonComponent data={row} />
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
        setData(workflowData?.results)
    }

    const customStyles = {
        rows: {
            style: {
                padding: "10px 0",
            },
        }
    };

    const handleChange = (e) => {

        setSearch(e.target.value)
        const workflowOptionsfilter = workflowData?.results?.filter(
            (item) =>
                item?.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item?.description.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setData(workflowOptionsfilter)
    }
    return (
        <div>
            <h3 className='text-heading text-center font-semibold text-xl my-2'>Add, edit, and manage your Tempo workflows</h3>
            <p className='text-heading text-sm text-center'>Workflows use your integrations to allow Tempo to interact with 3rd party API's and databases. Use our templates or create your own. </p>
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
            <div className='data_table_wrapper'>
                <DataTable
                    title=""
                    fixedHeader
                    highlightOnHover
                    pagination={false}
                    // paginationPerPage={5}
                    columns={columns}
                    data={data}
                    className="custom-data-table"
                    customStyles={customStyles}
                />
            </div>
        </div>
    )
}

export default WorkFlowTemplates

export const ButtonComponent = ({ data }) => {
    const [showHelp, setShowHelp] = useState(null)
    const router = useRouter()
    const editWorkFlowHandler = (ele) => {
        router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${ele?.id}`);
    };

    return (
        <>
            <div className='cursor-pointer relative' onClick={() => { setShowHelp(prev => { if (prev === data.key) { return null } else { return data.key } }) }}>
                <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" />
                {showHelp === data.key && (
                    <div className="absolute left-[-280px] top-[40px] z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44 ">
                        <ul className="py-2 text-sm text-gray-700 ">
                            <li className='hover:bg-primary hover:text-white text-heading my-2' onClick={(e) => editWorkFlowHandler(data)}>
                                <button type='button' className="block px-4 py-2 ">Edit</button>
                            </li>
                            <li className='hover:bg-danger hover:text-white text-danger my-2'>
                                <button type='button' className="block px-4 py-2 ">Delete</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )

}