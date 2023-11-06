import { getAllFaqHistory, getFaqHistory, rollBackToVersion } from '@/app/API/pages/Knowledge'
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import HistoryRecord from './HistoryRecord';

const FaqHistoryTab = ({ selectedWorkflow }) => {

    // Local states
    const [history, setHistory] = useState([])
    const [skeletonloading, setSkeletonLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    let testId = "75150f2a-cea1-4008-a5cc-a3aeffabdc53"
    // Effects.
    useEffect(() => {
        if (selectedWorkflow?.id) {
            getWorkflowInfo()
        } else {
            getAllHistoryFaqs()
        }
    }, [selectedWorkflow, currentPage])


    // Handlers

    const getAllHistoryFaqs = async () => {
        let allHistory = await getAllFaqHistory(currentPage);
        if (allHistory?.results) {
            setHistory(allHistory.results);
            setTotalPages(allHistory.num_pages);
        }
        setSkeletonLoading(false);
    }

    const getWorkflowInfo = async () => {
        let historyLogs = await getFaqHistory(selectedWorkflow.id)
        if (historyLogs?.results) setHistory(historyLogs.results)
        setSkeletonLoading(false);
        console.log(historyLogs.results)
    }

    const changePage = (newPage) => {
        setSkeletonLoading(true)
        setCurrentPage(newPage);
    }

    return (
        <>

            {skeletonloading ? (

                <div className="flex justify-center items-center">
                    <SkeletonLoader count={5} height={80} width='80vw' className={"mt-4 mx-5"} />
                </div>


            ) : history.length === 0 ? (
                <div className="flex justify-center items-center mt-5 pt-5">
                    <p>You haven't taken any actions in the Learning Center yet, so there's no history to show. As soon as you start making changes, you'll see a record of all your activity right here.</p>
                </div>


            ) : (
                <>
                    <div className='my-5 py-5 flex justify-center'>
                        {history.length > 0 && (
                            <div className="pagination flex space-x-1">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => changePage(index + 1)}
                                        disabled={currentPage === index + 1}
                                        className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-black border-primary' : 'bg-white text-black border-gray hover:bg-gray'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div id={selectedWorkflow?.id} className="p-2 rounded-md shadow-md mx-5 xs:mx-0" style={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}>
                        {history.map((item) => (
                            <HistoryRecord item={item}></HistoryRecord>
                        ))}
                    </div>
                </>
            )}

            <div className='my-5 py-5 flex justify-center'>
                {history.length > 0 && (
                    <div className="pagination flex space-x-1">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => changePage(index + 1)}
                                disabled={currentPage === index + 1}
                                className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-black border-primary' : 'bg-white text-black border-gray hover:bg-gray'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>


        </>


    )
}

export default FaqHistoryTab