import React from "react";

const Iconanimation = () => {
  return (
    <div className="animation_icon_section mx-auto max-w-[90%] py-3 js-show-on-scroll">
      <div className="grid grid-cols-11 gap-4 justify-center">
        <div className="col-span-12 sm:col-span-3 relative col_section">
            <div className="leftimg_sec animation2  rounded-full  first-letter:one w-10 sm:w-24 absolute bottom-0 sm:bottom-20 sm:left-0 sm:bg-white ">
              <img
                className=" sm:w-[50%] sm:mx-auto sm:my-6"
                // style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Intercom logo"
                src="/icons/freshdesk-vector-logo.svg"
              />
            </div>
            <div className="leftimg_sec rounded-full  animation two w-10 sm:w-24 absolute top-10 sm:top-20 left-16 sm:left-12 sm:bg-white ">
              <img
                className="sm:w-[55%] sm:mx-auto sm:my-5"
                // style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Whatsapp logo"
                src="/icons/gorgias-logo-vector.svg"
                // width={40}
              />
            </div>
            <div className="leftimg_sec animation3 three w-10 sm:w-24  rounded-full  absolute top-50 right-1/2 sm:right-28 sm:p-6 ml-6 sm:mx-auto sm:my-5 sm:bg-white">
              <img
                className=" sm:w-[90%] sm:mx-auto" 
                // style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Salesforce logo"
                src="/icons/shopify-logo-svg-vector.svg"
              />
            </div>
            <div className="leftimg_sec  rounded-full   sm:p-5 p-0 animation2 four w-10 sm:w-[100px] absolute top-10 sm:top-auto sm:bottom-14 right-12 sm:right-0 sm:bg-white ">
              <img
                  // style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                  className="sm:w-[90%] sm:mx-auto sm:my-2"
                alt="Slack logo"
                src="/icons/Zendesk_logo.svg"
              />
            </div>
            <div className="leftimg_sec rounded-full  sm:p-5 p-0 five animation four w-10 sm:w-24 absolute   sm:top-14 right-0 sm:right-0 sm:bg-white ">
              <img
                className="sm:w-[90%] sm:mx-auto"
                // style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Asana logo"
                src="/icons/ZOHO.svg"
              />
            </div>
        </div>
        <div className="col-span-12 sm:col-span-5 bg-gray-300 col_section content">
          <h3 className="text-center text-2xl md:text-h3 lg:text-h3 sm:text-h3 my-2 font-bold text-black">
            Integrate your favorite apps — or build your own
          </h3>
          <p className="text-heading font-normal text-para text-center pt-3">
            Take back your browser tabs. Integrate your apps, data, and channels
            into the same tool you use to message your customers.
          </p>
          <div className="text-center my-3" >
          <button
              type={"submit"}       
              
              className={
                "py-2 px-8 sm:w-[40%] w-[100%] sm:px-10  md:px-10 lg:px-5 sm:py-5 md:py-5 lg:py-3 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
              }
            >
              <div  dangerouslySetInnerHTML={{
            __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
       <span className="underline cursor-pointer text-white">           Demo Now! &#8594;
       </span>
       </a>
      `,
          }} /> 
          
            </button>
            </div>
        </div>
        <div className="col-span-12 sm:col-span-3 relative col_section">
            <div className="leftimg_sec animation2 one w-10 sm:w-24 absolute top-0 sm:top-auto sm:bottom-14 left-0 sm:left-0 sm:bg-white rounded-full">
              <img
                className=" sm:w-[45%]  sm:mx-auto sm:my-8"
                style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Intercom logo"
                src="/icons/bigcommerce-ar21.svg"
              />
            </div>
            <div className="leftimg_sec animation two w-10 sm:w-24 absolute bottom:10 sm:top-14 left-16 sm:left-12  sm:bg-white rounded-full">
              <img
                className="sm:w-[45%] sm:mx-auto sm:my-8"
                style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Whatsapp logo"
                src="/icons/Gmail_icon_(2020).svg"
              />
            </div>
            <div className="leftimg_sec animation3 three w-10 sm:w-24 absolute bottom-1/2 sm:bottom-auto top-auto sm:top-50 right-1/2 sm:right-28  sm:bg-white rounded-full">
              <img
                className="sm:w-[45%] sm:mx-auto sm:my-7"
                style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Salesforce logo"
                src="/icons/Square,_Inc._-_Square_logo.svg"
              />  
            </div>

            
            <div className="leftimg_sec animation2 four w-10 sm:w-24 absolute bottom-10 sm:bottom-20 right-16 sm:right-0 sm:bg-white rounded-full">
              <img
                className="sm:w-[50%] sm:mx-auto sm:my-4"
                style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Slack logo"
                src="/icons/PayPal1.svg"
              />
            </div>
            <div className="leftimg_sec animation five w-10 sm:w-24 absolute right-0 sm:right-0 top-0 sm:top-20 sm:bg-white rounded-full">
              <img
                className="sm:w-[45%] sm:mx-auto sm:my-7"
                style={{ boxShadow: "rgba(0, 27, 56, 0.1) 0px 0px 24px" }}
                alt="Asana logo"
                src="/icons/stripe-icon.svg"
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Iconanimation;
