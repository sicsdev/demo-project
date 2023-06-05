"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Banner from "./Banner";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const ref = useRef(null);
  const [navbar, setNavbar] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setNavbar(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div className="sticky top-0 start-0	z-40">
      <Banner />
      <nav className="w-full bg-black shadow">
        <div
          className="justify-between mx-auto lg:max-w-[90%] md:items-center md:flex"
          ref={ref}
        >
          <div>
            <div className="flex items-center mx-3 lg:mx-0 md:mx-0 justify-between py-3 md:py-5 md:block">
              {/* <Link href="/"> */}
                <img
                  src="/logo.png"
                  alt="logo"
                  class="w-24 h-15 object-contain"
                />
              {/* </Link> */}
              {pathName === "/checkout" || pathName === "/free-trial" ? (
                ""
              ) : (
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            {pathName === "/checkout" || pathName === "/free-trial" ? (
              ""
            ) : (
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
                onClick={() => setNavbar(false)}
              >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-[#ADD8E6] text-center flex items-center justify-center">
                    <a
                      href="tel:+1 (855) 308-3676
"
                      style={{ marginLeft: "5px" }}
                      className="text-center flex items-center justify-center"
                    >
                      <img
                        src="/phone.png"
                        className="w-4  h-15 object-contain"
                      />{" "}
                      <span className="mx-2">+1 (855) 308-3676</span>
                    </a>
                  </li>
                  {/* <li className="text-white text-center">
                  <Link href="/free-trial">Pricing</Link>
                </li> */}

                  <li className="text-white   font-bold text-center">
                    <button className="rounded-lg  border-2 border-gray-50 text-xl bg-transparent hover:bg-white hover:text-black hover:border-black    py-1 px-2">
                      <Link href="/free-trial">Start Now</Link>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
