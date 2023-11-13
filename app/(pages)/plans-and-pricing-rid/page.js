'use client'
import React from "react";
import Newpanel from "@/app/components/PanelCard/Newpanel";
import integration from "../../data/newInt.json";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  const [data, setData] = useState(integration);
  
  return (
    <>
      <Newpanel />
      <div className="sm:pt-[10px] bg-white">
      <div className="pt-8 pb-8 sm:pb-4">
        <div className="mx-auto max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%]">
          {data.length === 0 ? (
            <p className=" text-xl align-bottom font-semibold italic text-center">
              No data found!
            </p>
          ) : (
            ""
          )}
            <div
              className="max-w-[1400px] w-full m-auto sm:py-4 sm:px-4 px-4 lg:px-4 relative group"
            >
          
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-6 w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4">
                {data?.map((item, key) => (
                  <div
                    className="bg-white flex flex-col justify-between cursor-pointer shadow-lg hover:translate-y-[-4px] transition-transform duration-300 "
                    style={{
                      border: "1px solid rgb(237, 237, 237)",
                      borderRadius: "8px",
                    }}
                    key={key}
                  >
                    <div className="p-2 sm:p-8 md:py-7 md:px-4 ">
                    <Link href={`${item.link}`} >

                      <div className="relative w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] gap-2 rounded-lg m-auto mb-5">
                        <Image
                          fill={"true"}
                          className="bg-contain mx-auto w-full rounded-lg"
                          alt="logo.png"
                          src={item.logo}
                        />
                      </div>
                      </Link>
            
                    </div>
                
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default page;