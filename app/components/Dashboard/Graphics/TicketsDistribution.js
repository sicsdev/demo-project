'use client'
import React, { useState } from 'react'
import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import { useRef } from 'react';

const TicketsDistribution = () => {

    const chartRef = useRef(null);

    const [dataByMonth, setDataByMonth] = useState({
        January: [120, 200, 150, 80, 70, 90],
        February: [160, 180, 140, 90, 100, 120],
        March: [180, 220, 170, 100, 80, 110],
        April: [110, 190, 160, 70, 90, 130],
        May: [130, 210, 180, 100, 80, 140],
        June: [140, 230, 190, 120, 110, 150]
    });

    const [currentMonth, setCurrentMonth] = useState('');

    const handleClick = (month) => {
        setCurrentMonth(month);
    };

    useEffect(() => {
        if (chartRef.current) {
            const options = {
                chart: {
                    height: 350,
                    type: 'bar',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '40%',
                        endingShape: 'flat'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                colors: ['#FF1654'],
                series: [{
                    name: 'Tickets',
                    data: dataByMonth[currentMonth]
                }],
                xaxis: {
                    categories: ['Refunds', 'Cancellation Requests', 'Account Issues', 'Technical Support', 'Billing Inquiries', 'Feature Requests'],
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Tickets'
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                grid: {
                    borderColor: '#8c8c8c',
                    strokeDashArray: 1,
                    position: 'back',
                },
            };

            const chart = new ApexCharts(chartRef.current, options);
            chart.render();

            const keys = Object.keys(dataByMonth);
            const lastKey = keys[keys.length - 1];
            setCurrentMonth(prevMonth => prevMonth || lastKey);

            return () => {
                chart.destroy();
            };
        }
    }, [chartRef.current, currentMonth]);


    return (
        <div className="mt-5 rounded">
            <div className="lg:p-5">
                <h5 className="font-bold hover:text-black mb-5">Tickets Distribution By Month</h5>
                <div className="lg:w-3/4 mx-auto mt-4">

                    <div className="flex justify-center mb-4">
                        <div className="flex">
                            {Object.keys(dataByMonth).map((month) => (
                                <div className="mr-4" key={month}>
                                    <button
                                        className={`px-4 py-1 bg-gray-200 text-gray-800 rounded-lg ${currentMonth === month ? 'bg-[#FF1654] text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray'
                                            }`}
                                        onClick={() => handleClick(month)}
                                    >
                                        {month}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={chartRef}></div>

                </div>
            </div>
        </div>
    )
}


export default TicketsDistribution;