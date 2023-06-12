import React from 'react'
import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import { useRef } from 'react';

const TicketsOverTime = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const options = {
                chart: {
                    height: 350,
                    type: "area",
                    stacked: false
                },
                dataLabels: {
                    enabled: true
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
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                            color: "#FF1654"
                        },
                        labels: {
                            style: {
                                colors: "#FF1654"
                            }
                        },
                        title: {
                            text: "Tickets",
                            style: {
                                color: "#FF1654"
                            }
                        }
                    },
                    {
                        opposite: true,
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                            color: "#247BA0"
                        },
                        labels: {
                            style: {
                                colors: "#247BA0"
                            }
                        },
                        title: {
                            text: "Interactions",
                            style: {
                                color: "#247BA0"
                            }
                        }
                    }
                ],
                tooltip: {
                    shared: false,
                    intersect: true,
                    x: {
                        show: false
                    }
                },
                legend: {
                    horizontalAlign: "left",
                    offsetX: 10
                },
                markers: {
                    size: 5,
                },
                grid: {
                    borderColor: '#8c8c8c',
                    strokeDashArray: 1,
                    position: 'back',
                },
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
                <h5 className="font-bold text-center text-gray hover:text-black">Ticket/Interaction Count Over Time</h5>
                <div
                    ref={chartRef}
                    className="lg:w-3/4 mx-auto "
                />
            </div>
        </div>
    )
}

export default TicketsOverTime