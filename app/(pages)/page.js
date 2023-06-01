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
export default function Home() {
  return (
    <main className="scroll-smooth">
      <Head></Head>
      <Start />
      <DTC />
      <Info />
      <Trial />
      <SecondBan />
      <Benifits />        {/* new */}
      <Brandpercentage/>  {/* new */}
      <Social />
      <Testimonial />
      <Newstandard/>      {/* new */}
      <Faq />             {/* new */}
    </main>
  );
}
