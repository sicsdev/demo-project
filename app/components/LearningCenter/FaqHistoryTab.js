import { getAllFaqHistory, getFaqHistory, rollBackToVersion } from '@/app/API/pages/Knowledge';
import React, { useEffect, useState } from 'react';
import SkeletonLoader from '../Skeleton/Skeleton';
import HistoryRecord from './HistoryRecord';

const FaqHistoryTab = ({ selectedWorkflow }) => {
    // Local states
    const [history, setHistory] = useState([]);
    const [skeletonloading, setSkeletonLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecordsNumber, setTotalRecordsNumber] = useState('');
    const [elementsPerPage, setElementsPerPage] = useState('10')

    // Effects.
    useEffect(() => {
        if (selectedWorkflow?.id) {
            getWorkflowInfo();
        } else {
            getAllHistoryFaqs();
        }
    }, [selectedWorkflow, currentPage, elementsPerPage]);

    // Handlers

    const getAllHistoryFaqs = async (elementsPerPageCustom) => {
        let allHistory = await getAllFaqHistory(currentPage, elementsPerPageCustom || elementsPerPage);
        if (allHistory?.results) {
            setHistory(allHistory.results);
            setTotalPages(allHistory.num_pages);
            setTotalRecordsNumber(allHistory.count);
        }
        setSkeletonLoading(false);
    };

    const getWorkflowInfo = async () => {
        let historyLogs = await getFaqHistory(selectedWorkflow.id);
        if (historyLogs?.results) setHistory(historyLogs.results);
        setSkeletonLoading(false);
        console.log(historyLogs.results);
    };

    const changePage = (newPage) => {
        setSkeletonLoading(true);
        setCurrentPage(newPage);
    };

    const handlePageSize = async (e) => {
        setSkeletonLoading(true)
        setHistory([])
        setCurrentPage(1)
        setElementsPerPage(e.target.value)
        // setSkeletonLoading(false)
    }

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <>
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
                    <div id={selectedWorkflow?.id} className="p-2 rounded-md shadow-md mx-5 xs:mx-0" style={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}>
                        {history.map((item) => (
                            <HistoryRecord item={item} key={item.id} />
                        ))}
                    </div>
                </>
            )}

            <div className="mt-3 mb-5 py-5 flex justify-end mx-5">
                {history.length > 0 && (
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
                            className={`sc-dtInlm hZIrqV ${isFirstPage ? 'text-gray' : ''}  opacity-50`}
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
                            className={`sc-dtInlm hZIrqV ${isFirstPage ? 'text-gray' : ''}  opacity-50`}
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
                            className={`sc-dtInlm hZIrqV ${isLastPage ? 'disabled' : ''}  opacity-50`}
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
                            className={`sc-dtInlm hZIrqV ${isLastPage ? 'disabled' : ''} opacity-50`}
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
    );
};

export default FaqHistoryTab;
