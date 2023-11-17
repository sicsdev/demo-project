import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const DemoAccountsBanner = () => {
  const pathname = usePathname()

  if (pathname == "/")
    return (
      <div class=" md:block">
        <div className="z-40 text-center p-3 bg-[black]">

          <h6 className="text-blue-400 text-white xs:flex-row xs:flex-col sm:flex justify-center text-[12px] md:text-para lg:text-para sm:text-para sm:leading-8 gap-2">
            Schedule a call with an onboarding specialist to customize Deflection AI today!
            {/* Onboard real agents powered by ChatGPT to plug into Shopify, Salesforce,
        Zendesk, or your custom store. */}
            {" "}
            {/* <span className="underline cursor-pointer "> Start Now</span> */}
            <span className="mt-2 sm:mt-0 inline pl-2 underline "

            >
              <Link href='/checkout'>
                Schedule Now
              </Link>
            </span>
          </h6>
        </div>
      </div>
    );
};

export default DemoAccountsBanner;