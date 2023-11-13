import Image from "next/image";
import Link from "next/link";
import React from "react";
const MobileList = ({ nav_links, className, setShow }) => {
  return (
    <>
      <div className={className}>
        {nav_links?.map((element, key) => (
          <div
            key={key}
            className={`p-1 ${
              key !== nav_links.length - 1 &&
              "md:border lg:border md:border-l-0 md:border-b-0 md:border-t-0 lg:border-l-0 lg:border-b-0 lg:border-t-0 border-[]"
            }`}
            style={{borderColor:"#e3e3e3"}}
          >
            <div className=" flex gap-4 pb-4  border-b"
            style={{borderColor:"#e3e3e3"}}
            
            >
              <p>{element.icon}</p>
              <h3 className="text-heading uppercase text-sm font-semibold">
                {element.list_heading}
              </h3>
            </div>
            <ul className="mt-5">
              {element.data.map((element, key) => (
                <li
                  className="cursor-pointer"
                  key={key}
                  onClick={(e) => setShow(false)}
                >
                  <Link href={element.link}>
                    <div className="hover:bg-gray p-2 rounded-lg flex gap-4 justify-between  items-start">
                      <div className="w-[100%]">
                        <h3 className="text-heading text-semibold flex items-center gap-4 sm:gap-0 justify-between">
                          {element.heading}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* <div
            style={{borderColor:"#e3e3e3"}}
      
      className=" md:border lg:border pt-4  border-t mt-[2rem] sm:border-r-0 lg:border-r-0   md:border-b-0 lg:border-l-0 lg:border-b-0  border-[#59f9f9] ">
        <h3 className="text-heading sm:mt-[12px] text-semibold flex items-center gap-4 sm:gap-0 justify-between">
          <Link href="/integrations">Integrations</Link>
        </h3>{" "}
      </div> */}
    </>
  );
};

export default MobileList;
