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
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPaymentHistory } from '@/app/API/pages/Usage';
import Loading from '@/app/components/Loading/Loading';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const UsageLimit = () => {
  const state = useSelector((state) => state.user.data);
  const [curretYear, setCurrentYear] = useState(null)
  const [totalUsage, setTotalUsage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
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

  const getPaymentOldData = async () => {
    const response = await getPaymentHistory(state.stripe_data.stripe_id)
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (response.hasOwnProperty('response') && response.response.hasOwnProperty('status')) {
      setCurrentYear(currentYear)
      setLoading(false)
    } else {
      setCurrentYear(currentYear)
      const labels = [];
      for (let month = 0; month <= currentDate.getMonth(); month++) {
        const date = new Date(currentDate.getFullYear(), month, 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
        labels.push(monthName);
      }
      const amounts = labels.map(month => {
        const monthData = response[currentYear][month];
        return monthData && monthData.length > 0 ? monthData[0].amount : 0;
      });
      const total = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setTotalUsage(total)
      setData({
        labels,
        datasets: [
          {
            borderWidth: 1,
            barPercentage: 0.5, // Adjust the width of bars
            categoryPercentage: 0.8, // Adjust the spacing between bars
            label: '',
            data: amounts,
            backgroundColor: '#2563eb',
          }
        ],
      })
      setLoading(false)
    }

  }
  useEffect(() => {
    if (state) {
      getPaymentOldData()
    }
  }, [state])

  return (
    <>
      {loading ? <Loading /> :
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
          {data ?
          <div className='w-full sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto my-5'>
            <h3 className="font-bold text-xl md:text-xl lg:text-xl sm:text-xl sm:leading-none my-2 text-heading">Usage</h3>
            <p className='text-sm my-2'>Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 24 hours.</p>
            <div className='flex justify-between items-center my-3'>
              <div className='flex justify-between items-center gap-8'>
                <p className='font-bold text-lg'>{curretYear}</p>
              </div>
            </div>
            <Bar
              data={data}
              options={options}
            />
            <h3 className="font-bold text-base md:text-base lg:text-base sm:text-base sm:leading-none mt-2 text-heading">Usage this month
            </h3>
            <p className='text-xs text-heading'>${totalUsage}</p>
          </div>
          :
          <div>
            <p className='mt-6 text-sm text-[#9CA3AF]'>No usage data</p>
          </div>
          }
        </div>
      }
    </>
  )
}

export default UsageLimit