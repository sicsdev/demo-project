'use client'
import React from 'react'
import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import { useRef } from 'react';

const TicketsOverTimePreview = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const options = {
            chart: {
                height: 200,
                type: "area",
                stacked: false,
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#FF1654", "#247BA0"],
            series: [
                {
                    name: "Tickets",
                    data: [1, 2, 2.5, 1.5, 2.5, 2.8],
                    type: 'area'
                },
                {
                    name: "Interactions",
                    data: [20, 29, 37, 36, 44, 35],
                    type: 'area'
                },
            ],
            stroke: {
                width: [4, 4, 4]
            },
            plotOptions: {
                bar: {
                    columnWidth: "20%"
                }
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                labels: {
                    show: true
                }
            },
            legend: {
                show: true
            },
            grid: {
                show: false,
            },
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);


    return (
        <div className="mt-5 rounded cursor-pointer">
            <div className=''>
            <h5 className="font-bold text-center text-gray hover:text-voilet">Ticket/Interaction Count Over Time</h5>

                <div
                    ref={chartRef}
                    className="lg:w-3/4 mx-auto "
                />
            </div>
        </div>
    )
}

export default TicketsOverTimePreview