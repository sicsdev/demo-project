'use client'
import Button from '@/app/components/Common/Button/Button'
import { AdjustmentsHorizontalIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
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
import SelectField from '@/app/components/Common/Input/SelectField'
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
        data: [500,400,300,200,100,50,25],
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
        {/* <div className='w-full sm:w-[50%] md:w-[50%] lg:w-[50%] flex justify-start gap-4 my-2'>
          <SelectField
            // onChange={handleInputValues}
            // value={formValues.business_state}
            name="days"
            values={["All org members"]}
            title={""}
            id={"days"}
            className="py-3"
          // error={returnErrorMessage("business_state")}
          />
          <SelectField
            // onChange={handleInputValues}
            // value={formValues.business_state}
            name="days"
            values={["Select a day"]}
            title={""}
            id={"days"}
            className="py-3"
          // error={returnErrorMessage("business_state")}
          />
        </div>
        <Button
          type={"button"}
          className="inline-block mt-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
        // disabled={DisablingButton()}
        // onClick={(e) => SubmitForm()}
        >
          Save
        </Button> */}
        <p className='text-xs text-heading'>Summary of monetary usage of Tempo across your organization. Results may be delayed.</p>
      </div>
    </div>
  )
}

export default UsageLimit