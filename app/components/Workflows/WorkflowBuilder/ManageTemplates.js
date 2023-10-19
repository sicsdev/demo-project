import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Image from 'next/image'
import Button from '../../Common/Button/Button'
import { createWorkflowTemplate } from '@/app/API/pages/Workflow'
import { successMessage, errorMessage } from '../../Messages/Messages'
const ManageTemplates = ({ template, fetchData, fetchTemplates, setTemplate, state, workflowLoading, createNewWorkFlow  }) => {
    const [addTemplateLoader, setAddTemplateLoader] = useState(null);
    const [search, setSearch] = useState("")
    const [showTemplate, setShowTemplate] = useState(template || []);
    const createTemplateFunc = async (id, body) => {
        try {
            setAddTemplateLoader(id)
            const response = await createWorkflowTemplate(id, body);
            setAddTemplateLoader(null)
            if (response.status === 201 || response.status === 200) {
                fetchData();
                fetchTemplates();
                // successMessage("Workflow Template Created Successfully!")
            } else {
                errorMessage("Unable To Create Template!")
            }
        } catch (error) {
            setAddTemplateLoader(null)
            errorMessage("Unable To Create Template!")
        }

    }

    const columns = [
        {
            name: "Name",
            selector: (row, index) => (
                <div className="flex gap-2 items-center cursor-pointer" >
                    <div className="relative inline-flex items-center justify-center min-w-[40px] !whitespace-pre-wrap w-[40px] sm:w-10 h-[40px] sm:h-10 overflow-hidden bg-border rounded-lg">
                        <Image fill="true" className="bg-contain mx-auto w-full rounded-lg" alt="logo.png" src={row?.logo ?? '/workflow/reactive-subscription.png'} />
                    </div>
                    <h3 className="text-heading font-semibold text-sm my-1">{row.name}</h3>
                </div>
            ),
            sortable: true,
            reorder: true,
            minWidth: '250px'
        },
        {
            name: "Status",
            selector: (row) => row.active ? 'Active' : '',
            sortable: true,
            reorder: true,
        },
        {
            name: "Actions",
            sortable: false,
            cell: (row, index) => (

                <Button
                    type={"button"}

                    className="inline-block rounded border border-primary bg-primary px:2 sm:px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                    // disabled={loading === true}
                    onClick={(e) => createTemplateFunc(row.id, { "bots": [] })}
                >
                    {addTemplateLoader === row?.id ? `Loading...` : 'Create Template'}
                </Button>
            ),

        },
    ];
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
        const templateFilter = template?.filter(
            (item) =>
                item?.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setShowTemplate(templateFilter)
    }

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
                                <input type="search" id="search" className="border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px] pl-10" placeholder="Search" value={search} onChange={(e) => { handleChange(e) }} />
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
                                {workflowLoading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                    <span>Loading...</span> </>  : 'Create'}
                            </Button>
                        }
                    </div>

                </div>
            </div>
            <div className='data_table_wrapper w-full'>
                <DataTable
                    title=""
                    fixedHeader
                    highlightOnHover
                    className='data-table-class'
                    pagination
                    paginationPerPage={5}
                    // onRowClicked={(rowData) => {
                    //     router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${rowData?.id}`);
                    // }}
                    columns={columns}
                    data={showTemplate}
                    customStyles={customStyles}
                    noDataComponent={<><p className="text-center p-3 my-4">No workflows template found</p></>}
                />
            </div>
        </div>)
}

export default ManageTemplates