import React from "react";

const Banner = () => {
  return (
    <div className="z-40 text-center p-3 bg-[#142543]">
      <h6 className="text-blue-400 text-white xs:flex-row xs:flex-col sm:flex justify-center gap-8">
        Onboard real agents powered by ChatGPT to plug into Shopify, Salesforce,
        Zendesk, or your custom store.{" "}
        {/* <span className="underline cursor-pointer "> Start Now</span> */}
        <div className="mt-2 sm:mt-0 inline pl-2 underline"
          dangerouslySetInnerHTML={{
            __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
       <span className="underline cursor-pointer text-white"> Start Now</span>
       </a>
      `,
          }}
        />
      </h6>
    </div>
  );
};

export default Banner;
