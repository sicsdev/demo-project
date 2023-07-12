'use client'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon, TicketIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const UsageLimit = () => {

  const [selectTab, setSelectedTab] = useState(0)
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
        mode: 'index',
        intersect: false,
        custom: (tooltipModel) => {
          // Disable tooltip on hover
          if (tooltipModel.opacity > 0) {
            // Hide tooltip
            tooltipModel.opacity = 0;
          }
        }
      },    

      title: {
        display: false, // Remove chart title
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          drawBorder: false,
          callback: (value) => `$${value}`, // Customize the y-axis label format
        },
      },
      x: {
        grid: {
          display: false, // Remove horizontal grid lines
        },
      },
    },
  };
  const labels = ['1 July', '2 July', '3 July', '4 July', '5 July', '6 July', '7 July'];
  const data = {
    labels,
    datasets: [
      {
        borderWidth: 1,
        barPercentage: 0.5, // Adjust the width of bars
        categoryPercentage: 0.8, // Adjust the spacing between bars
        label: '',
        data: [500, 400, 300, 200, 100, 50, 25],
        backgroundColor: '#2563eb',
      }
    ],
  };

  return (
    <div>
      <div className="border-b border-primary dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a href="#" className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group" aria-current="page">
              <TicketIcon className="h-6 w-6 text-gray-500" /> Usage
            </a>
          </li>

        </ul>
      </div>
      <div className='w-full sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto my-5'>
        <h3 className="font-bold text-xl md:text-xl lg:text-xl sm:text-xl sm:leading-none my-2 text-heading">Usage</h3>
        <p className='text-sm my-2'>Below you'll find a summary of API usage for your organization. All dates and times are UTC-based,
          and data may be delayed up to 5 minutes.</p>
        <div className='flex justify-between items-center my-3'>
          <div className='flex justify-between items-center gap-8'><ChevronLeftIcon className="h-8 w-8 text-gray" />
            <p className='font-bold text-lg'>July</p>
            <ChevronRightIcon className="h- w-8 text-gray" /></div>
          <div><ul className="hidden text-sm font-medium text-center  divide-x divide-gray rounded-lg shadow sm:flex ">
            <li className="w-full cursor-pointer" onClick={() => { setSelectedTab(0) }}>
              <a href="#" className={`inline-block w-full p-2 ${selectTab === 0 ? "text-white bg-border" : "bg-white text-heading"}  rounded-l-lg`} aria-current="page">DAILY</a>
            </li>
            <li className="w-full cursor-pointer" onClick={() => { setSelectedTab(1) }}>
              <a href="#" className={`inline-block w-full rounded-r-lg  p-2 ${selectTab === 1 ? "text-white bg-border" : "bg-white text-heading"}`}>CUMULATIVE</a>
            </li>
          </ul></div>
        </div>
        <Bar
          data={data}
          options={options}
        />
        <h3 className="font-bold text-base md:text-base lg:text-base sm:text-base sm:leading-none mt-2 text-heading">Usage this month
        </h3>
        <div className='flex items-center justify-start gap-3 my-2'>
          <div className="w-full h-4 bg-gray rounded-full">
            <div className="h-4 bg-primary rounded-full " style={{ width: "45%" }}></div>
          </div>
          <p className='text-sm text-border '>$1.47/$120.00</p>
        </div>
        <p className='text-xs text-heading'>Summary of monetary usage of Tempo across your organization. Results may be delayed.</p>
      </div>
    </div>
  )
}

export default UsageLimit