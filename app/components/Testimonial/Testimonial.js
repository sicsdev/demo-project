import React, { useState } from "react";
import Image from "next/image";
import Card from "../Common/Card/Card";
import Button from "../Common/Button/Button";
const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const team_data = [
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea74e6622cbe24966972138_dave.png",
      title:
        "“Thanks to Gorgias, my customer service team has been able to increase customer satisfaction and drive customer loyalty. ”",
      name: "Dave Szymaszek",
      position: "Head of Customer Experience @ Marine Layer",
      precent: "68%",
      quote: "Decrease in resolution time",
    },
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea74e9263bac005ccc061cd_guita.png",
      title:
        "“I like the pricing structure: in a startup, everybody should be an agent. Zendesk charges per agent. Gorgias' pricing is smarter.”",
      name: "Danny Taing",
      position: "Danny Taing, Founder & CEO @ Bokksu",
      precent: "120",
      quote: "Number of tickets by agent per day",
    },
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea74f82f6e60aff2cc3fa3f_danny.png",
      title:
        "“With all the Gorgias integrations, my team doesn't need to jump between tools. This has helped us dramatically improve customer satisfaction.”",
      name: "Dave",
      position: "Amanda, Director of Operations @ Darn Good Yarn",
      precent: "90%",
      quote: "Customer queries form Messenger",
    },
    {
      img: "https://assets-global.website-files.com/5e4ff204e7b6f80e402d407a/5ea750175e12ffd822de29c9_amanda_darn_good_yarn.png",
      title:
        "We’ve stopped hunting and matching Facebook users to customer accounts on Shopify. The information we need is surfaced so we can respond better and faster.",
      name: "Guita Gopalan",
      position: "Head of Customer Experience @ Marine Layer",
      precent: "10x",
      quote: "Growth over the last 2 years",
    },
  ];
  const nextData = () => {
    if (team_data.length - 1 === index) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const prevData = () => {
    if (index === 0) {
      setIndex(team_data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  return (
    <div className="py-5 ">
      <div className="my-16 cursor-pointer mx-auto max-w-[90%]">
        <div
          className={
            "bg-type-section   block sm:flex md:flex lg:flex justify-between shadow-2xl rounded-lg py-8 px-8 sm:py-20 md:py-20 lg:py-20  sm:px-12 lg:px-12 md:px-12   items-center relative"
          }
        >
          <div className=" sm:w-[50%] md:w-[50%] lg:w-[50%]">
            {" "}
            <h1 className=" font-bold  text-2xl  md:text-5xl lg:text-5xl sm:text-5xl   text-heading  ">
             Try Tempo with your own support content now
            </h1>
          </div>
          <div className="block sm:grid md:grid lg:grid grid-cols-2 gap-4">
            <button
              type={"submit"}       
              className={
                "py-2 px-8 w-full sm:px-20 md:px-20 lg:px-20 sm:py-8 md:py-8 lg:py-8 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-lg"
              }
            >
           Demo Now! &#8594;
            </button>
            <button
              type={"submit"}
              className={
                "py-2 px-8 focus:ring-yellow-300 text-white w-full  mt-2 sm:m-0 md:m-0 lg:m-0 text-lg font-semibold bg-black hover:bg-primary dark:focus:ring-yellow-900 rounded-lg"
              }
            >
              Try Tempo &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
