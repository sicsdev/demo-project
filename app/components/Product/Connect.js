"use client";
import React, { useRef, useEffect } from "react";
import SelectOption from "../Common/Input/SelectOption";
import { useState } from "react";
import {
  createContactInFreshsales,
  updateContactInHubspot,
} from "@/app/API/components/Demo";
import validator from "validator";
import SkeletonLoader from "../Skeleton/Skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Connect = () => {
  const inputRef = useRef();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, SetCompany] = useState("");
  const [email, setEmail] = useState("");
  const [hubID, setHubid] = useState(null);
const router = useRouter()
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (inputRef.current && !inputRef.current.contains(event.target)) {
  //       console.log("lengthemail", event.target.value);
  //       yourFunction();
  //     }
  //   }
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleBlur = async (e) => {
    // if (validator.isEmail(email)) {
    //   let payload = { email: email };
    //   if (firstname) payload.firstname = firstname;
    //   if (lastname) payload.lastname = lastname;
    //   if (company) payload.company = company;
    //   if (hubID) {
    //     await updateContactInHubspot(payload, hubID);
    //   } else {
    //     const res = await createContactInFreshsales(payload);
    //     if (res) {
    //       setHubid(res.id);
    //       localStorage.setItem("hubId", res.id);
    //     }
    //   }
    // }
  };


  const [lengthemail, setLengthemail] = useState("");
  const [show, setShow] = useState(false);
  // function yourFunction() {
  //   const inputValue = inputRef.current.value; // Get the input value
  //   setLengthemail(inputValue); // Update the lengthemail state
  //   console.log("Clicked outside the input");
  //   if (inputValue.length !== 0) {
  //     setShow(true);
  //   }
  // }
const handleClick =()=>{
if(firstname.length ==0){
  setShow(true)
}else{
  router.push("/request-demo")
  // return <p><Link href="/request-demo"></Link></p>
}
}
  return (
    <div className="form bg-white">
      <div className=" mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[80%] lg:max-w-[80%] pt-[1px] pb-10 sm:pb-10">
        <div className="block mt-8">
          <div className="block mt-10 sm:mt-20 sm:flex md:flex lg:flex justify-evenly items-center gap-14 ">
            <div>
              <h2 className="text-center sm:leading-none leading-[45px] sm:text-left sm:w-[570px] font-bold text-[#252C47] sm:mt-0 mt-1 text-[32px] sm:text-[50px] sm:leading-none">
              {loading ? (
                <SkeletonLoader count={2} height={60} width="100%" />
              ) : ( 
                <div>
              Start <span className="text-[#FF5721]">streamlining </span>  operations instantly and{" "}
                <span className="text-[#FF5721]">cutting </span>costs today
                </div>
              )}
              </h2>
            </div>
            <div className="w-full mt-4 sm:mt-0">
              <form className="mx-auto sm:w-[70%] mt-8">
                <div className=" mx-auto text-center">
                {loading ? (
                  <SkeletonLoader count={1} height={60} width="100%" />
                ) : ( 
                  <input
                    type={"email"}
                    placeholder={"Work Email Address"}
                    className={
                      "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                    }
                    id={"email"}
                    ref={inputRef} // Attach the ref to the input element
                    onChange={(e) => {
                      {
                        setEmail(e.target.value);
                        setLengthemail(e.target.value.length);
                      }
                    }}
                    onBlur={(e) => handleBlur(email)}
                  />
                )}
                  {show ? (
                    <div>
                      <input
                        type={"text"}
                        placeholder={"First Name"}
                        className={
                          "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                        }
                        onBlur={(e) => handleBlur(firstname)}
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                      />
                      <input
                        type={"text"}
                        placeholder={"Last Name"}
                        className={
                          "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                        }
                        onBlur={(e) => handleBlur(lastname)}
                        onChange={(e) => {
                          setLastname(e.target.value);
                        }}
                      />

                      <input
                        type={"text"}
                        placeholder={"Company Name"}
                        className={
                          "mb-3 border border-input_color w-full block  px-3 py-4 bg-white  rounded-2xl text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
                        }
                        id={"email"}
                        onBlur={(e) => handleBlur(company)}
                        onChange={(e) => {
                          SetCompany(e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {loading ? (
                    <SkeletonLoader count={1} height={60} width="100%" />
                  ) : ( 
                  <p
                  onClick={()=>handleClick()}
                    className={
                      "flex items-center justify-center h-[62px] sm:h-[45px] cursor-pointer text-center getademo_animation bg-[#FF5721] w-full py-2 sm:py-[20px] px-3 sm:w-[150px] text-[20px] font-bold focus:ring-yellow-300 text-white rounded-2xl "
                    }
                    style={{margin:"0px auto"}}
                  >
                   Get a Demo
                  </p>
                  )}
                  {loading ? (
                    <SkeletonLoader count={1} height={20} width="100%" />
                  ) : ( 
                  <p className="font-xs mt-4">

                  Deflection AI{" "}
                    <Link className="font-semibold underline" href="/privacy-policy">
                      Privacy-Policy

                    </Link>
                  </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;