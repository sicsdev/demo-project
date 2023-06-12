import React from 'react'
import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import { useRef } from 'react';

const TicketsSpikesPreview = () => {

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
              height: 200,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                show: false
              }
            },
            dataLabels: {
              enabled: false
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
        }
      }, [chartRef.current]);
    



    return (
        <div className="mt-5 rounded cursor-pointer">
            <div className=''>
                <h5 className="font-bold text-center text-gray hover:text-voilet">Ticket Quantity Variation</h5>
                <div
                    ref={chartRef}
                    className="lg:w-3/4 mx-auto "
                />
            </div>
        </div>
    )
}

export default TicketsSpikesPreview