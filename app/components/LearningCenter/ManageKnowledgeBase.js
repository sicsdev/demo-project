import React from 'react'
import DataTable from "react-data-table-component";
import { AdjustmentsHorizontalIcon, LinkIcon, PlusIcon } from "@heroicons/react/24/outline";

const ManageKnowledgeBase = ({ viewKnowledgeCenterHandler }) => {

    const knowledgeCenterRecords = [
        {
            title: "Provider credentials - hims, inc.",
            state: "Used by Fin",
            content_source: "External",
            audience: "Everyone",
            time_anwsers: 0,
            last_edited: "7 hours ago"
        },
        {
            title: "Provider credentials - hims, inc.",
            state: "Used by Fin",
            content_source: "External",
            audience: "Everyone",
            time_anwsers: 0,
            last_edited: "7 hours ago"
        },
        {
            title: "Provider credentials - hims, inc.",
            state: "Used by Fin",
            content_source: "External",
            audience: "Everyone",
            time_anwsers: 0,
            last_edited: "7 hours ago"
        }
    ];

    const knowledgeCenterColumns = [
        {
            name: <div><input type="checkbox" className="" /></div>,
            selector: (row) => ``,
            sortable: false,
            reorder: false,
            cell: (row) => (
                <div>
                    <input type="checkbox" className="" />
                </div>
            ),
            maxWidth: '20px'
        },
        {
            name: "Title",
            selector: (row) => <h3 data-tag="allowRowEvents" className={`font-bold text-xs whitespace-normal`}>{row.title}</h3>,
            sortable: true,
            reorder: true,
            style: {
                whiteSpace: "inherit"
            },
        },
        {
            name: "State",
            selector: (row) => row.state,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <span data-tag="allowRowEvents" class="inline-block whitespace-nowrap rounded bg-[#d8efdc] text-[#107235] px-4 py-2 align-baseline text-xs font-bold leading-none">
                    {row.state}
                </span>
            ),
        },
        {
            name: "Content Source",
            selector: (row) => row.content_source,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <div data-tag="allowRowEvents" className="flex justify-center items-center gap-2">
                    <LinkIcon className="h-4 w-4 font-semibold" />
                    <span className="text-xs font-semibold">{row.content_source}</span>
                </div>
            ),
        },
        {
            name: "Audience",
            selector: (row) => row.audience,
            sortable: true,
            reorder: true,
            cell: (row) => (
                <span data-tag="allowRowEvents" class="inline-block whitespace-nowrap rounded-full bg-[#f1f1f1] text-black px-4 py-2 align-baseline text-xs font-semibold leading-none">
                    {row.audience}
                </span>
            ),
        },
        {
            name: "Times used in anwsers",
            selector: (row) => <span data-tag="allowRowEvents" className="text-xs">{row.time_anwsers}</span>,
            sortable: false,
            reorder: false,
        },
        {
            name: "Times used in anwsers",
            selector: (row) => <span data-tag="allowRowEvents" className="text-xs">{row.last_edited}</span>,
            sortable: false,
            reorder: false
        },
    ];

    return (
        <div className="w-full">
            <div className="bg-white pt-4 sm:pt-0 sm:p-4 mt-2">
                <div className="bg-[#f1f1f1] p-6 rounded-md mb-6">
                    <p className="text-sm mb-4 font-semibold">
                        To answer customer questions, Fin is using:
                    </p>
                    <div className="flex gap-4 sm:gap-10 justify-start align-top">
                        <div className='w-[25%]'>
                            <h2 className="text-3xl font-semibold">0</h2>
                            <p className="text-sm font-semibold">Article</p>
                            <p className="text-sm text-[#9CA3AF] font-semibold">out of 1</p>
                        </div>
                        <div className='w-[25%]'>
                            <h2 className="text-3xl font-semibold">95</h2>
                            <p className="text-sm font-semibold">External pages</p>
                            <p className="text-sm text-[#9CA3AF] font-semibold">
                                from 1 source
                            </p>
                        </div>
                        <div className='w-[25%]'>
                            <h2 className="text-3xl font-semibold">0</h2>
                            <p className="text-sm font-semibold">Snippets</p>
                            <p className="text-sm text-[#9CA3AF] font-semibold">out of 0</p>
                        </div>
                        <div className='w-[25%]'>
                            <h2 className="text-3xl font-semibold">0</h2>
                            <p className="text-sm font-semibold">Files</p>
                            <p className="text-sm text-[#9CA3AF] font-semibold">out of 0</p>
                        </div>
                    </div>
                </div>

                <div className="block sm:flex gap-10 justify-start items-center">
                    <div className="relative">
                        <input
                            placeholder="Search"
                            className="border border-input_color w-full block  px-2 py-2 bg-white focus:bg-white focus:text-sm rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
                            type="text"
                        />
                        <img className="w-5 top-[10px] left-[14px] absolute" src="/search.png" />
                    </div>
                    <div className='mt-4 sm:mt-0'>
                        <div className="text-sm bg-[#F1F1F1] rounded-lg inline-block p-1 px-2">
                            <button
                                type="button"
                                className="border-none p-0 m-0 flex gap-1 items-center text-lg font-bold "
                            >
                                <AdjustmentsHorizontalIcon className='h-4 w-4' />
                                <small className="">All content sources</small>
                            </button>
                        </div>
                    </div>
                    <div className='mt-4 sm:mt-0'>
                        <span
                            className="flex justify-start gap-1 text-xs sm:text-sm cursor-pointer items-center font-bold rounded-t-lg"
                            aria-current="page"
                        >
                            <PlusIcon className={`h-4 w-4`} />
                            Add filter
                        </span>
                    </div>
                </div>
            </div>
            <DataTable
                title={``}
                fixedHeader
                highlightOnHover
                pointerOnHover
                defaultSortFieldId="question"
                pagination
                columns={knowledgeCenterColumns}
                onRowClicked={(rowData) => {
                    viewKnowledgeCenterHandler(rowData);
                }}
                noDataComponent={<><p className="text-center text-sm p-3">No Records Found!</p></>}
                data={knowledgeCenterRecords}
            />
        </div>
    )
}

export default ManageKnowledgeBase