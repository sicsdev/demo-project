import React, { useState, useEffect, useRef } from 'react';
import { Chart } from "chart.js/auto";

const TicketsDistributionPreview = () => {
  const chartRef = useRef(null);

  const [dataByMonth, setDataByMonth] = useState({
    January: [120, 200, 150, 80, 70, 90],
    February: [160, 180, 140, 90, 100, 120],
    March: [180, 220, 170, 100, 80, 110],
    April: [110, 190, 160, 70, 90, 130],
    May: [130, 210, 180, 100, 80, 140],
    June: [140, 230, 190, 120, 110, 150],
  });

  const [currentMonth, setCurrentMonth] = useState('');

  const handleClick = (month) => {
    setCurrentMonth(month);
  };

  useEffect(() => {
    const ctx = document.getElementById('distributionPreview').getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Refunds',
          'Cancellation Requests',
          'Account Issues',
          'Technical Support',
          'Billing Inquiries',
          'Feature Requests',
        ],
        datasets: [
          {
            label: 'Tickets',
            data: dataByMonth[currentMonth],
            backgroundColor: '#FF1654',
            borderColor: '#FF1654',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              borderColor: '#8c8c8c',
              borderDash: [1],
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
              callback: (value) => value.toFixed(0),
              color: '#8c8c8c',
            },
          },
        },
      },
    });

    const keys = Object.keys(dataByMonth);
    const lastKey = keys[keys.length - 1];
    setCurrentMonth(prevMonth => prevMonth || lastKey);

    return () => {
      chart.destroy();
    };

  }, [currentMonth]);

  return (
    <div>
      <div className="mx-auto my-auto">
      <div className='border border-gray-400 p-3 rounded-xl w-full h-fit my-auto shadow-xl hover:border-voilet'>
          <canvas id='distributionPreview'></canvas>
        </div>
      </div>
    </div>
  );
};

export default TicketsDistributionPreview;
