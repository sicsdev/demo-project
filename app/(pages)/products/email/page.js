"use client"
import React from "react";
import Contact from "@/app/components/Ip/Chatbot/Bot/Contact";
import ContactSection2 from "@/app/components/Ip/Chatbot/Contact/ContactSection2";
import ContactSection3 from "@/app/components/Ip/Chatbot/Contact/ContactSection3";
import ContactSection4 from "@/app/components/Ip/Chatbot/Contact/ContactSection4";
import ContactComplaint from "@/app/components/Ip/Chatbot/Contact/ContactComplaint";
import ContactFeatures from "@/app/components/Ip/Chatbot/Contact/ContactFeatures";
import ContactBanner2 from "@/app/components/Ip/Chatbot/Contact/ContactBanner2";

import Integrate from "../../../components/Ip/components/Integrate";
import Homeinte from "@/app/components/LayoutNew/Homeinte";
import Reach from "@/app/components/LayoutNew/Reach";


const Email = () => {

    return (
        <>
            {/* <Newnavbar /> */}
      
            <Contact />
            <Homeinte />
            <ContactSection2 />
            <ContactSection3 />
            
            <Integrate />
            {/* <BannerSub /> */}
            {/* <ContactSection4 /> */}
 <Reach />
            <ContactComplaint />
            {/* <ContactFeatures /> */}
            {/* <ContactCarousel/> */}
            {/* <ContactBlog/> */}
            {/* <Newfooter />    */}
    
        </>
    )

};

export default Email;