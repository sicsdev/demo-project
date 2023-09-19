
import React from "react";

import Card from "../../Common/Card/Card";

import SkeletonLoader from "../../Skeleton/Skeleton";

 

const BasicDetailsReadOnly = ({ state, pageLoading = false }) => {

 

    return (

        <div>

            {pageLoading ?

                <div>

                    <div className="mt-3 grid grid-cols-[50%,50%] sm:grid-cols-[30%,70%]">

                        <SkeletonLoader count={1} height={20} width={150} />

                        <SkeletonLoader count={1} height={10} width={100} />

                    </div>

                    <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                    <div className="mt-3 grid grid-cols-[50%,50%] sm:grid-cols-[30%,70%]">

 

                        <SkeletonLoader count={1} height={20} width={150} />

                        <SkeletonLoader count={1} height={10} width={100} />

                    </div>

                    <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                    <div className="mt-3 grid grid-cols-[50%,50%] sm:grid-cols-[30%,70%]">

 

                        <SkeletonLoader count={1} height={20} width={150} />

                        <SkeletonLoader count={1} height={10} width={100} />

                    </div>

                    <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                    <div className="mt-3 grid grid-cols-[50%,50%] sm:grid-cols-[30%,70%]">

 

                        <SkeletonLoader count={1} height={20} width={150} />

                        <SkeletonLoader count={1} height={10} width={100} />

                    </div>

                    <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                    <div className="mt-3 grid grid-cols-[50%,50%] sm:grid-cols-[30%,70%]">

 

                        <SkeletonLoader count={1} height={20} width={150} />

                        <SkeletonLoader count={1} height={10} width={100} />

                    </div>

                    <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                    <div className="mt-3 grid grid-cols-[50%,50%] sm:grid-cols-[30%,70%]">

 

                        <SkeletonLoader count={1} height={20} width={150} />

                        <SkeletonLoader count={1} height={10} width={100} />

                    </div>

                    <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                    <div className="mt-3 grid grid-cols-[50%,50%] sm:grid-cols-[30%,70%]">

 

                        <SkeletonLoader count={1} height={20} width={150} />

                        <SkeletonLoader count={1} height={10} width={100} />

                    </div>

                    <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                </div>

                :

                <>

                    {state && (

                        <div>

                            <div className="mt-3 flex items-center justify-start gap-4">

                                <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23] ">

                                    Business Name

                                </h3>

                                <p className="  text-xs my-2">{state?.business_name}</p>

                            </div>

                            <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                            <div className="mt-3 flex items-center justify-start gap-4">

                                <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23]">

                                    Business Industry

                                </h3>

                                <p className="  text-xs my-2">{state?.business_industry}</p>

                            </div>

                            <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                            <div className="mt-3 flex items-center justify-start gap-4">

                                <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23]">

                                    Business Company Size

                                </h3>

                                <p className="text-xs my-2">{state?.business_company_size}</p>

                            </div>

                            <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                            <div className="mt-3 flex items-center justify-start gap-4">

                                <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23]">

                                    Business City

                                </h3>

                                <p className="  text-xs my-2">{state?.business_city}</p>

                            </div>

                            <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                            <div className="mt-3 flex items-center justify-start gap-4">

                                <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23]">

                                    Business Street

                                </h3>

                                <p className="text-xs my-2">{state?.business_street}</p>

                            </div>

                            <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                            <div className="mt-3 flex items-center justify-start gap-4">

                                <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23]">

                                    Business State

                                </h3>

                                <p className="text-xs my-2">{state?.business_state}</p>

                            </div>

                            <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div>

                            <div className="mt-3 flex items-center justify-start gap-4">

                                <h3 className=" w-1/2 sm:w-1/3 !font-semibold text-sm text-[#151d23]">

                                    Business Zipcode

                                </h3>

                                <p className="text-xs my-2">{state?.business_zipcode}</p>

                            </div>

                            {/* <div style={{ boxShadow: "rgba(21, 29, 35, 0.08) 0px 1px 1px inset" }} className="h-[1px] mt-4"></div> */}

                        </div>

                    )}

                </>

            }

        </div>

    );

};

 

export default BasicDetailsReadOnly;

 