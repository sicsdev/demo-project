import React from "react";
import Link from "next/link";
const Banner = () => {
  return (
    <div className="z-40 text-center p-3 bg-[#142543]">
      <h5 className="text-blue-400 text-white text-xs sm:text-base md:text-base">
        Onboard real agents powered by ChatGPT to plug into Shopify, Salesforce,
        Zendesk, or your custom store.{" "}
        {/* <span className="underline cursor-pointer "> Start Now</span> */}
        <span className="mt-2 sm:mt-0 inline pl-2 underline "

        >
          <Link href='/free-trial'>
            Start Now
          </Link>
        </span>
      </h5>
    </div>
  );
};

export default Banner;