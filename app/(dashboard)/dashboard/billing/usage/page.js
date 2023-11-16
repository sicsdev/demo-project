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
import { getPaymentHistory } from "@/app/API/pages/Usage";
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
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [errors, setErrors] = useState(true);
  const [basicFormData, setBasicFormData] = useState(null);
  const [logo, setLogo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tab, setTab] = useState(0)
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
  // use effects start 
  useEffect(() => {
    if (state) {
      getPaymentOldData();
    }
  }, [state]);
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
    console.log(state)
    setFormData(state?.enterprise.billing_thresholds?.amount_gte);
    const response = await getPaymentHistory(state?.stripe_data?.stripe_id);
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
        const monthName = date.toLocaleString("default", { month: "long" });
        labels.push(monthName);
      }

      let monthData;
      const getTotalAmount = (data) => {
        return data.reduce((accumulator, transaccion) => {
          return accumulator + transaccion.amount;
        }, 0);
      };

      const amounts = labels.map((month) => {
        monthData = response[currentYear][month];
        return monthData && monthData.length > 0 ? getTotalAmount(monthData) : 0;
      });

      const total = getTotalAmount(monthData);


      setTotalUsage(total);
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
    }
  };

  const handleInputValues = (event) => {
    let inputValue = event.target.value.replace(/[.,]/g, "");
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
        <TopBar title={`Billing Settings`} icon={<InboxIcon className="h-5 w-5 text-primary" />} />
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
                  Billing
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
                  Usage
                </span>
              }
            </li>



          </ul>
        </div>

      </div>

      {tab === 0 && (

        <div className="bg-white w-full sm:w-[750px] m-auto border rounded-lg border-[#F0F0F1] mt-5 p-4">

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
                        <span className="absolute top-[13px] sm:top-[9px] left-[14px] text-[12px] ">
                          $
                        </span>
                      </div> */}



                      <div className="relative flex items-center mt-1">
                        <small className="z-50 m-auto opacity-80 absolute inset-y-0 left-0 flex items-center pointer-events-none mx-2">
                          $
                        </small>
                        <input
                          style={{ paddingLeft: '25px' }}
                          onChange={handleInputValues}
                          value={formData}
                          className="w-1/2 new_input block border-[0.2px] bg-white  rounded-md shadow-sm placeholder-slate-400 focus:border-sky disabled:bg-slate-50 disabled:text-slate-500 border-input_color focus:bg-white border-danger focus:invalid:border-danger z-10"
                          placeholder=''
                          id='billing_thresholds'
                          name='billing_thresholds'
                          title={""}
                          type={"number"}
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






















                      <div className="border-b border-[#F0F0F1]  py-4">
                        <Button
                          type={"button"}
                          className="inline-block mt-3 rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium  leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                          disabled={btnLoading === true}
                          onClick={(e) => SubmitForm()}
                        >
                          {btnLoading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                          </svg>
                            <span>Loading...</span> </> : "Save"}
                        </Button>
                      </div>
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
                      <div className=" sm:w-[630px] sm:h-[291px] text-center m-auto">


                        <Bar data={data} options={options} />
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
