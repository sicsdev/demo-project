
import React, { useEffect, useState } from 'react'
import Button from '../Common/Button/Button'
import Card from '../Common/Card/Card'
import { useRouter } from 'next/navigation';

const Demo = () => {

  const [email, setEmail] = useState("");
    const router = useRouter();
    const handleNavigate = () => {
        let emailInput = document.getElementById('email').value;
        localStorage.setItem('tempEmail', emailInput);
        router.push(`/free-trial?email=${emailInput}`);
    }


  useEffect(() => {
    // if (email?.includes("@")) {
    //   window._learnq.push(["identify", { email: email }]);
    // }
  }, [email]);

  const handleBlur = (email) => {
    if (email?.includes("@")) {
      window._learnq.push([
        "track",
        "$email",
        {
          $email: email,
        },
      ]);
    } 
  };

  return (
    <div className="mx-auto">
      <Card className={"bg-white"}>
        <h3 className="text-center text-2xl sm:text-h3 md:text-h3 lg:text-h3 sm:leading-9 my-2 font-clash-semibold text-heading">
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
              // onBlur={(e) => handleBlur(email)}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="inline mt-5 sm:m-0 md:m-0 lg:m-0">
            <Button
              className={
                "py-[11px] px-2 w-full focus:ring-yellow-300 text-white bg-primary hover:bg-black dark:focus:ring-yellow-900"
              }
              onClick={handleNavigate}
            >
              Start Free Trial
            </Button>
          </div>
        </form>
        <div className=" flex justify-center sm:justify-start md:justify-start sm:flex md:flex lg:flex  items-center gap-5">
          <small className="text-border" style={{ color: "#36454F" }}>
            1,000+ agents
          </small>
          <small className="text-border" style={{ color: "#36454F" }}>
            24/7 support
          </small>
          <small className="text-border" style={{ color: "#36454F" }}>
            No-code setup
          </small>
        </div>
      </Card>
    </div>
  );
};

export default Demo;
