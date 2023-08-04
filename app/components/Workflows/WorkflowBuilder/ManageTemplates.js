import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Image from 'next/image'
import Button from '../../Common/Button/Button'
import { createWorkflowTemplate } from '@/app/API/pages/Workflow'
import { successMessage, errorMessage } from '../../Messages/Messages'
const ManageTemplates = ({ template, fetchData, fetchTemplates }) => {
    const [addTemplateLoader, setAddTemplateLoader] = useState(null);

    const createTemplateFunc = async (id, body) => {
        try {
            setAddTemplateLoader(id)
            const response = await createWorkflowTemplate(id, body);
            setAddTemplateLoader(null)
            if (response.status === 201 || response.status === 200) {
                fetchData();
                fetchTemplates();
                successMessage("Workflow Template Created Successfully!")
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

                    className="inline-block rounded border border-primary bg-primary px:2 sm:px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
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
    return (
        <div>
            <h3 className='text-heading text-center font-semibold text-xl my-2'>Add, edit, and manage your Tempo workflows</h3>
            <div className='data_table_wrapper w-full'>
                <DataTable
                    title=""
                    fixedHeader
                    highlightOnHover
                    pagination
                    paginationPerPage={5}
                    // onRowClicked={(rowData) => {
                    //     router.push(`/dashboard/workflow/workflow-builder/get-started/?flow=${rowData?.id}`);
                    // }}
                    columns={columns}
                    data={template}
                    customStyles={customStyles}
                    noDataComponent={<><p className="text-center p-3 my-4">No workflows template found</p></>}
                />
            </div>
        </div>)
}

export default ManageTemplates