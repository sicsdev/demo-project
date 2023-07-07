import React from "react";
import Card from "../../Common/Card/Card";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { logos } from "./logos_data";

const BasicDetailsReadOnly = ({ state }) => {
    const [logo, setLogo] = useState(null)
    useEffect(() => {

        const findLogo = logos.find((x) => x.name.toLowerCase() === state?.card?.brand.toLowerCase())
        if (findLogo) {
            setLogo(findLogo.logo)
        }

    }, [state])
    const makeCapital = (str) => {
        if (str?.includes(" ")) {
            return str
                .split(" ")
                .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
                .join(" ");
        } else {
            return str?.charAt(0).toUpperCase() + str?.slice(1);
        }
    };

     console.log("state, s", state)
    return (
        <div>
            {state?.card && (
                <div className="bg-white rounded-lg sm:p-5 md:p-5 lg:p-5 shadow-3xl p-5 mt-3">
                     <h3 className="text-start text-lg sm:text-lg md:text-lg lg:text-lg sm:leading-9 my-2 font-semibold text-heading">
                  Card Details
                </h3>
                    <div className=" text-start sm:flex md:flex lg:flex gap-6 items-center">
                        <div className="h-[30px]"
                            dangerouslySetInnerHTML={{ __html: logo }}
                        />
                        <div>
                            <h2 class="font-semibold text-md text-heading">
                                {makeCapital(state?.card?.brand)} ending in {state?.card?.last4}
                            </h2>
                            <p className="text-sm">
                                You need a primary billing method when a balance due. To remove this one, set a new primary billing
                                method first.
                            </p>
                        </div>
                    </div>


                </div>
            )}
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
