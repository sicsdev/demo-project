"use client";
import React, { useState, useEffect } from "react";
import { CheckCircleIcon, ShareIcon } from "@heroicons/react/24/outline";
import {
  getAllIntegration,
  getAllIntegrationTemplates,
  getIntegrationTemplateByType,
  getPopularIntegrationsTemplate
} from "@/app/API/pages/Integration";
import Loading from "@/app/components/Loading/Loading";
import integrationData from "@/app/data/integration_data.json";
import { tiles_data } from "@/app/data/integration_tiles.json";
import Modal from "@/app/components/Common/Modal/Modal";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Button from "@/app/components/Common/Button/Button";
import CustomIntegration from "@/app/components/Integration/CustomIntegration";
import { useSelector } from "react-redux";
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { tiles_icons } from "@/app/data/icon_data";
import { ConfigureIntegration } from "@/app/components/Integration/Integration";
import IntegrationTemplates from "@/app/components/Workflows/WorkflowBuilder/IntegrationTemplates";
import TopBar from "@/app/components/Common/Card/TopBar";
import axios from "axios";
import SideModal from "@/app/components/SideModal/SideModal";
import { addNewDomain } from "@/app/API/pages/EnterpriseService";
import { getPermissionHelper } from "@/app/components/helper/returnPermissions";

