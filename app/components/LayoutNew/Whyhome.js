import React from "react";

const Whyhome = () => {
  const data = [
    {
      name: "Intelligence everywhere        ",
      para: "Make every decision smarter with unified journey analytics across every customer and employee interaction.        ",
      link_title: "Leverage your data",
    },
    {
      name: "Intelligence everywhere        ",
      para: "Make every decision smarter with unified journey analytics across every customer and employee interaction.        ",
      link_title: "Leverage your data",
    },
    {
      name: "Intelligence everywhere        ",
      para: "Make every decision smarter with unified journey analytics across every customer and employee interaction.        ",
      link_title: "Leverage your data",
    },
    {
      name: "Intelligence everywhere        ",
      para: "Make every decision smarter with unified journey analytics across every customer and employee interaction.        ",
      link_title: "Leverage your data",
    },
  ];
  return (
    <div className="bg-white p-0 sm:p-[0px] ">
      <h1 className="mb-5 sm:mt-0 mt-5 text-black px-3  sm:text-center text-2xl sm:text-3xl font-bold sm:mb-7">
        Why 8x8
      </h1>
      <p className="  text-blue-400 w-[339px] sm:text-left font-[400]  px-3 sm:w-full text-heading xs:flex-row xs:flex-col sm:flex justify-center text-[16px] leading-[22px] sm:text-[24px] sm:leading-8 gap-2">
        Connect and grow your business on a platform you can trust.
      </p>

      <div className="sm:pt-[s0px] bg-white">
        <div className="pt-8 pb-8 sm:pb-4">
          <div className="max-w-[90%] sm:max-w-[100%] ">
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
                    className="bg-white flex flex-col justify-between cursor-pointer hover:shadow-lg hover:bg-white sm:p-[24px] hover:outline-[1px] hover:outline-[black]  transition-transform duration-300 "
          
                    key={key}
                  >
                    <div className="p-0 py-2 sm:p-8 md:py-7 md:px-0 font-semibold ">
                      {ele.name}
                    </div>
                    <div className="p-0 py-2 sm:p-8 md:py-7 md:px-0 ">
                      {ele.para}
                    </div>
                    <div className="p-0 py-2 sm:p-8 md:py-7 md:px-0 font-semibold cursor-pointer">
                      {ele.link_title} →
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

export default Whyhome;
