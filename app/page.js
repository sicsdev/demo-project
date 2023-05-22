"use client";
import Direction from "./components/Direction-logo/Direction";
import Industry from "./components/Industry-Experts/Industry";
import Info from "./components/Info-Screen/Info";
import Trail from "./components/Trail/Trail";
import Benifits from "./components/Benifits/Benifits";
import Above from "./components/Abovefold/Above";
import Start from "./components/Get-Start/Start";
export default function Home() {
  return (
    <main className="scroll-smooth">
      <Start />
      <Above />
      <Direction />
      <Info />
      <Benifits />
      <Industry />
      <Trail />
    </main>
  )
}
