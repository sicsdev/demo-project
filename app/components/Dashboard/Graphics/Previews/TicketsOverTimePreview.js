"use client";
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Chart } from "chart.js/auto";
import { OverTimeChartData } from '../GraphsData/GraphsData';

const TicketsOverTimePreview = () => {

    useEffect(() => {
        const ctx = document.getElementById('overTimePreview').getContext('2d');
        const myChart = new Chart(ctx, OverTimeChartData);

        return () => {
            myChart.destroy();
        };
    }, [])

    return (
        <div>
            <div className="mx-auto my-auto">
                <div className='border border-gray-400 p-3 rounded-xl w-full h-fit my-auto shadow-xl hover:border-voilet'>
                    <canvas id='overTimePreview'></canvas>
                </div>
            </div>
        </div>
    )
}

export default TicketsOverTimePreview