"use client";
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Chart } from "chart.js/auto";
import { OverTimeChartData } from './GraphsData/GraphsData';

const TicketsOverTime = () => {

    useEffect(() => {
        const ctx = document.getElementById('overTimeChart').getContext('2d');
        const myChart = new Chart(ctx, OverTimeChartData);

        return () => {
            myChart.destroy();
        };
    }, [])

    return (
        <div className="mt-5 rounded">
            <div className="lg:p-5">
                <h5 className="font-bold hover:text-black mb-5">Tickets/Interactions rate</h5>
                <div className='text-center text-orange'>
                     
                </div>
                <div className='flex justify-center my-2'>
                </div>
                <div className="w-100 flex mx-auto my-auto">
                    <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                        <canvas id='overTimeChart'></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketsOverTime