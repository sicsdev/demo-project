import { loginWithGoogle } from '@/app/API/pages/Login'
import { getAllWorkflow, getWorkflowUsageByWorkflowId, getWorkflowUsageLogs } from '@/app/API/pages/Workflow'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import WorkflowUsageCard from './WorkflowUsageCard'
import { ArrowDownCircleIcon, ArrowDownIcon, ArrowRightCircleIcon, ArrowRightIcon, ChartBarIcon, EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import DataTable from 'react-data-table-component'


const WorkflowUsageLogs = () => {

    const [allLogs, setAllLogs] = useState([])
    // const [skeletonloading, setSkeletonLoading] = useState(true);
    const [workflowsNames, setWorkflowsNames] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentExpanded, setCurrentExpanded] = useState('')

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecordsNumber, setTotalRecordsNumber] = useState('');
    const [elementsPerPage, setElementsPerPage] = useState(10)


    // Filter states
    const [selectedFilters, setSelectedFilters] = useState({
        created__gte: 'all',
        created__lte: 'all',
        workflows: ''
    })

    useEffect(() => {
        getAllLogs()
        getAllWorkflowsName()
    }, [currentPage, elementsPerPage, selectedFilters])




    // Main functions
    const getAllWorkflowsName = async () => {
        let all = await getAllWorkflow()
        if (all?.results) {
            setWorkflowsNames(all.results.map(e => ({ name: e.name, value: e.id })))
        }
    }


    const getAllLogs = async (initialPage) => {
        // Extracting selected filters
        let gte = selectedFilters.created__gte === 'all' ? '' : `&created__gte=${selectedFilters.created__gte}`;
        let lte = selectedFilters.created__lte === 'all' ? '' : `&created__lte=${selectedFilters.created__lte}`;
        let workflowId = selectedFilters.workflows === 'all' ? '' : `&created__lte=${selectedFilters.workflows}`

        // Constructing the query parameters string
        let queryParams = `${gte}${lte}`;


        let logs = await getWorkflowUsageLogs(currentPage, elementsPerPage, queryParams.trim())

        setAllLogs(logs.results)
        setTotalPages(logs.num_pages);
        setTotalRecordsNumber(logs.count);
        setLoading(false)
    }

    const expandRecord = (row) => {
        if (currentExpanded == row.id) {
            setCurrentExpanded('')
            return
        }
        setCurrentExpanded(row.id)
    }



    // Pagination handlers.
    const changePage = (newPage,) => {
        setCurrentPage(newPage);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setAllLogs([])
        setCurrentPage(page)
        setElementsPerPage(newPerPage)
    }




    // Filters handlers 

    const cleanFilters = () => {
        setSelectedFilters({
            created__gte: 'all',
            created__lte: 'all',
            workflows: ''
        })
    }

    const handleCleanDates = (value) => {
        setCurrentPage(1)

        setSelectedFilters({
            ...selectedFilters,
            [value]: 'all'
        })
    }

    const filterDataHandler = (e) => {
        const { value, name } = e?.target;
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }


    const applyWorkflowFilter = async (e) => {
        const workflowName = workflowsNames.find(element => element.value === e.target.value).name;

        setSelectedFilters({
            created__gte: 'all',
            created__lte: 'all',
            workflows: workflowName
        })

        let result = await getWorkflowUsageByWorkflowId(e.target.value)
        setAllLogs(result.results)
    }






    // DATA TABLE STYLING AND DATA

    const customStyles = {
        rows: {
            style: {
                minHeight: '100',
            },
        },
        table: {
            style: {
                maxHeight: '100vh',
            },
        },
    };

    const tableColumns = [
        {
            name: "",
            id: "icon",
            selector: 'icon',
            sortable: false,
            width: "4%",
            reorder: true,
            cell: (row) => (
                <div onClick={() => { expandRecord(row) }} className='w-full text-xl flex items-start justify-center'>
                    <h1 className="border border-gray rounded-md p-1" style={{ alignItems: 'start' }}>
                        {row.workflow.icon}
                    </h1>
                </div>
            ),
            style: {
                // Estilos personalizados para la columna
                display: 'flex',
                alignItems: 'start',
                marginTop: '10px'
                // Agrega cualquier estilo que desees para la columna completa
            }
        },

        {
            name: "",
            id: "record",
            selector: 'record',
            sortable: false,
            // width: "100%",
            reorder: true,
            cell: (row) => (
                <div className='w-ful' onClick={() => { expandRecord(row) }}>
                    <WorkflowUsageCard currentExpanded={currentExpanded} log={row}></WorkflowUsageCard>
                </div>
            )
        },
        {
            name: <b>Used Last 24hrs</b>,
            id: "used",
            selector: 'used',
            sortable: false,
            width: "182px",
            reorder: true,
            cell: (row) => (
                <div onClick={() => console.log(row)} className='w-full text-sm flex gap-2 items-center justify-center'>
                    <ChartBarIcon className='w-4 h-4 opacity-60'></ChartBarIcon>
                    <b>{row.workflow.successful_automation_usage_last_24_hours_count}</b>
                </div>
            )
        },
        {
            name: <b>Details</b>,
            id: "details",
            selector: (row) => row?.details,
            cell: (row) => (
                <div className="cursor-pointer relative">
                    {currentExpanded === row.id ?
                        <ArrowDownIcon onClick={() => { expandRecord(row) }} className="h-4 w-4 font-bold text-heading cursor-pointer"></ArrowDownIcon>
                        :
                        <ArrowRightIcon onClick={() => { expandRecord(row) }} className="h-4 w-4 font-bold text-heading cursor-pointer" />
                    }
                </div>
            ),
            reorder: true,
            width: "100px",
        },
    ];


    return (
        <>


            {/* *********** FILTERS ************/}
            <div className='flex justify-end mx-5'>
                <div className="flex justify-end items-center gap-2 mb-[15px] w-1/2">

                    <div className="w-100 mt-4">
                        <div className={`inline`}>
                            <label
                                className={`block text-sm text-heading font-medium pb-2 pt-0`}
                            >
                                <small> From</small>
                                <p style={{ fontSize: "10px" }}></p>
                            </label>
                            <div className="flex items-center">
                                <input
                                    onChange={(e) => filterDataHandler(e)}
                                    value={selectedFilters.created__gte || ""}
                                    type="date"
                                    id="created__gte"
                                    name="created__gte"
                                    className="w-full border rounded-[4px] p-[7px] border-[#C7C6C7] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                                <div className='cursor-pointer' onClick={() => handleCleanDates("created__gte")}>
                                    {selectedFilters?.created__gte !== "all" && (
                                        <XMarkIcon className="w-4 h-4 mt-1"></XMarkIcon>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-100 mt-4 ">
                        <div className={`inline`}>
                            <label
                                className={`block text-sm text-heading font-medium pb-2 pt-0`}
                            >
                                <small>To</small>
                                <p style={{ fontSize: "10px" }}></p>
                            </label>
                            <div className="flex items-center">
                                <input
                                    onChange={(e) => filterDataHandler(e)}
                                    value={selectedFilters.created__lte || ""}
                                    type="date"
                                    id="created__lte"
                                    name="created__lte"
                                    className="w-full p-[7px] border rounded-[4px] border-[#C7C6C7] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                                <div className='cursor-pointer' onClick={() => handleCleanDates("created__lte")}>
                                    {selectedFilters?.created__lte !== "all" && (
                                        <XMarkIcon
                                            className="w-4 h-4 mt-1"
                                            style={{ cursor: "pointer" }}
                                        ></XMarkIcon>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading ?
                <div className="flex justify-center items-center mt-5">
                    <SkeletonLoader count={5} height={80} width="80vw" className={"mt-1 mx-5"} />
                </div>
                :
                <div className="table-container">
                    <DataTable
                        title={''}
                        fixedHeader
                        highlightOnHover
                        pointerOnHover
                        pagination
                        columns={tableColumns}
                        noDataComponent={<><p className="text-center text-xs p-3"></p></>}
                        data={allLogs}
                        progressPending={loading}
                        progressComponent={
                            <div className="w-full mt-3 relative">
                                <SkeletonLoader count={11} height={30} width="100%" className={"mt-2"} />
                            </div>}
                        paginationDefaultPage={currentPage}
                        paginationPerPage={elementsPerPage}
                        paginationTotalRows={totalRecordsNumber}
                        paginationServer
                        onChangeRowsPerPage={(perpage, page) => { handlePerRowsChange(perpage, page) }}
                        onChangePage={(page) => { changePage(page) }}
                        onRowClicked={(row) => { () => expandRecord(row) }}
                        paginationRowsPerPageOptions={[5, 10, 20, 30]}
                        sortServer
                        customStyles={customStyles}
                        defaultSortAsc={false}
                    />
                </div>
            }


            {/* // *********** MAIN DATA *********** */}

            {/* 

            {
                skeletonloading ? (
                    <div className="flex justify-center items-center">
                        <SkeletonLoader count={5} height={80} width="80vw" className={"mt-4 mx-5"} />
                    </div>
                ) : history.length === 0 ? (
                    <div className="flex justify-center items-center mt-5 pt-5">
                        <p>You haven't taken any actions in the Learning Center yet, so there's no history to show. As soon as you start making changes, you'll see a record of all your activity right here.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-2 rounded-md shadow-md mx-5 xs:mx-0" style={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}>
                            {allLogs?.map(log => (
                                <>
                                    <WorkflowUsageCard log={log}></WorkflowUsageCard>
                                </>
                            )
                            )}

                        </div>
                    </>
                )
            } */}


        </>

    )
}

export default WorkflowUsageLogs