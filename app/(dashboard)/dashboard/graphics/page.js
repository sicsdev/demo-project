"use client";
import React from 'react'
import { useState } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
// import TicketsOverTime from '@/app/components/Dashboard/Graphics/TicketsOverTime';
// import TicketsDistribution from '@/app/components/Dashboard/Graphics/TicketsDistribution';
// import TicketsSpikes from '@/app/components/Dashboard/Graphics/TicketsSpikes';
// import TicketsOverTimePreview from '@/app/components/Dashboard/Graphics/Previews/TicketsOverTimePreview';
// import TicketsDistributionPreview from '@/app/components/Dashboard/Graphics/Previews/TicketsDistributionPreview';
// import TicketsSpikesPreview from '@/app/components/Dashboard/Graphics/Previews/TicketsSpikesPreview';

let TicketsOverTime
if (typeof window !== 'undefined') {
    TicketsOverTime = require('@/app/components/Dashboard/Graphics/TicketsOverTime').default;
  }

const Page = () => {

    const [selectedComponent, setSelectedComponent] = useState('TicketsDistribution');

    const handleComponentClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    return (
        <div>
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                    <a className="flex justify-start gap-2 items-center p-4 text-heading font-bold border-b-2 border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="graph">
                        <ChartBarIcon className="h-6 w-6 text-gray-500" /> Graphics
                    </a>
                </li>
            </ul>


            <div className='mt-4'>
                {/* <div className='justify-center lg:flex mb-5 gap-3'>
                    <div className='border rounded border-gray hover:border-voilet lg:w-1/3 mt-2' onClick={() => handleComponentClick('TicketsOverTime')}>
                        <TicketsOverTimePreview />
                    </div>
                    <div className='border rounded border-gray hover:border-voilet lg:w-1/3 mt-2' onClick={() => handleComponentClick('TicketsDistribution')}>
                        <TicketsDistributionPreview />
                    </div>
                    <div className='border rounded border-gray hover:border-voilet lg:w-1/3 mt-2' onClick={() => handleComponentClick('TicketsSpikes')}>
                        <TicketsSpikesPreview />
                    </div>
                </div>

                <div className='mt-5 pt-5'> 
                    {selectedComponent === 'TicketsOverTime' && <TicketsOverTime />}
                    {selectedComponent === 'TicketsDistribution' && <TicketsDistribution />}
                    {selectedComponent === 'TicketsSpikes' && <TicketsSpikes />}
                </div> */}

{/* 

                {(typeof window !== 'undefined') &&
                    <TicketsOverTime></TicketsOverTime>} */}


            </div>
        </div>
    )
}

export default Page