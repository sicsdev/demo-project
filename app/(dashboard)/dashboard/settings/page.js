"use client";
import BasicDetailsReadOnly from "@/app/components/Forms/ReadOnly/BasicDetails";
import React, { useEffect, useState } from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import BasicDetails from "@/app/components/Forms/BasicDetails";
import { useDispatch, useSelector } from "react-redux";
import { state_data } from "@/app/components/Forms/data/FormData";
import Button from "@/app/components/Common/Button/Button";
import { getBillingDetails, getPaymentDetails } from "@/app/API/pages/Checkout";
import Billing from "@/app/components/Stripe/Billing/Billing";
import StripeWrapper from "@/app/components/Stripe/Wrapper/StripeWrapper";
import Card from "@/app/components/Common/Card/Card";
import { createEnterpriseAccount } from "@/app/API/pages/EnterpriseService";
import { fetchProfile } from "@/app/components/store/slices/userSlice";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import Swal from "sweetalert2";
const Page = () => {
  const parseAddress = (address) => {
    let returned = {};
    const splitAddr = address?.split(",");
    returned.zipcode = splitAddr[splitAddr.length - 1];
    returned.country = splitAddr[splitAddr.length - 2];
    returned.state = splitAddr[splitAddr.length - 3];
    returned.city = splitAddr[splitAddr.length - 4];
    returned.addrline = splitAddr[splitAddr.length - 5];

    // returned.addrline = returned.addrline
    return returned;
  };
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(true);
  const [showBilling, setShowBilling] = useState(false);
  const [basicFormData, setBasicFormData] = useState(null);
  const getBillingData = async () => {
    const response = await getPaymentDetails();
    if (response.results.length > 0) {
      const customer_id = response.results[0].stripe_id;
      const resp = await getBillingDetails(customer_id);
      if (resp?.data.length > 0) {
        setBasicFormData((prev) => {
          return {
            ...prev,
            card: resp.data[0].card,
          };
        });
      }
    }
  };
  useEffect(() => {
    if (state.data) {
      getBillingData();
      let address = parseAddress(state?.data?.enterprise?.address);
      setBasicFormData({
        business_name: state?.data?.enterprise?.name,
        country: "US",
        business_address: state?.data?.enterprise?.address,
        business_industry: state?.data?.enterprise?.industry,
        business_company_size: state?.data?.enterprise?.company_size,
        ecommerce_platform: state?.data?.enterprise?.ecommerce_platform,
        business_street: address.addrline,
        business_city: address.city,
        business_state: returnStateName(address.state ?? ""),
        business_zipcode: address.zipcode,
      });
    }
  }, [state.data]);
  const returnStateName = (state) => {
    const find_state = state_data.find((x) => x.abbreviation === state.trim());
    if (find_state) {
      return find_state.name;
    }
    return "";
  };
  const getAbbrevationOfState = (abber) => {
    const findAbber = state_data.find((state) => state.name === abber);
    if (findAbber) {
      return findAbber.abbreviation;
    }
    return "";
  };
  const SubmitBusinessDetails = async () => {
    setLoading(true);
    debugger;
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
    if (createEnterprise?.status === 201) {
      dispatch(fetchProfile());
      setLoading(false);
      Swal.fire("Success", "Updated Form", "success");
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

    return false;
  };
  const makeCapital = (str) => {
    if (str.includes(" ")) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  };
  return (
    <div>
      {isEdit == true ? (
        <>
          <p
            className="float-right my-5 cursor-pointer"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            Edit
          </p>
        </>
      ) : (
        <>
          <p
            className="float-right my-5 cursor-pointer"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Back
          </p>
        </>
      )}
      <div className="border-b border-primary dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a
              href="#"
              className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" />{" "}
              Settings
            </a>
          </li>
        </ul>
      </div>
      {isEdit == true ? (
        <>
          <BasicDetailsReadOnly state={basicFormData} />
        </>
      ) : (
        <>
          <Card className={"my-5"}>
            {showBilling ? (
              <div className="flex justify-between items-center">
                <h3 className="text-center text-lg sm:text-lg md:text-lg lg:text-lg sm:leading-9 my-2 font-semibold text-heading">
                  Billing
                </h3>
                <p
                  className=" cursor-pointer"
                  onClick={() => {
                    setShowBilling(false);
                  }}
                >
                  Back
                </p>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <h3 className="text-center text-lg sm:text-lg md:text-lg lg:text-lg sm:leading-9 my-2 font-semibold text-heading">
                  Card Details
                </h3>

                <p
                  className="cursor-pointer"
                  onClick={() => {
                    setShowBilling(true);
                  }}
                >
                  Edit
                </p>
              </div>
            )}

            {showBilling ? (
              <StripeWrapper>
                <Billing
                  basicFormData={basicFormData}
                  setShowBilling={setShowBilling}
                  getBillingData={getBillingData}
                />
              </StripeWrapper>
            ) : (
              <>
                {basicFormData?.card && (
                  <div className="grid grid-cols-2">
                    <h3 className="text-start text-md sm:text-md md:text-md lg:text-md sm:leading-9 my-2 font-normal text-heading">
                      Card Number:{" "}
                      <span className="text-md">
                        {basicFormData.card.last4}
                      </span>
                    </h3>
                    <h3 className="text-start text-md sm:text-md md:text-md lg:text-md sm:leading-9 my-2 font-normal text-heading">
                      Exp: {basicFormData.card.exp_month}/
                      {basicFormData.card.exp_year}
                    </h3>
                    <h3 className="text-start text-md sm:text-md md:text-md lg:text-md sm:leading-9 my-2 font-normal text-heading">
                      Card: {makeCapital(basicFormData.card.brand)}
                    </h3>
                  </div>
                )}
              </>
            )}
          </Card>
          <Card className={"my-5"}>
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
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                    onClick={(e) => {
                      SubmitBusinessDetails();
                    }}
                    disabled={DisablingButton()}
                  >
                    Submit
                  </Button>
                )}
              </>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Page;
