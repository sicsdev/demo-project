import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const IntegrationTemplates = ({
  integrationTiles,
  performIntegrationTask,
  userState,
}) => {
  const excludedIntegrations = [
    "Healthie",
    "GitHub",
    "Linear",
    "DataDog",
    "CircleCI",
    "Jira",
    "Asana",
    "Monday",
    "Twilio",
    "Intercom",
  ];

  console.log("integrationTiles", integrationTiles);
  return (
    <div>
      {integrationTiles.map((element, key) => (
        <div className={` mt-6`} key={key}>
          <h3 className="text-sm font-semibold mt-3">{element.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mx-auto items-center my-2">
            {element.tiles?.map((item, key) =>
              excludedIntegrations?.includes(item.name) &&
              userState &&
              userState?.email?.split("@")[1] !== "joinnextmed.com" ? (
                ""
              ) : (
                <div
                  className={`${item.grayscale && "pointer-events-none"} ${
                    item.checked && "bg-[#ECF6FE] border-primary_hover"
                  } border border-border p-3 rounded-md cursor-pointer hover:bg-[#ECF6FE] hover:border-primary_hover`}
                  key={key}
                  onClick={() => {
                    if (element.title.toLowerCase() !== "custom") {
                      performIntegrationTask(item);
                    }
                  }}
                >
                  <div className=" relative h-[auto]">
                    <div className=" gap-2 items-center">
                      <div className="relative rounded-lg">
                        <Image
                          fill={"true"}
                          className={`${
                            item.grayscale && "grayscale pointer-events-none"
                          }  rounded-lg !static ${
                            element.key == "CUSTOM" ? "!w-[48px]" : "!w-[48px]"
                          }  !h-auto`}
                          alt="logo.png"
                          src={
                            element.key == "CUSTOM"
                              ? userState?.enterprise?.logo
                              : item.logo
                          }
                        />
                      </div>
                    </div>
                    <div className="  text-xs text-heading ">
                      <p className="!font-semibold mt-8">{item.name}</p>
                     <p className="mt-4"> {item.description}
                     </p>
                    </div>
                    {item.checked && (
                      <CheckCircleIcon className="absolute right-[0px] h-5 w-5 text-primary font-semibold top-0 " />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntegrationTemplates;
