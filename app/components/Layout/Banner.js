import React from "react";
import Link from "next/link";
const Banner = () => {
  return (
    <div className="z-40 text-center p-3 bg-[#142543]">
      <h6 className="text-blue-400 font-generalSans-medium text-white xs:flex-row xs:flex-col sm:flex justify-center md:text-para lg:text-para sm:text-para sm:leading-8 gap-2">
        Onboard real agents powered by ChatGPT to plug into Shopify, Salesforce,
        Zendesk, or your custom store.{" "}
        {/* <span className="underline cursor-pointer "> Start Now</span> */}
        <span className="mt-2 sm:mt-0 inline pl-2 underline "
        
        >
          <Link  href='/free-trial'>
           Start Now
           </Link>
           </span>
      </h6>
    </div>
  );
};

export default Banner;
