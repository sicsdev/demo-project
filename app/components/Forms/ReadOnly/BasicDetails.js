import React from "react";
import Card from "../../Common/Card/Card";
import Image from "next/image";

const BasicDetailsReadOnly = ({ state }) => {
  return (
    <div>
      <div className="bg-white rounded-lg sm:p-5 md:p-5 lg:p-5 shadow-3xl p-5 mt-3">
        <div className="flex gap-6">
          <div className="relative w-[40px] h-[40px]">
            <Image
              fill="contain"
              src="/mastercard.png"
              className="bg-contain"
              alt="img"
            />
          </div>
          <div>
            <h2 class="font-semibold text-md text-heading mt-2">
              MasterCard ending in 1740
            </h2>
            <p className="mt-4">
              You need a primary billing method when you have active contracts
              or a balance due. To remove this one, set a new primary billing
              method first.
            </p>
          </div>
        </div>

        {/* <div className="grid grid-cols-2">
          <h3 className="text-start text-md sm:text-md md:text-md lg:text-md sm:leading-9 my-2 font-normal text-heading">
            Card Number: <span className="text-md">**4242</span>
          </h3>
          <h3 className="text-start text-md sm:text-md md:text-md lg:text-md sm:leading-9 my-2 font-normal text-heading">
            Exp: 04/2024
          </h3>
          <h3 className="text-start text-md sm:text-md md:text-md lg:text-md sm:leading-9 my-2 font-normal text-heading">
            Card: Visa
          </h3>
        </div> */}
      </div>
      {state && (
        <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Business Name
            </h3>
            <p className="text-sm my-2">{state?.business_name}</p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Business Industry
            </h3>
            <p className="text-sm my-2">{state?.business_industry}</p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Business Company Size
            </h3>
            <p className="text-sm my-2">{state?.business_company_size}</p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-xl text-heading">
              Business Address :
            </h3>

            <h3 className="font-semibold text-md text-heading mt-3">
              Business City
            </h3>
            <p className="text-sm my-2">{state?.business_city}</p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Business Street
            </h3>
            <p className="text-sm my-2">{state?.business_street}</p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Business State
            </h3>
            <p className="text-sm my-2">{state?.business_state}</p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Business Zipcode
            </h3>
            <p className="text-sm my-2">{state?.business_zipcode}</p>
          </div>
          <hr className="border-border" />
        </Card>
      )}
    </div>
  );
};

export default BasicDetailsReadOnly;