const Page = () => {
  const state = useSelector((state) => state.integration);
  const userState = useSelector((state) => state.user.data);
  const [formData, setFormData] = useState({});
  const [fixData, setFixeData] = useState([]);
  const [integrationTiles, setIntegrationsTiles] = useState([]);
  const [originalData, setOriginalData] = useState([])
  const [dataLoader, setDataLoader] = useState(true);
  const [suggestModal, setSuggestModal] = useState(false);
  const [integrationModal, setIntegrationModal] = useState(false);
  const [integrationform, setIntegrationform] = useState(false);
  const [integrationFormData, setIntegrationFormData] = useState({});
  const [skeltonLoading, setSkeltonLoading] = useState(true);
  const [help, setHelp] = useState([])
  const [popularTabs, setPopularTabs] = useState([])
  console.log("integrations", state)
  const findIconValue = (name) => {
    const findIcon = tiles_icons.find(
      (x) => x.name.toLowerCase() === name.toLowerCase()
    );
    if (findIcon) {
      return findIcon.logo;
    }
    return "/integrations/plus.svg";
  };
  const sendCheckedOrNo = (integration_data, item) => {
    const findIntegration = integration_data.find((x) => x.name === item);
    if (findIntegration) {
      return true;
    }
    return false;
  };

  const getDataAttributes = (integration_data, item) => {
    const findIntegration = integration_data.find((x) => x.name === item);
    if (findIntegration) {
      return findIntegration;
    }
    return null;
  };



  const newPopular = localStorage.getItem("tempoportallastlogin").split("@")[1];






  const dupRemove = (inputArray) => {
    return [...new Set(inputArray)];
  }


  const fetchIntegrations = async () => {
    try {
      setDataLoader(true);
      const dataTemplates = await getAllIntegrationTemplates();
      console.log("dataTemp", dataTemplates)
      const popIntegrations = await addNewDomain({ domain: newPopular })
      let custom_integrations = null
      if (state && state?.data && state?.data?.results) {
        custom_integrations = state?.data?.results.filter((x) => x.type === 'CUSTOM')
        console.log("cuaomer", custom_integrations)
      }

      if (dataTemplates && dataTemplates?.length > 0 && popIntegrations?.data.length > 0) {
        let finalIntegrationPopularData = dupRemove(dupRemove(popIntegrations?.data?.map((entry) => (entry))))
        console.log("finalIntegrationPopularData", finalIntegrationPopularData);
        const filterDataPopular = dataTemplates.filter((x) => finalIntegrationPopularData.find(ele => ele.toLowerCase() === x.name.toLowerCase()))
        console.log("filterDataPopular", filterDataPopular);
        console.log("dataTemplates", dataTemplates);

        const updateArray = filterDataPopular.map((item) => ({
          name: item.name,
          logo: item.icon ?? findIconValue(item.name),
          grayscale: false,
          checked: sendCheckedOrNo(state.data.results, item.name),
          integration_data: getDataAttributes(
            state.data.results,
            item.name
          ),
          id: item.id,
          type: item.type,
          data:
            getDataAttributes(state.data.results, item.name)?.data ||
            item?.data,
          // "data": item.data,
          http_auth_scheme: item.http_auth_scheme,
          http_base: item.http_base,
        }))

        const transformedData = dataTemplates.reduce((result, item) => {
          const categoryIndex = result.findIndex(
            (category) => category.key === item.type
          );
          if (categoryIndex === -1) {
            result.push({
              key: item.type,
              title:
                item.type.charAt(0).toUpperCase() +
                item.type.slice(1).toLowerCase(),
              grayscale: false,
              tiles: [],
            });
          }
          result[
            categoryIndex === -1 ? result.length - 1 : categoryIndex
          ].tiles.push({
            name: item.name,
            logo: item.icon ?? findIconValue(item.name),
            grayscale: false,
            checked: sendCheckedOrNo(state.data.results, item.name),
            integration_data: getDataAttributes(state.data.results, item.name),
            id: item.id,
            type: item.type,
            data:
              getDataAttributes(state.data.results, item.name)?.data ||
              item?.data,
            // "data": item.data,
            http_auth_scheme: item.http_auth_scheme,
            http_base: item.http_base,
          });
          return result;
        }, []);
        let sortedData = Object.values(transformedData).sort((a, b) => {
          if (a.key === "POPULAR") return -1;
          if (b.key === "POPULAR") return 1;
          return 0;
        });

        if (custom_integrations && custom_integrations.length > 0) {
          const updateArrayCustom = custom_integrations.map((item) => ({
            name: item.name,
            logo: item.icon ?? findIconValue(item.name),
            grayscale: false,
            checked: sendCheckedOrNo(state.data.results, item.name),
            integration_data: getDataAttributes(
              state.data.results,
              item.name
            ),
            id: item.id,
            type: item.type,
            data:
              getDataAttributes(state.data.results, item.name)?.data ||
              item?.data,
            // "data": item.data,
            http_auth_scheme: item.http_auth_scheme,
            http_base: item.http_base,
          }))
          setIntegrationsTiles([
            {
              key: "CUSTOM",
              title: "Custom",
              grayscale: false,
              tiles: updateArrayCustom
            }
            , {
              key: "POPULAR",
              title: "Popular",
              grayscale: false,
              tiles: updateArray
            }, ...sortedData]);
          setOriginalData([
            {
              key: "CUSTOM",
              title: "Custom",
              grayscale: false,
              tiles: updateArrayCustom
            }
            , {
              key: "POPULAR",
              title: "Popular",
              grayscale: false,
              tiles: updateArray
            }, ...sortedData]);
          setFixeData([
            {
              key: "CUSTOM",
              title: "Custom",
              grayscale: false,
              tiles: updateArrayCustom
            }
            , {
              key: "POPULAR",
              title: "Popular",
              grayscale: false,
              tiles: updateArray
            }, ...sortedData]);
        } else {


          setIntegrationsTiles([{
            key: "POPULAR",
            title: "Popular",
            grayscale: false,
            tiles: updateArray
          }, ...sortedData]);
          setOriginalData([{
            key: "POPULAR",
            title: "Popular",
            grayscale: false,
            tiles: updateArray
          }, ...sortedData]);
          setFixeData([{
            key: "POPULAR",
            title: "Popular",
            grayscale: false,
            tiles: updateArray
          }, ...sortedData]);
          setOriginalData([{
            key: "POPULAR",
            title: "Popular",
            grayscale: false,
            tiles: updateArray
          }, ...sortedData]);
        }
      }

      setDataLoader(false);
    } catch (error) {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    if (state?.data) {
      fetchIntegrations();
    }
  }, [state]);


  const performIntegrationTask = (item, name) => {
    setIntegrationFormData(item);
    setFormData(item.data);
    setHelp(tiles_icons.find((ele) => ele.name == item.name))
    switch (item?.name) {
      case "Rest API":
        setSuggestModal(true);
        break;
      case "Suggest a resource":
        setSuggestModal(true);
        break;
      default:
        setIntegrationform(true);

        break;
    }
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        setIntegrationform(false);
      }
    };
    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleEscapeKeyPress);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);


  const handleInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredData = fixData
      .map((category) => {
        const filteredTiles = category.tiles.filter((tile) =>
          tile.name.toLowerCase().includes(inputValue)
        );
        return filteredTiles.length > 0
          ? { ...category, tiles: filteredTiles }
          : null;
      })
      .filter(item => item !== null); // More explicit than .filter(Boolean)

    setIntegrationsTiles(filteredData);


  };

  return (
    <>
      <TopBar title={`Integrations`} icon={<ShareIcon className="h-5 w-5 text-primary" />} />
      {dataLoader === true ? (
        <div>
          <div className='grid grid-cols-[85%,15%] my-2'>
            <div></div>
            <SkeletonLoader height={30} width={"100%"} />
          </div>
          <div className={` mt-6`}>
            {[...Array(5)].map((_, index) => (
              <div>
                <h3 className="text-sm font-semibold mt-3">
                  <SkeletonLoader count={1} height={20} width={100} />
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mx-auto items-center my-2
                ">
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                  <SkeletonLoader count={1} height={40} width="100%" />
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className=' items-center p-2'>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id={"search_integration"}
                    onChange={handleInput}
                    className="border border-border shadow-none block px-2 bg-white  rounded-md text-lg placeholder-slate-400 text-black  focus:outline-none focus:border-sky focus:ring-2 isabled:bg-slate-50 disabled:text-slate-500 w-full focus:bg-white focus:text-[12px] pl-10"
                    placeholder={"Search"}
                  />
                </div>
              </div>
            </div>

            {getPermissionHelper('CREATE INTEGRATION', userState.role) &&
              <div>
                <div className=' gap-2 w-full '>
                  <div className='mr-[18px]'>
                    <button onClick={(e) => setIntegrationModal(true)} type="button" className="flex items-center justify-center text-xs gap-1 focus:ring-4 focus:outline-none font-bold rounded-md py-2.5 px-4 w-auto focus:ring-yellow-300 bg-primary  text-white hover:shadow-[0_8px_9px_-4px_#0000ff8a] disabled:bg-input_color disabled:shadow-none disabled:text-white">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            }

          </div>
          <div>
            {integrationData.length > 0 ? (
              <>
                <IntegrationTemplates
                  performIntegrationTask={performIntegrationTask}
                  integrationTiles={integrationTiles}
                  userState={userState}
                />
                {tiles_data.map((element, key) => (
                  <div className={` mt-6`} key={key}>
                    <h3 className="text-sm font-semibold mt-3">
                      {element.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mx-auto items-center my-2">
                      {element.tiles?.map((item, key) => (
                        <div
                          className={`${item.grayscale && "pointer-events-none"
                            } border border-border  rounded-md cursor-pointer hover:bg-[#ECF6FE] hover:border-primary_hover  p-2`}
                          key={key}
                          onClick={() => {
                            if (element.title.toLowerCase() !== "custom") {
                              performIntegrationTask(item);
                            }

                          }}
                        >
                          <div className="flex justify-start gap-1 items-center">
                            <div className=" rounded-lg">
                              <Image
                                fill={"true"}
                                className={`${item.grayscale &&
                                  "grayscale pointer-events-none"
                                  } mx-auto rounded-lg !static !w-[20px] !h-auto`}
                                alt="logo.png"
                                src={item.logo}
                              />
                            </div>
                            <h3 className=" font-semibold text-xs  text-heading">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No data Found !</p>
            )}
          </div>
          {!integrationform ? (
            null
          ) : (
            <div>
              {formData && (
                <div>
                  <div className='rightSlideAnimations sm:bg-[#222023A6] md:bg-[#222023A6] lg:bg-[#222023A6]  fixed top-0 right-0 bottom-0 left-0 overflow-auto  flex flex-col z-50' onClick={() => {

                    setFormData({})
                    setIntegrationform(false)
                  }
                  }></div>
                  <div className={`integrationspopup mt-[63px] sm:mt-0 md:mt-0 lg:mt-0  z-50 overflow-y-scroll p-5 fixed top-0 right-0 h-full m-auto max-h-[100%] bg-white`}>
                    <CustomIntegration
                      help={help}
                      fetchData={fetchIntegrations}
                      formData={formData}
                      setFormData={setFormData}
                      setIntegrationform={setIntegrationform}
                      integrationFormData={integrationFormData}
                      checked={sendCheckedOrNo(state?.data?.results, integrationFormData?.name)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {integrationModal ? (

        <SideModal setShow={setIntegrationModal} heading={'Manage Integration'} >
          <div className="my-2">
            <ConfigureIntegration
              fetchIntegrations={fetchIntegrations}
              setShow={setIntegrationModal}
              mode={"add"}
              integrationRecord={{}}
              type={"custom"}
            />
          </div>
        </SideModal>
      ) : (
        ""
      )}
      {suggestModal && (
        <Modal
          title={
            <h3 className="text-base !font-bold">Suggest Resource</h3>
          }
          className={"sm:w-[30%] w-[100%]"}
          show={suggestModal}
          setShow={setSuggestModal}
          showCancel={true}
          customHideButton={false}
          showTopCancleButton={false}
          hr={false}
        >
          <h3 className="text-xs my-2 text-heading font-normal">
            What resource would you like to connect to?
          </h3>
          <textarea
            id="message"
            rows="4"
            style={{ resize: "none" }}
            className=" block border-[0.2px]  px-2 py-1 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky focus:ring-2  disabled:bg-slate-50 disabled:text-slate-500 border-input_color w-full "
            placeholder="Write your thoughts here..."
          ></textarea>
          <div className={`flex  py-2 rounded-b mt-5 justify-between gap-4`}>
            {" "}
            <Button
              className="inline-block float-left rounded bg-white px-6 pb-2 pt-2 text-xs font-medium leading-normal text-heading border border-border "
              onClick={() => {
                setSuggestModal((prev) => !prev);
              }}
            >
              Cancel
            </Button>
            <Button
              type={"button"}
              className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]"
              onClick={() => {
                setSuggestModal((prev) => !prev);
              }}
            >
              Submit
            </Button>
          </div>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default Page;
