"use client";

import Info from "../components/Info-Screen/Info";
import Trial from "../components/Trial/Trial";
import Benifits from "../components/Benifits/Benifits";
import Start from "../components/Get-Start/Start";
import Testimonial from "../components/Testimonial/Testimonial";
import DTC from "../components/DTC/DTC";
import Head from "next/head";
import SecondBan from "../components/Layout/SecondBan";
import Social from "../components/Social/Social";
import Faq from "../components/Faq/Faq";
import Newstandard from "../components/Newstandardpage/Newstandard";
import Brandpercentage from "../components/Brandpercentage/Brandpercentage";
import Iconanimation from "../components/Iconanimation/Iconanimation";
import Launch from "../components/Get-Start/Launch";
import Image from "next/image";
import Aipowered from "../components/solutions/Aipowered";
import Motioncards from "../components/Motioncards/page";
import Marketing from "../components/Marketing/Marketing";
import Homefold from "../components/Get-Start/Homefold";

import Panelcard from "../components/Common/Card/Panelcard";
import Middlebar from "../components/Info-Screen/Middlebar";

export default function Home() {
  return (
    <>
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
      </pre>

      <main className="">
        <Head></Head>
        <Homefold />
        {/* <Start /> */}
        <DTC />
        {/* <Brandpercentage/>   */}
        {/* <SecondBan /> */}
        <Info />

<Middlebar/>

        {/* <Panelcard /> */}


        <Newstandard />
        {/* <Trial /> */}
        <Social />
        {/* <Marketing/> */}

        <Launch />
        {/* <Benifits />         */}
        {/* <Faq />   */}
        {/* <Iconanimation /> */}
        <Motioncards />
        <Testimonial />

        {/* dummy section */}
        {/* <div className="bg-[#142543] p-6">
        <div className="flex flex-wrap shadow-sm">
          <div
            className="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 pt-8"
            style={{ borderLeft: "1px solid rgb(220 222 225 / 20%)" }}
          >
            <div className="py-6">
              <div className="relative w-[40px] h-[40px] mb-5 mx-4">
                <Image
                  fill={true}
                  src="bot.png"
                  className="rounded-full mx-auto object-contain"
                  alt="img"
                />
              </div>
              <p className="font-bold text-white border-l-2 border-[#7EC1EC] px-4">
                Use Stripe with your stack.
              </p>
              <p className="font-normal text-gray px-4 mt-2">
                We offer client and server libraries in everything from React
                and PHP to .NET and iOS.
              </p>
              <h6 className="font-bold cursor-pointer black py-1 text-[#7EC1EC] mt-2 px-4">
                See libraries {">"}
              </h6>
            </div>
          </div>
          <div
            className="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 pt-8"
            style={{ borderLeft: "1px dotted rgb(220 222 225 / 20%)" }}
          >
            <div className="py-6">
              <div className="relative w-[40px] h-[40px] mb-5 mx-4">
                <Image
                  fill={true}
                  src="bot.png"
                  className="rounded-full mx-auto object-contain"
                  alt="img"
                />
              </div>
              <p className="font-bold text-white border-l-2 border-[#7EC1EC] px-4">
                Try no-code options
              </p>
              <p className="font-normal text-gray px-4 mt-2">
                Customize and deploy payments interfaces directly from the
                Stripe Dashboard.
              </p>
              <h6 className="font-bold cursor-pointer black py-1 text-[#7EC1EC] mt-2 px-4">
                Explore no-code {">"}
              </h6>
            </div>
          </div>
          <div
            className="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 pt-8"
            style={{ borderLeft: "1px solid rgb(220 222 225 / 20%)" }}
          >
            <div className="py-6">
              <div className="relative w-[40px] h-[40px] mb-5 mx-4">
                <Image
                  fill={true}
                  src="bot.png"
                  className="rounded-full mx-auto object-contain"
                  alt="img"
                />
              </div>
              <p className="font-bold text-white border-l-2 border-[#7EC1EC] px-4">
                Use Stripe with your stack.
              </p>
              <p className="font-normal text-gray px-4 mt-2">
                We offer client and server libraries in everything from React
                and PHP to .NET and iOS.
              </p>
              <h6 className="font-bold cursor-pointer black py-1 text-[#7EC1EC] mt-2 px-4">
                See libraries {">"}
              </h6>
            </div>
          </div>
          <div
            className="w-[100%] sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 pt-8"
            style={{ borderLeft: "1px dotted rgb(220 222 225 / 20%)" }}
          >
            <div className="py-6">
              <div className="relative w-[40px] h-[40px] mb-5 mx-4">
                <Image
                  fill={true}
                  src="bot.png"
                  className="rounded-full mx-auto object-contain"
                  alt="img"
                />
              </div>
              <p className="font-bold text-white border-l-2 border-[#7EC1EC] px-4">
                Try no-code options
              </p>
              <p className="font-normal text-gray px-4 mt-2">
                Customize and deploy payments interfaces directly from the
                Stripe Dashboard.
              </p>
              <h6 className="font-bold cursor-pointer black py-1 text-[#7EC1EC] mt-2 px-4">
                Explore no-code {">"}
              </h6>
            </div>
          </div>
        </div>
      </div> */}

        {/* dummy section */}
      </main>
    </>
  );
}
