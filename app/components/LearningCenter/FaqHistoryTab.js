import { getAllFaqHistory, getFaqHistory, rollBackToVersion } from '@/app/API/pages/Knowledge'
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../Skeleton/Skeleton';
import HistoryRecord from './HistoryRecord';

const FaqHistoryTab = ({ selectedWorkflow }) => {

    // Local states
    const [history, setHistory] = useState([])
    const [skeletonloading, setSkeletonLoading] = useState(true)

    let testId = "75150f2a-cea1-4008-a5cc-a3aeffabdc53"
    // Effects.
    useEffect(() => {
        if (selectedWorkflow?.id) {
            getWorkflowInfo()
        } else {
            getAllHistoryFaqs()
        }
    }, [selectedWorkflow])


    // Handlers

    const getAllHistoryFaqs = async () => {
        let allHistory = await getAllFaqHistory()
        if (allHistory?.results) setHistory(allHistory.results)
        setSkeletonLoading(false);
    }

    const getWorkflowInfo = async () => {
        let historyLogs = await getFaqHistory(selectedWorkflow.id)
        if (historyLogs?.results) setHistory(historyLogs.results)
        setSkeletonLoading(false);
        console.log(historyLogs.results)
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
                <div id={selectedWorkflow?.id} className="p-2 rounded-md shadow-md mx-5 xs:mx-0" style={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}>
                    {history.map((item) => (
                        <HistoryRecord item={item}></HistoryRecord>
                    ))}
                </div>
            )}
        </>


    )
}

export default FaqHistoryTab