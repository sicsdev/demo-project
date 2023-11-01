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
import Newnavbar from "@/app/components/Ip/Chatbot/Newnavbar";
import Newfooter from "@/app/components/Layout/Newfooter ";


const Chatbot = () => {

    return (
        <>
            <Newnavbar />
      
            <Contact />
            <Homeinte />
            <ContactSection2 />
            <ContactSection3 />
            
            <Integrate />
            {/* <BannerSub /> */}
            {/* <ContactSection4 /> */}
 <Reach />
            <ContactComplaint />
            <ContactFeatures />
            {/* <ContactCarousel/> */}
            {/* <ContactBlog/> */}
            <Newfooter />   
    
        </>
    )

};

export default Chatbot;

// "use client"
// import React from "react";
// import Contact from "@/app/components/Ip/Chatbot/Contact/Contact";
// import ContactSection2 from "@/app/components/Ip/Chatbot/Contact/ContactSection2";
// import ContactSection3 from "@/app/components/Ip/Chatbot/Contact/ContactSection3";
// import ContactSection4 from "@/app/components/Ip/Chatbot/Contact/ContactSection4";
// import ContactComplaint from "@/app/components/Ip/Chatbot/Contact/ContactComplaint";
// import ContactFeatures from "@/app/components/Ip/Chatbot/Contact/ContactFeatures";
// import ContactBanner2 from "@/app/components/Ip/Chatbot/Contact/ContactBanner2";
// import Newnavbar from "@/app/components/Ip/Chatbot/Newnavbar";
// import Newfooter from "@/app/components/Layout/Newfooter ";

// import Integrate from "../../../components/Ip/components/Integrate";


// const Chatbot = () => {

//     return (
//         <>
      
//             <Contact />
//             <ContactBanner2 />
//             <ContactSection2 />
//             <ContactSection3 />
            
//             <Integrate />
//             {/* <BannerSub /> */}
//             <ContactSection4 />
//             <ContactComplaint />
//             <ContactFeatures />
//             {/* <ContactCarousel/> */}
//             {/* <ContactBlog/> */}
    
//         </>
//     )

// };

// export default Chatbot;