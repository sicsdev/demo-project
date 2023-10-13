import React from "react";

const Reach = () => {
  const data = [
    {
      reach: "99.999%        ",
      name: "Uptime SLA      ",
      para: "Our network is backed by the first platform-wide uptime SLA across UCaaS and CCaaS.      ",
      link_title: "Leverage your data",
    },
    {
      reach: "99.999%        ",
      name: "Uptime SLA      ",
      para: "Our network is backed by the first platform-wide uptime SLA across UCaaS and CCaaS.      ",
      link_title: "Leverage your data",
    },
    {
      reach: "55++",

      name: "Intelligence everywhere        ",
      para: "Make every decision smarter with unified journey analytics across every customer and employee interaction.        ",
      link_title: "Leverage your data",
    },
    {
      reach: "55++",

      name: "Intelligence everywhere        ",
      para: "Make every decision smarter with unified journey analytics across every customer and employee interaction.        ",
      link_title: "Leverage your data",
    },
  ];
  return (
    <div className="bg-white p-0 sm:p-[0px] ">
      <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3  sm:text-center text-2xl sm:text-3xl font-bold sm:mb-7">
      Global presence and reach
      </h1>


      <div className="sm:pt-[0px] bg-white">
        <div className="pt-8 sm:pt-3 pb-8 sm:pb-4">
          <div className="max-w-[90%] sm:max-w-[100%]">
            {data.length === 0 ? (
              <p className=" text-xl align-bottom font-semibold italic text-center">
                No data found!
              </p>
            ) : (
              ""
            )}
            <div className="max-w-[1400px] w-full m-auto sm:py-4 sm:px-4 px-3 lg:px-4 relative group">
              <div className="grid grid-cols-1  sm:grid-cols-4 gap-5 sm:gap-12  w-full m-auto sm:py-8 md:py-8 lg:py-8 sm:px-4 lg:px-4">
                {data?.map((ele, key) => (
                  <div
                    className="bg-white flex flex-col justify-between cursor-pointer sm:p-[0px] hover:outline-[1px] hover:outline-[black]  transition-transform duration-300 "
                    key={key}
                  >
                    <div className="p-0 text-[50px] font-bold leading-[60px] py-2 sm:p-8 md:py-7 md:px-0 text-[#fe9327] ">
                      {ele.reach}
                    </div>
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 font-semibold ">
                      {ele.name}
                    </div>
                    <div className="p-0 py-2 sm:p-3 md:py-2 md:px-0 ">
                      {ele.para}
                    </div>
                    <div className="p-0 py-2 sm:p-8 md:py-7 md:px-0 font-semibold cursor-pointer">
               Learn more →

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reach;
