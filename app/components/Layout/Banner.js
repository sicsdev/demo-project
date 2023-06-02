import React from "react";
import Link from "next/link";
const Banner = () => {
  return (
    <div className="z-40 text-center p-3 bg-[#142543]">
      <h6 className="text-blue-400 text-white xs:flex-row xs:flex-col sm:flex justify-center gap-2">
        Onboard real agents powered by ChatGPT to plug into Shopify, Salesforce,
        Zendesk, or your custom store.{" "}
        {/* <span className="underline cursor-pointer "> Start Now</span> */}
        <span className="mt-2 sm:mt-0 inline pl-2 underline uppercase"
        
        >
          <Link  href='/free-trial'>
           start now
           </Link>
           </span>
      </h6>
    </div>
  );
};

export default Banner;
