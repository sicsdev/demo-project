"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header";
import Nav from "../components/Layout/Nav";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Cookies from "js-cookie";
import UpdatedFooter from "../components/Layout/UpdatedFooter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function PageLayout({ children }) {
  const pathname = usePathname();

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



  const [routesHistory, setRoutesHistory] = useState({
    currentRoute: pathname,
    previousRoute: null,
  });

  useEffect(() => {
    const cookieValue =  getCookie("tracking");
    if (pathname  in cookieValue && routesHistory.currentRoute !== pathname) {
      cookieValue[pathname] += 1;
      setRoutes(cookieValue);
    
    } else if (routesHistory.currentRoute !== pathname) {
      cookieValue[pathname] = 1;
      setRoutes(cookieValue);
    }
  }, [pathname]);

  function setRoutes(cookieValue) {
    setRoutesHistory((prev) => ({
      currentRoute: pathname,
      previousRoute: prev.currentRoute,
    }));
    setCookie("tracking", cookieValue);
  }

  console.log("cookieValue", getCookie("tracking"));

  function setCookie(key, value) {
   return Cookies.set(key, JSON.stringify(value));
  }

  function getCookie(key) {
    const cookieValue = Cookies.get(key);
    return cookieValue ? JSON.parse(cookieValue) : {};
  }
  console.log("pathname", pathname)

  const hideComponent = pathname === "/checkout" || pathname === "/get-trial"|| pathname === "/lp/chat-bot" || pathname === "/lp/contact-center" ||  pathname === "/login" || pathname == "/forgot-password";
  
  return (
    <div className="scroll-smooth lg:max-w-full m-auto App w-full h-full">
      
      {!hideComponent && <Nav />}
      {/* <Header /> */}
    <div className={`scroll-smooth ${pathname == "/login" || pathname == "/forgot-password" ? "lg:max-w-[full]" :"lg:max-w-[1450px]"} m-auto App w-full h-full`}>

      {children}
      </div>
      {!hideComponent && (
        <div id="footer">
          {" "}
          {/* <Footer />{" "} */}
          <UpdatedFooter />
        </div>
      )}
    </div>
  );
}
