"use client";
import React from 'react'
import { useState } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import TicketsOverTime from '@/app/components/Dashboard/Graphics/TicketsOverTime';
import TicketsDistribution from '@/app/components/Dashboard/Graphics/TicketsDistribution';
import TicketsSpikes from '@/app/components/Dashboard/Graphics/TicketsSpikes';
import TicketsOverTimePreview from '@/app/components/Dashboard/Graphics/Previews/TicketsOverTimePreview';
import TicketsDistributionPreview from '@/app/components/Dashboard/Graphics/Previews/TicketsDistributionPreview';
import TicketsSpikesPreview from '@/app/components/Dashboard/Graphics/Previews/TicketsSpikesPreview';
import GoogleAnalytics from './googleAnalytics';


const Page = () => {

    const [selectedComponent, setSelectedComponent] = useState('TicketsSpikes');

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
                <div className='justify-center lg:flex mb-5 gap-3'>
                    <div className='lg:w-1/3 mt-2 cursor-pointer' onClick={() => handleComponentClick('TicketsOverTime')}>
                        <small className='flex justify-center mb-1'>Tickets/Interactions Rate Over Time</small>
                        <TicketsOverTimePreview />
                    </div>
                    <div className='lg:w-1/3 mt-2 cursor-pointer' onClick={() => handleComponentClick('TicketsDistribution')}>
                        <small className='flex justify-center mb-1'>Tickets distribution/categories</small>
                        <TicketsDistributionPreview />
                    </div>
                    <div className='lg:w-1/3 mt-2 cursor-pointer' onClick={() => handleComponentClick('TicketsSpikes')}>
                        <small className='flex justify-center mb-1'>Tickets spikes</small>
                        <TicketsSpikesPreview />
                    </div>
                </div>

                <div className='mt-5 pt-5 w-3/4 m-auto'>
                    {selectedComponent === 'TicketsOverTime' && <TicketsOverTime />}
                    {selectedComponent === 'TicketsDistribution' && <TicketsDistribution />}
                    {selectedComponent === 'TicketsSpikes' && <TicketsSpikes />}
                </div>
            </div>
            {/* <GoogleAnalytics></GoogleAnalytics> */}
        </div>
    )
}

export default Page