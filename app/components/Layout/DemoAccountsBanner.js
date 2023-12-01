import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../Common/Button/Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
const DemoAccountsBanner = () => {
  const pathname = usePathname()
  const sendDataHeading = () => {
    if (pathname === "/dashboard") {
      return {
        title: "Book a call with an onboarding specialist to customize Deflection AI today!",
        buttonName: <button
          className="items-center justify-center gap-3 py-1 flex sm:mb-0 rounded-sm font-bold w-[150px] px-2 border border-black focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 hover:border-primary"
          style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
          data-cal-link="deflectionai/sales-call"
          data-cal-config='{"layout":"month_view"}'
        >
          Schedule Now
          <ArrowRightIcon className='h-4 w-4'></ArrowRightIcon>
        </button>
      }
    } else {
      return {
        title: "Enter payment info to unlock all features and $200 in free credits today!",
        buttonName: <Link href={"/dashboard "}><button
          className="items-center justify-center gap-3 py-1 flex sm:mb-0 rounded-sm font-bold w-[150px] px-2 border border-black focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 hover:border-primary"
          style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Start Now
          <ArrowRightIcon className='h-4 w-4'></ArrowRightIcon>
        </button></Link>
      }
    }
  }
  return (
    <div class=" md:block">
      <div className="z-40 text-center px-5 py-2  bg-sidebarbg">

        <span className="text-sm md:text-md mt-2 sm:mt-0 inline pl-2 flex items-center text-white gap-4 justify-center m-auto">
          {sendDataHeading().title}
          {sendDataHeading().buttonName}
        </span>
      </div>
    </div>
  );
};

export default DemoAccountsBanner;