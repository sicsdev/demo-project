"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBillingByBotID, getPaymentHistory } from "@/app/API/pages/Usage";
import TextField from "@/app/components/Common/Input/TextField";
import { updateThresholds } from "@/app/API/pages/EnterpriseService";
import { logos } from "@/app/components/Forms/ReadOnly/logos_data";
import React, { useEffect, useState } from "react";
import { InboxIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import BasicDetails from "@/app/components/Forms/BasicDetails";
import { useDispatch, useSelector } from "react-redux";
import { state_data } from "@/app/components/Forms/data/FormData";
import Button from "@/app/components/Common/Button/Button";
import Card from "@/app/components/Common/Card/Card";
import { createEnterpriseAccount } from "@/app/API/pages/EnterpriseService";
import { fetchProfile } from "@/app/components/store/slices/userSlice";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import { getBillingDetails, getPaymentDetails } from "@/app/API/pages/Checkout";
import Loading from "@/app/components/Loading/Loading";
import Billing from "@/app/components/Stripe/Billing/Billing";
import StripeWrapper from "@/app/components/Stripe/Wrapper/StripeWrapper";
import { errorMessages } from "@/app/components/error/message";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { successMessage } from "@/app/components/Messages/Messages";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import TopBar from "@/app/components/Common/Card/TopBar";
import BasicDetailsReadOnly from "@/app/components/Forms/ReadOnly/BasicDetails";
import { capitalizeFirstLetter } from "@/app/components/helper/firstLetterCapital";
import { getBotAllData } from "@/app/API/pages/Bot";

import { DocumentIcon, ChartBarIcon, CheckCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import StatusIndicator from "@/app/components/StatusIndicator/Status";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



const UsageLimit = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.data);

  // states start
  const [curretYear, setCurrentYear] = useState(null);
  const [totalUsage, setTotalUsage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [driveLoad, setDriveLoad] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [errors, setErrors] = useState(true);
  const [basicFormData, setBasicFormData] = useState(null);
  const [logo, setLogo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tab, setTab] = useState(0)
  const [allBots, setAllBots] = useState([])
  const [loadingCharBar, setLoadingCharBar] = useState(false)
  const [filters, setFilters] = useState({
    botId: ''
  })

  // states ends
  const parseAddress = (address) => {
    let returned = {};
    const splitAddr = address?.split(",");
    returned.zipcode = splitAddr[splitAddr.length - 1];
    returned.country = splitAddr[splitAddr.length - 2];
    returned.state = splitAddr[splitAddr.length - 3];
    returned.city = splitAddr[splitAddr.length - 4];
    returned.addrline = splitAddr[splitAddr.length - 5];
    return returned;
  };
  const returnStateName = (state) => {
    const find_state = state_data.find((x) => x.abbreviation === state.trim());
    if (find_state) {
      return find_state.name;
    }
    return "";
  };

  const sendLogos = (element) => {
    const findlogo = logos.find(
      (x) => x.name.toLowerCase() === element.toLowerCase()
    );
    if (findlogo) return findlogo.logo;
    return element;
  };

  function areObjectsEqual(obj1, obj2) {
    if (obj1) {
      for (let key in obj1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    }

    return false;
  }
  const getAbbrevationOfState = (abber) => {
    const findAbber = state_data.find((state) => state.name === abber);
    if (findAbber) {
      return findAbber.abbreviation;
    }
    return "";
  };

  const SubmitBusinessDetails = async () => {
    setLoading(true);
    let payload = {
      name: basicFormData.business_name,
      country: "US",
      address:
        basicFormData.business_street +
        ", " +
        basicFormData.business_city +
        ", " +
        getAbbrevationOfState(basicFormData.business_state) +
        ", USA" +
        ", " +
        basicFormData.business_zipcode,
      industry: basicFormData.business_industry,
      company_size: basicFormData.business_company_size,
      ecommerce_platform: basicFormData.ecommerce_platform,
    };
    const createEnterprise = await createEnterpriseAccount(payload);
    if (createEnterprise?.status === 201 || createEnterprise?.status === 200) {
      dispatch(fetchProfile());
      setLoading(false);
      successMessage("Successfully updated!");
      setIsEdit(true);
    } else {
      setErrors([createEnterprise.message]);
      setLoading(false);
    }
  };

  const DisablingButton = () => {
    const requiredKeys = [
      "business_street",
      "business_city",
      "business_zipcode",
      "business_state",
      "business_industry",
      "business_name",
      "business_company_size",
    ];

    return requiredKeys.some(
      (key) => !basicFormData[key] || basicFormData[key].trim() === ""
    );
  };

  const getBillingData = async () => {
    const customer_id = state?.stripe_data?.stripe_id;
    const resp = await getBillingDetails(customer_id);
    if (resp?.data?.length > 0) {
      setBasicFormData((prev) => {
        return {
          ...prev,
          card: resp.data,
        };
      });
      setUserData((prev) => {
        return {
          ...prev,
          card: resp.data,
        };
      });
      setError(null);
      setPageLoading(false);
    } else {
      setPageLoading(false);
      // setError(errorMessages.notFound);
    }
  };

  const getAllBots = async () => {
    let allbots = await getBotAllData()
    if (allbots?.results) {
      let botValues = allbots.results.map(bot => ({ name: bot.chat_title, id: bot.id }))
      setAllBots(botValues)
    }
  }

  // use effects start 
  useEffect(() => {
    if (state) {
      getPaymentOldData();
    }
    getAllBots()
  }, [state, filters]);

  // deboucing 
  const [typingTimeout, setTypingTimeout] = useState(null)


  useEffect(() => {
    if (state) {
      let address = parseAddress(state?.enterprise?.address);
      setBasicFormData((prev) => {
        return {
          ...prev,
          business_name: state?.enterprise?.name,
          country: "US",
          business_address: state?.enterprise?.address,
          business_industry: state?.enterprise?.industry,
          business_company_size: state?.enterprise?.company_size,
          ecommerce_platform: state?.enterprise?.ecommerce_platform,
          business_street: address.addrline,
          business_city: address.city,
          business_state: returnStateName(address.state ?? ""),
          business_zipcode: address.zipcode,
        }

      });

      setUserData({
        business_name: state?.enterprise?.name,
        country: "US",
        business_address: state?.enterprise?.address,
        business_industry: state?.enterprise?.industry,
        business_company_size: state?.enterprise?.company_size,
        ecommerce_platform: state?.enterprise?.ecommerce_platform,
        business_street: address.addrline,
        business_city: address.city,
        business_state: returnStateName(address.state ?? ""),
        business_zipcode: address.zipcode,
      });
    }
  }, [state]);

  useEffect(() => {
    if (basicFormData === null && state) getBillingData();
  }, [state]);
  // use effect ends

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true, // Enable the tooltip
        mode: "index",
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


    setLoadingCharBar(true)
    setFormData("$ " + state?.enterprise.billing_thresholds?.amount_gte);




    // Switch between fetch all usage or by bot.
    let response;
    if (filters.botId) {
      response = await getBillingByBotID(filters.botId)
      console.log(response)
    } else {
      response = await getPaymentHistory(state?.stripe_data?.stripe_id);
      console.log(response)
    }




    // If there is a bot filter active, we handle the logic to just fetch amounts by bot.
    if (filters.botId) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const labels = [];
      for (let month = 0; month <= currentDate.getMonth(); month++) {
        const date = new Date(currentDate.getFullYear(), month, 1);
        const monthName = date.toLocaleString("en-US", { month: "long" });
        labels.push(capitalizeFirstLetter(monthName));
      }
      let totalUsage = 0;
      let amounts = labels.map(month => {
        let amount = response[currentYear][month];
        totalUsage += amount;
        return amount;
      });
      setTotalUsage(totalUsage);
      console.log(amounts);
      setData({
        labels: labels,
        datasets: [
          {
            borderWidth: 1,
            barPercentage: 0.5,
            categoryPercentage: 0.8,
            label: "",
            data: amounts,
            backgroundColor: "#2563eb",
          },
        ],
      });
      setLoadingCharBar(false)
      setLoading(false);
      return
    }



    // If there is no bot filter, keep "all bots" logic.

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];
    setCurrentMonth(currentMonthName);
    if (
      response.hasOwnProperty("response") &&
      response.response.hasOwnProperty("status")
    ) {
      setCurrentYear(currentYear);
      setLoading(false);
    } else {
      setCurrentYear(currentYear);
      const labels = [];
      for (let month = 0; month <= currentDate.getMonth(); month++) {
        const date = new Date(currentDate.getFullYear(), month, 1);
        const monthName = date.toLocaleString("en-US", { month: "long" });
        labels.push(capitalizeFirstLetter(monthName));
      }

      let monthData;
      const getTotalAmount = (data) => {
        return data?.reduce((accumulator, transaccion) => {
          return accumulator + transaccion.amount;
        }, 0);
      };

      const amounts = labels.map((month) => {
        monthData = response[currentYear][month];
        return monthData && monthData.length > 0 ? getTotalAmount(monthData) : 0;
      });

      const total = getTotalAmount(monthData);

      setTotalUsage(total);

      console.log(amounts)
      setData({
        labels,
        datasets: [
          {
            borderWidth: 1,
            barPercentage: 0.5, // Adjust the width of bars
            categoryPercentage: 0.8, // Adjust the spacing between bars
            label: "",
            data: amounts,
            backgroundColor: "#2563eb",
          },
        ],
      });
      setLoading(false);
      setLoadingCharBar(false)
    }
  };
  const handleInputValues = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9$,.]/g, '');
    let numericValue = inputValue.replace(/[$,.]/g, '');
    if (numericValue > 10000) {
      numericValue = 10000;
    }
    const formattedValue = inputValue ? `$ ${numericValue}` : '';
    if (numericValue < 50 || numericValue > 10000) {
      setError(true);
    } else {
      setError(false);
      setFormData(formattedValue);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      const newTypingTimeout = setTimeout(() => {
        SubmitForm(formattedValue)
      }, 2000);
      setTypingTimeout(newTypingTimeout); // Assuming setTypingTimeout is the setter for typingTimeout state
    }


  };


  const SubmitForm = async (formData1) => {
    const apiValue = formData1.replace(/[$]/g, '');
    if (apiValue < 50 || apiValue > 10000) {
    } else {
      setBtnLoading(true);
      const response = await updateThresholds({
        billing_thresholds: { amount_gte: parseInt(apiValue) },
      });
      if (response.status === 200) {
        // successMessage("Form update successfully !")
        setBtnLoading(false);
        setDriveLoad(true)
        setTimeout(() => {
          setDriveLoad(false)
        }, 2000);
      } else {
        setBtnLoading(false);
      }
    }
  };



  return (
    <>
      <div style={{ whiteSpace: "normal" }}>
        <TopBar loader={pageLoading} title={`Billing Settings`} icon={<InboxIcon className="h-5 w-5 text-primary" />} />
        <div className={pageLoading ? " " : "border-b-2 border-border dark:border-gray-700 flex items-center justify-between"}>
          <ul className="flex flex-nowrap items-center overflow-x-auto sm:flex-wrap -mb-px text-sm font-[600] text-center  text-[#5b5e69]">

            <li className={` ${pageLoading ? "" : tab === 0 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(0) }}>
              {pageLoading ?
                <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                :
                <span
                  className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                  aria-current="page"
                >
                  Usage
                </span>
              }
            </li>
            <li className={` ${pageLoading ? "" : tab === 1 ? "boredractive" : 'boredrinactive hover:text-black'}`} onClick={() => { setTab(1) }}>
              {pageLoading ?
                <SkeletonLoader className="mr-2" count={1} height={30} width={60} />
                :
                <span
                  className={`flex  justify-start text-[13px] gap-2 cursor-pointer hover:bg-[#038ff408] px-3  items-center py-2  
                  rounded-lg active  group`}
                  aria-current="page"
                >
                  Billing
                </span>
              }
            </li>



          </ul>
        </div>

      </div>

      {tab === 0 && (

        <div className="bg-white w-full sm:w-[750px]   rounded-lg  mt-5 p-4">

          {loading ? (
            <div className="bg-white w-full  m-auto ">
              <div className="w-full py-4 px-6">
                <SkeletonLoader count={1} height={20} width={"30%"} />
                <SkeletonLoader count={2} height={10} width={"100%"} />
                <SkeletonLoader count={1} height={30} width={"100%"} />
                <SkeletonLoader count={1} height={30} width={80} />
              </div>
              <div className="my-4 w-full py-4 px-6">
                <SkeletonLoader count={1} height={20} width={150} />
                <SkeletonLoader count={4} height={10} width={"100%"} />
              </div>
              <div className="w-full py-4 px-6">
                <SkeletonLoader count={1} height={15} width={80} />
                <SkeletonLoader count={1} height={20} width={100} />
              </div>
              <div className="my-2 w-full py-4 px-6">
                <SkeletonLoader count={10} height={30} width={"100%"} />
              </div>
            </div>
          ) : (
            <div>
              {data ? (
                <>
                  <div className=" mt-5">
                    <div
                      className={`py-4 flex  justify-between  items-center gap-4 border-b border-[#F0F0F1]`}
                    >
                      <div className="flex items-start sm:items-center  gap-2">
                        {/* <BoltIcon className="text-[#FF822D] w-5" /> */}
                        <p className="text-base font-medium text-[#151D23]">
                          Billing Threshold
                        </p>
                      </div>
                      <div className="flex items-center gap-4 "></div>
                    </div>
                    <div
                      className={`overflow-hidden visible h-auto py-4 `}
                      style={{ transition: `all 0.2s ease-out 0s` }}
                    >
                      <p className="text-xs my-2 ">
                        Your payment method on file will be charged each time your
                        usage hits your threshold. Your threshold is adjusted
                        automatically based on your usage. You can also edit it
                        here.
                      </p>


                      {/* <div className="relative ">

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
                        <span className="absolute top-[19px] sm:top-[17px] left-[14px] text-[14px] sm:text-[12px] ">
                          $
                        </span>
                      </div> */}



                      <div className="relative flex items-center mt-1">
                        <input
                          onChange={handleInputValues}
                          value={formData || "$"}
                          className="w-1/2 new_input block border-[0.2px] bg-white  rounded-md shadow-sm placeholder-slate-400 focus:border-sky disabled:bg-slate-50 disabled:text-slate-500 border-input_color focus:bg-white focus:invalid:border-danger z-10"
                          placeholder=''
                          id='billing_thresholds'
                          name='billing_thresholds'
                          title={""}
                          type={"text"}
                        >
                        </input>

                      </div>

                      {error ? (
                        <span className="text-[#ff0000] text-xs">
                          Please enter a whole number between 50 and $10,000.
                        </span>
                      ) : (
                        ""
                      )}
                      <StatusIndicator loading={btnLoading} driveLoad={driveLoad} />
                      <div className=" sm:mt-1 ">


                        <p className="text-xs mb-2 py-4">
                          Your total usage so far in {currentMonth} (UTC) is <span className="text-primary font-bold"> ${totalUsage}.</span> Note that
                          this may include usage covered by a free trial or other
                          credits, so your monthly bill might be less than the value
                          shown here.{" "}
                          {/* <Link
                className="text-primary hover:text-border font-medium"
                href={"/dashboard/billing/usage"}
              >
                View usage records
              </Link> */}
                        </p>
                      </div>

                      <p className="text-xs my-2  border-b border-[#F0F0F1]  pb-4">
                        Below you'll find a summary of usage for your organization.
                        All dates and times are UTC-based, and data may be delayed
                        up to 24 hours.
                      </p>

                      <div className="flex justify-between items-center my-3 ">
                        <div className="flex justify-between items-center gap-8">
                          <p className="font-bold text-lg">{curretYear}</p>
                        </div>
                      </div>

                      <div className="w-full flex items-center sm:mt-0 justify-between sm:justify-end gap-4 my-4">
                        <div
                          className="w-full sm:w-auto flex items-center justify-between sm:justify-start flex-wrap"
                          style={{ rowGap: "4px" }}
                        >
                          {allBots?.length > 1 &&
                            allBots?.map((element, key) => (
                              <button
                                onClick={(e) => { setFilters({ ...filters, botId: element.id }) }}
                                key={key}
                                className={`flex items-center gap-2 justify-center font-semibold ${filters?.botId == element.id
                                  ? "text-white bg-primary"
                                  : "bg-white text-[#151D23]"
                                  } text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
                              >
                                {" "}
                                {element?.name}
                              </button>
                            ))}
                          {/* <button
                            onClick={(e) => { setFilters({ ...filters, botId: '' }) }}
                            key={'allbotsbutton'}
                            className={`flex items-center gap-2 justify-center font-semibold ${!filters?.botId
                              ? "text-white bg-primary"
                              : "bg-white text-[#151D23]"
                              } text-xs px-2 py-2 border-[#F0F0F1] leading-normal disabled:shadow-none transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-success-700 border-[1px] rounded-lg   mr-1 w-[120px] text-center`}
                          >
                            {" "}
                            All
                          </button> */}
                        </div>
                      </div>

                      <div className=" sm:w-[630px] sm:h-[291px] text-center m-auto">


                        {loadingCharBar ?
                          <SkeletonLoader count={1} height={300} width={500}></SkeletonLoader>
                          :
                          <Bar data={data} options={options} />
                        }
                      </div>
                    </div>
                  </div>
                  {/* <div className='w-full sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto my-5'>
          <Card>



          </Card>
        </div> */}
                </>
              ) : (
                <div>
                  <p className="mt-6 text-sm text-[#9CA3AF]">No usage data</p>
                </div>
              )}
            </div>
          )}


        </div>
      )}
      {tab === 1 && (
        <>
          <div className="flex justify-end items-center mt-4">
            {isEdit == true ? (
              <>
                <Button
                  type={"button"}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"

                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  type={"button"}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"

                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Back
                </Button>
              </>
            )}
          </div>
          {isEdit == true ? (
            <>
              <div className="bg-white m-auto border w-full sm:w-[750px] m-auto rounded-lg border-[#F0F0F1] mt-5 py-4">

                {pageLoading === true ? (
                  <>
                    <SkeletonLoader count={1} height={20} width={150} />
                    <div
                      className={
                        "grid grid-cols-1 mt-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4"
                      }
                    >
                      <div className="border border-border rounded-lg p-4 ">
                        <div className=" text-start flex gap-6 items-center">
                          <SkeletonLoader count={1} height={30} width={50} />

                          <div>
                            <SkeletonLoader count={1} height={20} width={60} />
                          </div>
                        </div>
                        <SkeletonLoader count={1} height={10} width={100} />
                        <SkeletonLoader count={1} height={10} width={50} />
                      </div>
                    </div>
                  </>

                ) : (
                  <>
                    {basicFormData && basicFormData?.card ? (
                      <>
                        <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23] mb-[1rem] px-[1rem] ">
                          Payment Methods
                        </h3>

                        <div
                          className={
                            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 px-[1rem]"
                          }
                        >
                          {basicFormData.card.map((element, key) => (
                            <div
                              className="border border-border rounded-lg p-4  "
                              key={key}
                            >
                              <div className=" text-start flex gap-6 items-center">
                                <div
                                  className="h-[30px] w-[50px]"
                                  dangerouslySetInnerHTML={{
                                    __html: sendLogos(element?.card?.brand),
                                  }}
                                />
                                <div>
                                  <h2 class=" font-normal text-sm text-heading">
                                    ****{element?.card?.last4}
                                  </h2>
                                </div>
                              </div>

                              <p className="text-border font-normal text-xs my-2">
                                Expires {element?.card?.exp_month}/
                                {element?.card?.exp_year}
                              </p>
                              {key === 0 && (
                                <p className="text-border font-normal text-xs mt-2">
                                  Default
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        <div
                          style={{
                            boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset",
                          }}
                          className="h-[1px] mt-4"
                        ></div>
                        {/* <hr className="mt-4 text-border" /> */}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                <BasicDetailsReadOnly
                  state={basicFormData}
                  pageLoading={pageLoading}
                />

              </div>

            </>
          ) : (
            <>
              <div className="bg-white w-full sm:w-[750px] m-auto border rounded-lg border-[#F0F0F1] mt-5 p-4">
                <StripeWrapper>
                  <h3 className=" mb-4 !font-semibold ">Add payment method</h3>
                  <p className="text-xs text-border mb-4">
                    This card will be charged based on your metered usage.{" "}
                  </p>
                  <Billing
                    basicFormData={basicFormData}
                    setShowBilling={setIsEdit}
                    getBillingData={getBillingData}
                  />
                </StripeWrapper>

                <div className="my-3">
                  <BasicDetails
                    form={false}
                    basicFormData={basicFormData}
                    setBasicFormData={setBasicFormData}
                  />
                </div>
                <div className={`flex p-2 rounded-b mt-5 justify-between`}>
                  <>
                    {loading ? (
                      <LoaderButton />
                    ) : (
                      <Button
                        type={"button"}
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                        onClick={(e) => {
                          SubmitBusinessDetails();
                        }}
                        disabled={
                          DisablingButton() ||
                          areObjectsEqual(basicFormData, userData)
                        }
                      >
                        Submit
                      </Button>
                    )}
                  </>
                </div>

              </div>
            </>
          )}
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default UsageLimit;
