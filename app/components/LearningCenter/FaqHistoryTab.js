import { getFaqHistory } from '@/app/API/pages/Knowledge'
import React, { useEffect, useState } from 'react'
import { ClockIcon } from '@heroicons/react/24/outline';
import Tooltip from 'react-tooltip';

const FaqHistoryTab = ({ selectedWorkflow }) => {

    // Local states
    const [workflowHistory, setWorkflowHistory] = useState([])



    // Effects.
    useEffect(() => {
        if (selectedWorkflow?.id) { getWorkflowInfo() }
    }, [selectedWorkflow])



    // Handlers

    const getWorkflowInfo = async () => {
        let history = await getFaqHistory(selectedWorkflow.id)
        if (history?.results) setWorkflowHistory(history.results)
    }

    const formatDateTime = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleRollback = (versionId) => {
        console.log(`Rolling back to version ${versionId}`);
    };

    return (
        <>
            <div id={selectedWorkflow?.id} className="p-2 rounded-md shadow-md" style={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}>
                {workflowHistory.map((item) => (
                    <div key={item.id} className="mb-3 p-4 bg-white rounded-md shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center">
                                <ClockIcon className="w-5 h-5 mr-2 text-primary" />
                                <span className="text-sm text-black" style={{opacity: '0.6'}}>{formatDateTime(item.updated)}</span>
                            </div>
                            <button
                                onClick={() => handleRollback(item.id)}
                                className="px-3 py-1 text-sm bg-primary text-white rounded-md"
                            >
                                Rollback to this answer
                            </button>
                        </div>
                        <p className="text-gray-800">{item.answer}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FaqHistoryTab