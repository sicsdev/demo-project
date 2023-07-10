"use client";
import { ShareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import Card from "../Common/Card/Card";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CreateAutomation from "../Automation/CreateAutomation";

const Integrationedit = (props) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [issuerefund, setIssuerefund] = useState(false);
  const [cancelsub, setCancelsub] = useState(false);
  const [pausesub, setPausesub] = useState(false);
  const [reactivesub, setReactivesub] = useState(false);
  const [issuecoupon, setIssuecoupon] = useState(false);
  const [payment, setPayment] = useState(false);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const handlerIssueRefundfalse = () => {
    setIssuerefund(false);
    setCancelsub(false);
    setPausesub(false);
    setIssuecoupon(false);
    setPayment(false);
    setReactivesub(false);
  };
  const handlerIssueRefund = () => {
    setIssuerefund(true);
  };
  const handlerCancelSubs = () => {
    setCancelsub(true);
  };
  const handlerPauseSubs = () => {
    setPausesub(true);
  };
  const handlerReactive = () => {
    setReactivesub(true);
  };
  const handlerIssueCoupon = () => {
    setIssuecoupon(true);
  };
  const handlerPaymentMethod = () => {
    setPayment(true);
  };

  return (
    <>
      {issuerefund ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                      ? "Cancel Subscription"
                      : pausesub
                        ? "Pause Subscription"
                        : reactivesub
                          ? "Reactivate Subscription"
                          : issuecoupon
                            ? "Issue Coupon / Promo / Credit "
                            : payment
                              ? "Add Payment Method"
                              : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8 text-[0.875rem]  sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>

          <div className="py-6 pr-6">
            <CreateAutomation handlerIssueRefundfalse={handlerIssueRefundfalse} />
          </div>
        </>
      ) : cancelsub ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                      ? "Cancel Subscription"
                      : pausesub
                        ? "Pause Subscription"
                        : reactivesub
                          ? "Reactivate Subscription"
                          : issuecoupon
                            ? "Issue Coupon / Promo / Credit "
                            : payment
                              ? "Add Payment Method"
                              : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <CreateAutomation />
          </div>
        </>
      ) : pausesub ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                      ? "Cancel Subscription"
                      : pausesub
                        ? "Pause Subscription"
                        : reactivesub
                          ? "Reactivate Subscription"
                          : issuecoupon
                            ? "Issue Coupon / Promo / Credit "
                            : payment
                              ? "Add Payment Method"
                              : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <CreateAutomation />
          </div>
        </>
      ) : reactivesub ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                      ? "Cancel Subscription"
                      : pausesub
                        ? "Pause Subscription"
                        : reactivesub
                          ? "Reactivate Subscription"
                          : issuecoupon
                            ? "Issue Coupon / Promo / Credit "
                            : payment
                              ? "Add Payment Method"
                              : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <CreateAutomation />
          </div>
        </>
      ) : issuecoupon ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                      ? "Cancel Subscription"
                      : pausesub
                        ? "Pause Subscription"
                        : reactivesub
                          ? "Reactivate Subscription"
                          : issuecoupon
                            ? "Issue Coupon / Promo / Credit "
                            : payment
                              ? "Add Payment Method"
                              : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8   text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <CreateAutomation />
          </div>
        </>
      ) : payment ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                      ? "Cancel Subscription"
                      : pausesub
                        ? "Pause Subscription"
                        : reactivesub
                          ? "Reactivate Subscription"
                          : issuecoupon
                            ? "Issue Coupon / Promo / Credit "
                            : payment
                              ? "Add Payment Method"
                              : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handlerIssueRefundfalse()}
              className="py-2 px-8  text-[0.875rem] sm:px-10 mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>
          <div className="py-6 pr-6">
            <CreateAutomation />
          </div>
        </>
      ) : (
        <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" />{" "}
                  {issuerefund
                    ? "Issue Refund"
                    : cancelsub
                      ? "Cancel Subscription"
                      : pausesub
                        ? "Pause Subscription"
                        : reactivesub
                          ? "Reactivate Subscription"
                          : issuecoupon
                            ? "Issue Coupon / Promo / Credit "
                            : payment
                              ? "Add Payment Method"
                              : "Billing Integrations"}
                </a>
              </li>
            </ul>
            <button
              onClick={() => props.setEdit(false)}
              className="p-4 text-[0.875rem]  sm:px-10 lg:mt-4 md:mt-4 sm:mt-0 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-sm font-semibold text-primary  ark:focus:ring-yellow-900 rounded-lg"
            >
              Back
            </button>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Issue Refund
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerIssueRefund}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Cancel Subscription{" "}
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerCancelSubs}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Pause Subscription
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerPauseSubs}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Reactivate Subscription
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerReactive}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Issue Coupon / Promo / Credit{" "}
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerIssueCoupon}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Add Payment Method
              </h3>
              <p className="text-sm my-2">Not configured</p>
            </div>
            <p
              className="cursor-pointer text-sm"
              onClick={handlerPaymentMethod}
            >
              Edit
            </p>
          </div>
          <hr className="border-border" />
        </Card>
      )}
    </>
  );
};

export default Integrationedit;
