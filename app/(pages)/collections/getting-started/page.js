"use client";
import React, { useEffect, useState } from "react";
import { getArticleCategory } from "@/app/API/pages/Wpdata";
import Link from "next/link";

const page = () => {
  const [single, setSingle] = useState([]);

  useEffect(() => {
    getArticleCategory().then((res) => {
      setSingle(res.data);
      console.log("resss", res);
    });
  }, []);
  console.log("single", single);

  return (
    <div className="bg-[white]  px-[20px] sm:px-0  sm:pl-[10%] pb-[83px]">
      <div>
        <h2 className="font-bold  px-4 pt-8 text-3xl text-heading  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none">
          Getting started
        </h2>
        <div className="border-2 rounded-lg mt-[60px] w-[68rem]">
          {/* {single?.map((ele,key)=> */}

          <Link href="article/invite-team-members">
            {" "}
            <p className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">
              Invite Team Members
            </p>
          </Link>

          <Link href="article/installing-tempo-bot">
            <p className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">
              Installing Tempo Bot
            </p>
          </Link>
          <Link href="article/customize-tempo-bot">
            {" "}
            <p className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">
              Customize Tempo Bot
            </p>
          </Link>
          <Link href="article/email-agent-settings">
            {" "}
            <p className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">
              Email Agent Settings
            </p>{" "}
          </Link>
          <Link href="article/setting-up-mail-forwarding">
            <p className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">
              Setting Up Mail Forwarding
            </p>
          </Link>
          <Link href="article/connecting-your-help-center">
            <p className="m-4  px-3 py-2 text-xl text-heading  md:text-h2 lg:text-lg sm:text-h2 sm:leading-none hover:bg-backhover">
              Connecting your Help Center
            </p>
          </Link>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default page;
