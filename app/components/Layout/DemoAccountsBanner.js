import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../Common/Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
const DemoAccountsBanner = () => {
  const pathname = usePathname()

  return (
    <div class=" md:block">
      <div className="z-40 text-center px-3 py-2 bg-[black]">

        <span className="text-blue-400 text-white xs:flex-row xs:flex-col sm:flex justify-center items-center text-[13px] text-md sm:leading-8 gap-2">
          Book a call with an onboarding specialist to customize <b>Deflection AI</b> today!
          {/* Onboard real agents powered by ChatGPT to plug into Shopify, Salesforce,
        Zendesk, or your custom store. */}
          {" "}
          {/* <span className="underline cursor-pointer "> Start Now</span> */}
          <span className="mt-2 sm:mt-0 inline pl-2"

          >
            <div>
              <button
                className="items-center justify-center gap-3 flex mb-4 sm:mb-0 rounded-sm px-2 w-full font-bold sm:w-[200px] border border-black focus:ring-yellow-300 text-white bg-[#f5455c] hover:bg-black dark:focus:ring-yellow-900 hover:border-[#f5455c]"
                style={{ textDecoration: 'none' }}
                data-cal-link="deflectionai/sales-call"
                data-cal-config='{"layout":"month_view"}'
              >Schedule Now
                <ArrowRightIcon className='h-4 w-4'></ArrowRightIcon>
              </button>
            </div>
          </span>
        </span>
      </div>
    </div>
  );
};

export default DemoAccountsBanner;