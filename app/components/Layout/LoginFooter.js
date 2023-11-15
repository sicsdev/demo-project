import Link from "next/link";

import React, { useEffect } from "react";

import { useState } from "react";

import { getUserProfile } from "@/app/API/components/Sidebar";



const LoginFooter = () => {

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

      <footer className=" bg-[white] shadow text-center text-white relative login-footer">

        <div className="mx-auto lg:max-w-[90%]">

          <div className="mx-6 sm:py-10 py-8 text-center md:text-left  border-b-2 border-neutral-200 ">

            <div className="block lg:flex items-start justify-center gap-3">

              {/* <div className="flex justify-between gap-3 flex-col items-start">

          

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

                    <div className="flex flex-wrap sm:justify-between gap-3 sm:gap-0 items-start">

            

                      <h6 className="  text-[#142543]  !font-semibold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black   border-r-2 border-[#142543]    px-2  h-[17px] flex items-center ">

                        <Link href="/pricing">Pricing</Link>

                      </h6>

                      <h6 className="  text-[#142543]  !font-semibold cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    border-r-2 border-[#142543]    px-2  h-[17px] flex items-center">

                        <Link href="/security">Security</Link>

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
                      <h6 className="  text-[#142543]   !font-semibold  cursor-pointer btext-xl bg-transparent  hover:bg-white hover:text-black hover:border-black    px-2  h-[17px] flex items-center">

                        {profile.email ? (
                          <>
                            {" "}
                            <Link href={"/dashboard"}>
                              <p className="text-[#142543]">{profile.email}</p>
                            </Link>
                          </>
                        ) : (
                          <Link href={"/login"}>
                            {" "}
                            <p className=" text-[#142543]  sm:py-[6px] s font-semibold ">
                              Sign In
                            </p>
                          </Link>
                        )}

                      </h6>

                    </div>

                  </div>


                </div>

              </div> */}



              <p className="text-center  text-neutral-600 text-[18px] mt-[3rem] text-[#142543] !font-semibold">

                © Deflection AI Ventures, Inc{" "}

              </p>
              <p className="text-center  text-neutral-600 text-[18px] mt-[3rem] text-[#142543] !font-semibold">

|

</p>
              <p className="text-center  text-neutral-600 text-[18px] mt-[3rem] text-[#142543] !font-semibold">
          <Link  href="/privacy-policy">

               Privacy Policy
               </Link>
              </p>

            </div>

          </div>





        </div>

      </footer>

    </>

  );

};



export default LoginFooter;