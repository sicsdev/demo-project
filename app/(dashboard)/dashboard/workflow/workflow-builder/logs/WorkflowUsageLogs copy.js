import { loginWithGoogle } from '@/app/API/pages/Login'
import { getAllWorkflow, getWorkflowUsageByWorkflowId, getWorkflowUsageLogs } from '@/app/API/pages/Workflow'
import SkeletonLoader from '@/app/components/Skeleton/Skeleton'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import WorkflowUsageCard from './WorkflowUsageCard'
import { XMarkIcon } from '@heroicons/react/24/outline'
import SelectOption from '@/app/components/Common/Input/SelectOption'



const WorkflowUsageLogs = () => {

    const [allLogs, setAllLogs] = useState([])
    const [skeletonloading, setSkeletonLoading] = useState(true);
    const [workflowsNames, setWorkflowsNames] = useState([])

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecordsNumber, setTotalRecordsNumber] = useState('');
    const [elementsPerPage, setElementsPerPage] = useState('10')


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
        setSkeletonLoading(false)
    }





    // Pagination handlers.
    const changePage = (newPage) => {
        setSkeletonLoading(true);
        setCurrentPage(newPage);
    };

    const handlePageSize = async (e) => {
        setSkeletonLoading(true)
        setAllLogs([])
        setCurrentPage(1)
        setElementsPerPage(e.target.value)
    }

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;






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
                                From
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

                    <div className="w-100 mt-4">
                        <div className={`inline`}>
                            <label
                                className={`block text-sm text-heading font-medium pb-2 pt-0`}
                            >
                                To
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


            {/* // *********** MAIN DATA *********** */}



            {skeletonloading ? (
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
            )}



            {/* //***********  PAGINATION **************/}

            <div className="mt-3 mb-5 py-5 flex justify-end mx-5">
                {allLogs.length > 0 && (
                    <div className="pagination flex space-x-1 mb-5 items-center">

                        <div className='mx-3'>
                            <span className='font-sm text-black opacity-30 mx-4' style={{ fontSize: '12px' }}>
                                Rows per page:
                                <select onChange={handlePageSize}>
                                    <option value='10' selected={elementsPerPage == '10'}>10</option>
                                    <option value='20' selected={elementsPerPage == '20'}>20</option>
                                    <option value='30' selected={elementsPerPage == '30'}>30</option>
                                </select>
                            </span>

                            <span className='font-sm text-black opacity-30 mx-4' style={{ fontSize: '12px' }}>
                                {currentPage}-{totalPages} of {totalRecordsNumber}
                            </span>
                        </div>


                        <button
                            id="pagination-first-page"
                            type="button"
                            aria-label="First Page"
                            aria-disabled={isFirstPage}
                            className={`sc - dtInlm hZIrqV ${isFirstPage ? 'text-gray' : ''} opacity - 50`}
                            onClick={() => changePage(1)}
                            disabled={isFirstPage}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isFirstPage ? 'gray' : ''} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
                                <path fill="none" d="M24 24H0V0h24v24z"></path>
                            </svg>
                        </button>

                        <button
                            id="pagination-previous-page"
                            type="button"
                            aria-label="Previous Page"
                            aria-disabled={isFirstPage}
                            className={`sc - dtInlm hZIrqV ${isFirstPage ? 'text-gray' : ''} opacity - 50`}
                            onClick={() => changePage(currentPage - 1)}
                            disabled={isFirstPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isFirstPage ? 'gray' : ''} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                        </button>

                        <button
                            id="pagination-next-page"
                            type="button"
                            aria-label="Next Page"
                            aria-disabled={isLastPage}
                            className={`sc - dtInlm hZIrqV ${isLastPage ? 'disabled' : ''} opacity - 50`}
                            onClick={() => changePage(currentPage + 1)}
                            disabled={isLastPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isLastPage ? 'gray' : ''} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                        </button>

                        <button
                            id="pagination-last-page"
                            type="button"
                            aria-label="Last Page"
                            aria-disabled={isLastPage}
                            className={`sc - dtInlm hZIrqV ${isLastPage ? 'disabled' : ''} opacity - 50`}
                            onClick={() => changePage(totalPages)}
                            disabled={isLastPage}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isLastPage ? 'gray' : ''} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                            </svg>
                        </button>
                    </div>
                )}
            </div>

        </>

    )
}

export default WorkflowUsageLogs