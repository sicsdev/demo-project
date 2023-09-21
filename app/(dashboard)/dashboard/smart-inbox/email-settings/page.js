'use client'
import React from 'react'
import { InboxIcon, UsersIcon } from '@heroicons/react/24/outline';
import QuickStart from '@/app/components/Dashboard/QuickStart';
import TopBar from '@/app/components/Common/Card/TopBar';
import EmailAgentSetting from '@/app/components/EmailAgentSetting/EmailAgentSetting';
import { useState } from 'react';
import Button from '@/app/components/Common/Button/Button';

const Page = () => {
    const [basicFormData, setBasicFormData] = useState({});

    const DisablingButton = () => {
        const requiredKeys = ["email_prefix", "custom_email", "company_name"];
        return requiredKeys.some(
            (key) => !basicFormData[key] || basicFormData[key].trim() === ""
        );
    }

    const SubmitForm = () => {
        console.log("I am in progress!")
    };

    return (
        <div style={{ whiteSpace: "normal" }}>
            <TopBar title={`Email Settings`} icon={<InboxIcon className="h-5 w-5 text-primary" />} />
            <div className="bg-white w-full sm:w-2/3 m-auto border rounded-lg border-[#F0F0F1] mt-5 p-4">
                <EmailAgentSetting
                    basicFormData={basicFormData}
                    setBasicFormData={setBasicFormData}
                    form={false}
                />
                <div className={`flex  p-2 rounded-b mt-5 justify-end`}>
                    <Button
                        type={"button"}
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
                        disabled={DisablingButton()}
                        onClick={(e) => SubmitForm()}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Page