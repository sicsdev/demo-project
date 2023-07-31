import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { getUserProfile } from "@/app/API/components/Sidebar";

const Footer = () => {
  const company = [
    "About",
    "Leadership",
    "Investors",
    "Careers",
    "Customers",
    "Partners",
    "Events",
    "Blogs",
    "News",
    "Contact",
  ];
  const support = [
    "Support",
    "Training & Certification",
    "Services",
    "Student Academy",
    "Community",
  ];
  const products = [
    "What’s New",
    "Temposervice",
    "Tempodesk",
    "Tempochat",
    "Temposales",
    "Tempomarketer",
    "Tempoworks Neo",
  ];
  const [showmenu, setShowmenu] = useState(false);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        if (res.email) setProfile(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <footer className=" bg-[#142543] shadow text-center text-white relative">
        <div className="mx-auto lg:max-w-[90%]">
          <div className="mx-6 py-10 text-center md:text-left  border-b-2 border-neutral-200 ">
            <div className="block sm:flex items-start justify-between">
              <div className="flex justify-between gap-3 flex-col items-start">
                {/* <div>
                  <h6
                    dangerouslySetInnerHTML={{
                      __html: `
             <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/tempo-sales/30min'});return false;">
             <span className="underline cursor-pointer text-white">                            Schedule Demo

             </span>
             </a>
            `,
                    }}
                    className="mb-4  text-white   font-[400] sm:font-bold cursor-pointer border-2 p-2 rounded-lg   border-gray-50 text-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 "
                  ></h6>
                </div> */}
                <span className="text-4xl mb-4 ">
                  <Link href="/">
                    <img
                      src="/logo.png"
                      alt="logo"
                      className="w-[130px] h-15 object-contain"
                    />
                  </Link>
                </span>
                <div>
                  <div className=" sm:flex justify-between gap-3  items-start">
                    <div className="flex flex-wrap sm:justify-between gap-3 items-start">
                      <h6 className="text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/login">Login</Link>
                      </h6>
                      <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/careers">Careers</Link>
                      </h6>
                      {/* <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/terms-of-service">Terms of Service</Link>
                      </h6> */}
                      <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/article/pricing-overview">Pricing</Link>
                      </h6>
                      <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/article/security-overview">Security</Link>
                      </h6>
                      <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/list-of-subprocessors">
                          Subprocessors{" "}
                        </Link>
                      </h6>
                      <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/data-processing-agreement">DPA</Link>
                      </h6>
                      {/* <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </h6> */}
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2  sm:hidden justify-between gap-3  items-start">
                    <div className="flex justify-between gap-3 flex-col items-start">
                      <div>
                        <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                          <Link href="/login">Login</Link>
                        </h6>
                      </div>
                      <div>
                        <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                          <Link href="/careers">Careers</Link>
                        </h6>
                      </div>
                      <div>
                        <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                          <Link href="/terms-of-service">Terms of Service</Link>
                        </h6>
                      </div>
                      <div>
                        <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                          <Link href="/data-processing-agreement">DPA</Link>
                        </h6>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between gap-3 flex-col items-start">
                        <div>
                          <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                            <Link href="/article/pricing-overview">
                              Pricing
                            </Link>
                          </h6>
                        </div>
                        <div>
                          <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                            <Link href="/article/security-overview">
                              Security
                            </Link>
                          </h6>
                        </div>
                        <div>
                          <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                            <Link href="/list-of-subprocessors">
                              Subprocessors{" "}
                            </Link>
                          </h6>
                        </div>
                        <div>
                          <h6 className="  text-white   font-[400] sm:font-bold cursor-pointer text-[12px] bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                            <Link href="/privacy-policy">Privacy Policy</Link>
                          </h6>
                        </div>{" "}
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="flex mt-4 sm:mt-0">
                <div className="justify-between w-full sm:w-auto flex flex-row gap-10 items-center ml-auto">
                  {profile.email ? (
                    <>
                      {" "}
                      <p className="text-white">{profile.email}</p>
                    </>
                  ) : (
                    <Link href={"/login"}>
                      {" "}
                      <p className="text-white sm:py-[6px] sm:px-[12px]  hover:outline-[#2563eb] hover:outline-1 hover:rounded-[2px]	hover:outline  hover:outline-offset-2 ">
                        Sign In
                      </p>
                    </Link>
                  )}

                  {profile.email ? (
                    <Link href={"/dashboard"}>
                      {" "}
                      <button
                        type="button"
                        className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-lg font-medium uppercase leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                      >
                        Dashboard
                      </button>{" "}
                    </Link>
                  ) : (
                    <Link href={"/free-trial"}>
                      {" "}
                      <button
                        type="button"
                        className="inline-block   px-6 pb-2 pt-2.5 text-xs rounded-lg font-medium uppercase leading-normal bg-[#fe9327] hover:bg-black text-white hover:text-white  transition duration-150 border ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-white focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] "
                      >
                        Get Started
                      </button>{" "}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm sm:text-[16px] sm:gap-4 bg-slate-950 shadow p-3 sm:p-6 text-center dark:bg-neutral-700">
            <a
              className="font-thin text-neutral-600 dark:text-neutral-400 "
              href="https://tailwind-elements.com/"
            >
              © Tempo AI Ventures, Inc{" "}
            </a>
            <div className="flex justify-between gap-3 items-start">
              <div>
                <h6 className="  text-white text-sm sm:text-[16px] font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                  <Link href="/terms-of-service">Terms of Service</Link>
                </h6>
              </div>{" "}
              <div>
                <h6 className="  text-white text-sm sm:text-[16px]   font-[400] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
