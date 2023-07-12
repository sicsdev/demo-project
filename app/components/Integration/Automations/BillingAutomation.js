import React from 'react';
import autoMationJsondata from "@/app/data/automation._data.json";
import { useState } from "react";
import Card from '../../Common/Card/Card';

export const BillingAutomation = ({ automationData, automationUpdateButton, ...rest }) => {
    const [disabledHoverItem, setDisabledHoverItem] = useState(null);
    const checkAutomationExists = (name) => {
        if (automationData && automationData?.length !== 0) {
            const valueExists = getObjectIfExists(automationData, 'name', name);
            return valueExists;
        } else {
            return null;
        }
    };

    const getObjectFromArray = (array, key, value) => {
        return array.find((item) => item[key] === value);
    };

    const getObjectIfExists = (array, key, value) => {
        const foundObject = getObjectFromArray(array, key, value);
        return foundObject || null; // Return null if the object doesn't exist
    };

    const checkValuesInArray = () => {
        let valuesToCheck = ['Get Customer', 'Get Customer Payment History', 'Get Customer Subscription'];
        return valuesToCheck.every(value => {
            return automationData.some(item => item.name === value);
        });
    };

    const checkRequiredAutomations = (name) => {
        let requireAutomationNames = ['Get Customer', 'Get Customer Payment History', 'Get Customer Subscription'];
        if (requireAutomationNames?.includes(name) || checkValuesInArray()) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            {autoMationJsondata?.map((item, key) => (
                <div key={key}>
                    <div className="flex justify-between items-center mt-3">
                        <div className="">
                            <h3 className="font-semibold text-md text-heading">{item?.name}</h3>
                            <p className="text-sm my-2">{checkAutomationExists(item?.name) !== null ? item?.configure_text : item?.not_configured_text}</p>
                        </div>
                        {checkRequiredAutomations(item?.name) === true ? checkAutomationExists(item?.name) !== null ?
                            <p className="cursor-pointer text-sm" onClick={(e) => automationUpdateButton(item?.name, checkAutomationExists(item?.name), 'update')}>Edit</p> :
                            <p className="cursor-pointer text-sm" onClick={(e) => automationUpdateButton(item?.name, null, 'create')}>Configure</p>
                            :
                            <div className="cursor-pointer relative" onMouseLeave={() => setDisabledHoverItem(null)} >
                                <span
                                    className="cursor-pointer text-sm text-[#9CA3AF]"
                                    onMouseEnter={(e) => {
                                        e.stopPropagation();
                                        setDisabledHoverItem(key);
                                    }}
                                >
                                    Configure
                                </span>
                                {disabledHoverItem === key && (
                                    <Card className={"animate-fadeIn w-[320px] sm:w-[430px] absolute z-50 top-[50px] bg-white right-0 sm:right-[18px]"} >
                                        <p className="text-heading" onMouseLeave={() => setDisabledHoverItem(null)} >
                                            Please configure <b>Get Customer</b>, <b>Get Customer Payment History</b>, and <b>Get Customer Subscription</b> before you configure the remaining automations since they depend on these preceding automations.
                                        </p>
                                    </Card>
                                )}
                            </div>
                        }
                    </div>
                    <hr className="border-border" />
                </div>
            ))}
        </>
    )
}
