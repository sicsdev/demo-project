import React from "react";
import Card from "../../Common/Card/Card";
import { useState } from "react";
import { useEffect } from "react";
import { InboxStackIcon } from "@heroicons/react/24/solid";

const BotSettingReadOnly = ({ basicFormData, setIsEdit }) => {
  // const [state, setState] = useState(null);
  // useEffect(() => {
  //   if (basicFormData) {
  //     setState(basicFormData);
  //   }
  // }, [basicFormData]);
  return (
    <>
      {/* <div className="flex items-center justify-between">
        <ul className="flex flex-wrap -mb-px text-md pb-4 font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a
              href="#"
              className="flex justify-start gap-2 items-center text-primary font-bold border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <InboxStackIcon className="h-6 w-6 text-gray-500" />
              Email Settings
            </a>
          </li>
        </ul>
      </div>
      <div> */}
        {/* {state && (
          <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">
                  Email Settings
                </h3>
                <p className="text-sm my-2"></p>
              </div>
              <p
                className="cursor-pointer text-sm"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </p>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">
                  Integration Settings
                </h3>
                <p className="text-sm my-2"></p>
              </div>
            </div>
            <hr className="border-border" />
          </Card>
        )} */}
        {/* <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Email Introduction
            </h3>
            <p className="text-sm my-2">
              {state?.email_introduction.split(" ")[0]}
            </p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Agent Job Title
            </h3>
            <p className="text-sm my-2">{state?.agent_title}</p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Email Sign-Off
            </h3>
            <p className="text-sm my-2">
              {state?.email_signOff.split(",")[0]} {state?.agent_name[0]}
            </p>
          </div>
          <hr className="border-border" />
          <div className="mt-3">
            <h3 className="font-semibold text-md text-heading">
              Agent Name(s)
            </h3>
            {state?.agent_name?.length > 0 &&
              state?.agent_name.map((ele, key) => (
                <p key={key} className="text-sm my-2">
                  {ele}
                </p>
              ))}
          </div>
          <hr className="border-border" />
        </Card> */}
      {/* </div> */}
    </>
  );
};

export default BotSettingReadOnly;
