import React, { useEffect, useState } from "react";
import Demo from "../Demo/Demo";
import Link from "next/link";
const Start = () => {
  const [show, setShow] = useState(true);
  const list = [
    "Mitigates refunds",
    "Automates shipping & returns",
    "Handles customer complaints",
    "Manages subscriptions",
  ];

  return (
    <>
{/* 
      <pre lang="js">
        <script src="https://widget-dev.usetempo.ai/v1/main.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              ChatBot.Widget({
                id: "3930c19f-3a84-422c-9b3d-e7210f97b78b",
              });
            `,
          }}
        />
      </pre> */}



      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HFHNKD99J4"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HFHNKD99J4');
          `,
        }}
      />

<div className="bg-home-above relative h-[700px]">
      <div className="absolute w-[35%] h-full flex right-0">
        <img src="/home-fold.png" className="object-fill w-full" />
      </div>
      {/* <div className="absolute w-[35%] h-full flex left-0">
        <img src="/home-fold.png" className="object-fill w-full" />
      </div> */}
      <div className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%]  py-20 relative">
        <div className="block sm:flex   justify-center  gap-10">
          <div>
            <p
              className={
                "text-center   font-bold  w-[40%] sm:w-[136px] m-auto text-base py-1 sm:mt-8  px-1  focus:ring-yellow-300 text-white rounded-[20px] bg-primary hover:bg-black dark:focus:ring-yellow-900"
              }
            >
              INTRODUCING{" "}
            </p>
            <div className="relative flex items-center gap-4 w-[60%] mx-auto">
            
            <div data-line-position="left" class="connect-heading-line  sm:mt-8 mt-4"></div>
            <h1 className=" font-bold  m-auto text-center sm:mt-8 mt-4 sm:text-[50px] text-h2 text-white  sm:leading-none  ">
              {/* Tempo */}
              <img src="/logo.png" className="w-[30rem] sm:w-[65rem]" />
            </h1>
            
            <div data-line-position="right" class="connect-heading-line  sm:mt-8 mt-4"></div>
            </div>

            <p className="font-bold text-2xl m-auto text-center mt-4  md:text-h3 lg:text-h3 sm:text-h3 t  sm:mt-8 mb-2 sm:mb-4 text-white">
               Integrate anything. Automate everything.
            </p>
            <p className=" text-xl text-center  md:text-xl sm:max-w-[670px] sm:ml-[12rem] sm:mt-8   mt-4 mb-2 sm:mb-4 text-white">
            Watch your costs plummet with AI-powered customer service. 50%+ deflection, instant SLAs, and 24/7 service.            </p>
            <div className="block sm:grid md:grid lg:grid grid-cols-2 mx-auto sm:w-[60%] gap-4 sm:mt-8 mt-3 sm:mb-8">
            <button
                  className={
                    "py-2 px-8 w-full first-letter:w-full focus:ring-yellow-300    text-lg font-semibold text-white bg-[#fe9327] hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
                  }
                >
                  <div className="trytempo">
                    <Link href="/checkout">Start Now</Link>
                  </div>
                </button>
                <button
                  type={"submit"}
                  className={
                    "py-2 px-8 focus:ring-yellow-300 text-white w-full hover:bg-white hover:text-primary  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold border dark:focus:ring-yellow-900 rounded-lg"
                  }
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
       <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
       <span className="underline cursor-pointer text-white"> Schedule Demo
       </span>
       </a>
      `,
                    }}
                  />{" "}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Start;
