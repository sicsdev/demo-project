import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoader from "@/app/components/Skeleton/Skeleton";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import validator from "validator";
import { createContactInFreshsales, updateContactInHubspot } from '@/app/API/components/Demo';

// import { cookies } from 'next/dist/client/components/headers';
import Cookies from 'js-cookie';
const Contact = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const [fullname, setFullName] = useState({ data: "", error: false })
  const [business, setBusinnes] = useState({ data: "", error: false })
  const [phone, setPhone] = useState({ data: "", error: false })
  const [company, setCompany] = useState({ data: "", error: false })
  const [employe, setEmploye] = useState({ data: "", error: false })
  const [country, setCountry] = useState({ data: "", error: false })
  const [state, setState] = useState({ data: "", error: false })

  const handleSubmit = () => {
    if (fullname.data == null) {
      setFullName({ error: true })
    }
    if (business.data == null) {
      setBusinnes({ error: true })
    }
    if (phone.data == null) {
      setPhone({ error: true })
    }
    if (company.data == null) {
      setCompany({ error: true })
    }
    if (employe.data == null) {
      setEmploye({ error: true })
    }
    if (country.data == null) {
      setCountry({ error: true })
    }
    if (state.data == null) {
      setState({ error: true })
    }
    else {
      Cookies.set("firstname", fullname.data)
      Cookies.set("phone", phone.data)
      Cookies.set("company", company.data)
      Cookies.set("country", country.data)
      Cookies.set("business", business.data)
      Cookies.set("employe", employe.data)
      Cookies.set("state", state.data)
      setShow(true)
    }
  }
  const [show, setShow] = useState(false)
  useEffect(() => {
    setFullName({ data: Cookies.get('firstname') })
    setBusinnes({ data: Cookies.get('business') })
    setCompany({ data: Cookies.get('company') })
    setCountry({ data: Cookies.get('country') })
    setEmploye({ data: Cookies.get('employe') })
    setState({ data: Cookies.get('state') })
    setPhone({ data: Cookies.get('phone') })

    const data = localStorage.getItem('form')
    if (data == null) {
      setShow(false)
    }

  }, [])
  const handlePhoneChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value)) {
      setPhone({ data: e.target.value })
    }
  };
  const [hubID, setHubid] = useState(null);

  const handleBlur = async () => {
    const payload = {
      firstname: fullname.data?.split(" ")[0] || null,
      lastname: fullname.data?.split(" ")[1] || null,
      phone: phone.data,
      company: company.data,
      email: business.data,
      state: state.data,
      country: country.data,
      company_size: employe.data
    }
    console.log("pay", payload);
    if (hubID) {
      await updateContactInHubspot(payload, hubID)
    } else {
      const res = await createContactInFreshsales(payload);
      if (res) {
        setHubid(res.id);
        localStorage.setItem("hubId", res.id)
      }
    }

  };

  const blacklist = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "yopmail.com",
    "outlook.com",
    "me.com",
    "comcast.net",
    "msn.com",
    "live.com",
    "att.net",
    "ymail.com",
    "sbcglobal.net",
    "mac.com",
    "verizon.net",
    "bellsouth.net",
    "cox.net",
    "rocketmail.com",
    "protonmail.com",
    "charter.net",
    "mail.com",
    "optonline.net",
    "aim.com",
    "earthlink.net",
  ];




  const handleBlurGTM = (business) => {
    hj("identify", userId, {
      Email: business,
    });
    let payload = {
      event: "Blur-Email",
    };
    window.dataLayer?.push(payload);
    if (blacklist.includes(business.split("@")[1])) {
      console.log("generic");
      let payload = {
        event: "lead-generic",
      };
      window.dataLayer?.push(payload);
    } else {
      console.log("business");

      let payload = {
        event: "lead-business",
      };
      window.dataLayer?.push(payload);
    }
    if (business?.includes("@")) {
      window._learnq.push([
        "track",
        "$email",
        {
          $email: business,
        },
      ]);

    }
  };
  console.log("businessss", business);

  return (
    <>
      <div className="about bg-white contact-top ">
        <div className=" mx-auto max-w-[90%] sm:max-w-[90%]   sm:py-10">
          <div className="mt-4 sm:mt-[-3rem] block sm:grid md:flex lg:flex justify-between items-center w-full sm:w-[1340px] mx-auto">
            <div className="text-center sm:text-left">
              <p className="uppercase sm:mb-10 text-[#FF5721] font-semibold">
              </p>
              <h2 className="block !font-[700] md:ml-[40px] text-[33px] leading-[40px] px-3 md:px-6 md:!leading-[55px] text-left md:text-[50px] my-[1rem] md:my-8 relative text-[black">
                {loading ? (
                  <SkeletonLoader count={2} height={40} width="100%" />
                ) : (
                  "Revolutionize Customer Service with Tempo's Chatbot."
                )}</h2>
            <p className="w-full md:ml-[56px]  xl:w-[597px] text-blue-400 text-left font-[400]  px-3 text-heading xs:flex-row xs:flex-col  justify-center text-[15px] leading-[22px] md:text-[24px] md:leading-8 gap-2">
                {loading ? (
                  <SkeletonLoader count={2} height={30} width="80%" />
                ) : (
                  "Automate support and elevate customer satisfaction with Tempo's AI-driven chatbot, designed for efficiency and reliability."
                )}
              </p>
              <div className="block">
                <div className="grid grid-cols-1 sm:grid-cols-1  gap-1 mt-8">
                  <div className="block  w-[100%] items-center gap-8">
                    {loading ? (
                      <SkeletonLoader count={1} height={350} width={"100%"} />
                    ) : (
                      <div className="relative w-[100%] h-[250px] sm:w-[550px] sm:h-[422px]">
                        <Image
                          src="/ipbot/Image1.png"
                          className="w-full mx-auto bg-contain object-contain"
                          fill={true}
                        />
                      </div>
                    )}
                  </div>
                  <div className="inline mt-5  sm:max-w-[30%] sm:mt-[20px]"></div>
                </div>
              </div>
            </div>
            {show == false ?
              <div className="block">
                <div className="relative w-[100%] sm:w-[550px] sm:h-[auto]">
                  <div className="w-full mt-4 sm:mt-0">
                    <div className="mx-auto sm:w-[85%] mt-8">
                      <div className=" mx-auto text-center">
                        <div>
                          {loading ? (
                            <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
                          ) : (
                            <>
                              <input
                                type={"text"}
                                placeholder={"Full Name"}
                                value={fullname.data}
                                onChange={(e) => setFullName({ data: e.target.value })}
                                className={
                                  "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                                }

                              />
                              {fullname.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""}
                            </>
                          )}
                          {loading ? (
                            <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
                          ) : (
                            <>

                              <input
                                type={"email"}
                                placeholder={"Business Email"}
                                value={business.data}
                                onChange={(e) => { setBusinnes({ data: e.target.value }) }
                                }
                                className={
                                  "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                }
                                onBlur={(e) => handleBlurGTM(business.data)}

                              />

                              {business.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""}
                            </>
                          )}
                          {loading ? (
                            <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
                          ) : (
                            <>
                              <input
                                type={"text"}
                                placeholder={"Phone"}
                                value={phone.data}
                                onChange={(e) => handlePhoneChange(e)}
                                className={
                                  "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                }

                              />
                              {phone.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""}
                            </>
                          )}
                          {loading ? (
                            <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
                          ) : (
                            <>
                              <input
                                type={"email"}
                                placeholder={"Company"}
                                value={company.data}
                                onChange={(e) => setCompany({ data: e.target.value })}

                                className={
                                  "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                }
                                id={"email"}

                              />
                              {company.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""}
                            </>
                          )}
                          {loading ? (
                            <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
                          ) : (
                            <>

                              <input
                                type={"text"}
                                placeholder={"Number of Employees"}
                                value={employe.data}
                                onChange={(e) => setEmploye({ data: e.target.value })}

                                className={
                                  "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                }

                              />
                              {employe.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""}
                            </>

                          )}
                          {loading ? (
                            <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
                          ) : (
                            <>
                              <input
                                type={"text"}
                                placeholder={"Country"}
                                value={country.data}
                                onChange={(e) => setCountry({ data: e.target.value })}
                                className={
                                  "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                }
                              />
                              {country.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""}
                            </>
                          )}
                          {loading ? (
                            <SkeletonLoader className="mb-4" count={1} height={50} width="100%" />
                          ) : (
                            <>
                              <input
                                type={"text"}
                                placeholder={"State"}
                                value={state.data}
                                onChange={(e) => setState({ data: e.target.value })}
                                className={
                                  "mb-3 border border-input_color w-full block  px-2 py-3 sm:px-3 sm:py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                }
                                id={"email"}

                              />
                              {state.error == true ? <p className='text-[red] text-left'>This field is required</p> : ""}
                            </>
                          )}
                          <div className="flex items-center my-6">
                            {loading ? (
                              <SkeletonLoader className="mb-4 mx-auto" count={1} height={20} width={200} />
                            ) : (
                              <input
                                id="link-checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              // onChange={(e) => Abc(e)}

                              />
                            )}
                            <label
                              htmlFor="link-checkbox"
                              className="ml-2 text-justify text-xs font-medium text-border mt-[16px] "
                            >
                              {loading ? (
                                <SkeletonLoader count={1} height={20} width="100%" />
                              ) : (
                                <>
                                  By checking this box, you agree to the are opting in to receive future communications from Tempo AI.{" "}
                                  <Link href="/privacy-policy">Tempo Privacy Policy</Link>.
                                </>
                              )}
                            </label>
                          </div>
                        </div>

                        {loading ? (
                          <SkeletonLoader count={1} height={50} width={180} />
                        ) : (
                          <button
                            className={
                              "flex items-center justify-center h-[62px] sm:h-[45px] cursor-pointer text-center getademo_animation bg-[#FF5721] w-full py-2 sm:py-[20px] px-3 sm:w-[150px] text-[20px] font-bold focus:ring-yellow-300 text-white rounded-2xl "
                            }
                            style={{ margin: "0px auto" }}
                            onClick={() => {
                              handleSubmit()
                              handleBlur()
                            }}
                          >
                            Get a Quote
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div> :
              <div className='block'>
                <CheckCircleIcon className="h-20 w-26 text-gray-500 checkicon mx-auto" />



                <p className='text-center text-[30px] text-bold my-5'> We've Got It!
                </p>

                <p className='text-center text-[20px]'>
                  A Tempo specialist will reach out shortly to provide <br /> your personalized quote.
                </p>
              </div>

            }
          </div>
        </div>
      </div>
    </>

  )
}

export default Contact;