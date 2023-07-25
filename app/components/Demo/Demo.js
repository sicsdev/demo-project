import React, { useEffect, useState } from "react";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";
import { useRouter } from "next/navigation";
import validator from "validator";
import axios from "axios";
import { createContactInFreshsales } from "@/app/API/components/Demo";

const Demo = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const router = useRouter();
  const handleNavigate = () => {
    let emailInput = document.getElementById("email").value;
    router.push(`/checkout?email=${emailInput}`);
  };
  const [hide, setHide] = useState({
    first: false,
    second: false,
    third: false,
  });

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

  useEffect(() => {
    // if (email?.includes("@")) {
    //   window._learnq.push(["identify", { email: email }]);
    // }
  }, [email]);

  const handleBlur = (email) => {
    if (validator.isEmail(email)) {
      let Freshsalespayload = {
        email: email,
      };
      createContactInFreshsales(Freshsalespayload);
      hj("identify", userId, {
        Email: email,
      });
      let payload = {
        event: "Blur-Email",
      };
      window.dataLayer?.push(payload);
      if (blacklist.includes(email.split("@")[1])) {
        let payload = {
          event: "lead-generic",
        };
        window.dataLayer?.push(payload);
      } else {
        let payload = {
          event: "lead-business",
        };
        window.dataLayer?.push(payload);
      }
      if (email?.includes("@")) {
        window._learnq.push([
          "track",
          "$email",
          {
            $email: email,
          },
        ]);
      }
    }
  };

  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  return (
    <div
      className="mx-auto"
      onClick={() =>
        setHide({ first: false, second: false, third: false, fourth: false })
      }
    >
      <Card className={"bg-white"}>
        <h3 className="text-center text-2xl sm:text-h3 md:text-h3 lg:text-h3 sm:leading-9 my-2 font-semibold text-heading">
          Unlock the power of
          <span className="text-first-section-color"> AI </span> customer
          service
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 sm:gap-1 mt-8">
          <div className="inline col-span-2 ">
            <input
              type={"email"}
              placeholder={"Enter your email"}
              className={
                "border border-input_color w-full block  px-3 py-3 bg-white  rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  "
              }
              id={"email"}
              value={email}
              onBlur={(e) => handleBlur(email)}
              onChange={(e) => {
                {
                  setEmail(e.target.value);
                }
                validateEmail(e);
              }}
            />
          </div>
          <div className="inline mt-5 sm:m-0 md:m-0 lg:m-0">
            <Button
              className={
                "py-[11px] px-2 w-full focus:ring-yellow-300 text-white bg-[#fe9327] hover:bg-black dark:focus:ring-yellow-900  disabled:bg-[#e7b37e]"
              }
              onClick={handleNavigate}
              disabled={validEmail}
            >
              Start Now
            </Button>
          </div>
        </form>
        <div className=" flex justify-between pt-3  sm:pt-0 sm:justify-start md:justify-start sm:flex md:flex lg:flex sm:mt-[10px]  items-center sm:gap-[44px]">
          <small
            className="text-border "
            style={{ color: "#36454F" }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setHide({ first: false });
            }}
          >
            Instant SLA's
            <span
              className="cursor-pointer"
              onMouseOver={(e) => {
                e.stopPropagation();
                setHide({ first: true });
              }}
            >
              *
            </span>
            {hide.first == true ? (
              <Card
                className={
                  "animate-fadeIn w-[320px]	sm:w-[400px]  absolute bg-white ml-auto mr-auto left-0 right-0"
                }
              >
                <p
                  className="text-heading"
                  onMouseLeave={() =>
                    setTimeout(() => {
                      setHide({ first: false });
                    }, 5000)
                  }
                >
                  *Average SLA's of under one minute over billing cycles. SLA's
                  over shorter timespans may exceed one minute.
                </p>
              </Card>
            ) : (
              ""
            )}
          </small>
          <small
            className="text-border "
            style={{ color: "#36454F" }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setHide({ first: false });
            }}
          >
            24/7/365
            <span
              className="cursor-pointer"
              onMouseOver={(e) => {
                e.stopPropagation();
                setHide({ second: true });
              }}
            >
              *
            </span>
            {hide.second == true ? (
              <Card
                className={
                  "animate-fadeIn w-[320px]	sm:w-[400px]  absolute sm:left-[26rem]  bg-white ml-auto mr-auto left-0 right-0"
                }
              >
                <p
                  className="text-heading"
                  onMouseLeave={() =>
                    setTimeout(() => {
                      setHide({ second: false });
                    }, 5000)
                  }
                >
                  * Tempo may have temporary maintenance and upgrade periods.
                  24/7 uptime is approximate.
                </p>
              </Card>
            ) : (
              ""
            )}
          </small>
          <small
            className="text-border "
            style={{ color: "#36454F" }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setHide({ first: false });
            }}
          >
            Easy Setup
            <span
              className="cursor-pointer"
              onMouseOver={(e) => {
                e.stopPropagation();
                setHide({ third: true });
              }}
            >
              *
            </span>
            {hide.third == true ? (
              <Card
                className={
                  "animate-fadeIn w-[320px]	sm:w-[400px]  absolute sm:left-[36rem] bg-white ml-auto mr-auto left-0 right-0"
                }
              >
                <p
                  className="text-heading"
                  onMouseLeave={() =>
                    setTimeout(() => {
                      setHide({ third: false });
                    }, 5000)
                  }
                >
                  *Setup for base Tempo product is no-code. API implementations
                  may involve your developer resources.
                </p>
              </Card>
            ) : (
              ""
            )}
          </small>
        </div>
      </Card>
    </div>
  );
};

export default Demo;
