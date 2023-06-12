import React, { useState } from 'react'
import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import { useRef } from 'react';

const TicketsDistributionPreview = () => {

    const chartRef = useRef(null);

    const [currentMonth, setCurrentMonth] = useState('');
    const [dataByMonth, setDataByMonth] = useState({
        January: [120, 200, 150, 80, 70, 90],
        February: [160, 180, 140, 90, 100, 120],
        March: [180, 220, 170, 100, 80, 110],
        April: [110, 190, 160, 70, 90, 130],
        May: [130, 210, 180, 100, 80, 140],
        June: [140, 230, 190, 120, 110, 150]
    });

    const handleClick = (month) => {
        setCurrentMonth(month);
        console.log(month)
    };


    useEffect(() => {
        if (chartRef.current) {
          const options = {
            chart: {
              height: 200,
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
              data: dataByMonth
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
                  return val;
                }
              }
            },
            grid: {
              show: false,
            },
            series: [{
                name: 'Tickets',
                data: dataByMonth[currentMonth]
            }],
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
      }, [chartRef.current, dataByMonth]);


    return (
        <div className="mt-5 rounded cursor-pointer">
            <div className="">
                <h5 className="font-bold text-center text-gray hover:text-voilet">Tickets Distribution By Month</h5>
                <div className="lg:w-3/4 mx-auto">
                    <div ref={chartRef}></div>
                </div>
            </div>
        </div>
    )
}


export default TicketsDistributionPreview