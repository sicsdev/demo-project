"use client";
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Chart } from "chart.js/auto";
import { SpikesChartData } from './GraphsData/GraphsData';

const TicketsSpikes = () => {

    useEffect(() => {
        const ctx = document.getElementById('spikesChart').getContext('2d');
        const myChart = new Chart(ctx, SpikesChartData );

        return () => {
            myChart.destroy();
        };
    }, [])

    return (
        <div className="mt-5 rounded">
            <div className="lg:p-5">
                <h5 className="font-bold hover:text-black mb-5">Ticket Quantity Variation</h5>
                <div className='text-center text-orange'>
                    &#9888; We notice a increment in Cancellation Requests on week 7
                </div>
                <div className='flex justify-center my-2'>
                    <select className="block bg-transparent p-2 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select ticket</option>
                        <option value="Refunds">Refunds</option>
                        <option value="Cancellation Requests">Cancellation Requests</option>
                        <option value="Account Issues">Account Issues</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Billing Inquiries">Billing Inquiries</option>
                        <option value="Feature Requests">Feature Requests</option>
                    </select>
                </div>

                <div className="w-100 flex mx-auto my-auto">
                    <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                        <canvas id='spikesChart'></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketsSpikes