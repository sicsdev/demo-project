import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const List = ({ nav_links, className, setShow, setShowmenu }) => {
  const router = useRouter();

  const handlerRedirect = (url) => {
    setShowmenu(true);
    router.push(url);
    setShow(false);
  };
  return (
    <div className={className}>
      {nav_links?.map((element, key) => (
        <div
          key={key}
          className={`p-1 ${
            key !== nav_links.length - 1 &&
            "md:border lg:border md:border-l-0 md:border-b-0 md:border-t-0 lg:border-l-0 lg:border-b-0 lg:border-t-0 border-border"
          }`}
        >
          <h3 className="text-heading uppercase text-sm font-semibold">
            {element.list_heading}
          </h3>
          <ul className="mt-5">
            {element.data.map((element, key) => (
              <li
                className="cursor-pointer"
                key={key}
                // onClick={(e) => setShow(false)}
              >
                {/* <Link href={element.link}> */}
                <div className="w-100 h-100" onClick={() => handlerRedirect(element.link)}>
                  <div className="hover:bg-gray p-2 rounded-lg flex gap-4 justify-between  items-start">
                    <div className="">
                      <img
                        src={element.icon}
                        alt="menu_icons"
                        style={{ maxWidth: "22px" }}
                      />
                    </div>
                    <div className="w-[100%]">
                      <h3 className="text-heading text-semibold flex items-centergap-4 sm:gap-0 justify-between">
                        {element.heading} {element.label}
                      </h3>
                      <p className="text-border text-xs mt-2 min-h-[34px]">
                        {element.para}
                      </p>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default List;
