"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header";
import Nav from "../components/Layout/Nav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UpdatedFooter from "../components/Layout/UpdatedFooter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function PageLayout({ children }) {
  const pathname = usePathname();
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

  const hideComponent = pathname === "/checkout" || pathname === "/lp/chat-bot" || pathname === "/lp/contact-center" ||  pathname === "/login" || pathname == "/forgot-password";
  
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
