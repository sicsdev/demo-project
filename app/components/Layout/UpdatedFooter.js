import Link from "next/link";

import React, { useEffect } from "react";

import { useState } from "react";

import { getUserProfile } from "@/app/API/components/Sidebar";

 

const UpdatedFooter = () => {

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

      <footer className=" bg-[white] shadow text-center text-white relative">

        <div className="mx-auto lg:max-w-[90%]">

          <div className="mx-6 sm:py-10 py-8 text-center md:text-left  border-b-2 border-neutral-200 ">

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

                    className="mb-4  text-white   font-[200] sm:font-bold cursor-pointer border-2 p-2 rounded-lg   border-gray-50 text-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 "

                  ></h6>

                </div> */}

                <span className="text-4xl mb-4 text-[#142543] ">

                  <Link href="/">

                    <img

                      src="/TempoBlue.png"

                      alt="logo"

                      className="w-[130px] h-15 object-contain"

                    />

                  </Link>

                </span>

                <div>

                  <div className=" sm:flex justify-between gap-1  items-start">

                    <div className="flex flex-wrap sm:justify-between gap-3 items-start">

                      {/* <h6 className="text-white   font-[200] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">

                        <Link href="/login">Login</Link>

                      </h6> */}

                      <h6 className="  text-[#142543] !font-semibold  cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black   border-r-2 border-[#142543]    px-2  h-[17px] flex items-center ">

                        <Link href="/careers">Careers</Link>

                      </h6>

                      {/* <h6 className="  text-white   font-[200] sm:font-bold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    py-1 px-2 ">

                        <Link href="/terms-of-service">Terms of Service</Link>

                      </h6> */}

                      <h6 className="  text-[#142543]  !font-semibold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black   border-r-2 border-[#142543]    px-2  h-[17px] flex items-center ">

                        <Link href="/article/pricing-overview">Pricing</Link>

                      </h6>

                      <h6 className="  text-[#142543]  !font-semibold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    border-r-2 border-[#142543]    px-2  h-[17px] flex items-center">

                        <Link href="/article/security-overview">Security</Link>

                      </h6>

                      <h6 className="  text-[#142543]  !font-semibold  cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black   border-r-2 border-[#142543]    px-2  h-[17px] flex items-center ">

                        <Link href="/list-of-subprocessors">

                          Subprocessors{" "}

                        </Link>

                      </h6>

                      <h6 className="  text-[#142543]  !font-semibold  cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black     border-r-2 border-[#142543]    px-2  h-[17px] flex items-center ">

                        <Link href="/data-processing-agreement">DPA</Link>

                      </h6>

                      <h6 className="  text-[#142543]   !font-semibold  cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black border-r-2    px-2  h-[17px] flex items-center">

                        <Link href="/privacy-policy">Privacy Policy</Link>

                      </h6>

                    </div>

                  </div>


                </div>

              </div>

            

                  <p className="text-neutral-600 text-[18px] mt-[3rem] text-[#142543] !font-semibold">

              © Tempo AI Ventures, Inc{" "}

            </p>

            </div>

          </div>

 

            {/* <span className="text-4xl">

              <Link href="/">

                <img

                  src="/logo.png"

                  alt="logo"

                  className="w-24 h-15 object-contain"

                />

              </Link>

            </span> */}

            {/* <p className="font-thin text-neutral-600  ">

              © Tempo AI Ventures, Inc{" "}

            </p> */}

        </div>

      </footer>

    </>

  );

};

 

export default UpdatedFooter;