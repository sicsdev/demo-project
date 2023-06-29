import React, { useEffect, useState } from "react";
import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";
import { useRouter } from "next/navigation";
import validator from "validator";
import axios from "axios";

const Demo = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const router = useRouter();
  const handleNavigate = () => {
    let emailInput = document.getElementById("email").value;
    router.push(`/checkout?email=${emailInput}`);
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

  useEffect(() => {
    // if (email?.includes("@")) {
    //   window._learnq.push(["identify", { email: email }]);
    // }
  }, [email]);

  // const sendDataToFreshsales = async () => {
  //   const apiUrl = "https://tempoai.myfreshworks.com/crm/sales/api/contacts";
  //     // Create the lead object with the desired data
  //     const contact = {
  //       email: email
  //       // Add more fields as needed
  //     };
  //     try {
  //       // Send the lead data to Freshsales CRM
  //        const response = await fetch(apiUrl, {
  //          method: 'POST',
  //          headers: {
  //            'Access-Control-Allow-Origin': "*",
  //            'Content-Type': 'application/json',
  //            'Authorization': 'Token yict-U-l_KKTLDvaQPiXDQ', // Replace with your Freshsales API key
  //          },
  //          body: JSON.stringify(contact),
  //        });

  //        if (response.ok) {
  //          // Lead data sent successfully
  //          console.log('data sent to Freshsales CRM');
  //        } else {
  //          // Handle error if the request fails
  //          console.error('Error sending  data to Freshsales CRM');
  //        }
  //      } catch (error) {
  //        console.error('Error sending  data to Freshsales CRM', error);
  //      }
  //   let headersList = {
  //     Accept: "*/*",
  //     Authorization: " Token yict-U-l_KKTLDvaQPiXDQ",
  //     "Content-Type": "application/json",
  //   };

  //   let bodyContent = JSON.stringify({ email: "shubham@gmail.com" });

  //   fetch("https://tempoai.myfreshworks.com/crm/sales/api/contacts", {
  //     method: "POST",
  //     body: bodyContent,
  //     headers: headersList,
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // };


  const handleBlur = (email) => {
    if (validator.isEmail(email)) {
      hj('identify', userId, { 
        Email: email
    });
      let payload = {
        event: "Blur-Email",
      };
      window.dataLayer?.push(payload);
      // sendDataToFreshsales(email);
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
    <div className="mx-auto">
      <Card className={"bg-white"}>
        <h3 className="text-center text-2xl sm:text-h3 md:text-h3 lg:text-h3 sm:leading-9 my-2 font-semibold text-heading">
          Unlock the power of
          <span className="text-first-section-color">
            {" "}
            ChatGPT Powered
          </span>{" "}
          customer service
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 mt-8">
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
                "py-[11px] px-2 w-full focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
              }
              onClick={handleNavigate}
              disabled={validEmail}
            >
              Start Now
            </Button>
          </div>
        </form>
        <div className=" flex justify-between sm:justify-start md:justify-start sm:flex md:flex lg:flex  items-center gap-1 sm:gap-5 sm:5">
          <small className="text-border " style={{ color: "#36454F" }}>
            0 minute SLA's{" "}
          </small>
          <small className="text-border " style={{ color: "#36454F" }}>
            24/7 support
          </small>
          <small className="text-border " style={{ color: "#36454F" }}>
            No-code setup
          </small>
        </div>
      </Card>
    </div>
  );
};

export default Demo;
