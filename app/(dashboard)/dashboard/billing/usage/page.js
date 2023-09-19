'use client'
import { BoltIcon, ChevronLeftIcon, ChevronUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
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
import Card from '@/app/components/Common/Card/Card';
import LoaderButton from '@/app/components/Common/Button/Loaderbutton';
import TextField from '@/app/components/Common/Input/TextField';
import Link from 'next/link';
import Button from '@/app/components/Common/Button/Button';
import { updateThresholds } from '@/app/API/pages/EnterpriseService';
import { successMessage } from '@/app/components/Messages/Messages';
import { ToastContainer } from 'react-toastify';
import SkeletonLoader from '@/app/components/Skeleton/Skeleton';
import TopBar from '@/app/components/Common/Card/TopBar';
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
  const [currentMonth, setCurrentMonth] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true, // Enable the tooltip
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y; // Get the y-axis value
            return `$${value}`; // Add a dollar sign and return the formatted label
          },
        },
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
    setFormData(state.enterprise.billing_thresholds.amount_gte);
    const response = await getPaymentHistory(state.stripe_data.stripe_id)
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];
    setCurrentMonth(currentMonthName)
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
  const handleInputValues = (event) => {
    let inputValue = event.target.value.replace(/[.,]/g, '');
    if (inputValue > 10000) {
      inputValue = 10000;
    }
    if (inputValue < 50 || inputValue > 10000) {
      setError(true);
    } else {
      setError(false);
    }

    setFormData(inputValue);
  };
  const SubmitForm = async () => {
    if (formData < 50 || formData > 10000) {
    } else {
      setBtnLoading(true);
      const response = await updateThresholds({
        billing_thresholds: { amount_gte: parseInt(formData) },
      });
      if (response.status === 200) {
        // successMessage("Form update successfully !")
        setBtnLoading(false);
      } else {
        setBtnLoading(false);
      }
    }
  };
  return (
    <>
      <div style={{ whiteSpace: "normal" }}>
        <TopBar title={`Usage`} icon={<CurrencyDollarIcon className="h-5 w-5 text-primary" />} />
      </div>
      {loading ?
        <div className='bg-white w-full sm:w-2/3 m-auto border rounded-lg border-[#F0F0F1] mt-5'>
          <div className='w-full py-4 px-6'>
            <SkeletonLoader count={1} height={20} width={"30%"} />
            <SkeletonLoader count={2} height={10} width={"100%"} />
            <SkeletonLoader count={1} height={30} width={"100%"} />
            <SkeletonLoader count={1} height={30} width={80} />
          </div>
          <div className='my-4 w-full py-4 px-6'>
            <SkeletonLoader count={1} height={20} width={150} />
            <SkeletonLoader count={4} height={10} width={"100%"} />
          </div>
          <div className='w-full py-4 px-6'>
            <SkeletonLoader count={1} height={15} width={80} />
            <SkeletonLoader count={1} height={20} width={100} />
          </div>
          <div className='my-2 w-full py-4 px-6'>
            <SkeletonLoader count={10} height={30} width={"100%"} />
          </div>
        </div>
        :
        <div>
          {data ?
            <>
              <div className="bg-white w-full sm:w-2/3 m-auto border rounded-lg border-[#F0F0F1] mt-5">
                <div className={`py-4 flex  justify-between  px-6  items-center gap-4 border-b border-[#F0F0F1]`}>
                  <div className="flex items-start sm:items-center  gap-2">
                    {/* <BoltIcon className="text-[#FF822D] w-5" /> */}
                    <p className="text-base font-medium text-[#151D23]">Billing Threshold</p>
                  </div>
                  <div className="flex items-center gap-4 "></div>
                </div>
                <div className={`overflow-hidden visible h-auto py-4 px-6`} style={{ transition: `all 0.2s ease-out 0s` }}>
                  <p className="text-xs my-2">
                    Your payment method on file will be charged each time your usage
                    hits your threshold. Your threshold is adjusted automatically
                    based on your usage. You can also edit it here.
                  </p>
                  <div className="relative">
                    <TextField
                      onChange={handleInputValues}
                      value={formData}
                      name="billing_thresholds"
                      className="py-3 mt-2  !pl-[23px]"
                      title={""}
                      placeholder={""}
                      type={"number"}
                      id={"billing_thresholds"}
                      paddingleft={"pl-6"}
                    />
                    {error ? (
                      <span className="text-[#ff0000] text-xs">
                        Please enter a whole number between 50 and $10,000.
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="absolute top-[13px] sm:top-[9px] left-[14px] text-[12px]">$</span>
                  </div>


                  <>
                    <Button
                      type={"button"}
                      className="inline-block mt-3 rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                      disabled={btnLoading === true}
                      onClick={(e) => SubmitForm()}
                    >
                      {btnLoading ? "Loading..." : "Save"}
                    </Button>
                  </>


                  <h1 className=" text-sm sm:leading-none mt-4 mb-2 text-heading">
                    Current usage
                  </h1>
                  <p className="text-xs mb-2">
                    Your total usage so far in {currentMonth} (UTC). Note that this may include
                    usage covered by a free trial or other credits, so your monthly
                    bill might be less than the value shown here.{" "}
                    {/* <Link
                      className="text-primary hover:text-border font-medium"
                      href={"/dashboard/billing/usage"}
                    >
                      View usage records
                    </Link> */}
                  </p><p className='text-xs my-2'>Below you'll find a summary of usage for your organization. All dates and times are UTC-based, and data may be delayed up to 24 hours.</p>

                  <p className="text-[16px] font-semibold sm:text-xs ml-[14px]">$ {totalUsage}</p>
                  <div className='flex justify-between items-center my-3'>
                    <div className='flex justify-between items-center gap-8'>
                      <p className='font-bold text-lg'>{curretYear}</p>
                    </div>
                  </div>
                  <Bar
                    data={data}
                    options={options}
                  />
                </div>
              </div>
              {/* <div className='w-full sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto my-5'>
                <Card>



                </Card>
              </div> */}
            </>
            :
            <div>
              <p className='mt-6 text-sm text-[#9CA3AF]'>No usage data</p>
            </div>
          }
        </div>
      }
      <ToastContainer />
    </>
  )
}

export default UsageLimit