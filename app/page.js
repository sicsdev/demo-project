import Fold from "./components/Abovefold/Fold";
import Direction from "./components/Direction-logo/Direction";
import Industry from "./components/Industry-Experts/Industry";
import Info from "./components/Info-Screen/Info";
import Trail from "./components/Trail/Trail";
import Benifits from "./components/Benifits/Benifits";

export default function Home() {
  return (
    <main className="">
      <Fold />
      <Direction />
      <Info />
      <Benifits />
      <Industry />
      <Trail />
    </main>
  )
}
