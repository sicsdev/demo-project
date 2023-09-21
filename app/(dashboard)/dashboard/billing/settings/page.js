"use client";
import BasicDetailsReadOnly from "@/app/components/Forms/ReadOnly/BasicDetails";
import React, { useEffect, useState } from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import BasicDetails from "@/app/components/Forms/BasicDetails";
import { useDispatch, useSelector } from "react-redux";
import { state_data } from "@/app/components/Forms/data/FormData";
import Button from "@/app/components/Common/Button/Button";
import Card from "@/app/components/Common/Card/Card";
import { createEnterpriseAccount } from "@/app/API/pages/EnterpriseService";
import { fetchProfile } from "@/app/components/store/slices/userSlice";
import LoaderButton from "@/app/components/Common/Button/Loaderbutton";
import { getBillingDetails, getPaymentDetails } from "@/app/API/pages/Checkout";
import { logos } from "@/app/components/Forms/ReadOnly/logos_data";
import Loading from "@/app/components/Loading/Loading";
import Billing from "@/app/components/Stripe/Billing/Billing";
import StripeWrapper from "@/app/components/Stripe/Wrapper/StripeWrapper";
import { errorMessages } from "@/app/components/error/message";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { successMessage } from "@/app/components/Messages/Messages";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
const Page = () => {
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
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [errors, setErrors] = useState(true);
  const [basicFormData, setBasicFormData] = useState(null);
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  console.log("userData", userData);
  useEffect(() => {
    if (state.data) {
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
      
    setUserData({
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
    const customer_id = state?.data?.stripe_data?.stripe_id;
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
      setError(errorMessages.notFound);
    }
  };
  useEffect(() => {
    if (basicFormData === null && state?.data) getBillingData();
  }, [state?.data]);
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


  return (
    <div style={{ whiteSpace: "normal" }}>
      <div className="border-b border-border flex items-center justify-between">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          <li className="mr-2">
            <span
              className={`flex justify-start gap-2 items-center  py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group`}
              aria-current="page"
            >
              <WrenchScrewdriverIcon className="h-5 w-5 text-primary" /> Billing
              Settings
            </span>
          </li>
        </ul>
        {isEdit == true ? (
          <>
            <p
              className="text-sm cursor-pointer"
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
              className="text-sm cursor-pointer"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Back
            </p>
          </>
        )}
      </div>
      <>
        {isEdit == true ? (
          <>
            <div className="bg-white m-auto border w-full m-auto rounded-lg border-[#F0F0F1] mt-5 py-4">
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
                          "grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 px-[1rem]"
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
            <div className="bg-white w-full sm:w-2/3 m-auto border rounded-lg border-[#F0F0F1] mt-5 p-4">
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

      <ToastContainer />
    </div>
  );
};

export default Page;
