"use client";
import Direction from "./components/Direction-logo/Direction";
import Industry from "./components/Industry-Experts/Industry";
import Info from "./components/Info-Screen/Info";
import Trial from "./components/Trial/Trial";
import Benifits from "./components/Benifits/Benifits";
import Start from "./components/Get-Start/Start";
import Demo from "./components/Demo/Demo";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Testimonial from "./components/Testimonial/Testimonial";
import DTC from "./components/DTC/DTC";
export default function Home() {
  return (
    <main className="scroll-smooth">
      <Start />
      {/* <Direction /> */}
      <DTC />
      <Info />
      <Ecommerce />
      <Demo />
      <Benifits />
      <Testimonial />
      <Industry />
      <Trial />
    </main>
  )
}
