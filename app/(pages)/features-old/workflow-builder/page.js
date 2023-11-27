"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Testimonial from "@/app/components/Testimonial/Testimonial";
import Smartsection from "@/app/components/solutions/Smartsection";
import Aipowered from "@/app/components/solutions/Aipowered";
import Intcomp from "@/app/components/solutions/Intcomp";
import Accordiontabs from "@/app/components/Accordiontabs/Accordiontabs";
import Featurescards from "@/app/components/featurescards/page";
import Workflowslider from "@/app/components/workflow slider/page";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


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


  return (
    <div>
      <Workflowslider/>

      <Smartsection />
      <Accordiontabs />
      {/* <SolutionStandard /> */}
      {/* <SmartAlert /> */}
      
      <Testimonial />

     
      {/* <Smartlevel/> */}

      {/* <Requestdemo/> */}
      {/* <Smarteconomy /> */}
      <Aipowered />
      <Intcomp />
      <Featurescards/>

    </div>
  );
};

export default page;
