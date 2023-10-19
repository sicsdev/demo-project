"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header";
import Nav from "../components/Layout/Nav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UpdatedFooter from "../components/Layout/UpdatedFooter";


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

  const hideComponent = pathname === "/checkout";
  return (
    <div className="scroll-smooth lg:max-w-full m-auto App w-full h-full">
      {!hideComponent && <Nav />}
      {/* <Header /> */}
    <div className="scroll-smooth lg:max-w-[1450px] m-auto App w-full h-full">

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
