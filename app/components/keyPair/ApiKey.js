import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const ApiKey = () => {
    return (
        <div className='border border-border_color shadow-sm rounded-md'>
            <div className='p-4 flex items-center justify-between'>
                <p className='font-bold text-lg'>API keys</p>
                <p className='text-sm text-primary cursor-pointer hover:text-black'>Learn more about API authentication</p>
            </div>
            <hr className='bg-border_color text-border_color' />
            <div className='p-4 flex items-center justify-between'>
                <p className='font-base text-sm justify-start gap-2 items-center flex'>
                    <InformationCircleIcon className="h-4 w-4 text-heading" />
                    Viewing live API keys. Toggle to view test keys.</p>
                <div>
                    <div className='flex  items-center gap-2 col-span-4'>
                        <div>
                            <label className="switch" style={{ height: "unset" }}>
                                <input type="checkbox" name="snippet_active" />
                                <span className="slider round h-[27px] w-[55px]"></span>
                            </label>
                        </div>
                        <p className='text-sm'>View test data</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApiKey