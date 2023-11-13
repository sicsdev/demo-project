import { rollBackToVersion } from '@/app/API/pages/Knowledge';
import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useState } from 'react';

const HistoryRecord = ({ item }) => {

    const [markedAsCurrent, setMarkedAsCurrent] = useState(false)

    const formatDateTime = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleRollback = async () => {
        if (item?.original_faq?.id && item.id) {
            await rollBackToVersion(item.id)
            setMarkedAsCurrent(true)
        }
    };


    return (
        <div key={item.id} className="mb-5 p-4 bg-white rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2 text-primary" />
                    <span className="text-xs text-black" style={{ opacity: '0.6' }}>
                        {formatDateTime(item.updated)}
                    </span>
                </div>
                <button
                    disabled={markedAsCurrent}
                    onClick={handleRollback}
                    className={`${!markedAsCurrent && 'border-primary'} flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2 px-4 w-auto focus:ring-yellow-300 border bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white`}>
                    {markedAsCurrent ? "Current" : "Rollback"}
                </button>
            </div>
            <div style={{fontSize: '12px'}}>
                <p className="text-black font-bold font-sm">{item.question}</p>
                <p className="text-gray-800 font-sm">{item.answer}</p>
            </div>
        </div >
    )
}

export default HistoryRecord