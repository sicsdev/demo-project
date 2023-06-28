import React from "react";
import Link from "next/link";
const Banner = () => {
  return (
<div class="hidden md:block">
    <div className="z-40 text-center p-3 bg-[#142543]">

      <h6 className="text-blue-400 text-white xs:flex-row xs:flex-col sm:flex justify-center md:text-para lg:text-para sm:text-para sm:leading-8 gap-2">
      Get $200 in free credits when you sign up today!
        {/* Onboard real agents powered by ChatGPT to plug into Shopify, Salesforce,
        Zendesk, or your custom store. */}
        {" "}
        {/* <span className="underline cursor-pointer "> Start Now</span> */}
        <span className="mt-2 sm:mt-0 inline pl-2 underline "

        >
          <Link href='/free-trial'>
            Start Now
          </Link>
        </span>
      </h6>
      </div>
    </div>
  );
};

export default Banner;