"use client";
import React, { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import Card from "@/app/components/Common/Card/Card";
import Integrationedit from "@/app/components/Integration/page";

const Page = () => {
  const [edit, setEdit] = useState(false);

  const handlerEdit = () => {
    setEdit(true);
  };
  const handlerBack = () => {
    setEdit(false);
  };

  return (
    <>
      <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <a
              href="#"
              className=" flex justify-start gap-2 items-center p-4 text-heading font-bold border-b-2 border-heading rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <ShareIcon className="h-6 w-6 text-gray-500" /> Integration
            </a>
          </li>
        </ul>
        {edit ? (
          <p className="cursor-pointer text-sm" onClick={handlerBack}>
            back
          </p>
        ) : (
          <p className="cursor-pointer text-sm" onClick={handlerEdit}>
            Edit
          </p>
        )}
      </div>
      {/* <p className='text-center mt-60'>Coming soon...</p> */}
      {!edit ? (
        <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">Billing</h3>
              <p className="text-sm my-2">dummy</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerEdit}>
              Edit
            </p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">
                Social Media Channels
              </h3>
              <p className="text-sm my-2">dummy</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerEdit}>Edit</p>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">Phone</h3>
              <p className="text-sm my-2">dummy</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerEdit}>Edit</p>
          </div>
          <hr className="border-border" />

          <div className="flex justify-between items-center mt-3">
            <div className="">
              <h3 className="font-semibold text-md text-heading">Email</h3>
              <p className="text-sm my-2">dummy</p>
            </div>
            <p className="cursor-pointer text-sm" onClick={handlerEdit}>Edit</p>
          </div>

          <hr className="border-border" />
        </Card>
      ) : (
        ""
      )}

      {edit ? <Integrationedit /> : ""}
    </>
  );
};

export default Page;
