import React from "react";
import Card from "../../Common/Card/Card";
import SkeletonLoader from "../../Skeleton/Skeleton";

const BasicDetailsReadOnly = ({ state, pageLoading = false }) => {

    return (
        <div>
            {pageLoading ?
                <div>
                    <div className="mt-3">
                        <SkeletonLoader count={1} height={20} width={150} />
                        <SkeletonLoader count={1} height={10} width={100} />
                    </div>
                    <hr className="border-border" />
                    <div className="mt-3">

                        <SkeletonLoader count={1} height={20} width={150} />
                        <SkeletonLoader count={1} height={10} width={100} />
                    </div>
                    <hr className="border-border" />
                    <div className="mt-3">

                        <SkeletonLoader count={1} height={20} width={150} />
                        <SkeletonLoader count={1} height={10} width={100} />
                    </div>
                    <hr className="border-border" />
                    <div className="mt-3">

                        <SkeletonLoader count={1} height={20} width={150} />
                        <SkeletonLoader count={1} height={10} width={100} />
                    </div>
                    <hr className="border-border" />
                    <div className="mt-3">

                        <SkeletonLoader count={1} height={20} width={150} />
                        <SkeletonLoader count={1} height={10} width={100} />
                    </div>
                    <hr className="border-border" />
                    <div className="mt-3">

                        <SkeletonLoader count={1} height={20} width={150} />
                        <SkeletonLoader count={1} height={10} width={100} />
                    </div>
                    <hr className="border-border" />
                    <div className="mt-3">

                        <SkeletonLoader count={1} height={20} width={150} />
                        <SkeletonLoader count={1} height={10} width={100} />
                    </div>
                    <hr className="border-border" />
                </div>
                :
                <>
                    {state && (
                        <div>
                            <div className="mt-3">
                                <h3 className="font-semibold text-sm text-heading">
                                    Business Name
                                </h3>
                                <p className="text-xs my-2">{state?.business_name}</p>
                            </div>
                            <hr className="border-border" />
                            <div className="mt-3">
                                <h3 className="font-semibold text-sm text-heading">
                                    Business Industry
                                </h3>
                                <p className="text-xs my-2">{state?.business_industry}</p>
                            </div>
                            <hr className="border-border" />
                            <div className="mt-3">
                                <h3 className="font-semibold text-sm text-heading">
                                    Business Company Size
                                </h3>
                                <p className="text-xs my-2">{state?.business_company_size}</p>
                            </div>
                            <hr className="border-border" />
                            <div className="mt-3">
                                <h3 className="font-semibold text-sm text-heading ">
                                    Business City
                                </h3>
                                <p className="text-xs my-2">{state?.business_city}</p>
                            </div>
                            <hr className="border-border" />
                            <div className="mt-3">
                                <h3 className="font-semibold text-sm text-heading">
                                    Business Street
                                </h3>
                                <p className="text-xs my-2">{state?.business_street}</p>
                            </div>
                            <hr className="border-border" />
                            <div className="mt-3">
                                <h3 className="font-semibold text-sm text-heading">
                                    Business State
                                </h3>
                                <p className="text-xs my-2">{state?.business_state}</p>
                            </div>
                            <hr className="border-border" />
                            <div className="mt-3">
                                <h3 className="font-semibold text-sm text-heading">
                                    Business Zipcode
                                </h3>
                                <p className="text-xs my-2">{state?.business_zipcode}</p>
                            </div>
                            <hr className="border-border" />
                        </div>
                    )}
                </>
            }
        </div>
    );
};

export default BasicDetailsReadOnly;
