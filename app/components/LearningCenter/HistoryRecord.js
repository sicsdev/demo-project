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
        console.log('213')
        console.log(item)
        if (item.id) {
            await rollBackToVersion(item.id)
            setMarkedAsCurrent(true)
        }
    };

    const returnClassOfType = () => {
        if (item.event_type == 'update') { return 'bg-[#F4BB44]' }
        if (item.event_type == 'create') { return 'bg-primary' }
        if (item.event_type == 'delete') { return 'bg-danger' }
    }

    function renderAnchorTags(text) {
        // Regular expression to find and extract anchor tag content and URL
        const regex = /\[([^:]+):([^ ]+)\]/g;

        // Replace the matched patterns with anchor tags
        const replacedText = text.replace(regex, '&nbsp;<a class="text-primary" href="$2">$1</a>');

        return { __html: replacedText };
    }

    return (
        <div key={item.id} className="mb-5 p-4 bg-white rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2 text-primary" />
                    <span className="text-xs text-black" style={{ opacity: '0.6' }}>
                        {formatDateTime(item.updated)}
                        <span className={`mx-3 text-white px-2 rounded-md ${returnClassOfType()}`}>
                            {item.event_type}
                        </span>
                    </span>
                </div>
                <button
                    disabled={markedAsCurrent || item.is_current}
                    onClick={handleRollback}
                    className={`${(!markedAsCurrent || !item.is_current) ? 'border-primary' : 'border-gray'} flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white`}>

                    {markedAsCurrent || item.is_current ? "Current" : "Rollback"}
                </button>
            </div>
            <div style={{ fontSize: '12px' }}>
                <p className="text-black font-bold font-sm flex items-center">
                    <span className='flex items-center'>{item.icon}</span>
                    <span className='mx-2'>{item.question}</span>
                </p>
                <div className='history_logs_wrapper'>
                    <p className="text-gray-800 font-sm mt-1" dangerouslySetInnerHTML={renderAnchorTags(item.answer)} />
                </div>
            </div>
        </div >
    )
}

export default HistoryRecord