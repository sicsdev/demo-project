import React from "react";
import { isMobile } from "react-device-detect";

const KnowledgeSection5 = () => {
  return (
    <div className="sm:px-[40px] mt-[2rem] sm:my-[75px]">
      <div className="sm:px-[40px] flex">
        <span
          className="hidden sm:block"
          style={{
            margin: "0.625rem 1.75rem 0.625rem 0",
            position: "relative",
            width: "0.5rem",
            backgroundColor: "#fe9327",
          }}
        ></span>
        <div className="sm:p-[0px] p-[2rem]">
          <p className=" sm:text-[25px] text-[20px] text-[#808080b5] font-light">
            "Rather than spending our time looking after the data center,
            putting out fires, and ‘keeping the lights on’, we can instead focus
            our attention on the future and ways in which we can grow the
            company. That is very satisfying."
          </p>
          <p className="font-bold text-[gray] mt-[1rem]">
            Chris Qureshi, Head of IT and Shared Services, Cin7
          </p>
        </div>
      </div>
      <div className="sm:px-[40px] mt-[3rem] p-[2rem] sm:p-[0px]   ">
        <p className="sm:text-[25px] font-semibold tracking-wide">
          Products to meet your unique business needs
        </p>
        <p className="text-[19px] mt-[1rem] text-[#808080b5] ">
          Purchase an 8x8 X Series annual plan and{" "}
          <span className="text-[blue]">save up to 25% </span>on the industry’s
          most powerful unified <br /> communications platform.
        </p>
      </div>
    </div>
  );
};

export default KnowledgeSection5;
