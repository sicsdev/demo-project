import React from 'react';
import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
const StatusIndicator = ({ driveLoad, loading }) => {
    return (
        <div className="border-b border-[#F0F0F1] py-4">
            {driveLoad &&
                <div className='text-center flex justify-end gap-2 items-center'>
                    <CheckCircleIcon className='h-4 w-4' />
                    <span className='text-xs text-heading'> Saved</span>
                </div>
            }
            {loading &&
                <div className='text-center flex justify-end gap-2 items-center'>
                    <ArrowPathIcon className='h-4 w-4' />
                    <span className='text-xs text-heading'>Saving...</span>
                </div>
            }
        </div>
    );
};

export default StatusIndicator;