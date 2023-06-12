import React from 'react'
import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import { useRef } from 'react';

const TicketsSpikes = () => {

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const options = {
                series: [{
                    name: 'Ticket Quantity',
                    data: [100, 150, 120, 180, 200, 250, 230, 280]
                }],
                chart: {
                    type: 'line',
                    stacked: false,
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 2,
                    strokeWidth: 5,
                    hover: {
                        size: 8
                    },
                },
                title: {
                    text: 'Cancellation Requests',
                    align: 'left'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 1,
                        stops: [0, 90, 100],
                        colorStops: [{
                            offset: 0,
                            color: ''
                        }, {
                            offset: 100,
                            color: '#FF0000'
                        }]
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        },
                    },
                    title: {
                        text: 'Quantity'
                    },
                },
                xaxis: {
                    type: 'category',
                    categories: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6', 'Week7', 'Week8'],
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            };

            const chart = new ApexCharts(chartRef.current, options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, []);



    return (
        <div className="mt-5 rounded">
            <div className='lg:p-5'>
                <h5 className="font-bold hover:text-black mb-5">Ticket Quantity Variation</h5>

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

                <div
                    ref={chartRef}
                    className="lg:w-3/4 mx-auto "
                />
                <div className='text-center text-orange'>
                    &#9888; We notice a increment in Cancellation Requests
                </div>
            </div>
        </div>
    )
}

export default TicketsSpikes