"use client";
import React, { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import Card from "@/app/components/Common/Card/Card";
import Integrationedit from "@/app/components/Integration/page";
import Integrationemail from "@/app/components/Integrationemail/page";
import Button from "@/app/components/Common/Button/Button";
import {
  addIntegration,
  getAllIntegration,
  modifyIntegration,
} from "@/app/API/pages/Bot";
import { useEffect } from "react";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(false);

  const handlerEdit = () => {
    setEdit(true);
  };
  const handlerBack = () => {
    setEdit(false);
  };

  const handlerIntegrationEmail = () => {
    setEmail(true);
  };

  // add integration

  const [showIntegrationModal, setShowintegrationmodal] = useState(false);
  const [editIntegrationModal, setEditintegrationmodal] = useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const handlerValue1 = (e) => {
    setValue1(e.target.value);
  };

  const handlerValue2 = (e) => {
    setValue2(e.target.value);
  };

  const handlerValue3 = (e) => {
    setValue3(e.target.value);
  };

  const handlerIntegrationSubmit = (e) => {
    e.preventDefault();
    let payload = {
      type: "BILLING",
      provider: "stripe",
      data: {
        key1: value1,
        key2: value2,
        key3: value3,
      },
    };
    addIntegration(payload);
  };

  // get integration
  const [integrationdata, setIntegrationdata] = useState([]);

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const data = await getAllIntegration();
        setIntegrationdata(data);
        setId(data);
      } catch (error) {}
    };
    fetchIntegrations();
  }, []);

  // update integration
  const handler_Editpopup = (id) => {
    setEditintegrationmodal(true);
    console.log(id,"sddddd")
  }
  const [id, setId] = useState("");

  const [updatevalue1, setUpdateValue1] = useState("");
  const [updatevalue2, setUpdateValue2] = useState("");
  const [updatevalue3, setUpdateValue3] = useState("");

  const handlerUpdatevalue1 = (e) => {
    setUpdateValue1(e.target.value);
  };

  const handlerUpdatevalue2 = (e) => {
    setUpdateValue2(e.target.value);
  };

  const handlerUpdatevalue3 = (e) => {
    setUpdateValue3(e.target.value);
  };

  const handlerUpdateSubmit = (e) => {
    e.preventDefault();
    let payload = {
      type: "BILLING",
      provider: "stripe",
      data: {
        key1: updatevalue1,
        key2: updatevalue2,
        key3: updatevalue3,
      },
    };
    modifyIntegration(payload);
  };

  return (
    <>
      {!edit && !email ? (
        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="#"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" /> Integrations
                </a>
              </li>
            </ul>
          </div>

          <div className="block sm:flex md:flex lg:flex justify-end items-center mt-4 gap-4">
            <div>
              <Button
                onClick={(e) => {
                  setShowintegrationmodal(true);
                }}
                type={"button"}
                className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              >
                Add Integration
              </Button>
            </div>
          </div>

          {/* Modal */}
          {showIntegrationModal ? (
            <>
              <div className="rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 shadow-3xl justify-start flex p-2 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto flex items-center justify-start w-100 sm:w-[50%] rounded-lg">
                  <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <h3 className="font-bold text-center">Add Integration</h3>
                    <form onSubmit={(e) => handlerIntegrationSubmit(e)}>
                      <div class="mb-4 mt-4 ml-6 mr-5">
                        <label
                          for="name"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Value 1
                        </label>
                        <input
                          type="text"
                          id="value1"
                          name="value1"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                          placeholder="value1"
                          value={value1}
                          onChange={handlerValue1}
                        />
                      </div>
                      <div class="mb-4 mt-4 ml-6 mr-5">
                        <label
                          for="name"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Value 2
                        </label>
                        <input
                          type="text"
                          id="value2"
                          name="value2"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                          placeholder="value2"
                          value={value2}
                          onChange={handlerValue2}
                        />
                      </div>
                      <div class="mb-4 mt-4 ml-6 mr-5">
                        <label
                          for="name"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Value 3
                        </label>
                        <input
                          type="text"
                          id="value3"
                          name="value3"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                          placeholder="value3"
                          value={value3}
                          onChange={handlerValue3}
                        />
                      </div>
                      <div className="flex items-center justify-between ml-6">
                        <button
                          type="submit"
                          className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : (
            ""
          )}
          {/* Modal */}

          {/* Edit integration popup */}
          {editIntegrationModal ? (
            <>
              <div className="rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 shadow-3xl justify-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto flex items-center justify-start w-100 sm:w-[50%] rounded-lg">
                  <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <h3 className="font-bold text-center">Edit Integration</h3>
                    <form onSubmit={(e) => handlerUpdateSubmit(e)}>
                      <div class="mb-4 mt-4 ml-6 mr-5">
                        <label
                          for="name"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Value 1
                        </label>
                        <input
                          type="text"
                          id="editvalue1"
                          name="editvalue1"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                          placeholder="value1"
                          value={updatevalue1}
                          onChange={handlerUpdatevalue1}
                        />
                      </div>
                      <div class="mb-4 mt-4 ml-6 mr-5">
                        <label
                          for="name"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Value 2
                        </label>
                        <input
                          type="text"
                          id="editvalue2"
                          name="editvalue2"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                          placeholder="value2"
                          value={updatevalue2}
                          onChange={handlerUpdatevalue2}
                        />
                      </div>
                      <div class="mb-4 mt-4 ml-6 mr-5">
                        <label
                          for="name"
                          class="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Value 3
                        </label>
                        <input
                          type="text"
                          id="editvalue3"
                          name="editvalue3"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight"
                          placeholder="value3"
                          value={updatevalue3}
                          onChange={handlerUpdatevalue3}
                        />
                      </div>
                      <div className="flex items-center justify-between ml-6">
                        <button
                          type="submit"
                          className="py-2 px-8 sm:w-[250px] w-[100%] sm:px-10 mt-4 md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : (
            ""
          )}

          {/* Edit integration popup */}

          {/* showing integration data */}

          <div>
            <h3 className="font-bold my-2">Integration Values:</h3>

            {integrationdata?.results &&
              integrationdata?.results.length != 0 &&
              integrationdata?.results.map((item) => (
                <>
                  <div className="flex items-center justify-start gap-6">
                    <p className="mt-2" key={item.id}>
                      value1:{item?.data?.key1}
                    </p>
                    <p className="mt-2" key={item.id}>
                      value2:{item?.data?.key2}
                    </p>
                    <p className="mt-2" key={item.id}>
                      value3:{item?.data?.key3}
                    </p>
                  </div>
                  <p
                    className="font-bold cursor-pointer"
                    onClick={(e) => handler_Editpopup(item.id)}
                  >
                    Edit
                  </p>
                </>
              ))}
          </div>

          {/* showing integration data */}

          <Card className="p-5 mt-3 block sm:grid md:block lg:grid grid-cols-1 ">
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">Billing</h3>
                <p className="text-sm my-2">0 active integrations</p>
              </div>
              <p className="cursor-pointer text-sm" onClick={handlerEdit}>
                Edit
              </p>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">Shipping</h3>
                <p className="text-sm my-2">0 active integrations</p>
              </div>
              {/* <p className="cursor-pointer text-sm" onClick={handlerIntegrationEmail}>
              Edit
            </p> */}
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">
                  Social Media
                </h3>
                <p className="text-sm my-2">0 active integrations</p>
              </div>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center mt-3">
              <div className="">
                <h3 className="font-semibold text-md text-heading">Custom</h3>
                <p className="text-sm my-2">0 active integrations</p>
              </div>
            </div>
            <hr className="border-border" />
          </Card>
        </>
      ) : (
        <>
          {edit ? <Integrationedit setEdit={setEdit} /> : ""}
          {email ? <Integrationemail /> : ""}
        </>
      )}
    </>
  );
};

export default Page;
