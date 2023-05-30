"use client";
import Info from "./components/Info-Screen/Info";
import Trial from "./components/Trial/Trial";
import Benifits from "./components/Benifits/Benifits";
import Start from "./components/Get-Start/Start";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Testimonial from "./components/Testimonial/Testimonial";
import DTC from "./components/DTC/DTC";
import Head from "next/head";
import SecondBan from "./components/Layout/SecondBan";
import Social from "./components/Social/Social";
export default function Home() {
  return (
    <main className="scroll-smooth">
      <Head>

        
      </Head>
      <Start />
      <DTC />
      <Info />
      <Trial />

      <SecondBan/>
      <Benifits />
      <Social />
      {/* <Ecommerce /> */}
      <Testimonial />
    </main>
  )
}
