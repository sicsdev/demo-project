"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AboveFold from "@/app/components/ChatBots/AboveFold";
import Alert from "@/app/components/ChatBots/Alert";
import Requestdemo from "@/app/components/ChatBots/Requestdemo";
import Testimonial from "@/app/components/Testimonial/Testimonial";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gclid = searchParams.get('gclid');
    const utm_source   = searchParams.get('utm_source');
    const utm_medium    = searchParams.get('utm_medium');
    const utm_term    = searchParams.get('utm_term');
    const matchtype     = searchParams.get('matchtype');
    const utm_campaign     = searchParams.get('utm_campaign');
    const utm_content    = searchParams.get('utm_content');
    const msclkid     = searchParams.get('msclkid');

    Cookies.set('gclid', gclid, { expires: 90 });
    Cookies.set('msclkid', msclkid, { expires: 90 });
    Cookies.set('utm_source', utm_source, { expires: 90 });
    Cookies.set('utm_campaign', utm_campaign, { expires: 90 });
    Cookies.set('utm_medium', utm_medium,{ expires: 90 });
    Cookies.set('utm_term', utm_term, { expires: 90 });
    Cookies.set('utm_content', utm_content, { expires: 90 });
    Cookies.set('matchtype', matchtype, { expires: 90 });
  }, []);



  
  return (
    <div>
      <AboveFold />
      <Alert />
      <Testimonial />
      {/* <Requestdemo/> */}
    </div>
  );
};

export default page;
