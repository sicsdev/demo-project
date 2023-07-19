"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Common/Button/Button";
import { CurrencyDollarIcon, TicketIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getPaymentHistory } from "@/app/API/pages/Usage";
import TextField from "@/app/components/Common/Input/TextField";
import { updateThresholds } from "@/app/API/pages/EnterpriseService";
import Swal from "sweetalert2";
import Loading from "@/app/components/Loading/Loading";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";

const UsageLimit = () => {
  const state = useSelector((state) => state.user.data);
  const [totalUsage, setTotalUsage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const getPaymentOldData = async () => {
    setFormData(state.enterprise.billing_thresholds.amount_gte);
    debugger
    const response = await getPaymentHistory(state.stripe_data.stripe_id);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonth];
    setCurrentMonth(currentMonthName)
    if (
      response.hasOwnProperty("response") &&
      response.response.hasOwnProperty("status")
    ) {
      setLoading(false);
    } else {
      const labels = [];
      for (let month = 0; month <= currentDate.getMonth(); month++) {
        const date = new Date(currentDate.getFullYear(), month, 1);
        const monthName = date.toLocaleString("default", { month: "long" });
        labels.push(monthName);
      }
      const amounts = labels.map((month) => {
        const monthData = response[currentYear][month];
        return monthData && monthData.length > 0 ? monthData[0].amount : 0;
      });
      const total = amounts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotalUsage(total);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      getPaymentOldData();
    }
  }, [state]);

  const handleInputValues = (event) => {
    let inputValue = event.target.value.replace(/[.,]/g, '');
    // if (inputValue < 50) {
    //   inputValue = 50;
    // } else if (inputValue > 10000) {
    //   inputValue = 10000;
    // }
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
        Swal.fire("Success", "Updated Form", "success");
        setBtnLoading(false);
        getPaymentOldData()
      } else {
        setBtnLoading(false);
      }
    }
  };
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <div className="border-b border-primary dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active  group"
                  aria-current="page"
                >
                  <CurrencyDollarIcon className="h-6 w-6 text-gray-500" />{" "}
                  Billing Threshold
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto my-5">
            <h3 className="font-bold text-xl md:text-xl lg:text-xl sm:text-xl sm:leading-none my-2 text-heading">
              Billing Threshold
            </h3>
            <p className="text-sm my-2">
              Your payment method on file will be charged each time your usage
              hits your threshold. Your threshold is adjusted automatically
              based on your usage. You can also edit it here.
            </p>
            <div className="relative">
              <TextField
                onChange={handleInputValues}
                value={formData}
                name="billing_thresholds"
                className="py-3 mt-1  "
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
              <span className="absolute top-[13px] left-[12px] text-sm">$</span>
            </div>
            <h3 className="font-bold text-base md:text-base lg:text-base sm:text-base sm:leading-none mt-2 text-heading">
              Current usage
            </h3>
            <p className="text-sm mt-1">
              Your total usage so far in {currentMonth} (UTC). Note that this may include
              usage covered by a free trial or other credits, so your monthly
              bill might be less than the value shown here.{" "}
              <Link
                className="text-primary hover:text-border font-medium"
                href={"/dashboard/billing/usage"}
              >
                View usage records
              </Link>
            </p>
            <p className="text-sm py-2">${totalUsage}</p>

            {btnLoading ? (
              <LoaderButton />
            ) : (
              <>
                <Button
                  type={"button"}
                  className="inline-block mt-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                  // disabled={DisablingButton()}
                  onClick={(e) => SubmitForm()}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UsageLimit;
