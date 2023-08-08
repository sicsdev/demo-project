"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Testimonial from "@/app/components/Testimonial/Testimonial";
import Smartsection from "@/app/components/solutions/Smartsection";
import SmartAlert from "@/app/components/ChatBots/SmartAlert";
import SolutionStandard from "@/app/components/Newstandardpage/SolutionStandard";
import Smarteconomy from "@/app/components/solutions/Smarteconomy";
import Aipowered from "@/app/components/solutions/Aipowered";
import Intcomp from "@/app/components/solutions/Intcomp";
import Smartlevel from "@/app/components/solutions/Smartlevel";
import Accordiontabs from "@/app/components/Accordiontabs/Accordiontabs";
import Smartinbocacc from "@/app/components/Accordiontabs/Smartinbocacc";
import Integrationstrans from "@/app/components/solutions/Integrationstrans";
const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gclid = searchParams.get("gclid");
    const utm_source = searchParams.get("utm_source");
    const utm_medium = searchParams.get("utm_medium");
    const utm_term = searchParams.get("utm_term");
    const matchtype = searchParams.get("matchtype");
    const utm_campaign = searchParams.get("utm_campaign");
    const utm_content = searchParams.get("utm_content");
    const msclkid = searchParams.get("msclkid");

    console.log("gclid", gclid);
    console.log("utm_source", utm_source);
    console.log("utm_medium", utm_medium);
    console.log("utm_content", utm_content);
    console.log("utm_term", utm_term);
    console.log("matchtype", matchtype);
    console.log("msclkid", msclkid);
    console.log("utm_campaign", utm_campaign);

    Cookies.set("gclid", gclid, { expires: 90 });
    Cookies.set("msclkid", msclkid, { expires: 90 });
    Cookies.set("utm_source", utm_source, { expires: 90 });
    Cookies.set("utm_campaign", utm_campaign, { expires: 90 });
    Cookies.set("utm_medium", utm_medium, { expires: 90 });
    Cookies.set("utm_term", utm_term, { expires: 90 });
    Cookies.set("utm_content", utm_content, { expires: 90 });
    Cookies.set("matchtype", matchtype, { expires: 90 });
  }, []);

  return (
    <div>
      <Smartsection />
      {/* <Accordiontabs />
       */}
<Smartinbocacc />
      {/* <SmartAlert /> */}
      <Testimonial />
      <SolutionStandard />

      {/* <Smartlevel/> */}

      {/* <Requestdemo/> */}
      {/* <Smarteconomy /> */}
      {/* <Aipowered /> */}
      {/* <Intcomp /> */}
      <Integrationstrans/>
    </div>
  );
};

export default page;
