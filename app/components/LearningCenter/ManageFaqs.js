import React from 'react'
import { useState } from 'react';
import DataTable from 'react-data-table-component'
import { isMobile } from "react-device-detect";
import SkeletonLoader from '../Skeleton/Skeleton';
import { fetchFaqQuestions } from "@/app/components/store/slices/questionsSlice";
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import SideModal from '../SideModal/SideModal';

const ManageFaqs = ({ questions }) => {
    const [perPage, setPerPage] = useState(20);
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();

    const customStyles = {
        rows: {
            style: {
                minHeight: 'auto', // override the row height
                // maxHeight: '100%', // override the row height
                height: "auto",
                paddingTop: "10px",
                paddingBottom: "10px",
            },
        }
    };

    const columns = [
        {
            name: "Question",
            selector: (row, index) => row.question,
            sortable: false,
            reorder: false,
            minWidth: "200px",
            cell: (row) => (
                <p className='whitespace-normal p-2'>{row.question}</p>
            )
        },
        {
            name: "Content Source",
            selector: (row) => row?.knowledge?.source,
            sortable: false,
            reorder: false,
            minWidth: "200px",
            hide: "sm",
            // width: "10%",
            cell: (row) => (
                <div className="flex justify-start w-full items-center gap-2">
                    {
                        row?.knowledge?.source === 'snippet' ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                            </svg>
                            : row?.knowledge?.source === 'file' ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"></path>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                                </svg>
                    }
                    <span className="text-xs font-semibold">{row?.knowledge?.source}</span>
                </div>
            ),
        },
        {
            name: "Last Edited",
            selector: (row) => <span data-tag="allowRowEvents" className="text-xs">{moment(row.created).fromNow()}</span>,
            sortable: false,
            // width: "10%",
            reorder: false,
        },
    ];

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage)
        const queryParam = `page=${page}&page_size=${newPerPage}`;
        dispatch(fetchFaqQuestions(queryParam));
    }

    const onPageChange = async (page) => {
        const queryParam = `page=${page}&page_size=${perPage}`;
        dispatch(fetchFaqQuestions(queryParam));
    }
    return (
        <div className="w-full mt-5">
            <DataTable
                title={''}
                fixedHeader
                highlightOnHover
                pointerOnHover
                pagination
                columns={columns}
                noDataComponent={<><p className="text-center text-xs p-3">Questions Tempo needs your help answering will show here when they're ready!</p></>}
                data={questions?.data?.results}
                progressPending={questions?.isLoading}
                progressComponent={<div className="w-full mt-3 relative"><SkeletonLoader count={9} height={30} width="100%" className={"mt-2"} /></div>}
                paginationTotalRows={questions?.data?.count}
                paginationDefaultPage={questions?.data?.page}
                onRowClicked={(rowData) => { setSelected(rowData) }}
                paginationPerPage={perPage}
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={(page) => {
                    onPageChange(page)
                }}
                paginationRowsPerPageOptions={[5, 10, 20, 30]}
                customStyles={customStyles}
            />
            {selected && (
                <SideModal heading={selected.question} setShow={(text) => { setSelected(null) }}>
                    <h1 className='text-sm my-4 font-semibold'>Answer</h1>
                    <p className='text-xs'>{selected.answer}</p>
                </SideModal>
            )}
        </div>
    )
}

export default ManageFaqs