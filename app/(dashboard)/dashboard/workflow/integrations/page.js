"use client";
import React, { useState } from "react";
import { CheckCircleIcon, ShareIcon } from "@heroicons/react/24/outline";
import { getAllIntegration, getAllIntegrationTemplates } from "@/app/API/pages/Integration";
import { useEffect } from "react";
import Loading from "@/app/components/Loading/Loading";
import integrationData from "@/app/data/integration_data.json";
import { tiles_data } from "@/app/data/integration_tiles.json";
import { tiles_icons } from "../../../../data/icons.json";
import Modal from "@/app/components/Common/Modal/Modal";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Integrationform from "@/app/components/Integrationform/page";
import Button from "@/app/components/Common/Button/Button";
import { makeCapital } from "@/app/components/helper/capitalName";
import CustomIntegration from "@/app/components/Integration/CustomIntegration";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [fixData, setFixeData] = useState([])
  const [integrationTiles, setIntegrationsTiles] = useState([])
  const [dataLoader, setDataLoader] = useState(true);
  const [suggestModal, setSuggestModal] = useState(false);
  const [integrationform, setIntegrationform] = useState(false);
  const [integrationName, setIntegrationName] = useState('');
  const findIconValue = (name) => {
    const findIcon = tiles_icons.find((x) => x.name.toLowerCase() === name.toLowerCase())
    if (findIcon) {
      return findIcon.logo
    }
    return ""
  }
  const sendCheckedOrNo = (integration_data, item) => {
    const findIntegration = integration_data.find((x) => x.name === item)
    if (findIntegration) {
      return true
    }
    return false
  }


  const fetchIntegrations = async () => {
    try {
      setDataLoader(true);
      const data = await getAllIntegration();
      const dataTemplates = await getAllIntegrationTemplates();
      if (dataTemplates && dataTemplates?.length > 0) {
        const transformedData = dataTemplates.reduce((result, item) => {
          if (item.popular) {
            const popularCategoryIndex = result.findIndex(category => category.key === "POPULAR");
            if (popularCategoryIndex === -1) {
              result.push({
                key: "POPULAR",
                title: "Popular",
                grayscale: false,
                tiles: []
              });
            }
            result[popularCategoryIndex === -1 ? result.length - 1 : popularCategoryIndex].tiles.push({
              name: item.name,
              logo: item.icon ?? findIconValue(item.name),
              grayscale: false,
              checked: sendCheckedOrNo(data.results, item.name),
              "id": item.id,
              "type": item.type,
              "data": item.data,
              "http_auth_scheme": item.http_auth_scheme,
              "http_base": item.http_base,
            });
          }

          const categoryIndex = result.findIndex(category => category.key === item.type);
          if (categoryIndex === -1) {
            result.push({
              key: item.type,
              title: item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase(),
              grayscale: false,
              tiles: []
            });
          }
          result[categoryIndex === -1 ? result.length - 1 : categoryIndex].tiles.push({
            name: item.name,
            logo: item.icon ?? findIconValue(item.name),
            grayscale: false,
            checked: sendCheckedOrNo(data.results, item.name),
            "id": item.id,
            "type": item.type,
            "data": item.data,
            "http_auth_scheme": item.http_auth_scheme,
            "http_base": item.http_base,

          });
          return result;
        }, []);
        let sortedData = Object.values(transformedData).sort((a, b) => {
          if (a.key === "POPULAR") return -1;
          if (b.key === "POPULAR") return 1;
          return 0;
        });

        if (sortedData[0].key === "POPULAR") {
          sortedData[0].tiles.push({
            "name": "Rest API",
            "logo": "/integrations/rest-api.svg",
            "grayscale": false,
            checked: false
          })
        }
        setIntegrationsTiles(sortedData)
        console.log(sortedData)
        setFixeData(sortedData)
      }
      setDataLoader(false);
    } catch (error) {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const performIntegrationTask = (item) => {
    setIntegrationName(item?.name);
    setFormData(item.data)
    switch (item?.name) {
      case "Rest API":
        debugger
        setSuggestModal(true)
        break;
      default:
        setIntegrationform(true)

        break;
    }
  }
  const handleInput = (e) => {
    const { value } = e.target;
    let filteredTiles = [];
    const filteredData = fixData
      .map((category) => {
        if (value !== '') {
          if (!filteredTiles.length) {
            filteredTiles = category.tiles.filter(
              (tile) => tile.name.toLowerCase().includes(value)
            );
            return filteredTiles.length > 0 ? { ...category, tiles: filteredTiles } : null;
          }
        }
        else {
          filteredTiles = category.tiles.filter(
            (tile) => tile.name.toLowerCase().includes(value)
          );
          return filteredTiles.length > 0 ? { ...category, tiles: filteredTiles } : null;
        }

      })
      .filter(Boolean);
    setIntegrationsTiles(filteredData)
  }
  return (
    <>
      {dataLoader === true ? (
        <Loading />
      ) :

        <>
          <div className="border-b border-border dark:border-gray-700 flex items-center justify-between">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <a
                  href="javascript:void(0)"
                  className=" flex justify-start gap-2 items-center p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                  aria-current="page"
                >
                  <ShareIcon className="h-6 w-6 text-primary" /> Integrations
                </a>
              </li>
            </ul>
          </div>
          {!integrationform && (
            <>
              <div className="flex items-center justify-between">
                <p class="text-black-color text-xl font-semibold my-4">
                  Search for integration
                </p>
              </div>
              <div className="relative sm:max-w-[100%]  m-auto">
                <input
                  type={"search_integration"}
                  placeholder={"Search for integration"}
                  className={
                    "border border-input_color w-full block  px-2 py-2 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 pl-10"
                  }
                  id={"search_integration"}
                  onChange={handleInput}
                />
                <img
                  className="w-5 top-[10px] left-[14px] absolute"
                  src="/search.png"
                />
              </div>
            </>
          )}
          {!integrationform ? (
            <>
              {integrationData.length > 0 ? (
                <>
                  {integrationTiles.map((element, key) =>
                    <div className={` mt-6`} key={key}>
                      <h3 className="text-sm font-semibold mt-3">{element.title}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 mx-auto items-center my-2">
                        {element.tiles?.map((item, key) => (
                          <div
                            className={`${item.grayscale && ("pointer-events-none")} ${item.checked && ("bg-[#ECF6FE] border-primary_hover")} border border-border p-3 rounded-md cursor-pointer hover:bg-[#ECF6FE] hover:border-primary_hover`}
                            key={key}
                            onClick={() => { performIntegrationTask(item) }}
                          >
                            <div className="flex justify-start gap-1 items-center">
                              <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                <Image
                                  fill={"true"}
                                  className={`${item.grayscale && ("grayscale pointer-events-none")} bg-contain mx-auto w-full rounded-lg`}
                                  alt="logo.png"
                                  src={item.logo}
                                />
                              </div>
                              <h3 className="w-[80%] font-semibold text-[13px]  text-heading">
                                {item.name}
                              </h3>

                              {item.checked && (<CheckCircleIcon className="h-5 w-5 text-primary font-semibold " />)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div >
                  )}
                  {tiles_data.map((element, key) =>
                    <div className={` mt-6`} key={key}>
                      <h3 className="text-sm font-semibold mt-3">{element.title}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 mx-auto items-center my-2">
                        {element.tiles?.map((item, key) => (
                          <div
                            className={`${item.grayscale && ("pointer-events-none")} border border-border p-3 rounded-md cursor-pointer hover:bg-[#ECF6FE] hover:border-primary_hover`}
                            key={key}
                            onClick={() => { performIntegrationTask(item) }}
                          >
                            <div className="flex justify-start gap-1 items-center">
                              <div className="relative w-[20px] h-[20px] rounded-lg m-auto">
                                <Image
                                  fill={"true"}
                                  className={`${item.grayscale && ("grayscale pointer-events-none")} bg-contain mx-auto w-full rounded-lg`}
                                  alt="logo.png"
                                  src={item.logo}
                                />
                              </div>
                              <h3 className="w-[80%] font-semibold text-[13px]  text-heading">
                                {item.name}
                              </h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div >
                  )}
                </>
              ) :
                <p>No data Found !</p>}
            </>
          ) : (
            <>
              {formData && (
                <CustomIntegration data={[formData]} formData={formData} setFormData={setFormData} name={integrationName} setIntegrationform={setIntegrationform} />
              )}
            </>
          )}
        </>
      }
      {
        suggestModal && (
          <Modal
            title={<h3 className="text-base font-semibold">Suggest a resource</h3>}
            className={"w-[30%]"}
            show={suggestModal}
            setShow={setSuggestModal}
            showCancel={true}
            customHideButton={false}
            hr={false}
          >
            <h3 className="text-xs my-2 text-heading font-normal">What resource would you like to connect to?</h3>
            <textarea id="message" rows="4" className=" block border-[0.2px]  px-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full " placeholder="Write your thoughts here..."></textarea>
            <div
              className={`flex  p-2 rounded-b mt-5 justify-end gap-4`}
            >                    <Button
              className="inline-block float-left rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-heading border border-border "
              onClick={() => { setSuggestModal(prev => !prev) }}

            >
                Back
              </Button>
              <Button
                type={"button"}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
                onClick={() => { setSuggestModal(prev => !prev) }}
              >
                Submit
              </Button>
            </div>
          </Modal>
        )
      }
      <ToastContainer />
    </>
  );
};

export default Page;